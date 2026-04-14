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
    const id = String(body?.id ?? "").trim();
    const name = String(body?.name ?? "").trim();
    const description =
      typeof body?.description === "string" ? body.description.trim() : "";
    const slug = String(body?.slug ?? slugify(name)).trim();
    const is_active =
      typeof body?.is_active === "boolean" ? body.is_active : undefined;
    const sort_order = Number(body?.sort_order ?? 0);

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id" },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Name is required" },
        { status: 400 }
      );
    }

    const { data: current, error: fetchError } = await supabaseAdmin
      .from("catalogue_categories")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !current) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("catalogue_categories")
      .update({
        name,
        slug,
        description: description || null,
        sort_order: Number.isNaN(sort_order) ? 0 : sort_order,
        ...(typeof is_active === "boolean" ? { is_active } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
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

    if (current.name !== name) {
      const { error: productsError } = await supabaseAdmin
        .from("catalogue_products")
        .update({
          category_names: [],
        })
        .eq("id", "__never__");

      void productsError;
      await supabaseAdmin.rpc("exec_sql", {
        sql: `
          update public.catalogue_products
          set category_names = array_replace(category_names, ${JSON.stringify(
            current.name
          )}, ${JSON.stringify(name)})
          where category_names @> array[${JSON.stringify(current.name)}]::text[];
        `,
      }).catch(async () => {
        const { data: products } = await supabaseAdmin
          .from("catalogue_products")
          .select("id, category_names")
          .contains("category_names", [current.name]);

        for (const product of products ?? []) {
          const next = (product.category_names ?? []).map((entry: string) =>
            entry === current.name ? name : entry
          );

          await supabaseAdmin
            .from("catalogue_products")
            .update({ category_names: next })
            .eq("id", product.id);
        }
      });
    }

    return NextResponse.json({ success: true, category: data });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}