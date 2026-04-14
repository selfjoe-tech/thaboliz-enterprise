import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim().toLowerCase();
    const password = String(body?.password ?? "");

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    const { data: existing } = await supabaseAdmin
      .from("app_users")
      .select("id")
      .ilike("email", email)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { error: "An account already exists with that email" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const { data: user, error: insertError } = await supabaseAdmin
      .from("app_users")
      .insert([
        {
          name,
          email,
          password_hash: passwordHash,
          provider: "credentials",
          is_active: true,
        },
      ])
      .select("id, email")
      .single();

    if (insertError || !user) {
      return NextResponse.json(
        { error: insertError?.message || "Failed to create user" },
        { status: 500 }
      );
    }

    // default new users to viewer
    const { data: viewerRole } = await supabaseAdmin
      .from("roles")
      .select("id")
      .eq("code", "viewer")
      .single();

    if (viewerRole?.id) {
      await supabaseAdmin.from("user_roles").insert([
        {
          user_id: user.id,
          role_id: viewerRole.id,
        },
      ]);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: String(error) },
      { status: 500 }
    );
  }
}