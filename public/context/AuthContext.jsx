import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const stored = localStorage.getItem('currentUser')
    if (stored) {
      try {
        setCurrentUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('currentUser')
      }
    }
    setLoading(false)
  }, [])

  // Persist currentUser to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [currentUser])

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const user = users.find(
      (u) => u.email === email && u.password === password
    )
    if (!user) {
      return { success: false, message: 'Email atau password salah' }
    }
    const { password: _, ...userWithoutPassword } = user
    setCurrentUser(userWithoutPassword)
    return { success: true }
  }

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')

    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      return { success: false, message: 'Email sudah terdaftar' }
    }

    const newUser = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))

    // Auto-login after register
    const { password: _, ...userWithoutPassword } = newUser
    setCurrentUser(userWithoutPassword)
    return { success: true }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!currentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext