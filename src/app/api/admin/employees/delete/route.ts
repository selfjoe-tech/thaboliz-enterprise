import { NextResponse } from "next/server";
import { deleteEmployee } from "@/app/lib/actions/dashboard-info/employees";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await deleteEmployee(id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "unknown" }, { status: 500 });
  }
}
