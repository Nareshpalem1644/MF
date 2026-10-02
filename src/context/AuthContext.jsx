import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('mf_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 600))
    const userData = {
      id: 'usr_007',
      name: email.split('@')[0].toUpperCase(),
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    }
    localStorage.setItem('mf_user', JSON.stringify(userData))
    setUser(userData)
    return userData
  }

  const logout = () => {
    localStorage.removeItem('mf_user')
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-dark-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
