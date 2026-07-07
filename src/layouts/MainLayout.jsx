import { useState, useEffect } from 'react'
import { NavLink, useLocation, useOutlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, BookOpen, Brain, Monitor, LogIn, UserPlus, LayoutDashboard, LogOut, User, Sun, Moon, Menu, X, Cpu } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx' // Import ThemeContext

const publicNavItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/materi', icon: BookOpen, label: 'Materi' },
  { to: '/quiz', icon: Brain, label: 'Quiz' },
  { to: '/simulasi', icon: Monitor, label: 'Simulasi' },
]

const MainLayout = () => {
  const { currentUser, logout, isAuthenticated } = useAuth()
  
  // Menggunakan ThemeContext alih-alih state lokal
  const { isDark, toggleTheme } = useTheme() 
  
  // State khusus untuk Hamburger Menu di Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const location = useLocation()
  const currentOutlet = useOutlet()

  // Menutup menu mobile otomatis setiap kali pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16"> {/* Memperbesar sedikit tinggi navbar */}
            
            {/* Logo Kiri (RigMaster) */}
            <NavLink to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all">
                <Cpu className="w-5 h-5 text-white" />
              </div>
              <span className="font-black tracking-tight text-lg text-slate-800 dark:text-white transition-colors">
                Rig<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600 dark:from-cyan-400 dark:to-blue-500">Master</span>
              </span>
            </NavLink>

            {/* ======== TAMPILAN DESKTOP (Sembunyi di Mobile) ======== */}
            <div className="hidden md:flex items-center gap-2">
              {publicNavItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-medium'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </NavLink>
              ))}

              <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-2"></div>

              {/* Tombol Dark Mode (Menggunakan toggleTheme) */}
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-500 dark:hover:text-amber-400 transition-all duration-300"
                title="Ganti Tema"
              >
                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>

              <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-2"></div>

              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-all duration-300 ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-bold'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white font-medium'
                      }`
                    }
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </NavLink>
                  <button
                    type="button"
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium transition-colors ml-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 ml-1">
                  <NavLink
                    to="/login"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                  </NavLink>
                </div>
              )}
            </div>

            {/* ======== TAMPILAN MOBILE (Hamburger Menu) ======== */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-center w-9 h-9 rounded-md text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ======== DROPDOWN MOBILE MENU ======== */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1 shadow-inner">
                {publicNavItems.map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg font-medium ${
                        isActive
                          ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </NavLink>
                ))}
                
                <div className="my-3 border-t border-slate-200 dark:border-slate-800"></div>

                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <User className="w-3 h-3 text-slate-500 dark:text-slate-300" />
                      </div>
                      <span className="font-semibold">{currentUser.name}</span>
                    </div>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg font-medium ${
                          isActive
                            ? 'bg-blue-50 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`
                      }
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </NavLink>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 mt-1 text-sm rounded-lg font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <NavLink
                      to="/login"
                      className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold transition-colors"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold transition-all"
                    >
                      <UserPlus className="w-4 h-4" />
                      Register
                    </NavLink>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Pembungkus Animasi Transisi Antar Halaman */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {currentOutlet}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default MainLayout
