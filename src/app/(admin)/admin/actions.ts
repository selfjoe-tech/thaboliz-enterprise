"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

function toInt(n: any, fallback: number) {
  const v = Number.parseInt(String(n ?? ""), 10);
  return Number.isFinite(v) ? v : fallback;
}


export async function updateInventoryAction(input: {
  productId: string;
  stockOnHand: number;
  estShelfLifeDays: number | null;
  costPrice: number | null;
}) {
  const supabase = supabaseAdmin;

  const productId = String(input.productId);
  const stockOnHand = Math.max(0, toInt(input.stockOnHand, 0));
  const estShelfLifeDays =
    input.estShelfLifeDays === null ? null : Math.max(0, toInt(input.estShelfLifeDays, 0));
  const costPrice = input.costPrice === null ? null : Math.max(0, Number(input.costPrice));

  const { error } = await supabase
    .from("product_inventory")
    .upsert(
      {
        product_id: productId,
        stock_on_hand: stockOnHand,
        est_shelf_life_days: estShelfLifeDays,
        cost_price: costPrice,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "product_id" }
    );

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/inventory");
  revalidatePath("/admin/product-analytics");
  return { ok: true };
}

export async function upsertProductPolicyAction(input: {
  productId: string;
  maxDiscountPct: number;
  minMarginPct: number;
  bufferDays: number;
  targetSellthroughPct: number;
  lookbackDays: number;
  enabled: boolean;
}) {
  const supabase = supabaseAdmin;

  const payload = {
    product_id: String(input.productId),
    max_discount_pct: Math.min(95, Math.max(0, toInt(input.maxDiscountPct, 0))),
    min_margin_pct: Math.max(-100, Math.min(500, Number(input.minMarginPct))),
    buffer_days: Math.min(30, Math.max(0, toInt(input.bufferDays, 0))),
    target_sellthrough_pct: Math.min(1, Math.max(0, Number(input.targetSellthroughPct))),
    lookback_days: Math.min(60, Math.max(1, toInt(input.lookbackDays, 7))),
    enabled: Boolean(input.enabled),
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase.from("product_pricing_policy").upsert(payload, { onConflict: "product_id" });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/product-analytics");
  return { ok: true };
}

export async function applyProductSpecialAction(input: {
  productId: string;
  discountPct: number;
  endsAtISO: string; // timestamptz string
}) {
  const supabase = supabaseAdmin;

  const productId = String(input.productId);
  const discountPct = Math.min(95, Math.max(0, toInt(input.discountPct, 0)));

  // Fetch current product price
  const { data: prod, error: pErr } = await supabase
    .from("products")
    .select("id, price")
    .eq("id", productId as any)
    .maybeSingle();

  if (pErr) return { ok: false, error: pErr.message };
  if (!prod?.price) return { ok: false, error: "Product price missing" };

  const normalPrice = Number(prod.price);
  const specialPrice = Number((normalPrice * (1 - discountPct / 100)).toFixed(2));

  // End any currently active specials for this product
  const nowIso = new Date().toISOString();
  await supabase
    .from("product_specials")
    .update({ ends_at: nowIso })
    .eq("product_id", productId)
    .gte("ends_at", nowIso);

  const { error } = await supabase.from("product_specials").insert({
    product_id: productId,
    discount_pct: discountPct,
    special_price: specialPrice,
    starts_at: nowIso,
    ends_at: input.endsAtISO,
  });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/product-analytics");
  return { ok: true };
}


function clampText(s: string, max: number) {
  const t = (s ?? "").trim();
  return t.length > max ? t.slice(0, max) : t;
}

export async function updateSpecialPromoTextAction(input: {
  specialId: string;
  promoText: string;
}) {
  const supabase = supabaseAdmin;
  const promoText = clampText(input.promoText, 120);

  const { error } = await supabase
    .from("product_specials")
    .update({ promo_text: promoText })
    .eq("id", input.specialId);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/specials");
  revalidatePath("/admin/product-analytics");
  return { ok: true };
}

export async function endSpecialNowAction(input: { specialId: string }) {
  const supabase = supabaseAdmin;
  const nowIso = new Date().toISOString();

  const { error } = await supabase
    .from("product_specials")
    .update({ ends_at: nowIso })
    .eq("id", input.specialId);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/specials");
  revalidatePath("/admin/product-analytics");
  return { ok: true };
}



export async function updateSpecialEndTimeAction(input: {
  specialId: string;
  endsAtISO: string;
}) {
  const supabase = supabaseAdmin;
  const nowIso = new Date().toISOString();

  // guard: must end in the future (or you can allow ending immediately)
  if (new Date(input.endsAtISO).getTime() <= new Date(nowIso).getTime()) {
    return { ok: false, error: "End time must be in the future" };
  }

  const { error } = await supabase
    .from("product_specials")
    .update({ ends_at: input.endsAtISO })
    .eq("id", input.specialId);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/specials");
  revalidatePath("/admin/product-analytics");
  return { ok: true };
}