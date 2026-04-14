// app/api/auth/authorize/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, email } = body as { userId?: string | null; email?: string };

    if (!userId && !email) {
      return NextResponse.json({ error: "Missing userId or email" }, { status: 400 });
    }

    // First try matching by userId (if you store supabase user id in admin_auth.auth.id)
    if (userId) {
      const { data: byId, error: idErr } = await supabaseAdmin
        .from("admin_auth.auth")
        .select("id, name, role, email")
        .eq("id", userId)
        .maybeSingle();

      if (idErr) return NextResponse.json({ error: idErr.message }, { status: 500 });
      if (byId) return NextResponse.json({ ok: true, user: byId });
    }

    // Fallback: match by email (in case your admin_auth.auth rows use email)
    if (email) {
      const { data: byEmail, error: emailErr } = await supabaseAdmin
        .from("admin_auth.auth")
        .select("id, name, role, email")
        .ilike("email", email)
        .maybeSingle();

      if (emailErr) return NextResponse.json({ error: emailErr.message }, { status: 500 });
      if (byEmail) return NextResponse.json({ ok: true, user: byEmail });
    }

    // No match => not authorized
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
