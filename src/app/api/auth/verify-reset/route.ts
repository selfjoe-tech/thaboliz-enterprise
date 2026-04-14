// app/api/auth/verify-reset/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email: rawEmail, code } = await req.json();
    if (!rawEmail || !code) {
      return NextResponse.json({ error: "Email & code required" }, { status: 400 });
    }
    const email = rawEmail.trim().toLowerCase();

    // fetch latest non-used reset for email
    const { data: rows, error } = await supabaseAdmin
      .schema("admin_auth")
      .from("password_resets")
      .select("*")
      .eq("email", email)
      .eq("used", false)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("verify-reset select error", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    const row = Array.isArray(rows) && rows.length ? rows[0] : null;
    if (!row) return NextResponse.json({ error: "Code not found or expired" }, { status: 404 });

    const now = new Date();
    if (new Date(row.expires_at) < now) {
      return NextResponse.json({ error: "Code expired" }, { status: 410 });
    }

    const match = await bcrypt.compare(String(code), row.code_hash);
    if (!match) return NextResponse.json({ error: "Invalid code" }, { status: 401 });

    // mark as used
    const { error: updateErr } = await supabaseAdmin
      .schema("admin_auth")
      .from("password_resets")
      .update({ used: true })
      .eq("id", row.id);

    if (updateErr) {
      console.error("verify-reset update error", updateErr);
      // not fatal for user — they have a valid code. But log.
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("verify-reset unexpected:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
