import { useState, useEffect } from 'react'

export function useRealtimeTicker(initialNav) {
  const [nav, setNav] = useState(initialNav)

  useEffect(() => {
    setNav(initialNav)
    const interval = setInterval(() => {
      setNav(prev => {
        const tick = (Math.random() - 0.5) * 0.04
        return parseFloat((prev + tick).toFixed(4))
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [initialNav])

  return { nav }
}
