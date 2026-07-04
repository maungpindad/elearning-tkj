import { Link } from "react-router-dom";
import {
  ArrowRight,
  Cpu,
  Monitor,
  MemoryStick,
  CircuitBoard,
  HardDrive,
  Zap,
  Box,
  Keyboard,
  Tv,
} from "lucide-react";
import hardwareData from "../data/hardwareData";

const iconMap = {
  Cpu,
  Monitor,
  MemoryStick,
  CircuitBoard,
  HardDrive,
  Zap,
  Box,
  Keyboard,
  Tv,
};

const getThemeStyle = (id) => {
  const safeId = id?.toLowerCase() || "";

  if (safeId.includes("cpu") || safeId.includes("gpu") || safeId.includes("ram") || safeId.includes("motherboard")) {
    return {
      wrapper: "from-slate-900 via-indigo-950 to-purple-900 border-indigo-500/30 shadow-indigo-900/20",
      iconBg: "bg-indigo-500/20 text-indigo-300",
      button: "bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.4)]",
      textDesc: "text-indigo-200/80",
    };
  } else if (safeId.includes("storage") || safeId.includes("psu") || safeId.includes("casing")) {
    return {
      wrapper: "from-slate-800 via-slate-900 to-black border-slate-600/30 shadow-slate-900/40",
      iconBg: "bg-slate-700/50 text-slate-300 border border-slate-600/50",
      button: "bg-slate-700 text-white hover:bg-slate-600 shadow-[0_0_15px_rgba(0,0,0,0.5)]",
      textDesc: "text-slate-400",
    };
  } else {
    // Kategori Input & Output
    return {
      wrapper: "from-slate-900 via-amber-950 to-orange-950 border-orange-500/30 shadow-orange-900/20",
      iconBg: "bg-orange-500/20 text-orange-300",
      button: "bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-500 hover:to-red-500 shadow-[0_0_15px_rgba(234,88,12,0.4)]",
      textDesc: "text-orange-200/70",
    };
  }
};

const Materi = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      {/* Header */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          Materi Pembelajaran
        </h1>
        <p className="mt-4 text-slate-500 dark:text-slate-400 text-lg">
          Pelajari setiap komponen hardware PC secara mendalam. Pilih komponen
          yang ingin kamu kuasai.
        </p>
      </div>

      {/* Grid List Materi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {hardwareData.map((item) => {
          const IconComponent = iconMap[item.icon] || Box;
          const theme = getThemeStyle(item.id);
          
          // Deteksi gambar otomatis yang lebih pintar
          const safeId = item.id?.toLowerCase() || "";
          let imageUrl = "/images/box.png"; // Fallback bawaan
          
          if (safeId.includes("cpu")) imageUrl = "/images/cpu.png";
          else if (safeId.includes("gpu")) imageUrl = "/images/gpu.png";
          else if (safeId.includes("ram")) imageUrl = "/images/ram.png";
          else if (safeId.includes("motherboard")) imageUrl = "/images/motherboard.png";
          else if (safeId.includes("storage")) imageUrl = "/images/storage.png";
          else if (safeId.includes("psu")) imageUrl = "/images/psu.png";
          else if (safeId.includes("casing")) imageUrl = "/images/casing.png";
          else if (safeId.includes("input")) imageUrl = "/images/input.png";
          else if (safeId.includes("output")) imageUrl = "/images/output.png";

          return (
            <div
              key={item.id}
              className={`group relative rounded-2xl border bg-gradient-to-br ${theme.wrapper} p-6 shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col overflow-hidden`}
            >
              {/* Latar Belakang Tekstur Siber */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none z-0"></div>

              {/* GAMBAR 3D KOMPONEN */}
              <div className="absolute -right-2 -top-2 w-36 h-36 opacity-40 group-hover:opacity-100 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 pointer-events-none z-0">
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-full h-full object-contain drop-shadow-2xl filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  onError={(e) => { e.target.style.opacity = '0' }} 
                />
              </div>

              {/* Konten */}
              <div className="relative z-10 flex flex-col h-full">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${theme.iconBg} mb-5 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">
                  {item.name}
                </h3>
                <p className={`text-sm leading-relaxed mb-6 flex-grow ${theme.textDesc}`}>
                  {item.shortDescription}
                </p>

                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-white/50 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      {item.subMaterials.length} sub-materi
                    </span>
                    <Link
                      to={`/materi/${item.id}`}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${theme.button}`}
                    >
                      Pelajari
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Materi;