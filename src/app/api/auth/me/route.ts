// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin"; // if you want to validate via sessions
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET as string);

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies() as any;
    // Prefer admin_id cookie if available
    const adminIdCookie = cookieStore.get("admin_id")?.value ?? null;

    // If admin_id cookie is present, return it (fast)
    if (adminIdCookie) {
      return NextResponse.json({ adminId: adminIdCookie });
    }

    // Otherwise attempt to verify session cookie and resolve admin id from sessions table
    const token = cookieStore.get("session")?.value;
    console.log("Not authenticated 401")
    if (!token) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    let payload: any;
    try {
      const verified = await jwtVerify(token, SECRET);
      payload = verified.payload;
    } catch (err) {
          console.log("_verified_ invalid session 401")

      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    const sid = payload?.sid;
              console.log("sid invalid session 401")

    if (!sid) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

    const { data: sessionRow, error } = await supabaseAdmin
      .from("sessions")
      .select("user_id")
      .eq("id", sid)
      .maybeSingle();

    if (error || !sessionRow) {
                console.log("_verified_ invalid session 401")

      return NextResponse.json({ error: "Session not found" }, { status: 401 });
    }

    // At this point sessionRow.user_id is your admin id if that's how you stored it
    return NextResponse.json({ adminId: sessionRow.user_id });
  } catch (err: any) {
    console.error("GET /api/auth/me error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
