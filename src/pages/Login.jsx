import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { KeyRound, Mail } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('demo@mfpulse.com')
  const [password, setPassword] = useState('password123')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      alert('Login Failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-dark-950 px-4">
      <div className="card max-w-md w-full p-8 shadow-2xl relative border-dark-800">
        <div className="absolute top-0 inset-x-0 h-1.5 bg-primary-600"></div>
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-4 text-white text-3xl font-black shadow-lg shadow-primary-500/20">
            MF
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Access Command Center</h2>
          <p className="text-dark-400 mt-1.5 text-sm">Real-time Mutual Fund Portfolio Analytics</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-dark-400 mb-1.5 block">Email Address</label>
            <div className="relative">
              <Mail className="w-5 h-5 text-dark-500 absolute left-3.5 top-3.5" />
              <input 
                type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="input pl-11" 
                required 
              />
            </div>
          </div>
          
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-dark-400 mb-1.5 block">Security Password</label>
            <div className="relative">
              <KeyRound className="w-5 h-5 text-dark-500 absolute left-3.5 top-3.5" />
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="input pl-11" 
                required 
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base font-semibold mt-4 shadow-lg shadow-primary-600/10">
            {loading ? 'Initializing Authentication...' : 'Enter Dashboard'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-dark-800/80 text-center text-xs text-dark-500">
          <span>Demo Credentials: </span>
          <code className="bg-dark-950 px-2 py-1 rounded text-primary-500 font-bold border border-dark-800">demo@mfpulse.com</code>
        </div>
      </div>
    </div>
  )
}
