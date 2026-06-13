import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight, ImageIcon, Cpu, Monitor, MemoryStick, CircuitBoard, HardDrive, Zap, Box } from 'lucide-react'
import hardwareData from '../data/hardwareData'

const iconMap = {
  Cpu,
  Monitor,
  MemoryStick,
  CircuitBoard,
  HardDrive,
  Zap,
  Box,
}

const DetailMateri = () => {
  const { id } = useParams()
  const [activeSubIndex, setActiveSubIndex] = useState(0)
  const [imageKey, setImageKey] = useState(0)

  const component = hardwareData.find((item) => item.id === id)

  useEffect(() => {
    setActiveSubIndex(0)
    setImageKey((prev) => prev + 1)
    window.scrollTo(0, 0)
  }, [id])

  if (!component) {
    return <Navigate to="/materi" replace />
  }

  const IconComponent = iconMap[component.icon] || Box
  const activeSub = component.subMaterials[activeSubIndex]

  const handleSubChange = (index) => {
    setActiveSubIndex(index)
    setImageKey((prev) => prev + 1)
  }

  return (
    <div>
      {/* ---- Breadcrumbs ---- */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
        <Link to="/materi" className="hover:text-slate-600 transition-colors">
          Materi
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-600 font-medium truncate">{component.name}</span>
      </nav>

      {/* ---- Two-Column Layout ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ====== Sidebar Kiri (1/4) ====== */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-20">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-slate-50">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-slate-800 truncate">
                    {component.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {component.subMaterials.length} sub-materi
                  </p>
                </div>
              </div>
            </div>

            {/* Sub-Materi List */}
            <nav className="p-3 flex flex-col gap-1">
              {component.subMaterials.map((sub, index) => (
                <button
                  key={index}
                  onClick={() => handleSubChange(index)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                    activeSubIndex === index
                      ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm ring-1 ring-indigo-100'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                      activeSubIndex === index
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                    }`}
                  >
                    {index + 1}
                  </span>
                  <span className="truncate leading-tight">{sub.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* ====== Konten Kanan (3/4) ====== */}
        <main className="lg:col-span-3">
          {/* Gambar Sub-Materi (Dinamis) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
            <div className="relative w-full max-h-[400px] overflow-hidden">
              <img
                key={imageKey}
                src={activeSub.imageUrl}
                alt={activeSub.title}
                className="w-full max-h-[400px] object-cover animate-fadeIn"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.querySelector('.fallback').classList.remove('hidden')
                }}
              />
              <div className="fallback hidden w-full h-48 sm:h-64 lg:h-[400px] bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="text-center">
                  <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <span className="text-sm text-slate-400">Gambar {activeSub.title}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Judul + Konten */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* Indikator progress */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold shadow-sm">
                {activeSubIndex + 1}
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                  {activeSub.title}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {activeSubIndex + 1} dari {component.subMaterials.length} sub-materi
                </p>
              </div>
            </div>

            {/* Konten Teks */}
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed whitespace-pre-line text-[15px]">
                {activeSub.content}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Progres Sub-Materi</span>
                <span className="text-xs font-medium text-slate-600">
                  {Math.round(((activeSubIndex + 1) / component.subMaterials.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${((activeSubIndex + 1) / component.subMaterials.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Navigasi Previous / Next */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => handleSubChange(Math.max(0, activeSubIndex - 1))}
              disabled={activeSubIndex === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Sebelumnya
            </button>

            <Link
              to="/materi"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              Kembali ke Daftar Materi
            </Link>

            <button
              onClick={() =>
                handleSubChange(Math.min(component.subMaterials.length - 1, activeSubIndex + 1))
              }
              disabled={activeSubIndex === component.subMaterials.length - 1}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm shadow-indigo-200"
            >
              Selanjutnya
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

          {/* Mobile back link */}
          <div className="flex justify-center mt-4 sm:hidden">
            <Link
              to="/materi"
              className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Daftar Materi
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DetailMateri