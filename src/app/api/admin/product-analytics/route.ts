import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
const DEFAULT_PAGE_SIZE = 20;

function normalizeImages(image_url: any): string[] {
  if (Array.isArray(image_url)) return image_url.filter(Boolean);
  if (typeof image_url === "string" && image_url.trim()) return [image_url];
  return [];
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Recommendation (no category rules):
// urgency = (required_rate - sales_rate) / required_rate
// recommended_discount = round(urgency * effective_max_discount)
// effective_max_discount also respects min margin (floor price)
function computeRecommendation(input: {
  price: number | null;
  stockOnHand: number;
  estShelfLifeDays: number | null;
  costPrice: number | null;
  policy: {
    enabled: boolean;
    maxDiscountPct: number;
    minMarginPct: number;
    bufferDays: number;
    targetSellthroughPct: number;
    lookbackDays: number;
  };
  recentUnits: number; // units sold in lookback window
}) {
  const price = input.price ? Number(input.price) : null;
  const cost = input.costPrice !== null && input.costPrice !== undefined ? Number(input.costPrice) : null;

  const stock = Math.max(0, Number(input.stockOnHand ?? 0));
  const estDays = input.estShelfLifeDays === null ? null : Math.max(0, Number(input.estShelfLifeDays));

  const enabled = input.policy.enabled;
  const maxDiscount = clamp(Number(input.policy.maxDiscountPct ?? 0), 0, 95);
  const minMarginPct = Number(input.policy.minMarginPct ?? 0);
  const bufferDays = clamp(Number(input.policy.bufferDays ?? 0), 0, 30);
  const targetSell = clamp(Number(input.policy.targetSellthroughPct ?? 1), 0, 1);
  const lookbackDays = clamp(Number(input.policy.lookbackDays ?? 7), 1, 60);

  if (!enabled) {
    return { needsSpecial: false, recommendedDiscountPct: 0, requiredRate: null, salesRate: null, daysLeft: null, floorPrice: null };
  }
  if (!price || price <= 0) {
    return { needsSpecial: false, recommendedDiscountPct: 0, requiredRate: null, salesRate: null, daysLeft: null, floorPrice: null };
  }
  if (!estDays || estDays <= 0) {
    // No days-left estimate => don't auto-discount
    return { needsSpecial: false, recommendedDiscountPct: 0, requiredRate: null, salesRate: null, daysLeft: null, floorPrice: null };
  }
  if (stock <= 0) {
    return { needsSpecial: false, recommendedDiscountPct: 0, requiredRate: 0, salesRate: 0, daysLeft: estDays, floorPrice: null };
  }

  const daysLeft = Math.max(1, Math.floor(estDays - bufferDays));

  const requiredRate = (stock * targetSell) / daysLeft; // units/day
  const salesRate = (Number(input.recentUnits ?? 0) / lookbackDays); // units/day

  // If selling fast enough -> no special needed
  if (salesRate >= requiredRate) {
    return { needsSpecial: false, recommendedDiscountPct: 0, requiredRate, salesRate, daysLeft, floorPrice: null };
  }

  // Margin floor handling (optional until cost is set)
  let effectiveMaxDiscount = maxDiscount;
  let floorPrice: number | null = null;

  if (cost !== null && cost >= 0) {
    floorPrice = cost * (1 + minMarginPct / 100);
    const maxByMargin = 1 - floorPrice / price; // fraction
    effectiveMaxDiscount = Math.min(maxDiscount, Math.floor(clamp(maxByMargin, 0, 0.95) * 100));
    if (effectiveMaxDiscount < 0) effectiveMaxDiscount = 0;
  }

  if (effectiveMaxDiscount <= 0) {
    // Can't discount without breaking policy floor (or maxDiscount=0)
    return { needsSpecial: true, recommendedDiscountPct: 0, requiredRate, salesRate, daysLeft, floorPrice };
  }

  const urgency = clamp((requiredRate - salesRate) / Math.max(requiredRate, 0.0001), 0, 1);
  const recommendedDiscountPct = clamp(Math.round(urgency * effectiveMaxDiscount), 0, effectiveMaxDiscount);

  return {
    needsSpecial: recommendedDiscountPct > 0,
    recommendedDiscountPct,
    requiredRate,
    salesRate,
    daysLeft,
    floorPrice,
  };
}

export async function GET(req: Request) {
  const supabase = supabaseAdmin;
  const url = new URL(req.url);

  const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));
  const pageSize = Math.min(100, Math.max(5, Number(url.searchParams.get("pageSize") ?? DEFAULT_PAGE_SIZE)));
  const q = (url.searchParams.get("q") ?? "").trim();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  // 1) Fetch products for this page
  const productsQuery = supabase
    .from("products")
    .select("id, name, price, image_url, created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (q) productsQuery.ilike("name", `%${q}%`);

  const { data: products, error: pErr, count } = await productsQuery;
  if (pErr) return NextResponse.json({ error: pErr.message }, { status: 500 });

  const ids = (products ?? []).map((p: any) => String(p.id));

  const nowIso = new Date().toISOString();

  // 2) Parallel fetch: inventory + policy + all-time summary + active specials + recent order items
  const invPromise = ids.length
    ? supabase
        .from("product_inventory")
        .select("product_id, stock_on_hand, est_shelf_life_days, cost_price, updated_at")
        .in("product_id", ids)
    : Promise.resolve({ data: [], error: null } as any);

  const policyPromise = ids.length
    ? supabase
        .from("product_pricing_policy")
        .select("product_id, max_discount_pct, min_margin_pct, buffer_days, target_sellthrough_pct, lookback_days, enabled")
        .in("product_id", ids)
    : Promise.resolve({ data: [], error: null } as any);

  const summaryPromise = ids.length
    ? supabase.from("product_sales_summary").select("product_id, orders_count, units_sold, revenue").in("product_id", ids)
    : Promise.resolve({ data: [], error: null } as any);

  const activeSpecialsPromise = ids.length
    ? supabase
        .from("product_specials")
        .select("id, product_id, discount_pct, special_price, starts_at, ends_at")
        .in("product_id", ids)
        .lte("starts_at", nowIso)
        .gte("ends_at", nowIso)
    : Promise.resolve({ data: [], error: null } as any);

  // For per-product lookbackDays, fetch up to MAX lookback across policies; default 7 if none yet
  const [{ data: invRows, error: iErr }, { data: policyRows, error: polErr }, { data: sums, error: sErr }, { data: actives, error: aErr }] =
    await Promise.all([invPromise, policyPromise, summaryPromise, activeSpecialsPromise]);

  if (iErr) return NextResponse.json({ error: iErr.message }, { status: 500 });
  if (polErr) return NextResponse.json({ error: polErr.message }, { status: 500 });
  if (sErr) return NextResponse.json({ error: sErr.message }, { status: 500 });
  if (aErr) return NextResponse.json({ error: aErr.message }, { status: 500 });

  const invById = new Map<string, any>();
  (invRows ?? []).forEach((r: any) => invById.set(String(r.product_id), r));

  const polById = new Map<string, any>();
  (policyRows ?? []).forEach((r: any) => polById.set(String(r.product_id), r));

  const sumById = new Map<string, any>();
  (sums ?? []).forEach((r: any) => sumById.set(String(r.product_id), r));

  const activeById = new Map<string, any>();
  (actives ?? []).forEach((r: any) => activeById.set(String(r.product_id), r));

  const maxLookback =
    Math.max(
      7,
      ...(ids.map((id) => Number(polById.get(id)?.lookback_days ?? 7)).filter((n) => Number.isFinite(n)) as number[])
    ) || 7;

  const sinceIso = new Date(Date.now() - maxLookback * 24 * 60 * 60 * 1000).toISOString();

  const recentPromise = ids.length
    ? supabase
        .from("orders_items")
        .select("product_id, quantity, orders!inner(created_at)")
        .in("product_id", ids as any)
        .gte("orders.created_at", sinceIso)
    : Promise.resolve({ data: [], error: null } as any);

  const { data: recentRows, error: rErr } = await recentPromise;
  if (rErr) return NextResponse.json({ error: rErr.message }, { status: 500 });

  // Compute per product: units in its lookback window
  const recentUnitsById = new Map<string, number>();
  for (const row of recentRows ?? []) {
    const pid = String((row as any).product_id);
    const qty = Number((row as any).quantity ?? 0);
    const createdAt = new Date((row as any).orders?.created_at ?? 0).getTime();
    if (!Number.isFinite(createdAt)) continue;

    const lookbackDays = clamp(Number(polById.get(pid)?.lookback_days ?? 7), 1, 60);
    const threshold = Date.now() - lookbackDays * 24 * 60 * 60 * 1000;
    if (createdAt < threshold) continue;

    recentUnitsById.set(pid, (recentUnitsById.get(pid) ?? 0) + qty);
  }

  const items = (products ?? []).map((p: any) => {
    const id = String(p.id);
    const inv = invById.get(id);
    const pol = polById.get(id);

    const policy = {
      enabled: pol?.enabled ?? true,
      maxDiscountPct: pol?.max_discount_pct ?? 0,
      minMarginPct: pol?.min_margin_pct ?? 0,
      bufferDays: pol?.buffer_days ?? 0,
      targetSellthroughPct: pol?.target_sellthrough_pct ?? 1,
      lookbackDays: pol?.lookback_days ?? 7,
    };

    const stockOnHand = inv?.stock_on_hand ?? 0;
    const estShelfLifeDays = inv?.est_shelf_life_days ?? null;
    const costPrice = inv?.cost_price ?? null;

    const summary = sumById.get(id);
    const ordersCount = Number(summary?.orders_count ?? 0);
    const unitsSold = Number(summary?.units_sold ?? 0);
    const revenue = Number(summary?.revenue ?? 0);

    const recentUnits = recentUnitsById.get(id) ?? 0;

    const rec = computeRecommendation({
      price: p.price ?? null,
      stockOnHand,
      estShelfLifeDays,
      costPrice,
      policy,
      recentUnits,
    });

    const active = activeById.get(id) ?? null;

    const price = p.price ? Number(p.price) : null;
    const grossMarginPct =
      price && costPrice !== null && Number(costPrice) >= 0 ? ((price - Number(costPrice)) / price) * 100 : null;

    return {
      id,
      name: p.name ?? "",
      images: normalizeImages(p.image_url),
      price,
      costPrice,
      grossMarginPct,
      stockOnHand,
      estShelfLifeDays,
      inventoryUpdatedAt: inv?.updated_at ?? null,

      ordersCount,
      unitsSold,
      revenue,

      policy,
      recentUnits,

      recommendation: {
        needsSpecial: rec.needsSpecial,
        recommendedDiscountPct: rec.recommendedDiscountPct,
        requiredRate: rec.requiredRate,
        salesRate: rec.salesRate,
        daysLeft: rec.daysLeft,
        floorPrice: rec.floorPrice,
      },

      activeSpecial: active
        ? {
            id: active.id,
            discountPct: active.discount_pct,
            specialPrice: active.special_price,
            startsAt: active.starts_at,
            endsAt: active.ends_at,
          }
        : null,
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
