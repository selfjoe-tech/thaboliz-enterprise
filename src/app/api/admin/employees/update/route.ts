// app/api/admin/employees/update/route.ts
import { NextResponse } from "next/server";
import { updateEmployee } from "@/app/lib/actions/dashboard-info/employees";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, name, email, role } = body;
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const employee = await updateEmployee({ id, name, email, role });
    return NextResponse.json({ success: true, employee });
  } catch (err: any) {
    console.error("api update employee error:", err);
    return NextResponse.json({ error: err?.message ?? "unknown" }, { status: 500 });
  }
}
