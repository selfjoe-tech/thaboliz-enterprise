import { NextResponse } from "next/server";
import { listCatalogProducts } from "@/app/lib/actions/catalog";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const cursor = url.searchParams.get("cursor") || undefined;
    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "All";
    const limit = Number(url.searchParams.get("limit") || "12");

    const result = await listCatalogProducts({
      cursor,
      search,
      category,
      limit,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load products" },
      { status: 500 },
    );
  }
}