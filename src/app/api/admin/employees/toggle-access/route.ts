// app/api/admin/employees/toggle-access/route.ts
import { NextResponse } from "next/server";
import { toggleAccess } from "@/app/lib/actions/dashboard-info/employees";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const result = await toggleAccess(id);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error("api toggle-access error:", err);
    return NextResponse.json({ error: err?.message ?? "unknown" }, { status: 500 });
  }
}
