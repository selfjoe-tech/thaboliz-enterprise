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
  const pageSize = Math.min(100, Math.max(5, Number(url.searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE)));
  const q = (url.searchParams.get("q") ?? "").trim();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const productsQuery = supabase
    .from("products")
    .select("id, name, price, image_url, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) productsQuery.ilike("name", `%${q}%`);

  const { data: products, error: pErr, count } = await productsQuery;
  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });

  const ids = (products ?? []).map((p: any) => String(p.id));

  const invPromise = ids.length
    ? supabase
        .from("product_inventory")
        .select("product_id, stock_on_hand, est_shelf_life_days, cost_price, updated_at")
        .in("product_id", ids)
    : Promise.resolve({ data: [], error: null } as any);

  const [{ data: invRows, error: iErr }] = await Promise.all([invPromise]);
  if (iErr) return NextResponse.json({ error: iErr.message }, { status: 500 });

  const invById = new Map<string, any>();
  (invRows ?? []).forEach((r: any) => invById.set(String(r.product_id), r));

  const items = (products ?? []).map((p: any) => {
    const id = String(p.id);
    const inv = invById.get(id);
    return {
      id,
      name: p.name ?? "",
      price: p.price ?? null,
      images: normalizeImages(p.image_url),
      stockOnHand: inv?.stock_on_hand ?? 0,
      estShelfLifeDays: inv?.est_shelf_life_days ?? null,
      costPrice: inv?.cost_price ?? null,
      updatedAt: inv?.updated_at ?? null,
    };
  });

  return NextResponse.json({
    items,
    page,
    pageSize,
    total: count ?? 0,
    totalPages: Math.max(1, Math.ceil((count ?? 0) / pageSize)),
  });
}
