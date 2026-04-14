import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

function sanitizeFileName(fileName: string) {
  const parts = fileName.split(".");
  const ext = parts.length > 1 ? parts.pop() : "";
  const base = parts.join(".") || "upload";

  const safeBase = base
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const safeExt = (ext || "").toLowerCase().replace(/[^a-z0-9]+/g, "");

  return safeExt ? `${safeBase}.${safeExt}` : safeBase;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: "Missing file" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = new Uint8Array(bytes);

    const safeName = sanitizeFileName(file.name || "upload");
    const objectPath = `catalogue/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${safeName}`;

    const { error } = await supabaseAdmin.storage
      .from("catalogue-images")
      .upload(objectPath, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
        cacheControl: "3600",
      });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    const { data } = supabaseAdmin.storage
      .from("catalogue-images")
      .getPublicUrl(objectPath);

    return NextResponse.json({
      success: true,
      path: objectPath,
      publicUrl: data.publicUrl,
      fileName: file.name,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}