import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export async function POST(req: Request) {
  try {
    const { email: rawEmail, password } = await req.json();

    const email = String(rawEmail ?? "").trim().toLowerCase();
    const safePassword = String(password ?? "");

    if (!email || !safePassword) {
      return NextResponse.json(
        { error: "Email and password required" },
        { status: 400 }
      );
    }

    if (safePassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const { data: user, error: userError } = await supabaseAdmin
      .from("app_users")
      .select("id, password_hash, is_active")
      .ilike("email", email)
      .maybeSingle();

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    if (!user || !user.is_active) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.password_hash) {
      return NextResponse.json(
        { error: "Password is already set for this account" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(safePassword, SALT_ROUNDS);

    const { error: updateError } = await supabaseAdmin
      .from("app_users")
      .update({
        password_hash: hashed,
        provider: "credentials",
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json(
      { ok: true, message: "Password set" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}