// app/api/admin/webhook/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function POST(req: Request) {
  const secret = req.headers.get("x-webhook-secret") || "";
  if (secret !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: "Invalid webhook secret" }, { status: 401 });
  }

  try {
    const body = await req.json();
    // Expecting payload to include event type and user data
    // Example: { event: "user.created", user: { id: "...", email: "..." } }
    const event = body?.event;
    const user = body?.user;

    if (!event || !user) {
      return NextResponse.json({ ok: false, error: "Malformed payload" }, { status: 400 });
    }

    if (event === "user.created" || event === "auth.user.created") {
      const email = (user.email || "").toLowerCase();
      const supabaseUserId = user.id;

      if (!email || !supabaseUserId) return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });

      // Update admin_auth.auth row where email matches (case-insensitive)
      const { error: updateErr } = await supabaseAdmin
        .from("admin_auth.auth")
        .update({ supabase_user_id: supabaseUserId, invite_status: "accepted" })
        .ilike("email", email);

      if (updateErr) {
        return NextResponse.json({ ok: false, error: updateErr.message }, { status: 500 });
      }

      return NextResponse.json({ ok: true, message: "Updated admin_auth row" }, { status: 200 });
    }

    // Not a user-created event we care about
    return NextResponse.json({ ok: true, message: "Ignored event" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? String(err) }, { status: 500 });
  }
}
