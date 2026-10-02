import { usePortfolio } from '../context/PortfolioContext'
import { useFundData } from '../hooks/useFundData'
import { fundApi } from '../services/api'
import StatCard from '../components/UI/StatCard'
import PortfolioAllocation from '../components/Charts/PortfolioAllocation'
import FundCard from '../components/UI/FundCard'
import { useNavigate } from 'react-router-dom'
import { PlusCircle, Compass, LineChart, Cpu } from 'lucide-react'

export default function Dashboard() {
  const { holdings } = usePortfolio()
  const navigate = useNavigate()
  const { data: funds, loading } = useFundData('dashboard_funds', fundApi.getAll, { mockData: [] })

  const totalValue = holdings.reduce((sum, h) => sum + h.units * h.currentNav, 0)
  const invested = holdings.reduce((sum, h) => sum + h.invested, 0)
  const pl = totalValue - invested
  const changePct = invested > 0 ? (pl / invested) * 100 : 0

  return (
    <div className="p-8 space-y-8 bg-dark-950 min-h-screen">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Financial Command Center</h1>
          <p className="text-dark-400 mt-1.5 font-medium">Real-time status updates, portfolio tracking & smart recommendations</p>
        </div>
        <button onClick={() => navigate('/explore')} className="btn-primary gap-2 py-2.5">
          <PlusCircle className="w-5 h-5" /> Discover Funds
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Portfolio Valuation" value={totalValue.toLocaleString('en-IN')} change={changePct} />
        <StatCard title="Invested Liquidity" value={invested.toLocaleString('en-IN')} />
        <StatCard title="Net Cumulative Profits" value={pl.toLocaleString('en-IN')} change={changePct} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 card p-6 bg-dark-900 border-dark-800 flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
              <LineChart className="w-5 h-5 text-primary-500" /> Asset Distribution
            </h3>
            <p className="text-xs text-dark-400 mt-1">Allocation across equity, hybrid, debt funds</p>
          </div>
          <PortfolioAllocation holdings={holdings} />
        </div>

        <div className="card p-6 bg-dark-900 border-dark-800 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-white tracking-tight mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary-500 animate-pulse" /> High Return Recs
            </h3>
            <div className="space-y-3">
              {loading ? (
                <div className="h-40 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
                </div>
              ) : (
                funds.slice(0, 3).map(f => (
                  <FundCard key={f.isin} fund={f} variant="compact" onClick={() => navigate(`/fund/${f.isin}`)} />
                ))
              )}
            </div>
          </div>
          <button onClick={() => navigate('/explore')} className="w-full btn-secondary text-xs mt-4 py-2.5 gap-2">
            <Compass className="w-4 h-4" /> Explore All Available Funds
          </button>
        </div>
      </div>
    </div>
  )
}
