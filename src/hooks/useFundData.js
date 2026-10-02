import { useState, useEffect, useCallback } from 'react'

export function useFundData(key, fetcher, options = {}) {
  const [data, setData] = useState(options.mockData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetcher()
      setData(res)
      setError(null)
    } catch (err) {
      setError(err.message || 'Error fetching data')
    } finally {
      setLoading(false)
    }
  }, [key])

  useEffect(() => {
    load()
  }, [load])

  return { data, loading, error, refresh: load }
}
