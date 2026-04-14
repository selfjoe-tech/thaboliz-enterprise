// app/api/shop/product-special/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const productId = (url.searchParams.get("productId") ?? "").trim();

  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  // Preferred: view that already filters "active now"
  const { data: active, error: vErr } = await supabase
    .from("active_product_specials")
    .select("id, product_id, discount_pct, special_price, starts_at, ends_at, promo_text")
    .eq("product_id", productId)
    .maybeSingle();

  if (!vErr && active) {
    return NextResponse.json({
      special: {
        id: String(active.id),
        productId: String(active.product_id),
        discountPct: Number(active.discount_pct ?? 0),
        specialPrice: Number(active.special_price ?? 0),
        startsAt: active.starts_at,
        endsAt: active.ends_at,
        promoText: active.promo_text ?? null,
      },
    });
  }

  // Fallback: query table and filter active in code
  const { data: rows, error: tErr } = await supabase
    .from("product_specials")
    .select("id, product_id, discount_pct, special_price, starts_at, ends_at, promo_text")
    .eq("product_id", productId)
    .order("starts_at", { ascending: false })
    .limit(1);

  if (tErr) return NextResponse.json({ error: tErr.message }, { status: 500 });

  const row = rows?.[0];
  if (!row) return NextResponse.json({ special: null });

  const now = Date.now();
  const startsOk = row.starts_at ? new Date(row.starts_at).getTime() <= now : true;
  const endsOk = row.ends_at ? new Date(row.ends_at).getTime() >= now : true;

  if (!startsOk || !endsOk) return NextResponse.json({ special: null });

  return NextResponse.json({
    special: {
      id: String(row.id),
      productId: String(row.product_id),
      discountPct: Number(row.discount_pct ?? 0),
      specialPrice: Number(row.special_price ?? 0),
      startsAt: row.starts_at,
      endsAt: row.ends_at,
      promoText: row.promo_text ?? null,
    },
  });
}
