import { Link } from 'react-router-dom'
import { BookOpen, Brain, Monitor, ArrowRight, Zap, Shield, Cpu } from 'lucide-react'

const features = [
  {
    icon: BookOpen,
    title: 'Materi Terstruktur',
    description:
      'Pelajari komponen PC melalui alur belajar yang dirancang bertahap. Materi disajikan secara sistematis untuk menjembatani pemahaman dasar hingga penguasaan teknis tingkat lanjut.',
    color: 'from-blue-500 to-cyan-400',
    shadow: 'shadow-cyan-500/20',
    borderHover: 'hover:border-cyan-400',
  },
  {
    icon: Brain,
    title: 'Evaluasi Presisi',
    description:
      'Uji ketangkasan logikamu melalui sistem kuis komprehensif. Dapatkan umpan balik (feedback) instan untuk mengukur sejauh mana sistem pengetahuanmu telah terkalibrasi.',
    color: 'from-emerald-400 to-teal-500',
    shadow: 'shadow-emerald-500/20',
    borderHover: 'hover:border-emerald-400',
  },
  {
    icon: Monitor,
    title: 'Simulator Virtual',
    description:
      'Terapkan teori ke dalam praktik tanpa risiko kerusakan komponen fisik. Masuk ke dalam simulator perakitan interaktif dan rasakan pengalaman nyata merakit layaknya teknisi profesional.',
    color: 'from-purple-500 to-indigo-500',
    shadow: 'shadow-purple-500/20',
    borderHover: 'hover:border-purple-400',
  },
]

const Homepage = () => {
  return (
    <div className="-mt-8 pb-20">
      {/* Hero Section */}
      <section className="relative w-full max-w-7xl mx-auto mt-6 px-4 sm:px-6 lg:px-8">
        
        {/* KOTAK BACKGROUND HERO */}
        <div className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center rounded-[2.5rem] bg-slate-900 overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Warna Gradasi & Tekstur */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950"></div>
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          
          {/* Efek Cahaya / Glowing Blobs di dalam kotak */}
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600 rounded-full mix-blend-screen filter blur-[150px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>

          {/* KONTEN TEKS & TOMBOL */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto px-4 py-20">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8 shadow-lg backdrop-blur-sm">
              <Zap className="w-4 h-4" /> PORTAL EDUKASI HARDWARE PC
            </div>

            {/* Judul */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6 tracking-tighter">
              Kuasai Hardware <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                Tanpa Batas
              </span>
            </h1>

            {/* Deskripsi */}
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed">
              Arsitektur pembelajaran interaktif untuk mendalami anatomi komputer. Dirancang khusus untuk memandu siswa TKJ menguasai perakitan PC dari dasar hingga mahir.
            </p>

            {/* GRUP TOMBOL */}
            <div className="relative z-40 flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
              
              {/* Tombol Mulai Belajar */}
              <Link to="/materi" className="group px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer">
                <Cpu className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                INISIALISASI MATERI
              </Link>

              {/* Tombol Ikuti Kuis */}
              <Link to="/quiz" className="group px-8 py-4 rounded-2xl font-bold text-slate-300 bg-slate-800/50 backdrop-blur-md border border-slate-700 hover:bg-slate-700 hover:text-white transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer">
                <Shield className="w-5 h-5 group-hover:scale-110 transition-transform" />
                UJI SISTEM (KUIS)
              </Link>
            </div>
          </div>
        </div>

        {/* GAMBAR 3D MELAYANG */}
        
        {/* Gambar Komponen Kiri (Motherboard) */}
        <div className="absolute left-[-5%] top-[45%] transform -translate-y-1/2 w-64 md:w-80 hidden lg:block z-20 pointer-events-none animate-[bounce_7s_infinite_ease-in-out]">
           <img src="https://wallpapers.com/images/hd/high-end-gaming-motherboard-r-o-g-series-8iimqojmib52swwf.png" alt="Motherboard 3D" className="w-full h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)]" />
        </div>

        {/* Gambar Komponen Kanan (GPU) */}
        <div className="absolute right-[-4%] bottom-[-5%] w-60 md:w-[20rem] hidden lg:block z-20 pointer-events-none animate-[bounce_6s_infinite_reverse_ease-in-out]">
           <img src="https://dlcdnwebimgs.asus.com/files/media/FFD3278D-2D22-419A-8EA4-7D97CD90D4FE/v2/img/kv/pd.png" alt="GPU 3D" className="w-full h-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)]" />
        </div>

      </section>

      {/* ---- Features / Arsitektur Pembelajaran Section ---- */}
      <section className="mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/20 rounded-full blur-[50px] pointer-events-none"></div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800 dark:text-white tracking-tight relative z-10">
            Arsitektur <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Pembelajaran</span>
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg relative z-10">
            Tiga pilar utama yang diintegrasikan untuk mempercepat proses pemahaman hardware PC dari teori hingga praktik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description, color, shadow, borderHover }, index) => (
            <div
              key={index}
              className={`group relative bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-default ${borderHover}`}
            >
              {/* Latar belakang efek cahaya saat di-hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl rounded-full -mr-10 -mt-10 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${color} ${shadow} mb-8 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* PERBAIKAN: Warna judul saat di-hover diganti menjadi warna solid yang terlihat di mode Terang & Gelap */}
                <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mb-4 tracking-tight group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                  {title}
                </h3>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                  {description}
                </p>
              </div>

              {/* Garis aksen bawah */}
              <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${color} group-hover:w-full transition-all duration-500 ease-out`}></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Homepage
