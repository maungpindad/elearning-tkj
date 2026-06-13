import { NavLink, Outlet } from 'react-router-dom'
import { Home, BookOpen, Brain, Monitor, LogIn, UserPlus, LayoutDashboard, LogOut, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const publicNavItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/materi', icon: BookOpen, label: 'Materi' },
  { to: '/quiz', icon: Brain, label: 'Quiz' },
  { to: '/simulasi', icon: Monitor, label: 'Simulasi' },
]

const MainLayout = () => {
  const { currentUser, logout, isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Monitor className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-lg text-slate-800">E-Learning TKJ</span>
            </NavLink>

            {/* Nav Links */}
            <div className="flex items-center gap-1 sm:gap-2">
              {publicNavItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md transition-colors ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
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
                      ? 'bg-indigo-50 text-indigo-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`
                }
              >
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </NavLink>

              {/* Auth-dependent links */}
              {isAuthenticated ? (
                <>
                  {/* User greeting */}
                  <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-500">
                    <User className="w-4 h-4" />
                    <span className="truncate max-w-[100px]">Halo, {currentUser.name}</span>
                  </span>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-md text-red-600 hover:bg-red-50 transition-colors"
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
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
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
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'bg-slate-600 text-white bg-indigo-600 hover:bg-indigo-500'
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