import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

const DEFAULT_PAGE_SIZE = 20;

function normalizeImages(image_url: any): string[] {
  if (Array.isArray(image_url)) return image_url.filter(Boolean);
  if (typeof image_url === "string" && image_url.trim()) return [image_url];
  return [];
}

export async function GET(req: Request) {
  const supabase = supabaseAdmin;
  const url = new URL(req.url);

  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(
    100,
    Math.max(5, Number(url.searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE))
  );
  const q = (url.searchParams.get("q") ?? "").trim();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("active_product_specials")
    .select(
      "special_id, product_id, discount_pct, special_price, promo_text, starts_at, ends_at, product_name, normal_price, image_url",
      { count: "exact" }
    )
    .order("ends_at", { ascending: true })
    .range(from, to);

  if (q) query = query.ilike("product_name", `%${q}%`);

  const { data, error, count } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const items = (data ?? []).map((r: any) => ({
    specialId: r.special_id,
    productId: String(r.product_id),
    name: r.product_name ?? "",
    images: normalizeImages(r.image_url),
    normalPrice: r.normal_price ?? null,
    discountPct: r.discount_pct ?? 0,
    specialPrice: r.special_price ?? null,
    promoText: r.promo_text ?? "",
    startsAt: r.starts_at ?? null,
    endsAt: r.ends_at ?? null,
  }));

  return NextResponse.json({
    items,
    page,
    pageSize,
    total: count ?? 0,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / pageSize)),
  });
}
