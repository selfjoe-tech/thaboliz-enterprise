// app/api/admin/employees/create/route.ts
import { NextResponse } from "next/server";
import { createEmployee } from "@/app/lib/actions/dashboard-info/employees";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, role } = body;
    if (!name || !email) return NextResponse.json({ error: "Missing name or email" }, { status: 400 });

    const employee = await createEmployee({ name, email, role: role ?? "employee" });
    return NextResponse.json({ success: true, employee });
  } catch (err: any) {
    console.error("api create employee error:", err);
    return NextResponse.json({ error: "No internet" }, { status: 500 });
  }
}
