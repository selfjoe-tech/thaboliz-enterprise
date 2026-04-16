import { NextResponse } from "next/server";
import { listCatalogCategories } from "@/app/lib/actions/catalog";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const cursor = url.searchParams.get("cursor") || undefined;
    const limit = Number(url.searchParams.get("limit") || "10");

    const result = await listCatalogCategories({
      cursor,
      limit,
    });

    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to load categories" },
      { status: 500 },
    );
  }
}