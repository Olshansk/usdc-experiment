import { NextResponse } from "next/server"
import { getUsdcSupply } from "@/lib/usdc"

export async function GET() {
  try {
    const usdcSupply = await getUsdcSupply()

    const result = {
      supply: usdcSupply,
      formatted: usdcSupply.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("[v0] Error fetching USDC supply:", error)
    return NextResponse.json({ error: "Failed to fetch USDC supply" }, { status: 500 })
  }
}
