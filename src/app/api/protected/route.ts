// example: app/api/protected/route.ts
import { NextResponse } from "next/server";
import { verifyJwt } from "@/app/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const token = cookies().get("session")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyJwt(token); // throws if invalid/expired
    const userId = payload.sub as string;

    // proceed with userId
    return NextResponse.json({ ok: true, userId });
  } catch (err: any) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
