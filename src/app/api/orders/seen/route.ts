// app/api/orders/seen/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const orderIdsParam = url.searchParams.get("orderIds"); // comma-separated

    if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

    let q = supabaseAdmin.from("orders_seen").select("order_id").eq("user_id", userId);

    if (orderIdsParam) {
      const ids = orderIdsParam.split(",").filter(Boolean);
      q = q.in("order_id", ids);
    }

    const { data, error } = await q;
    if (error) {
      console.error("seen API error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const seenIds = (data || []).map((r: any) => r.order_id);
    return NextResponse.json({ seen: seenIds });
  } catch (err: any) {
    console.error("seen route error", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
