// app/api/auth/request-reset/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const SALT_ROUNDS = 12;
const CODE_EXP_MIN = 15; // code expiry in minutes

function gen6Digit() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmailViaSmtp(to: string, code: string) {
  // expects env: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, FROM_EMAIL
  const host = process.env.SMTP_HOST;
  if (!host) {
    // no SMTP configured — fallback to console log (useful for dev)
    console.log(`[request-reset] no SMTP configured; code for ${to}: ${code}`);
    return { ok: true, debug: true };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: !!process.env.SMTP_SECURE, // true if 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const from = process.env.FROM_EMAIL || process.env.SMTP_USER || "no-reply@example.com";

  const info = await transporter.sendMail({
    from,
    to,
    subject: "Your password reset code",
    text: `Your password reset code is: ${code}. It expires in ${CODE_EXP_MIN} minutes.`,
    html: `<p>Your password reset code is:</p><h2>${code}</h2><p>Expires in ${CODE_EXP_MIN} minutes.</p>`,
  });

  return { ok: true, info };
}

export async function POST(req: Request) {
  try {
    const { email: rawEmail } = await req.json();
    if (!rawEmail) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }
    const email = rawEmail.trim().toLowerCase();

    // check user exists in admin_auth.auth
    const { data: user, error: userErr } = await supabaseAdmin
      .schema("admin_auth")
      .from("auth")
      .select("id, email")
      .ilike("email", email)
      .maybeSingle();

    if (userErr) {
      console.error("request-reset user lookup error", userErr);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    if (!user) {
      // intentionally reveal that email doesn't exist per your requirement
      return NextResponse.json({ error: "Email doesn't exist" }, { status: 404 });
    }

    // generate code & hash it
    const code = gen6Digit();
    const codeHash = await bcrypt.hash(code, SALT_ROUNDS);
    const expiresAt = new Date(Date.now() + CODE_EXP_MIN * 60 * 1000).toISOString();

    // insert reset row
    const { error: insertErr } = await supabaseAdmin
      .schema("admin_auth")
      .from("password_resets")
      .insert([{ email, code_hash: codeHash, expires_at: expiresAt }]);

    if (insertErr) {
      console.error("request-reset insert error", insertErr);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // send code to the user email (or log)
    try {
      await sendEmailViaSmtp(email, code);
    } catch (sendErr) {
      console.error("Failed to send reset email:", sendErr);
      // still return 200 so flow can continue if you prefer — or return 500 to fail.
      return NextResponse.json({ error: "Failed to send code" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("request-reset unexpected:", err);
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
