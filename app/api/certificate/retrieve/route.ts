import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get("code")

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase.from("certificates").select("name").eq("code", code).single()

    if (error || !data) {
      return NextResponse.json({ name: null })
    }

    return NextResponse.json({ name: data.name })
  } catch (error) {
    console.error("[v0] Error in retrieve route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
