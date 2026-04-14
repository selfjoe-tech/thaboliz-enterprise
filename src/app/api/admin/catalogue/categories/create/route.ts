import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { requireAdminPermission } from "@/lib/authz";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: Request) {
  const auth = await requireAdminPermission("manage_categories");
  if (!auth.ok) return auth.response;
  try {
    const body = await req.json();
    const name = String(body?.name ?? "").trim();
    const description =
      typeof body?.description === "string" ? body.description.trim() : "";
    const slug = String(body?.slug ?? slugify(name)).trim();
    const sort_order = Number(body?.sort_order ?? 0);

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("catalogue_categories")
      .insert([
        {
          name,
          slug,
          description: description || null,
          sort_order: Number.isNaN(sort_order) ? 0 : sort_order,
          is_active: true,
        },
      ])
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error:
            error.message.includes("duplicate") ||
            error.message.includes("unique")
              ? "Category already exists"
              : error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, category: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}