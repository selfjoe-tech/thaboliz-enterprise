import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import { extractObjectPathFromPublicUrl } from "@/app/lib/actions/dashboard-info/storage-utils";

export async function POST(req: Request) {
  try {
    const { publicUrl } = await req.json();

    if (!publicUrl) {
      return NextResponse.json(
        { success: false, error: "Missing publicUrl" },
        { status: 400 }
      );
    }

    const objectPath = extractObjectPathFromPublicUrl(publicUrl);

    if (!objectPath) {
      return NextResponse.json(
        { success: false, error: "Could not extract object path" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin.storage
      .from("catalogue-images")
      .remove([objectPath]);

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, path: objectPath });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}