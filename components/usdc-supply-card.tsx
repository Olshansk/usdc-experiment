"use client"

import { useState, useEffect } from "react"

interface USDCSupplyData {
  supply: number
  formatted: string
}

export function USDCSupplyCard() {
  const [data, setData] = useState<USDCSupplyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchSupply = async () => {
    try {
      const response = await fetch("/api/usdc-supply")

      if (!response.ok) {
        throw new Error("Failed to fetch supply data")
      }

      const supplyData = await response.json()
      setData(supplyData)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchSupply()

    // Set up polling every 10 seconds
    const interval = setInterval(fetchSupply, 10000)

    return () => clearInterval(interval)
  }, [])

  if (loading && !data) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">USDC Total Supply</h3>
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !data) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-red-200 p-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-red-600 mb-4">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-600 mb-2">USDC Total Supply</h3>
        <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
          Live Data
        </div>

        <div className="space-y-2">
          <div className="text-4xl font-bold text-red-600">{data?.formatted || "0"}</div>
          <div className="text-lg font-medium text-gray-800">USDC</div>
          {lastUpdated && <div className="text-sm text-gray-500">Last updated: {lastUpdated.toLocaleTimeString()}</div>}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Updates every 10 seconds</span>
          </div>
        </div>
      </div>
    </div>
  )
}
