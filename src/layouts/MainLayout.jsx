import { NavLink, Outlet } from 'react-router-dom'
import { Home, BookOpen, Brain, Monitor, LogIn, UserPlus, LayoutDashboard } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/materi', icon: BookOpen, label: 'Materi' },
  { to: '/quiz', icon: Brain, label: 'Quiz' },
  { to: '/simulasi', icon: Monitor, label: 'Simulasi' },
  { to: '/login', icon: LogIn, label: 'Login' },
  { to: '/register', icon: UserPlus, label: 'Register' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
]

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <Monitor className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold text-lg text-slate-800">E-Learning TKJ</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              {navItems.map(({ to, icon: Icon, label }) => (
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