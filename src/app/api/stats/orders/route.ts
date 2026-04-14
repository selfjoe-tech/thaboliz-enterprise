// app/api/stats/orders/route.ts
import { NextResponse } from "next/server";
import { getStatsData } from "@/app/lib/actions/dashboard-info/getStats";

export async function GET() {
  try {
    const val = await getStatsData("orders");
    // return a plain number in JSON for ease of consumption by your component
    return NextResponse.json({ value: val });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
