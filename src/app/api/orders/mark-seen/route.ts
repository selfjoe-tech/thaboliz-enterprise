// app/api/orders/mark-seen/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function POST(req: Request) {
  try {
    // read cookie store
    const cookieStore = await cookies() as any;

    // try to get session cookie (still required)
    const token = cookieStore.get?.("session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // verify JWT and extract sid
    let payload: any;
    try {
      const verified = await jwtVerify(token, SECRET);
      payload = verified.payload;
    } catch (err) {
      console.error("JWT verify failed", err);
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const sid = payload?.sid;
    if (!sid) return NextResponse.json({ error: "Invalid session (no sid)" }, { status: 401 });

    // find session row in your sessions table

    const { data: sessionRow, error: sessionErr } = await supabaseAdmin
      .schema("admin_auth")
      .from("sessions")
      .select("id, user_id, expires_at, revoked")
      .eq("id", sid)
      .maybeSingle();

    if (sessionErr) {
      console.error("sessions lookup error", sessionErr);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
    if (!sessionRow) return NextResponse.json({ error: "Session not found" }, { status: 401 });
    if (sessionRow.revoked || new Date(sessionRow.expires_at).getTime() <= Date.now()) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    // parse body
    const body = await req.json().catch(() => ({}));
    const orderId = body?.orderId;
    if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

    // prefer admin_id cookie (client-readable) if present; otherwise fallback to sessionRow.user_id
    const adminIdCookie = cookieStore.get?.("admin_id")?.value ?? null;
    const adminId = adminIdCookie ?? sessionRow.user_id;

    // IMPORTANT: ensure types match (orders_seen.user_id vs adminId)
    const { data, error } = await supabaseAdmin
      .from("orders_seen")
      .upsert({ order_id: orderId, user_id: adminId }, { onConflict: "order_id,user_id" })
      .select("*")
      .maybeSingle();

    if (error) {
      console.error("mark-seen upsert error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    console.error("mark-seen route unexpected error", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
