// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies() as any;

    // Clear cookies by setting empty value and maxAge 0 (also preserve path + sameSite + secure)
    const cookieOptions = {
      path: "/",
      sameSite: "lax" as const,
      secure: process.env.NODE_ENV === "production",
    };

    // List cookie names you want to clear
    const cookieNames = ["session", "session_exp", "admin_id"];

    for (const name of cookieNames) {
      cookieStore.set({
        name,
        value: "",
        // deletes effectively
        maxAge: 0,
        ...cookieOptions,
      });
    }

    // Optionally you can return a redirect here:
    // return NextResponse.redirect(new URL("/admin-login", req.url));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Logout error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
