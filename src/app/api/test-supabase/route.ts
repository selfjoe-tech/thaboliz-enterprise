import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  try {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
    // simple server-side query (requires service role key)
    const { data, error } = await supabase.from("profile").select("id").limit(1);
    if (error) throw error;
    return NextResponse.json({ ok: true, exampleRow: data?.[0] ?? null });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || String(err) }, { status: 500 });
  }
}
