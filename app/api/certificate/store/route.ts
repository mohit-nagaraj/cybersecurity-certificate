import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { code, name } = await request.json()

    if (!code || !name) {
      return NextResponse.json({ error: "Code and name are required" }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase.from("certificates").insert({ code, name })

    if (error) {
      console.error("[v0] Supabase insert error:", error)
      return NextResponse.json({ error: "Failed to store certificate" }, { status: 500 })
    }

    console.log("[v0] Certificate stored in Supabase:", { code, name })
    return NextResponse.json({ success: true, code })
  } catch (error) {
    console.error("[v0] Error in store route:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
