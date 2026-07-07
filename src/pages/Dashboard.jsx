import { Navigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { User, Mail, Calendar, Trophy, Brain, BookOpen, Monitor, ChevronRight, Activity, Terminal, ShieldCheck, Zap } from 'lucide-react'

const Dashboard = () => {
  const { currentUser, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const quizHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]')

  const totalQuizzes = quizHistory.length
  const averageScore = totalQuizzes > 0 ? Math.round(quizHistory.reduce((sum, h) => sum + h.score, 0) / totalQuizzes) : 0
  const lastQuiz = totalQuizzes > 0 ? quizHistory[quizHistory.length - 1] : null

  // Update warna skor untuk tema gelap/neon
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]'
    if (score >= 50) return 'text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]'
    return 'text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]'
  }

  const getDifficultyLabel = (difficulty) => {
    const map = { easy: 'Mudah', medium: 'Menengah', hard: 'Sulit' }
    return map[difficulty] || difficulty
  }

  // Update warna level kesulitan bergaya badge cyber
  const getDifficultyColor = (difficulty) => {
    const map = {
      easy: 'bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
      medium: 'bg-amber-900/30 text-amber-400 border border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
      hard: 'bg-red-900/30 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
    }
    return map[difficulty] || 'bg-slate-800 text-slate-400 border border-slate-600'
  }

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-4">
      
      {/* Header Section */}
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Terminal className="w-5 h-5 text-cyan-500" />
            <h2 className="text-xs font-mono text-cyan-500 tracking-[0.2em] uppercase">SELAMAT DATANG KEMBALI</h2>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
            Halo, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{currentUser.name}</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.1)]">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Status: Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        
        {/* Profile Card */}
        <div className="md:col-span-1 bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl border border-slate-800 shadow-xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,211,238,0.15)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] transition-all duration-500 transform group-hover:scale-105">
              <User className="w-10 h-10 text-cyan-400" />
            </div>
            <h3 className="font-extrabold text-lg text-white mb-1">{currentUser.name}</h3>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs text-slate-400 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" /> Authorized
            </div>
            
            <div className="w-full pt-4 border-t border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-slate-800/50">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> 
                <span className="truncate">{currentUser.email}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-slate-800/50">
                <Calendar className="w-3.5 h-3.5 text-slate-500" /> 
                <span>Join: {new Date(currentUser.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Telemetry/Stat Cards */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl p-6 relative overflow-hidden flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-blue-900/30 border border-blue-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Activity className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <p className="text-3xl font-black font-mono text-white tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{totalQuizzes}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Total Ujian</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl p-6 relative overflow-hidden flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-emerald-900/30 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Brain className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <p className="text-3xl font-black font-mono text-white tracking-tighter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{totalQuizzes > 0 ? averageScore : '-'}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Rata-rata Skor</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl p-6 relative overflow-hidden flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-purple-900/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <Trophy className="w-7 h-7 text-purple-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xl font-bold text-white truncate drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{lastQuiz ? lastQuiz.topic : 'N/A'}</p>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Misi Terakhir</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation / Action Hub */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
        {[
          { to: '/materi', icon: BookOpen, title: 'Lanjutkan Belajar', sub: 'Lihat materi hardware PC', color: 'bg-blue-900/20 text-blue-400 border-blue-500/30 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]' },
          { to: '/quiz', icon: Zap, title: 'Ambil Kuis', sub: 'Uji Pemahamanmu', color: 'bg-amber-900/20 text-amber-400 border-amber-500/30 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]' },
          { to: '/simulasi', icon: Monitor, title: 'Simulator Perakitan', sub: 'Masuk ke ruang virtual', color: 'bg-emerald-900/20 text-emerald-400 border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]' },
        ].map(({ to, icon: Icon, title, sub, color }) => (
          <Link key={to} to={to} className={`group flex items-center gap-4 p-5 rounded-2xl bg-slate-900 border transition-all duration-300 hover:-translate-y-1 ${color}`}>
            <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center flex-shrink-0 border border-inherit group-hover:scale-110 transition-transform duration-300">
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-base font-bold text-slate-100">{title}</p>
              <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-inherit transition-colors" />
          </Link>
        ))}
      </div>

      {/* History Data Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-extrabold text-slate-800 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-500" /> Riwayat Kuis
          </h2>
        </div>
        
        {totalQuizzes === 0 ? (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4">
                <Brain className="w-10 h-10 text-slate-500" />
              </div>
              <p className="text-white font-bold text-lg mb-2">Log Data Kosong</p>
              <p className="text-slate-400 text-sm mb-6 max-w-sm mx-auto">Sistem belum merekam riwayat pengujian. Silakan lakukan kalibrasi pemahaman di menu kuis.</p>
              <Link to="/materi" className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-500 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                Akses Database <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden relative">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-950/80 border-b border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Topik</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Parameter Kesulitan</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Skor Akhir</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest hidden sm:table-cell">Tanggal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {quizHistory.slice().reverse().map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50 transition-colors group">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{item.topic}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${getDifficultyColor(item.difficulty)}`}>
                          {getDifficultyLabel(item.difficulty)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-base font-black font-mono ${getScoreColor(item.score)}`}>
                          {item.score}<span className="text-xs text-slate-600 font-sans ml-1">/100</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 font-mono hidden sm:table-cell">
                        {formatDate(item.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
