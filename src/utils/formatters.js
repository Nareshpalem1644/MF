export const formatINR = (val) => {
  return '?' + Number(val).toLocaleString('en-IN', { maximumFractionDigits: 2 })
}

export const formatPct = (val) => {
  return (val >= 0 ? '+' : '') + Number(val).toFixed(2) + '%'
}
