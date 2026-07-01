import { useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  ChevronDown,
  ImageIcon,
  Cpu,
  Monitor,
  MemoryStick,
  CircuitBoard,
  HardDrive,
  Zap,
  Box,
  Play,
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

const DetailMateri = () => {
  const { id } = useParams();
  const [activeSubIndex, setActiveSubIndex] = useState(0);
  const [imageKey, setImageKey] = useState(0);
  const [openDetails, setOpenDetails] = useState({});

  const component = hardwareData.find((item) => item.id === id);

  useEffect(() => {
    setActiveSubIndex(0);
    setImageKey((prev) => prev + 1);
    setOpenDetails({});
    window.scrollTo(0, 0);
  }, [id]);

  if (!component) {
    return <Navigate to="/materi" replace />;
  }

  const IconComponent = iconMap[component.icon] || Box;
  const activeSub = component.subMaterials[activeSubIndex];

  const handleSubChange = (index) => {
    setActiveSubIndex(index);
    setImageKey((prev) => prev + 1);
    setOpenDetails({});
  };

  const toggleDetail = (detailIndex) => {
    setOpenDetails((prev) => ({
      ...prev,
      [detailIndex]: !prev[detailIndex],
    }));
  };

  return (
    <div>
      {/* ---- Breadcrumbs ---- */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500 mb-6 px-2">
        <Link
          to="/materi"
          className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors font-medium"
        >
          Materi
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-700 dark:text-slate-200 font-semibold truncate">
          {component.name}
        </span>
      </nav>

      {/* ---- Two-Column Layout ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ====== Sidebar Kiri (1/4) ====== */}
        <aside className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden sticky top-20">
            
            {/* Header Sidebar (Diperbarui dengan Gradasi Cyber) */}
            <div className="p-5 border-b border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-900">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                  <IconComponent className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-extrabold text-white truncate tracking-wide">
                    {component.name}
                  </h3>
                  <p className="text-xs text-indigo-200 font-light mt-0.5">
                    {component.subMaterials.length} sub-materi
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Navigasi Sub-Materi */}
            <nav className="p-3 flex flex-col gap-1">
              {component.subMaterials.map((sub, index) => (
                <button
                  key={index}
                  onClick={() => handleSubChange(index)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-all duration-300 ${
                    activeSubIndex === index
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/20 text-indigo-700 dark:text-indigo-300 font-bold shadow-sm ring-1 ring-indigo-200 dark:ring-indigo-700 transform scale-[1.02]"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200 font-medium"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      activeSubIndex === index
                        ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-[0_0_10px_rgba(124,58,237,0.4)]"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
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
          {/* 1. Gambar Sub-Materi */}
          <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mb-6 relative group">
            {/* Latar Belakang Tekstur Cyber saat memuat gambar */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay z-0"></div>
            
            <div className="relative z-10 w-full max-h-[450px] overflow-hidden flex items-center justify-center p-4">
              <img
                key={imageKey}
                src={activeSub.imageUrl}
                alt={activeSub.title}
                className="w-full max-h-[400px] object-contain animate-fadeIn drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement
                    .querySelector(".fallback")
                    .classList.remove("hidden");
                }}
              />
              <div className="fallback hidden w-full h-48 sm:h-64 lg:h-[400px] bg-slate-800/50 flex flex-col items-center justify-center rounded-xl">
                <ImageIcon className="w-12 h-12 text-slate-600 mb-3" />
                <span className="text-sm font-medium text-slate-400">
                  Visualisasi {activeSub.title} Belum Tersedia
                </span>
              </div>
            </div>
          </div>

          {/* 2. Teks Utama + Judul */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 mb-6">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-700">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white text-base font-extrabold shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                {activeSubIndex + 1}
              </span>
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
                  {activeSub.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
                  Modul {activeSubIndex + 1} dari {component.subMaterials.length}
                </p>
              </div>
            </div>

            <div className="prose prose-slate dark:prose-invert prose-lg max-w-none">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {activeSub.content}
              </p>
            </div>

            {/* Progress Bar (Diperbarui dengan Gradasi Neon) */}
            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Progres Belajar Komponen
                </span>
                <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                  {Math.round(((activeSubIndex + 1) / component.subMaterials.length) * 100)}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full transition-all duration-700 ease-out relative"
                  style={{
                    width: `${((activeSubIndex + 1) / component.subMaterials.length) * 100}%`,
                  }}
                >
                  <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Accordion: Detail Points */}
          {activeSub.details && activeSub.details.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 mb-6">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-2">
                <span className="text-xl">📋</span> Spesifikasi Teknis
              </h3>
              <div className="flex flex-col gap-3">
                {activeSub.details.map((detail, index) => {
                  const isOpen = !!openDetails[index];
                  return (
                    <div
                      key={index}
                      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                        isOpen 
                          ? "border-indigo-200 dark:border-indigo-800/50 shadow-md shadow-indigo-100 dark:shadow-none" 
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                    >
                      <button
                        onClick={() => toggleDetail(index)}
                        className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${
                          isOpen ? "bg-indigo-50/50 dark:bg-indigo-900/20" : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
                        }`}
                      >
                        <span className={`text-base font-bold ${isOpen ? "text-indigo-700 dark:text-indigo-300" : "text-slate-800 dark:text-white"}`}>
                          {detail.name}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-5 pb-5 pt-2 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
                          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                            {detail.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Video Player */}
          {activeSub.videoUrl && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-8 mb-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  Video Penjelasan
                </h3>
              </div>
              <div className="relative w-full overflow-hidden rounded-xl border-4 border-slate-900 shadow-xl bg-black">
                <div className="aspect-video">
                  <iframe
                    src={activeSub.videoUrl}
                    title={`Video: ${activeSub.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 5. Navigasi Previous / Next */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between mt-8 gap-4">
            <button
              onClick={() => handleSubChange(Math.max(0, activeSubIndex - 1))}
              disabled={activeSubIndex === 0}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Sebelumnya
            </button>

            <button
              onClick={() =>
                handleSubChange(
                  Math.min(
                    component.subMaterials.length - 1,
                    activeSubIndex + 1,
                  ),
                )
              }
              disabled={activeSubIndex === component.subMaterials.length - 1}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transform hover:-translate-y-0.5"
            >
              Selanjutnya
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DetailMateri;