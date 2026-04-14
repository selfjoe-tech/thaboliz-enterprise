// app/api/admin/invite/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, role } = body as { email?: string; name?: string; role?: string };

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1) Send invite email (recommended). redirectTo is optional: user sets password via invite link
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
      normalizedEmail,
      {
        redirectTo: `${process.env.SITE_URL}/auth/set-password`,
        data: { name, role }, // optional metadata passed to user_metadata
      }
    );

    // 2) Build row to insert into admin_auth.auth
    const row = {
      email: normalizedEmail,
      name: name ?? null,
      role: role ?? null,
      invited_at: new Date().toISOString(),
      invite_status: inviteError ? "invite_failed" : "invited",
      supabase_user_id: (inviteData as any)?.user?.id ?? null,
      metadata: { inviteResult: inviteData ?? null, inviteError: inviteError?.message ?? null },
    };

    // 3) Insert into admin_auth.auth
    const { error: insertErr } = await supabaseAdmin
      .from("admin_auth.auth")
      .insert([row]);

    if (inviteError) {
      // Invite failed but we saved the row (with invite_failed)
      return NextResponse.json({ ok: false, message: "Invite failed but record saved", inviteError: inviteError.message }, { status: 200 });
    }

    if (insertErr) {
      return NextResponse.json({ ok: false, message: "Invite succeeded but DB insert failed", dbError: insertErr.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, message: "Invite sent and record saved", data: inviteData ?? null }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? String(err) }, { status: 500 });
  }
}
