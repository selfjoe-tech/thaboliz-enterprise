// app/api/orders/create/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { toE164 } from "@/app/lib/actions/phone";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing supabase env keys for server route");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[orders/create] incoming body:", JSON.stringify(body));

    const {
      fulfillment,
      online_payment,
      name,
      whatsapp,
      altPhone,
      address,
      notes,
      items,
    } = body ?? {};

    // Basic validation
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Cart empty" }, { status: 400 });
    }
    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Name required" }, { status: 400 });
    }
    if (!whatsapp || typeof whatsapp !== "string") {
      return NextResponse.json({ error: "WhatsApp phone required" }, { status: 400 });
    }
    if (!["collect", "delivery"].includes(fulfillment)) {
      return NextResponse.json({ error: "Invalid fulfillment type" }, { status: 400 });
    }

    // Normalize items: keep productId as string (UUID) — do NOT Number() it
    const normalizedItems = items.map((it: any) => ({
      productId: it.productId != null ? String(it.productId) : null,
      quantity: Math.max(0, Number(it.quantity || 1)),
    })).filter((it: any) => it.productId); // remove entries missing productId

    console.log("[orders/create] normalizedItems:", JSON.stringify(normalizedItems));

    // Collect productIds as strings
    const productIds = Array.from(new Set(normalizedItems.map((i) => i.productId))).filter(Boolean);
    console.log("[orders/create] productIds:", productIds);

    // Fetch product prices for productIds (strings/UUIDs)
    let productsData: any[] = [];
    if (productIds.length > 0) {
      const { data, error, status } = await supabase
        .from("products")
        .select("id, price")
        .in("id", productIds);

      if (error) {
        console.error("[orders/create] Failed to fetch products:", error, "status:", status);
        return NextResponse.json({ error: "Failed to resolve product prices", details: error }, { status: 500 });
      }
      productsData = data ?? [];
    } else {
      console.log("[orders/create] no productIds provided (all items missing productId?)");
    }
    console.log("[orders/create] productsData:", productsData);

    // build price map (use string keys)
    const priceMap = new Map<string, number>();
    (productsData || []).forEach((p: any) => priceMap.set(String(p.id), Number(p.price ?? 0)));

    // compute total
    let computedTotal = 0;
    for (const it of normalizedItems) {
      const price = priceMap.get(String(it.productId)) ?? 0;
      computedTotal += price * (it.quantity || 0);
    }
    console.log("[orders/create] computedTotal:", computedTotal);

    // normalize phones
    const phoneNumber = toE164(whatsapp);
    const alternate_number = altPhone ? toE164(altPhone) : null;

    // build order payload — ensure we do NOT include id
    const orderPayload: any = {
      user_id: null,
      status: "pending",
      order_type: fulfillment,
      total: computedTotal,
      phoneNumber: phoneNumber, // use lowercase if your DB column is lowercase; adjust if needed
      alternate_number,
      online_payment: !!online_payment,
      name: name,
      address: address ? JSON.stringify(address) : null,
    };
    if (notes) orderPayload.notes = notes;

    console.log("[orders/create] orderPayload (inserting):", orderPayload);

    // Insert order and explicitly select id & order_number to ensure we get a row back
    const { data: orderInsertData, error: orderInsertError } = await supabase
      .from("orders")
      .insert([orderPayload])
      .select("id, order_number")
      .single();

    console.log("[orders/create] order insert result:", { orderInsertData, orderInsertError });

    if (orderInsertError) {
      console.error("[orders/create] insert error:", orderInsertError);
      return NextResponse.json({ error: "Failed to create order", details: orderInsertError }, { status: 500 });
    }
    if (!orderInsertData) {
      console.error("[orders/create] insert returned no data", orderInsertData);
      return NextResponse.json({ error: "Failed to create order: no data returned", details: orderInsertData }, { status: 500 });
    }

    const createdOrder = orderInsertData;
    console.log("[orders/create] createdOrder:", createdOrder);

    // build order_items rows (use productId strings)
    const orderItemsPayload = normalizedItems.map((it: any) => ({
      product_id: it.productId,
      quantity: it.quantity,
      order_id: createdOrder.id,
    }));
    console.log("[orders/create] orderItemsPayload:", orderItemsPayload);

    const { data: oiData, error: oiError } = await supabase
      .from("orders_items")
      .insert(orderItemsPayload);

    if (oiError) {
      console.error("[orders/create] Failed to create order items:", oiError);
      // attempt to delete created order if you want rollback (optional)
      // await supabase.from("orders").delete().eq("id", createdOrder.id);
      return NextResponse.json({ error: "Failed to create order items", details: oiError }, { status: 500 });
    }

    console.log(createdOrder.id, "<------ order id")

    // Success — return order info including order_number
    return NextResponse.json({
      ok: true,
      order: {
        id: createdOrder.id,
        order_number: createdOrder.order_number,
      },
    }, { status: 200 });
  } catch (err: any) {
    console.error("[orders/create] unexpected error:", err);
    return NextResponse.json({ error: err?.message || "Server error", details: err }, { status: 500 });
  }
}
