import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Fan, MemoryStick, HardDrive, Monitor, AlertTriangle, CheckCircle, XCircle, X, Power, Zap, ArrowRight, Terminal } from 'lucide-react'
import { motherboardSlots, inventoryItems, coreSlots } from '../data/simulationData'

const slotIcons = { Cpu, Fan, MemoryStick, HardDrive, Monitor }

const Simulasi = () => {
  const [selectedItem, setSelectedItem] = useState(null)
  const [placedSlots, setPlacedSlots] = useState({}) // { slotId: itemId }
  const [thermalApplied, setThermalApplied] = useState(false) // thermal paste on CPU
  const [logs, setLogs] = useState([])
  const [errors, setErrors] = useState(0)
  const [showBootSuccess, setShowBootSuccess] = useState(false)

  const addLog = useCallback((message, type = 'info') => {
    setLogs((prev) => [...prev, { id: Date.now() + Math.random(), message, type }])
  }, [])

  // Check which core slots are filled
  const filledCoreSlots = coreSlots.filter((sid) => placedSlots[sid])
  const allCorePlaced = filledCoreSlots.length >= coreSlots.length

  const getItemById = (id) => inventoryItems.find((i) => i.id === id)
  const getSlotById = (id) => motherboardSlots.find((s) => s.id === id)

  // Group slots by gridArea for the grid layout
  const gridAreas = {
    cpu: motherboardSlots.filter((s) => s.gridArea === 'cpu'),
    ram: motherboardSlots.filter((s) => s.gridArea === 'ram'),
    pcie: motherboardSlots.filter((s) => s.gridArea === 'pcie'),
    m2: motherboardSlots.filter((s) => s.gridArea === 'm2'),
  }

  const handleSelectItem = (item) => {
    if (showBootSuccess) return
    const alreadyPlaced = Object.values(placedSlots).includes(item.id)
    if (alreadyPlaced) {
      addLog(`${item.name} sudah terpasang.`, 'warning')
      return
    }
    setSelectedItem(selectedItem?.id === item.id ? null : item)
  }

  const handleClickSlot = (slot) => {
    if (showBootSuccess) return

    // If no item selected
    if (!selectedItem) {
      if (placedSlots[slot.id]) {
        const placed = getItemById(placedSlots[slot.id])
        addLog(`Slot ini sudah terisi: ${placed.name}`, 'info')
      } else {
        addLog('Pilih komponen dari toolbox terlebih dahulu.', 'warning')
      }
      return
    }

    // ---- SPECIAL: Thermal Paste (bypass slot filled check) ----
    if (selectedItem.id === 'thermal-paste') {
      if (slot.id !== 'cpu-socket') {
        setErrors((prev) => prev + 1)
        addLog('Error: Thermal paste hanya bisa dioleskan ke atas CPU. Pilih socket CPU!', 'error')
        setSelectedItem(null)
        return
      }
      if (!placedSlots['cpu-socket']) {
        setErrors((prev) => prev + 1)
        addLog('Error: Pasang prosesornya dulu sebelum mengoleskan thermal paste!', 'error')
        setSelectedItem(null)
        return
      }
      // Success — mark thermal as applied (bypass slot filled check)
      setThermalApplied(true)
      addLog('✅ Thermal paste berhasil dioleskan ke atas CPU.', 'success')
      setSelectedItem(null)
      return
    }

    // Check if slot is already filled (AFTER thermal paste bypass)
    if (placedSlots[slot.id]) {
      addLog(`Slot "${slot.label}" sudah terisi! Lepas dulu untuk mengganti.`, 'warning')
      return
    }

    // ---- SPECIAL: Pengecoh (SATA cable, HDD) ----
    if (selectedItem.slotType === null) {
      setErrors((prev) => prev + 1)
      addLog(`Error: ${selectedItem.name} tidak dipasang langsung ke slot Motherboard! Cari komponen lain.`, 'error')
      setSelectedItem(null)
      return
    }

    // ---- Check prerequisite (cooler requires CPU + thermal paste) ----
    if (selectedItem.requires && !placedSlots[selectedItem.requires]) {
      setErrors((prev) => prev + 1)
      if (selectedItem.id === 'cooler-noctua') {
        if (!thermalApplied) {
          addLog('Error: Oleskan thermal paste ke CPU terlebih dahulu sebelum memasang Cooler!', 'error')
        } else {
          addLog('Error: Pasang CPU terlebih dahulu sebelum memasang Cooler!', 'error')
        }
      } else {
        addLog(`Error: Komponen ini memerlukan CPU terpasang lebih dulu.`, 'error')
      }
      setSelectedItem(null)
      return
    }

    // Check if slot has a prerequisite and it's met
    if (slot.requires && !placedSlots[slot.requires]) {
      setErrors((prev) => prev + 1)
      const requiredSlot = getSlotById(slot.requires)
      addLog(`Error: Slot ini memerlukan "${requiredSlot?.label}" terpasang lebih dulu.`, 'error')
      setSelectedItem(null)
      return
    }

    // ---- Validate slot type match ----
    if (selectedItem.slotType !== null && selectedItem.slotType !== slot.id) {
      const correctSlot = getSlotById(selectedItem.slotType)

      // Check if type matches for same-category slots (e.g., RAM)
      if (selectedItem.type === slot.type && correctSlot) {
        addLog(`${selectedItem.name} harus dipasang di "${correctSlot?.label}".`, 'error')
      } else {
        setErrors((prev) => prev + 1)
        addLog('Komponen tidak kompatibel dengan slot ini!', 'error')
      }
      setSelectedItem(null)
      return
    }

    // Success!
    setPlacedSlots((prev) => ({ ...prev, [slot.id]: selectedItem.id }))
    addLog(`✅ ${selectedItem.name} berhasil dipasang di ${slot.label}!`, 'success')
    setSelectedItem(null)
  }

  const handleRemoveFromSlot = (slotId) => {
    const placed = getItemById(placedSlots[slotId])

    // If removing CPU, also remove thermal paste and cooler
    if (slotId === 'cpu-socket') {
      setThermalApplied(false)
      if (placedSlots['cooler-mount']) {
        const cooler = getItemById(placedSlots['cooler-mount'])
        setPlacedSlots((prev) => {
          const next = { ...prev }
          delete next['cooler-mount']
          return next
        })
        if (cooler) addLog(`${cooler.name} otomatis dilepas karena CPU dilepas.`, 'info')
      }
    }

    setPlacedSlots((prev) => {
      const next = { ...prev }
      delete next[slotId]
      return next
    })
    if (placed) {
      addLog(`${placed.name} dilepas dari slot.`, 'info')
    }
  }

  const handleBoot = () => {
    setShowBootSuccess(true)
    addLog('Sistem dinyalakan... POST berhasil! ✅', 'success')
    addLog('🚀 Booting ke sistem operasi... Selamat, PC berhasil dirakit!', 'success')
  }

  const handleReset = () => {
    setSelectedItem(null)
    setPlacedSlots({})
    setThermalApplied(false)
    setLogs([])
    setErrors(0)
    setShowBootSuccess(false)
  }

  const score = Math.max(0, 100 - errors * 10)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Header */}
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Simulasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Rakit PC</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Pilih komponen dari toolbox, lalu klik slot pada motherboard untuk memasangnya dengan benar.
        </p>
      </div>

      {/* Main Layout: Motherboard + Toolbox */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* ====== Left: Motherboard Map (2/3) ====== */}
        <div className="lg:col-span-2 relative">
          {/* Efek Cahaya Di Belakang Motherboard */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] bg-cyan-600/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl p-4 sm:p-6 relative overflow-hidden">
            <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Mainboard Blueprint
            </h2>

            {/* Motherboard Board — CSS Grid Layout */}
            <div
              className="relative bg-gradient-to-br from-slate-950 to-slate-900 rounded-xl border border-slate-700/50 overflow-hidden p-4 sm:p-6 shadow-inner"
              style={{ minHeight: '450px' }}
            >
              {/* Blueprint grid lines (Ditingkatkan) */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0ea5e9" strokeWidth="0.5" strokeDasharray="2 2" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* CSS Grid for slots */}
              <div className="relative grid grid-cols-2 gap-4 sm:gap-6" style={{ zIndex: 1 }}>
                
                {/* ---- Kiri Atas: CPU & Cooler ---- */}
                <div className="col-span-1">
                  <div className="flex flex-col gap-3 items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 backdrop-blur-sm">
                    <p className="text-[11px] text-cyan-500 font-mono tracking-widest font-semibold mb-1">CPU ZONE</p>
                    {gridAreas.cpu.map((slot) => {
                      const isFilled = !!placedSlots[slot.id]
                      const placedItem = isFilled ? getItemById(placedSlots[slot.id]) : null
                      const isHighlighted = selectedItem && selectedItem.slotType === slot.id
                      const IconComp = slotIcons[slot.icon] || Cpu

                      return (
                        <button
                          key={slot.id}
                          onClick={() => handleClickSlot(slot)}
                          className={`
                            group relative w-full max-w-[200px] px-3 py-4 rounded-xl border-2 transition-all duration-300
                            ${isFilled
                              ? 'border-emerald-500 bg-emerald-900/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                              : isHighlighted
                              ? 'border-cyan-400 bg-cyan-900/40 shadow-[0_0_20px_rgba(34,211,238,0.5)] animate-pulse'
                              : thermalApplied && slot.id === 'cpu-socket'
                              ? 'border-amber-400 bg-amber-900/40 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                              : 'border-slate-700 border-dashed bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800'
                            }
                          `}
                        >
                          {isFilled ? (
                            <div className="text-center">
                              <IconComp className="w-6 h-6 text-emerald-400 mx-auto mb-2 drop-shadow-md" />
                              <p className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">
                                {placedItem.name}
                              </p>
                              <p className="text-[9px] text-emerald-300 mt-1 truncate">{placedItem.specs}</p>
                              {!showBootSuccess && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveFromSlot(slot.id)
                                  }}
                                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="text-center">
                              <IconComp className={`w-6 h-6 mx-auto mb-2 transition-colors ${isHighlighted ? 'text-cyan-400' : 'text-slate-600'}`} />
                              <p className={`text-[10px] sm:text-xs font-medium leading-tight ${isHighlighted ? 'text-cyan-300' : 'text-slate-500'}`}>{slot.label}</p>
                              {thermalApplied && slot.id === 'cpu-socket' ? (
                                <p className="text-[10px] text-amber-400 mt-1 font-semibold">+ Thermal Paste ✓</p>
                              ) : (
                                <p className="text-[9px] text-slate-600 mt-1 font-mono tracking-widest">[ EMPTY ]</p>
                              )}
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* ---- Kanan Atas: RAM ---- */}
                <div className="col-span-1">
                  <div className="flex flex-col gap-3 items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 backdrop-blur-sm">
                    <p className="text-[11px] text-cyan-500 font-mono tracking-widest font-semibold mb-1">MEMORY ZONE</p>
                    {gridAreas.ram.map((slot) => {
                      const isFilled = !!placedSlots[slot.id]
                      const placedItem = isFilled ? getItemById(placedSlots[slot.id]) : null
                      const isHighlighted = selectedItem && selectedItem.slotType === slot.id
                      const IconComp = slotIcons[slot.icon] || Cpu

                      return (
                        <button
                          key={slot.id}
                          onClick={() => handleClickSlot(slot)}
                          className={`
                            group relative w-full max-w-[200px] px-3 py-4 rounded-xl border-2 transition-all duration-300
                            ${isFilled
                              ? 'border-emerald-500 bg-emerald-900/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                              : isHighlighted
                              ? 'border-cyan-400 bg-cyan-900/40 shadow-[0_0_20px_rgba(34,211,238,0.5)] animate-pulse'
                              : 'border-slate-700 border-dashed bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800'
                            }
                          `}
                        >
                          {isFilled ? (
                            <div className="text-center">
                              <IconComp className="w-6 h-6 text-emerald-400 mx-auto mb-2 drop-shadow-md" />
                              <p className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">
                                {placedItem.name}
                              </p>
                              <p className="text-[9px] text-emerald-300 mt-1 truncate">{placedItem.specs}</p>
                              {!showBootSuccess && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveFromSlot(slot.id)
                                  }}
                                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="text-center">
                              <IconComp className={`w-6 h-6 mx-auto mb-2 transition-colors ${isHighlighted ? 'text-cyan-400' : 'text-slate-600'}`} />
                              <p className={`text-[10px] sm:text-xs font-medium leading-tight ${isHighlighted ? 'text-cyan-300' : 'text-slate-500'}`}>{slot.label}</p>
                              <p className="text-[9px] text-slate-600 mt-1 font-mono tracking-widest">[ EMPTY ]</p>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* ---- Kiri Bawah: PCIe (GPU) ---- */}
                <div className="col-span-1">
                  <div className="flex flex-col gap-3 items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 backdrop-blur-sm">
                    <p className="text-[11px] text-cyan-500 font-mono tracking-widest font-semibold mb-1">PCIe ZONE</p>
                    {gridAreas.pcie.map((slot) => {
                      const isFilled = !!placedSlots[slot.id]
                      const placedItem = isFilled ? getItemById(placedSlots[slot.id]) : null
                      const isHighlighted = selectedItem && selectedItem.slotType === slot.id
                      const IconComp = slotIcons[slot.icon] || Cpu

                      return (
                        <button
                          key={slot.id}
                          onClick={() => handleClickSlot(slot)}
                          className={`
                            group relative w-full max-w-[200px] px-3 py-4 rounded-xl border-2 transition-all duration-300
                            ${isFilled
                              ? 'border-emerald-500 bg-emerald-900/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                              : isHighlighted
                              ? 'border-cyan-400 bg-cyan-900/40 shadow-[0_0_20px_rgba(34,211,238,0.5)] animate-pulse'
                              : 'border-slate-700 border-dashed bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800'
                            }
                          `}
                        >
                          {isFilled ? (
                            <div className="text-center">
                              <IconComp className="w-6 h-6 text-emerald-400 mx-auto mb-2 drop-shadow-md" />
                              <p className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">
                                {placedItem.name}
                              </p>
                              <p className="text-[9px] text-emerald-300 mt-1 truncate">{placedItem.specs}</p>
                              {!showBootSuccess && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveFromSlot(slot.id)
                                  }}
                                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="text-center">
                              <IconComp className={`w-6 h-6 mx-auto mb-2 transition-colors ${isHighlighted ? 'text-cyan-400' : 'text-slate-600'}`} />
                              <p className={`text-[10px] sm:text-xs font-medium leading-tight ${isHighlighted ? 'text-cyan-300' : 'text-slate-500'}`}>{slot.label}</p>
                              <p className="text-[9px] text-slate-600 mt-1 font-mono tracking-widest">[ EMPTY ]</p>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* ---- Kanan Bawah: M.2 (SSD) ---- */}
                <div className="col-span-1">
                  <div className="flex flex-col gap-3 items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800/80 backdrop-blur-sm">
                    <p className="text-[11px] text-cyan-500 font-mono tracking-widest font-semibold mb-1">STORAGE ZONE</p>
                    {gridAreas.m2.map((slot) => {
                      const isFilled = !!placedSlots[slot.id]
                      const placedItem = isFilled ? getItemById(placedSlots[slot.id]) : null
                      const isHighlighted = selectedItem && selectedItem.slotType === slot.id
                      const IconComp = slotIcons[slot.icon] || Cpu

                      return (
                        <button
                          key={slot.id}
                          onClick={() => handleClickSlot(slot)}
                          className={`
                            group relative w-full max-w-[200px] px-3 py-4 rounded-xl border-2 transition-all duration-300
                            ${isFilled
                              ? 'border-emerald-500 bg-emerald-900/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                              : isHighlighted
                              ? 'border-cyan-400 bg-cyan-900/40 shadow-[0_0_20px_rgba(34,211,238,0.5)] animate-pulse'
                              : 'border-slate-700 border-dashed bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800'
                            }
                          `}
                        >
                          {isFilled ? (
                            <div className="text-center">
                              <IconComp className="w-6 h-6 text-emerald-400 mx-auto mb-2 drop-shadow-md" />
                              <p className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">
                                {placedItem.name}
                              </p>
                              <p className="text-[9px] text-emerald-300 mt-1 truncate">{placedItem.specs}</p>
                              {!showBootSuccess && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleRemoveFromSlot(slot.id)
                                  }}
                                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-all shadow-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          ) : (
                            <div className="text-center">
                              <IconComp className={`w-6 h-6 mx-auto mb-2 transition-colors ${isHighlighted ? 'text-cyan-400' : 'text-slate-600'}`} />
                              <p className={`text-[10px] sm:text-xs font-medium leading-tight ${isHighlighted ? 'text-cyan-300' : 'text-slate-500'}`}>{slot.label}</p>
                              <p className="text-[9px] text-slate-600 mt-1 font-mono tracking-widest">[ EMPTY ]</p>
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Board label */}
              <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none" style={{ zIndex: 1 }}>
                <span className="text-[10px] text-slate-500 font-mono tracking-[0.2em] uppercase bg-slate-900/80 px-4 py-1 rounded-full border border-slate-700">PCB Board — ATX Form Factor</span>
              </div>
            </div>
          </div>
        </div>

        {/* ====== Right: Toolbox (1/3) ====== */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl p-4 sm:p-6 h-full flex flex-col">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-700 pb-3">🧰 Inventory</h2>

            <div className="flex flex-col gap-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
              {inventoryItems.map((item) => {
                const isPlaced = Object.values(placedSlots).includes(item.id)
                const isSelected = selectedItem?.id === item.id
                const IconComp =
                  item.type === 'processor' ? Cpu
                  : item.type === 'memory' ? MemoryStick
                  : item.type === 'storage' || item.type === 'storage-sata' ? HardDrive
                  : item.type === 'vga' ? Monitor
                  : item.type === 'cooler' ? Fan
                  : Cpu

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    disabled={isPlaced || showBootSuccess}
                    className={`
                      text-left p-3 rounded-xl border transition-all duration-300 flex items-center gap-4 relative overflow-hidden
                      ${isPlaced
                        ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 opacity-50 grayscale'
                        : isSelected
                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 ring-1 ring-cyan-200 dark:ring-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.2)] transform scale-[1.02]'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-cyan-300 dark:hover:border-cyan-600 hover:bg-slate-50 dark:hover:bg-slate-700/50 shadow-sm'
                      }
                    `}
                  >
                    {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,1)]" />}
                    
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isPlaced ? 'bg-slate-200 dark:bg-slate-700 text-slate-400' :
                      isSelected ? 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400' : 'bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-300'
                    }`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-bold truncate ${isSelected ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-800 dark:text-white'}`}>{item.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.specs}</p>
                      <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-1 uppercase tracking-wide">{item.brand}</p>
                    </div>
                    
                    {isPlaced && (
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 drop-shadow-sm" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Status bar */}
            <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  Core Terpasang
                </span>
                <span className="font-bold font-mono text-cyan-600 dark:text-cyan-400">
                  {filledCoreSlots.length}/{coreSlots.length}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-700 ease-out relative"
                  style={{ width: `${(filledCoreSlots.length / coreSlots.length) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-slate-500">Kesehatan Rakitan:</span>
                <span className={`text-sm font-bold ${score >= 70 ? 'text-emerald-500' : score >= 40 ? 'text-amber-500' : 'text-red-500'}`}>
                  {score}%
                </span>
              </div>
            </div>

            {/* Boot button */}
            {allCorePlaced && !showBootSuccess && (
              <motion.button
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBoot}
                className="w-full mt-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] flex items-center justify-center gap-2"
              >
                <Power className="w-5 h-5" />
                NYALAKAN SISTEM
                <Zap className="w-4 h-4" />
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* ====== Bottom: Terminal Console Log ====== */}
      <div className="bg-[#0D1117] rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
        {/* Terminal Header */}
        <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <Terminal className="w-4 h-4 text-slate-400" />
            <h2 className="text-xs font-mono text-slate-400 tracking-wider">root@tkj-simulator:~</h2>
          </div>
          <div className="flex items-center gap-3">
            {logs.length > 0 && (
              <button
                onClick={() => setLogs([])}
                className="text-[10px] font-mono text-slate-500 hover:text-slate-300 transition-colors uppercase border border-slate-700 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleReset}
              className="text-[10px] font-mono text-red-400 hover:text-red-300 transition-colors uppercase border border-red-900/50 bg-red-500/10 px-2 py-1 rounded"
            >
              System Reset
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 h-[220px] overflow-y-auto font-mono text-sm custom-scrollbar">
          {logs.length === 0 ? (
            <div className="text-slate-500">
              <p>Welcome to PC Build Simulator v1.0.</p>
              <p className="mt-1">Initializing hardware interface...</p>
              <p className="text-emerald-400 mt-2">&gt; System ready. Select an item from the toolbox to begin assembly.</p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {logs
                .slice()
                .reverse()
                .map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-1.5 flex items-start gap-2"
                  >
                    <span className="text-slate-600 select-none">&gt;</span>
                    <span className={`
                      ${log.type === 'error' ? 'text-red-400' 
                        : log.type === 'success' ? 'text-emerald-400' 
                        : log.type === 'warning' ? 'text-amber-400' 
                        : 'text-cyan-300'}
                    `}>
                      {log.message}
                    </span>
                  </motion.div>
                ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Animated boot success overlay */}
      <AnimatePresence>
        {showBootSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 20 }}
              className="bg-slate-900 border border-emerald-500/30 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.2)] text-center max-w-lg w-full relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-500"></div>
              
              <motion.div
                initial={{ rotate: -90, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-emerald-500/10 border-4 border-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                <Power className="w-10 h-10 text-emerald-400" />
              </motion.div>
              
              <h2 className="text-3xl font-extrabold text-white mb-2 tracking-tight">Sistem Online</h2>
              <p className="text-slate-400 mb-8 text-lg">POST berhasil dilewati. PC siap digunakan!</p>
              
              <div className="bg-slate-950 rounded-xl p-4 mb-8 flex justify-center gap-8 border border-slate-800">
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Skor Akhir</p>
                  <p className={`text-3xl font-black font-mono ${score >= 70 ? 'text-emerald-400' : score >= 40 ? 'text-amber-400' : 'text-red-400'}`}>{score}</p>
                </div>
                <div className="w-px bg-slate-800"></div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Kesalahan</p>
                  <p className="text-3xl font-black font-mono text-slate-300">{errors}</p>
                </div>
              </div>

              <button
                onClick={() => setShowBootSuccess(false)}
                className="w-full inline-flex justify-center items-center gap-2 px-6 py-4 rounded-xl bg-white text-slate-900 font-bold text-base hover:bg-slate-200 transition-colors"
              >
                Tutup Simulasi
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Simulasi