import { NavLink, Outlet } from 'react-router-dom'
import { Home, BookOpen, Brain, Monitor, LogIn, UserPlus, LayoutDashboard, LogOut, User, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

const publicNavItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/materi', icon: BookOpen, label: 'Materi' },
  { to: '/quiz', icon: Brain, label: 'Quiz' },
  { to: '/simulasi', icon: Monitor, label: 'Simulasi' },
]

const MainLayout = () => {
  const { currentUser, logout, isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* Navbar */}
      <nav className="bg-white dark:bg-slate-900 shadow-sm dark:shadow-slate-800/30 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo — responsive text: "E-TKJ" on mobile, "E-Learning TKJ" on desktop */}
            <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0 whitespace-nowrap">
              <Monitor className="w-5 h-5 text-indigo-600 flex-shrink-0" />
              <span className="font-semibold text-lg text-slate-800 dark:text-white">
                <span>E-</span>
                <span className="hidden sm:inline">Learning </span>
                <span>TKJ</span>
              </span>
            </NavLink>

            {/* Nav Links */}
            <div className="flex items-center gap-0.5 sm:gap-2 overflow-x-auto scrollbar-none">
              {publicNavItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{label}</span>
                </NavLink>
              ))}

              {/* Dashboard Link */}
              <NavLink
                to={isAuthenticated ? '/dashboard' : '/login'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
                  }`
                }
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </NavLink>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                <span className="relative w-5 h-5">
                  <Sun
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                      theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
                    }`}
                  />
                  <Moon
                    className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${
                      theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                    }`}
                  />
                </span>
              </button>

              {/* Auth-dependent links */}
              {isAuthenticated ? (
                <>
                  {/* User greeting */}
                  <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-500 dark:text-slate-400">
                    <User className="w-4 h-4" />
                    <span className="truncate max-w-[100px]">Halo, {currentUser.name}</span>
                  </span>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 dark:text-red-400 transition-colors"
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
                          ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium'
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200'
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
                          ? 'bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-medium'
                          : 'bg-slate-600 text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500'
                      }`}
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

      {/* Main Content */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout