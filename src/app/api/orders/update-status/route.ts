// app/api/orders/update-status/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const { orderId, status } = await req.json();
    if (!orderId || !status) {
      return NextResponse.json({ error: "orderId and status are required" }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from("orders")
      .update({ status })
      .eq("id", orderId)
      .select("id, created_at, order_number, order_type, total, status, user_id, profile(name)")
      .maybeSingle();

    if (error) {
      console.error("update-status error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const row = data
      ? {
          id: data.id,
          date: data.created_at ? new Date(data.created_at).toLocaleString() : "",
          order_number: data.order_number,
          order_type: data.order_type,
          total: typeof data.total === "number" ? data.total : Number(data.total || 0),
          status: data.status,
          user_id: data.user_id,
          customer: data.profile?.name ?? "Unknown",
        }
      : null;

    return NextResponse.json({ data: row });
  } catch (err: any) {
    console.error("update-status route error", err);
    return NextResponse.json({ error: err?.message ?? "Server error" }, { status: 500 });
  }
}
