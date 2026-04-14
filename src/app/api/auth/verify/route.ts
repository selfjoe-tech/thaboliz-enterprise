import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "This route is retired. Use NextAuth signIn from the login form instead.",
    },
    { status: 410 }
  );
}