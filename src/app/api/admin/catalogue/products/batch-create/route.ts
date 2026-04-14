import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { requireAdminPermission } from "@/lib/authz";



function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim() !== "";
}

export async function POST(req: Request) {
    const auth = await requireAdminPermission("manage_categories");
if (!auth.ok) return auth.response;
  try {
    const { items } = await req.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "No items received" },
        { status: 400 }
      );
    }

    const cleaned = [];
    const errors: string[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (!isNonEmptyString(item.title)) {
        errors.push(`Row ${i + 1}: missing title`);
        continue;
      }

      if (!isNonEmptyString(item.slug)) {
        errors.push(`Row ${i + 1}: missing slug`);
        continue;
      }

      if (!isNonEmptyString(item.external_url)) {
        errors.push(`Row ${i + 1}: missing external URL`);
        continue;
      }

      if (!Array.isArray(item.category_names) || item.category_names.length === 0) {
        errors.push(`Row ${i + 1}: missing categories`);
        continue;
        }

      const price = Number(item.price);
      if (Number.isNaN(price) || price <= 0) {
        errors.push(`Row ${i + 1}: invalid price`);
        continue;
      }

      cleaned.push({
        title: item.title.trim(),
        slug: item.slug?.trim() || item.title.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-"),        
        description: item.description ?? null,
        category_names: Array.isArray(item.category_names)
        ? item.category_names
            .map((entry: unknown) => String(entry).trim())
            .filter(Boolean)
        : [],
        retailer: item.retailer === "Makro" ? "Makro" : "Takealot",
        external_url: item.external_url.trim(),
        price,
        original_price:
          item.original_price != null && item.original_price !== ""
            ? Number(item.original_price)
            : null,
        image_url: item.image_url ?? null,
        rating: item.rating != null && item.rating !== "" ? Number(item.rating) : null,
        review_count:
          item.review_count != null && item.review_count !== ""
            ? Number(item.review_count)
            : 0,
        is_featured: !!item.is_featured,
        is_published: !!item.is_published,
        sort_order:
          item.sort_order != null && item.sort_order !== ""
            ? Number(item.sort_order)
            : 0,
      });
    }

    if (!cleaned.length) {
      return NextResponse.json(
        {
          success: false,
          error: "No valid rows to insert",
          insertedCount: 0,
          failedCount: errors.length,
          errors,
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("catalogue_products")
      .insert(cleaned)
      .select("id, title, slug");

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message, insertedCount: 0, failedCount: cleaned.length, errors },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      insertedCount: data?.length ?? cleaned.length,
      failedCount: errors.length,
      errors,
      products: data ?? [],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}