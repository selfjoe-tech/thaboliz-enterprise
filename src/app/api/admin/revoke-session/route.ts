// app/api/admin/revoke-session/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, userId } = body as { sessionId?: string; userId?: string };

    if (!sessionId && !userId) {
      return NextResponse.json({ error: "Provide sessionId or userId" }, { status: 400 });
    }

    let q = supabaseAdmin.from("sessions").update({ revoked: true });
    if (sessionId) q = q.eq("id", sessionId);
    else q = q.eq("user_id", userId);

    const { error } = await q;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
