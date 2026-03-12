import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendContactEmail } from "@/lib/contact-mail";
import { verifyTurnstileToken } from "@/lib/turnstile";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(30),
  company: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10).max(3000),
  website: z.string().trim().max(200).optional().default(""), // honeypot
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().min(1),
});

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }

  return request.headers.get("x-real-ip") ?? undefined;
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) return true;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!isSameOrigin(request)) {
      return NextResponse.json(
        { error: "Invalid request origin." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check your form and try again." },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot: bots often fill hidden fields
    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    // Time trap: very fast submissions are suspicious
    const secondsSinceStart = (Date.now() - data.startedAt) / 1000;

    if (secondsSinceStart < 3) {
      return NextResponse.json(
        { error: "Submission was too fast. Please try again." },
        { status: 400 }
      );
    }

    // Expire very old forms
    if (secondsSinceStart > 60 * 60 * 2) {
      return NextResponse.json(
        { error: "This form expired. Please refresh and try again." },
        { status: 400 }
      );
    }

    const turnstile = await verifyTurnstileToken({
      token: data.turnstileToken,
      ip: getClientIp(request),
    });

    if (!turnstile.ok) {
      return NextResponse.json(
        { error: "Security verification failed. Please try again." },
        { status: 400 }
      );
    }

    await sendContactEmail({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);

    return NextResponse.json(
      { error: "Unable to send your message right now." },
      { status: 500 }
    );
  }
}