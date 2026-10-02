import { mockFunds } from '../utils/mockData'

export const fundApi = {
  getAll: async () => {
    await new Promise(r => setTimeout(r, 400))
    return mockFunds
  },
  getByIsin: async (isin) => {
    await new Promise(r => setTimeout(r, 400))
    return mockFunds.find(f => f.isin === isin) || mockFunds[0]
  },
  getHistory: async (isin) => {
    await new Promise(r => setTimeout(r, 300))
    const dataset = []
    let currentNav = mockFunds.find(f => f.isin === isin)?.nav || 60
    
    for (let i = 30; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      dataset.push({
        date: d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        nav: parseFloat((currentNav - (i * (Math.random() - 0.49) * 0.85)).toFixed(2))
      })
    }
    return dataset
  },
  getHoldings: async (isin) => {
    return [
      { name: "HDFC Bank Ltd.", sector: "Financial Services", weight: 8.4 },
      { name: "ICICI Bank Ltd.", sector: "Financial Services", weight: 7.9 },
      { name: "Reliance Industries Ltd.", sector: "Energy", weight: 6.2 },
      { name: "Infosys Ltd.", sector: "Information Technology", weight: 5.1 },
      { name: "Larsen & Toubro Ltd.", sector: "Construction", weight: 4.3 },
      { name: "Tata Consultancy Services Ltd.", sector: "Information Technology", weight: 3.8 }
    ]
  },
  getLatestNav: async (isins) => {
    const res = {}
    isins.forEach(isin => {
      const found = mockFunds.find(f => f.isin === isin)
      const change = (Math.random() - 0.49) * 1.5
      res[isin] = {
        nav: parseFloat(((found?.nav || 50) + change).toFixed(4)),
        change: change
      }
    })
    return res
  }
}
