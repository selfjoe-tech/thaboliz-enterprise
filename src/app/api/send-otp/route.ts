// app/api/auth/request-otp/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const INFOBIP_API_KEY = process.env.INFOBIP_API_KEY;
const INFOBIP_SENDER = process.env.INFOBIP_SENDER || "InfoSMS";
const OTP_TTL_SECONDS = Number(process.env.OTP_TTL_SECONDS ?? 300);
const OTP_LENGTH = Number(process.env.OTP_LENGTH ?? 6);
const SALT_ROUNDS = 10;

// minimal throttle config (per phone)
const MIN_MS_BETWEEN_REQUESTS = 60 * 1000; // 1 minute

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE env keys for request-otp route");
}

if (!INFOBIP_API_KEY) {
  console.warn("INFOBIP_API_KEY not set — SMS sending will fail");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function genOtp(length = 6) {
  const max = 10 ** length;
  const num = crypto.randomInt(0, max);
  return String(num).padStart(length, "0");
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const phone = (body?.phone || "").toString().trim();

    if (!phone) {
      return NextResponse.json({ error: "phone is required (E.164 recommended)" }, { status: 400 });
    }

    // check existing OTP row to enforce minimal throttle
    const { data: existing, error: fetchErr } = await supabase
      .from("otp_requests")
      .select("phone, created_at, expires_at")
      .eq("phone", phone)
      .maybeSingle();

    if (fetchErr) {
      console.error("[request-otp] supabase fetch error:", fetchErr);
      // keep going — we don't want to fail open, but be conservative
    } else if (existing) {
      // Use created_at (or expires_at fallback) to determine recent request
      const createdTs = existing.created_at ? new Date(existing.created_at).getTime() : 0;
      const now = Date.now();
      if (createdTs && now - createdTs < MIN_MS_BETWEEN_REQUESTS) {
        const waitMs = MIN_MS_BETWEEN_REQUESTS - (now - createdTs);
        return NextResponse.json(
          { error: "Too many OTP requests. Try again shortly.", retry_after_ms: waitMs },
          { status: 429 }
        );
      }
    }

    // generate OTP and hash it
    const otp = genOtp(OTP_LENGTH);
    const hash = await bcrypt.hash(otp, SALT_ROUNDS);
    const expiresAtIso = new Date(Date.now() + OTP_TTL_SECONDS * 1000).toISOString();

    // upsert into otp_requests table (phone primary key)
    const upsertPayload = {
      phone,
      otp_hash: hash,
      expires_at: expiresAtIso,
      attempts: 0,
      // created_at will be set by DB default if configured; otherwise Supabase will set it
    };

    const { error: upsertErr } = await supabase
      .from("otp_requests")
      .upsert(upsertPayload, { onConflict: "phone" });

    if (upsertErr) {
      console.error("[request-otp] supabase upsert error:", upsertErr);
      return NextResponse.json({ error: "Failed to persist OTP" }, { status: 500 });
    }

    // Build Infobip payload
    const payload = {
      messages: [
        {
          from: INFOBIP_SENDER,
          destinations: [{ to: phone }],
          text: `THE FRUIT BASKET. Your verification code is ${otp}. It will expire in ${Math.floor(OTP_TTL_SECONDS / 60)} minutes.`,
        },
      ],
    };

    // Send SMS via Infobip
    try {
      const response = await axios.post(
        "https://api.infobip.com/sms/2/text/advanced",
        payload,
        {
          timeout: 10000,
          headers: {
            Authorization:
              INFOBIP_API_KEY && INFOBIP_API_KEY.startsWith("App ")
                ? INFOBIP_API_KEY
                : `App ${INFOBIP_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("[request-otp] OTP sent to", phone);
      // do not return OTP in production; this is only useful for local debugging
      const isDev = process.env.NODE_ENV !== "production";
      return NextResponse.json(
        {
          ok: true,
          message: "OTP sent (if the phone is reachable).",
          // debug: only for non-prod
          ...(isDev ? { debugOtp: otp } : {}),
          sendResponse: isDev ? response.data : undefined,
        },
        { status: 200 }
      );
    } catch (sendErr) {
      console.error("[request-otp] Infobip send error:", sendErr?.response?.data ?? sendErr?.message ?? sendErr);

      // remove persisted OTP on failure so user can retry right away
      try {
        await supabase.from("otp_requests").delete().eq("phone", phone);
      } catch (delErr) {
        console.error("[request-otp] Failed to delete OTP row after send failure:", delErr);
      }

      return NextResponse.json(
        { error: "Failed to send OTP", details: sendErr?.response?.data ?? sendErr?.message ?? String(sendErr) },
        { status: 500 }
      );
    }
  } catch (err: any) {
    console.error("[request-otp] unexpected error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}











// // pages/api/send-otp.js  (App Router POST handler)
// import axios from "axios";
// import bcrypt from "bcryptjs";
// import crypto from "crypto";

// const INFOBIP_API_KEY = process.env.INFOBIP_API_KEY;
// const INFOBIP_SENDER = process.env.INFOBIP_SENDER || "InfoSMS";
// const OTP_TTL = Number(process.env.OTP_TTL_SECONDS || 300);
// const OTP_LENGTH = Number(process.env.OTP_LENGTH || 6);

// const otpStore = global.__OTP_STORE__ || new Map();
// global.__OTP_STORE__ = otpStore;

// // also keep sendRateMap global for consistency
// const sendRateMap = global.__SEND_RATE_MAP__ || new Map();
// global.__SEND_RATE_MAP__ = sendRateMap;

// function genOtp(length = 6) {
//   const max = 10 ** length;
//   const num = crypto.randomInt(0, max);
//   return String(num).padStart(length, "0");
// }

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const phone = body?.phone;

//     if (!phone) {
//       return new Response(JSON.stringify({ error: "phone is required (E.164 recommended)" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // rate limiting
//     const HOUR_MS = 60 * 60 * 1000;
//     const now = Date.now();
//     const r = sendRateMap.get(phone) || { count: 0, firstRequestTs: now };
//     if (now - r.firstRequestTs > HOUR_MS) {
//       r.count = 0;
//       r.firstRequestTs = now;
//     }
//     r.count += 1;
//     sendRateMap.set(phone, r);
//     if (r.count > 5) {
//       return new Response(JSON.stringify({ error: "Too many OTP requests for this phone. Try again later." }), {
//         status: 429,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // generate + store OTP
//     const otp = genOtp(OTP_LENGTH);
//     const hash = await bcrypt.hash(otp, 10);
//     const expiresAt = Date.now() + OTP_TTL * 1000;
//     otpStore.set(phone, { hash, expiresAt, attempts: 0 });

//     const payload = {
//       messages: [
//         {
//           from: INFOBIP_SENDER,
//           destinations: [{ to: phone }],
//           text: `THE FRUIT BASKET. Your verification code is ${otp}. It will expire in ${Math.floor(OTP_TTL / 60)} minutes.`,
//         },
//       ],
//     };

//     const response = await axios.post(`https://api.infobip.com/sms/2/text/advanced`, payload, {
//       headers: {
//         Authorization: INFOBIP_API_KEY && INFOBIP_API_KEY.startsWith("App ")
//           ? INFOBIP_API_KEY
//           : `App ${INFOBIP_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       timeout: 10000,
//     });

//     console.log("OTP SENT to", phone);

//     return new Response(
//       JSON.stringify({ ok: true, message: "OTP sent (if the phone is reachable).", sendResponse: response.data }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//   } catch (err) {
//     console.error("send-otp error:", err?.response?.data ?? err?.message ?? err);

//     // Remove stored OTP on failure
//     try {
//       const body = await req.json().catch(() => ({}));
//       if (body?.phone) otpStore.delete(body.phone);
//     } catch (_) {}

//     return new Response(
//       JSON.stringify({ error: "Failed to send OTP", details: err?.response?.data ?? err?.message ?? String(err) }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
