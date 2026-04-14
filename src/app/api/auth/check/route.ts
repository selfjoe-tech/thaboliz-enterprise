import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { email: rawEmail } = await req.json();
    const email = String(rawEmail ?? "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("app_users")
      .select("id, name, email, password_hash, is_active")
      .ilike("email", email)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || !data.is_active) {
      return NextResponse.json({ exists: false }, { status: 200 });
    }

    return NextResponse.json(
      {
        exists: true,
        hasPassword: Boolean(data.password_hash),
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}