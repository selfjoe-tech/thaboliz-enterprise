import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

export async function GET(req: Request) {
  const supabase = supabaseAdmin;
  const url = new URL(req.url);

  const productId = (url.searchParams.get("productId") ?? "").trim();
  const metric = (url.searchParams.get("metric") ?? "revenue").trim(); // 'revenue' | 'units'
  const granularity = (url.searchParams.get("granularity") ?? "year").trim(); // 'year' | 'month' | 'day'
  const year = url.searchParams.get("year");
  const month = url.searchParams.get("month");

  if (!productId) return NextResponse.json({ error: "Missing productId" }, { status: 400 });

  const args: any = {
    p_product_id: productId,
    p_metric: metric,
    p_granularity: granularity,
    p_year: year ? Number(year) : null,
    p_month: month ? Number(month) : null,
  };

  console.log(args, "<<<<,, args in chart route")

  const { data, error } = await supabase.rpc("product_metric_buckets", args);

  console.log(error, "error<<<<<<<<<<<<<<,")
  console.log(data, "<<<<<<<< data")

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const buckets = (data ?? []).map((b: any) => ({
    label: b.label,
    start: new Date(b.start).toISOString(),
    end: new Date(b.end).toISOString(),
    value: Number(b.value ?? 0),
  }));

  return NextResponse.json({ buckets });
}
