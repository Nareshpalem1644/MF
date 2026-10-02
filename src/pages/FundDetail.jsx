import { useParams, Link } from 'react-router-dom'
import { useFundData } from '../hooks/useFundData'
import { fundApi } from '../services/api'
import { useRealtimeTicker } from '../hooks/useRealtimeTicker'
import NavHistoryChart from '../components/Charts/NavHistoryChart'
import { ArrowLeft, Landmark, Layers, HelpCircle } from 'lucide-react'

export default function FundDetail() {
  const { isin } = useParams()
  const { data: fund } = useFundData(`fund_${isin}`, () => fundApi.getByIsin(isin))
  const { data: history, loading: loadingHistory } = useFundData(`hist_${isin}`, () => fundApi.getHistory(isin))
  const { data: holdings, loading: loadingHoldings } = useFundData(`hold_${isin}`, () => fundApi.getHoldings(isin))
  const { nav: dynamicNav } = useRealtimeTicker(fund ? fund.nav : 50)

  if (!fund) return <div className="p-8 text-center text-dark-500">Loading fund details...</div>

  return (
    <div className="p-8 space-y-8 bg-dark-950 min-h-screen">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <Link to="/explore" className="p-3 bg-dark-900 hover:bg-dark-800 rounded-xl border border-dark-800 transition duration-200">
            <ArrowLeft className="w-5 h-5 text-dark-400" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{fund.name}</h1>
            <p className="text-dark-400 mt-1 font-semibold">{fund.category} • ISIN: {fund.isin}</p>
          </div>
        </div>
        <div className="text-right p-4 bg-dark-900 rounded-xl border border-dark-800/80">
          <p className="text-[10px] text-dark-400 font-extrabold uppercase tracking-widest block">Intraday Simulated NAV</p>
          <p className="text-3xl font-black font-mono text-primary-500 mt-1">?{dynamicNav}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6 bg-dark-900 border-dark-800">
            <h3 className="font-bold text-lg text-white mb-6">NAV Performance Metric (Trailing Month)</h3>
            {loadingHistory ? (
              <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
              </div>
            ) : (
              <NavHistoryChart data={history} height={320} />
            )}
          </div>

          <div className="card p-6 bg-dark-900 border-dark-800">
            <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary-500" /> Fund Holdings Portfolio
            </h3>
            {loadingHoldings ? (
              <div className="animate-pulse space-y-3">
                <div className="h-6 bg-dark-800 rounded"></div>
                <div className="h-6 bg-dark-800 rounded"></div>
              </div>
            ) : (
              <div className="table-container">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-dark-800 text-xs font-bold text-dark-400 uppercase tracking-wider">
                      <th className="p-4">Enterprise</th>
                      <th className="p-4">Sector</th>
                      <th className="p-4 text-right">Portfolio Weight</th>
                    </tr>
                  </thead>
                  <tbody>
                    {holdings.map((h, idx) => (
                      <tr key={idx} className="border-b border-dark-800/40 text-sm hover:bg-dark-950/40">
                        <td className="p-4 text-white font-semibold">{h.name}</td>
                        <td className="p-4 text-dark-300 font-medium">{h.sector}</td>
                        <td className="p-4 text-right text-primary-500 font-bold">{h.weight}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6 bg-dark-900 border-dark-800">
            <h3 className="font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-primary-500" /> Capital & Overview
            </h3>
            <div className="space-y-4 text-sm font-semibold">
              <div className="flex justify-between border-b border-dark-800 pb-3">
                <span className="text-dark-400">Net Asset Under Management (AUM)</span>
                <span className="text-white">?{(fund.aum/1000).toFixed(1)}K Cr</span>
              </div>
              <div className="flex justify-between border-b border-dark-800 pb-3">
                <span className="text-dark-400">Risk Profile Index</span>
                <span className="text-white bg-amber-950/40 text-amber-500 px-2 py-0.5 rounded border border-amber-800/40">{fund.risk}</span>
              </div>
              <div className="flex justify-between border-b border-dark-800 pb-3">
                <span className="text-dark-400">Active Expense Ratio</span>
                <span className="text-white">0.78%</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-dark-400">Standard Yield Return (3Y)</span>
                <span className="text-green-500">+{fund.returns['3y']}%</span>
              </div>
            </div>
          </div>

          <div className="card p-6 bg-dark-900 border-dark-800">
            <h3 className="font-bold text-lg text-white mb-2 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary-500" /> Investment Process FAQ
            </h3>
            <p className="text-xs text-dark-400 leading-relaxed font-medium">
              Mutual Fund valuations (NAVs) are recalculated daily post-market close (around 11:00 PM IST) by official AMFI feeds. Our system provides intraday micro-simulations based on direct index fluctuations for dynamic trend visualization.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
