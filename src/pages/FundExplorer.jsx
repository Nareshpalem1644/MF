import { useState } from 'react'
import { useFundData } from '../hooks/useFundData'
import { fundApi } from '../services/api'
import FundCard from '../components/UI/FundCard'
import Loader from '../components/UI/Loader'
import { useNavigate } from 'react-router-dom'
import { Search, Sparkles } from 'lucide-react'

export default function FundExplorer() {
  const { data: funds, loading } = useFundData('explorer_funds', fundApi.getAll, { mockData: [] })
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFunds = funds.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8 space-y-6 bg-dark-950 min-h-screen">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Global Market Scanner</h1>
          <p className="text-dark-400 mt-1">Filter, discover and analyze prime mutual funds</p>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-primary-500 bg-primary-950 border border-primary-900 px-3 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Updated on daily NAV close
        </span>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-4 text-dark-500" />
        <input 
          type="text" 
          placeholder="Query by fund label or category structure..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="input pl-12 bg-dark-900 text-base"
        />
      </div>

      {loading ? (
        <Loader text="Querying market matrices..." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFunds.map(fund => (
            <FundCard key={fund.isin} fund={fund} onClick={() => navigate(`/fund/${fund.isin}`)} />
          ))}
          {filteredFunds.length === 0 && (
            <div className="col-span-full py-16 text-center text-dark-500 font-bold">
              No matching funds detected under this query configuration
            </div>
          )}
        </div>
      )}
    </div>
  )
}
