import { type NextRequest, NextResponse } from "next/server"
import { getName } from "@/lib/store"

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code")

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 })
    }

    const name = getName(code)

    return NextResponse.json({ name })
  } catch (error) {
    console.error("Error in retrieve route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
