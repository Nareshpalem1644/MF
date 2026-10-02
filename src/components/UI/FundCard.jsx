import { usePortfolio } from '../../context/PortfolioContext'
import { Star } from 'lucide-react'

export default function FundCard({ fund, variant = 'default', onClick }) {
  const { isWatching, toggleWatchlist } = usePortfolio()
  const watching = isWatching(fund.isin)

  if (variant === 'compact') {
    return (
      <button onClick={onClick} className="w-full text-left flex items-center gap-4 p-3 rounded-lg bg-dark-950 hover:bg-dark-800 transition duration-200 border border-dark-800 hover:border-dark-700">
        <div className="w-10 h-10 rounded-lg bg-primary-900/30 border border-primary-800 flex items-center justify-center text-primary-500 font-extrabold text-lg">
          {fund.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white truncate">{fund.name}</h4>
          <p className="text-xs text-dark-400 font-medium truncate">{fund.category} • Return: {fund.returns['3y']}%</p>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold text-white block">?{fund.nav}</span>
          <span className="text-[10px] text-green-500 font-bold bg-green-950 px-1.5 py-0.5 rounded">3Y Return</span>
        </div>
      </button>
    )
  }

  return (
    <div className="card hover:border-dark-700 transition duration-300 flex flex-col justify-between">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-900/40 border border-primary-800/60 flex items-center justify-center text-primary-500 font-black text-xl">
              {fund.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-white text-base leading-tight line-clamp-1">{fund.name}</h3>
              <p className="text-xs text-dark-400 mt-1">{fund.category} • Risk: {fund.risk}</p>
            </div>
          </div>
          <button onClick={() => toggleWatchlist(fund)} className={`p-2 rounded-lg border border-dark-800 hover:border-dark-700 transition duration-200 ${
            watching ? 'bg-amber-950/30 text-amber-500 border-amber-800/80' : 'bg-dark-950 text-dark-500'
          }`}>
            <Star className="w-4 h-4 fill-current" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-dark-800">
          <div>
            <span className="text-xs text-dark-500 block font-semibold">Latest NAV</span>
            <span className="text-lg font-bold text-white mt-1 block font-mono">?{fund.nav}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-dark-500 block font-semibold">1Y Performance</span>
            <span className="text-lg font-bold text-green-500 mt-1 block">+{fund.returns['1y']}%</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-dark-950 border-t border-dark-800 flex gap-2">
        <button onClick={onClick} className="flex-1 btn-primary text-sm py-2">
          Explore Fund
        </button>
      </div>
    </div>
  )
}
