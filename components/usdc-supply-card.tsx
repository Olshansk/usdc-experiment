"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
    console.log("[v0] Fetching supply data...")
    try {
      const response = await fetch("/api/usdc-supply")
      console.log("[v0] Fetch response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.log("[v0] Error response:", errorText)
        throw new Error("Failed to fetch supply data")
      }

      const supplyData = await response.json()
      console.log("[v0] Supply data received:", supplyData)

      setData(supplyData)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      console.error("[v0] Fetch error:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log("[v0] Component mounted, starting data fetch...")
    // Initial fetch
    fetchSupply()

    // Set up polling every 10 seconds
    const interval = setInterval(fetchSupply, 10000)

    return () => clearInterval(interval)
  }, [])

  console.log("[v0] Component render state:", { loading, error, data })

  if (loading && !data) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center">USDC Total Supply</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="animate-pulse">
            <div className="h-12 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error && !data) {
    return (
      <Card className="w-full max-w-md mx-auto border-destructive">
        <CardHeader>
          <CardTitle className="text-center text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg font-semibold text-muted-foreground">USDC Total Supply</CardTitle>
        <Badge variant="secondary" className="w-fit mx-auto">
          Live Data
        </Badge>
      </CardHeader>
      <CardContent className="text-center">
        <div className="space-y-2">
          <div className="text-4xl font-bold text-primary">{data?.formatted || "0"}</div>
          <div className="text-lg font-medium text-foreground">USDC</div>
          {lastUpdated && (
            <div className="text-sm text-muted-foreground">Last updated: {lastUpdated.toLocaleTimeString()}</div>
          )}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">Updates every 10 seconds</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
