export const mockHoldings = [
  { isin: 'INF204K01VH7', name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', units: 154.21, avgNav: 45.5, currentNav: 58.2, invested: 7016.55 },
  { isin: 'INF769K01EW3', name: 'HDFC Mid-Cap Opportunities Fund', category: 'Mid Cap', units: 85.12, avgNav: 80.2, currentNav: 95.6, invested: 6826.62 }
]

export const mockTransactions = [
  { isin: 'INF204K01VH7', name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', date: '2023-11-04', type: 'BUY', amount: 7016.55, units: 154.21, nav: 45.5 },
  { isin: 'INF769K01EW3', name: 'HDFC Mid-Cap Opportunities Fund', category: 'Mid Cap', date: '2023-11-12', type: 'BUY', amount: 6826.62, units: 85.12, nav: 80.2 }
]

export const mockFunds = [
  { isin: 'INF204K01VH7', name: 'Parag Parikh Flexi Cap Fund', category: 'Flexi Cap', nav: 58.2, returns: { '1y': 18.5, '3y': 22.4, '5y': 19.8 }, risk: 'Moderately High', aum: 45200 },
  { isin: 'INF769K01EW3', name: 'HDFC Mid-Cap Opportunities Fund', category: 'Mid Cap', nav: 95.6, returns: { '1y': 25.1, '3y': 29.3, '5y': 18.2 }, risk: 'High', aum: 61100 },
  { isin: 'INF174K01LS2', name: 'SBI Bluechip Fund', category: 'Large Cap', nav: 70.4, returns: { '1y': 14.2, '3y': 18.5, '5y': 15.1 }, risk: 'Moderate', aum: 39500 },
  { isin: 'INF192K01LK9', name: 'Axis Small Cap Fund', category: 'Small Cap', nav: 82.1, returns: { '1y': 31.4, '3y': 34.6, '5y': 24.1 }, risk: 'Very High', aum: 22800 }
]
