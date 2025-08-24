import { NextResponse } from "next/server"

export async function GET() {
  console.log("[v0] API route called")
  console.log("[v0] Environment variables:", {
    hasAppId: !!process.env.GROVE_PORTAL_APP_ID,
    hasApiKey: !!process.env.GROVE_PORTAL_API_KEY,
    appId: process.env.GROVE_PORTAL_APP_ID?.substring(0, 8) + "...",
  })

  try {
    const response = await fetch(`https://eth.rpc.grove.city/v1/${process.env.GROVE_PORTAL_APP_ID}`, {
      method: "POST",
      headers: {
        Authorization: process.env.GROVE_PORTAL_API_KEY || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "eth_call",
        params: [
          {
            to: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
            data: "0x18160ddd",
          },
          "latest",
        ],
      }),
    })

    console.log("[v0] RPC response status:", response.status)
    const data = await response.json()
    console.log("[v0] RPC response data:", data)

    if (data.error) {
      console.log("[v0] RPC error:", data.error)
      throw new Error(data.error.message)
    }

    // Convert hex to decimal and format as USDC (6 decimals)
    const hexValue = data.result
    const decimalValue = Number.parseInt(hexValue, 16)
    const usdcSupply = decimalValue / 1e6

    console.log("[v0] Converted values:", { hexValue, decimalValue, usdcSupply })

    const result = {
      supply: usdcSupply,
      formatted: usdcSupply.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    }

    console.log("[v0] Final result:", result)
    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Error fetching USDC supply:", error)
    return NextResponse.json({ error: "Failed to fetch USDC supply" }, { status: 500 })
  }
}
