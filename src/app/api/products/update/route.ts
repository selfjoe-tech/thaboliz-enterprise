import { NextResponse } from "next/server";
import { requireTenantContext } from "@/app/lib/server/current-tenant";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function makeUniqueSlug(
  supabase: any,
  tenantId: string,
  title: string,
  excludeId?: string,
) {
  const base = slugify(title) || "product";
  let candidate = base;
  let counter = 2;

  while (true) {
    let query = supabase
      .from("products")
      .select("id")
      .eq("tenant_id", tenantId)
      .eq("slug", candidate);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data, error } = await query.maybeSingle();

    if (error) throw error;
    if (!data) return candidate;

    candidate = `${base}-${counter}`;
    counter += 1;
  }
}

function normalizeStatus(input?: string) {
  if (input === "active" || input === "published") return "active";
  if (input === "archived") return "archived";
  return "draft";
}

export async function POST(request: Request) {
  try {
    const { supabase, tenantId, user } = await requireTenantContext();
    const body = await request.json();

    const id = String(body.id ?? "").trim();
    const title = String(body.title ?? "").trim();

    if (!id || !title) {
      return NextResponse.json(
        { success: false, error: "Product id and title are required" },
        { status: 400 },
      );
    }

    const externalUrl =
      typeof body.externalUrl === "string" && body.externalUrl.trim()
        ? body.externalUrl.trim()
        : null;

    const purchaseMode = externalUrl ? "external" : "internal";
    const inventoryMode = body.inventoryMode === "untracked" ? "untracked" : "tracked";
    const stockQuantity =
      inventoryMode === "tracked" ? Math.max(0, Number(body.stockQuantity ?? 0)) : null;

    const stockStatus =
      inventoryMode === "tracked"
        ? stockQuantity && stockQuantity > 0
          ? "in_stock"
          : "out_of_stock"
        : body.stockStatus === "preorder"
        ? "preorder"
        : body.stockStatus === "out_of_stock"
        ? "out_of_stock"
        : "in_stock";

    const slug = await makeUniqueSlug(supabase, tenantId, title, id);


    const categories = Array.isArray(body.categories)
  ? body.categories
      .map((item: unknown) => String(item).trim())
      .filter(Boolean)
  : [];


    const { data, error } = await supabase
    .from("products")
    .update({
      title,
      slug,
      description: body.description || null,
      categories,
      sku: body.sku || null,
      status: normalizeStatus(body.status),
      purchase_mode: purchaseMode,
      inventory_mode: inventoryMode,
      price: body.price != null ? Number(body.price) : null,
      compare_at_price: body.compareAtPrice != null ? Number(body.compareAtPrice) : null,
      stock_quantity: stockQuantity,
      stock_status: stockStatus,
      external_url: externalUrl,
      cover_image_url: body.coverImageUrl || null,
      updated_by_user_id: user.id,
    })
    .eq("tenant_id", tenantId)
    .eq("id", id)
    .select()
    .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, product: data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Unexpected error" },
      { status: 500 },
    );
  }
}