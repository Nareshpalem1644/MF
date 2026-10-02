import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import { LayoutDashboard, Compass, LogOut } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import FundExplorer from './pages/FundExplorer'
import FundDetail from './pages/FundDetail'
import Login from './pages/Login'

function Sidebar() {
  const { logout, user } = useAuth()
  const location = useLocation()

  return (
    <aside className="w-64 bg-dark-900 border-r border-dark-800 flex flex-col justify-between h-screen sticky top-0">
      <div className="p-6 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-500/20">
            MF
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight block">MF PULSE</span>
            <span className="text-[10px] font-bold text-primary-500 uppercase tracking-widest">command center</span>
          </div>
        </div>
        
        <nav className="space-y-1.5">
          <Link 
            to="/dashboard" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition duration-200 ${
              location.pathname === '/dashboard' ? 'bg-primary-950 text-primary-500 border border-primary-900' : 'text-dark-300 hover:bg-dark-800'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link 
            to="/explore" 
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition duration-200 ${
              location.pathname === '/explore' ? 'bg-primary-950 text-primary-500 border border-primary-900' : 'text-dark-300 hover:bg-dark-800'
            }`}
          >
            <Compass className="w-5 h-5" /> Explore Funds
          </Link>
        </nav>
      </div>

      <div className="p-6 border-t border-dark-800">
        <div className="flex items-center gap-3 mb-5">
          <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full bg-dark-800 border border-dark-700" />
          <div>
            <p className="font-bold text-sm tracking-tight text-white">{user?.name}</p>
            <p className="text-xs text-dark-500 font-medium">{user?.email}</p>
          </div>
        </div>
        <button onClick={logout} className="w-full btn-secondary text-red-400 hover:text-red-300 hover:bg-red-950/20 hover:border-red-900 flex items-center justify-center gap-2 py-2.5">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </aside>
  )
}

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? (
    <div className="flex min-h-screen bg-dark-950">
      <Sidebar /> 
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  ) : (
    <Navigate to="/login" />
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/explore" element={<PrivateRoute><FundExplorer /></PrivateRoute>} />
      <Route path="/fund/:isin" element={<PrivateRoute><FundDetail /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  )
}
