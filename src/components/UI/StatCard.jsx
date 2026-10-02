import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ title, value, change, prefix = "?", suffix = "" }) {
  const isPositive = change >= 0
  return (
    <div className="card p-6 flex flex-col justify-between hover:border-dark-700 transition duration-300">
      <div>
        <span className="text-sm font-semibold tracking-wide text-dark-400 block mb-2">{title}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-white tracking-tight">{prefix}{value}{suffix}</span>
        </div>
      </div>
      {change !== undefined && (
        <div className="mt-4 flex items-center">
          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
            isPositive ? 'bg-green-950/80 text-green-400 border border-green-800' : 'bg-red-950/80 text-red-400 border border-red-800'
          }`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {isPositive ? '+' : ''}{change.toFixed(2)}%
          </span>
          <span className="text-xs text-dark-500 ml-2 font-medium">realtime change</span>
        </div>
      )}
    </div>
  )
}
