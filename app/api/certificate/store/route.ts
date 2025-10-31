import { type NextRequest, NextResponse } from "next/server"
import { storeName } from "@/lib/store"

export async function POST(request: NextRequest) {
  try {
    const { code, name } = await request.json()

    if (!code || !name) {
      return NextResponse.json({ error: "Code and name are required" }, { status: 400 })
    }

    storeName(code, name)

    return NextResponse.json({ success: true, code })
  } catch (error) {
    console.error("Error in store route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
