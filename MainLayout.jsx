import { useState, useEffect } from 'react'
import { NavLink, useLocation, useOutlet } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, BookOpen, Brain, Monitor, LogIn, UserPlus, LayoutDashboard, LogOut, User, Sun, Moon, Menu, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const publicNavItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/materi', icon: BookOpen, label: 'Materi' },
  { to: '/quiz', icon: Brain, label: 'Quiz' },
  { to: '/simulasi', icon: Monitor, label: 'Simulasi' },
]

const MainLayout = () => {
  const { currentUser, logout, isAuthenticated } = useAuth()
  const [isDark, setIsDark] = useState(true)
  
  // State khusus untuk Hamburger Menu di Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const location = useLocation()
  const currentOutlet = useOutlet()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  // Menutup menu mobile otomatis setiap kali pindah halaman
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            {/* Logo Kiri */}
            <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Monitor className="w-5 h-5 text-indigo-600 dark:text-indigo-500 transition-colors" />
             <span className="font-black tracking-tight">
  Rig<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">Master</span>
</span>
            </NavLink>

            {/* ======== TAMPILAN DESKTOP (Sembunyi di Mobile) ======== */}
            <div className="hidden md:flex items-center gap-2">
              {publicNavItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-all duration-300 ${
                      isActive
                        ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </NavLink>
              ))}

              <div className="w-px h-5 bg-slate-300 dark:bg-slate-700 mx-1"></div>

              {/* Tombol Dark Mode */}
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                className="flex items-center justify-center w-8 h-8 rounded-md text-amber-500 dark:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                title="Ganti Tema"
              >
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
              </button>

              {isAuthenticated ? (
                <>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-all duration-300 ${
                        isActive
                          ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`
                    }
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </NavLink>
                  <button
                    type="button"
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Register</span>
                  </NavLink>
                </>
              )}
            </div>

            {/* ======== TAMPILAN MOBILE (Hamburger Menu) ======== */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                className="flex items-center justify-center w-8 h-8 rounded-md text-amber-500 dark:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
              >
                {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
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
              <div className="px-4 py-3 space-y-1">
                {publicNavItems.map(({ to, icon: Icon, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </NavLink>
                ))}
                
                <div className="my-2 border-t border-slate-200 dark:border-slate-800"></div>

                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Halo, {currentUser.name}
                    </div>
                    <NavLink
                      to="/dashboard"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </NavLink>
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="flex items-center gap-2 px-3 py-2 text-sm rounded-md bg-indigo-600 text-white hover:bg-indigo-500 mt-2"
                    >
                      <UserPlus className="w-4 h-4" />
                      Register
                    </NavLink>
                  </>
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
