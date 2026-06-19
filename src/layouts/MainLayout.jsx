import { useState, useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Home, BookOpen, Brain, Monitor, LogIn, UserPlus, LayoutDashboard, LogOut, User, Sun, Moon } from 'lucide-react'
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

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            
            <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Monitor className="w-5 h-5 text-indigo-600 dark:text-indigo-500 transition-colors" />
              <span className="font-semibold text-lg text-slate-800 dark:text-white transition-colors">PC Quest Pro</span>
            </NavLink>

            <div className="flex items-center gap-1 sm:gap-2">
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
                  <span className="hidden sm:inline">{label}</span>
                </NavLink>
              ))}

              <NavLink
                to={isAuthenticated ? '/dashboard' : '/login'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-all duration-300 ${
                    isActive
                      ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  }`
                }
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </NavLink>

              <button
                onClick={() => setIsDark(!isDark)}
                className="flex items-center justify-center w-8 h-8 ml-1 rounded-md text-amber-500 dark:text-indigo-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300"
                title="Ganti Tema"
              >
                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-amber-500" />}
              </button>

              {isAuthenticated ? (
                <>
                  <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <User className="w-4 h-4" />
                    <span className="truncate max-w-[100px]">Halo, {currentUser.name}</span>
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                        isActive
                          ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`
                    }
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Login</span>
                  </NavLink>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                        isActive
                          ? 'bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 font-medium'
                          : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm dark:shadow-indigo-500/20'
                      }`
                    }
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Register</span>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
