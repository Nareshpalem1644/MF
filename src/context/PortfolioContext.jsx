import { createContext, useContext, useState, useEffect } from 'react'
import { mockHoldings, mockTransactions } from '../utils/mockData'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [holdings, setHoldings] = useState(() => {
    const stored = localStorage.getItem('mf_holdings')
    return stored ? JSON.parse(stored) : mockHoldings
  })
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem('mf_transactions')
    return stored ? JSON.parse(stored) : mockTransactions
  })
  const [watchlist, setWatchlist] = useState(() => {
    const stored = localStorage.getItem('mf_watchlist')
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem('mf_holdings', JSON.stringify(holdings))
  }, [holdings])

  useEffect(() => {
    localStorage.setItem('mf_transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('mf_watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const toggleWatchlist = (fund) => {
    setWatchlist(prev => {
      const exists = prev.some(f => f.isin === fund.isin)
      if (exists) {
        return prev.filter(f => f.isin !== fund.isin)
      } else {
        return [...prev, fund]
      }
    })
  }

  const addTransaction = (tx) => {
    const newTx = { ...tx, id: `tx_${Date.now()}`, date: new Date().toISOString().split('T')[0] }
    setTransactions(prev => [newTx, ...prev])

    setHoldings(prev => {
      const existingIdx = prev.findIndex(h => h.isin === tx.isin)
      if (existingIdx > -1) {
        const existing = prev[existingIdx]
        const updatedUnits = existing.units + tx.units
        const updatedInvested = existing.invested + tx.amount
        const updatedAvg = updatedInvested / updatedUnits
        const copy = [...prev]
        copy[existingIdx] = {
          ...existing,
          units: updatedUnits,
          invested: updatedInvested,
          avgNav: updatedAvg,
          currentNav: tx.nav
        }
        return copy
      } else {
        return [...prev, {
          isin: tx.isin,
          name: tx.name,
          category: tx.category,
          units: tx.units,
          avgNav: tx.nav,
          currentNav: tx.nav,
          invested: tx.amount
        }]
      }
    })
  }

  const isWatching = (isin) => watchlist.some(f => f.isin === isin)

  return (
    <PortfolioContext.Provider value={{ 
      holdings, 
      transactions, 
      watchlist, 
      toggleWatchlist, 
      addTransaction,
      isWatching 
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export const usePortfolio = () => {
  const context = useContext(PortfolioContext)
  if (!context) throw new Error('usePortfolio must be used inside PortfolioProvider')
  return context
}
