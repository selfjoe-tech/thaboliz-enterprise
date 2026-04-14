// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { numberExists } from "@/app/lib/auth";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });

const OTP_MAX_ATTEMPTS = 5;

export async function POST(req: Request) {
  try {
    const { phone, otp } = await req.json();
    if (!phone || !otp) return NextResponse.json({ error: "phone and otp are required" }, { status: 400 });

    // fetch record
    const { data, error } = await supabase
      .from("otp_requests")
      .select("phone, otp_hash, expires_at, attempts")
      .eq("phone", phone)
      .maybeSingle();

    if (error) {
      console.error("verify-otp fetch error:", error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "No OTP request found for this phone (or it expired)" }, { status: 400 });
    }

    const { otp_hash, expires_at, attempts } = data as any;

    if (new Date() > new Date(expires_at)) {
      // delete expired
      await supabase.from("otp_requests").delete().eq("phone", phone);
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    if (attempts >= OTP_MAX_ATTEMPTS) {
      await supabase.from("otp_requests").delete().eq("phone", phone);
      return NextResponse.json({ error: "Too many failed attempts. Request a new code." }, { status: 429 });
    }

    const match = await bcrypt.compare(String(otp), otp_hash);
    if (!match) {
      // increment attempts
      await supabase.from("otp_requests").update({ attempts: attempts + 1 }).eq("phone", phone);
      return NextResponse.json({ error: "Invalid OTP", attemptsLeft: OTP_MAX_ATTEMPTS - (attempts + 1) }, { status: 400 });
    }

    // success: delete row so otp cannot be reused
    await supabase.from("otp_requests").delete().eq("phone", phone);

    // now check user (re-use your numberExists function)
    // const userObject = await numberExists(phone); // call your existing helper
    // return NextResponse.json({...}) accordingly

const userObject = await numberExists(phone);
    console.log(userObject)

    if (userObject && userObject.exists) {
      return new Response(
        JSON.stringify({
          ok: true,
          exists: true,
          message: "Phone verified — user exists",
          profile: userObject.profile ?? null,
          cart: userObject.cart ?? [],
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          ok: true,
          exists: false,
          message: "Phone verified — new user",
          phoneNumber: phone,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } } catch(err ) {
        console.error("verify-otp error:", err);
      return new Response(JSON.stringify({ error: "Server error while verifying OTP" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
    
  




// // pages/api/verify-otp.js
// import bcrypt from "bcryptjs";
// import { numberExists } from "@/app/lib/auth"; // server helper that returns { exists, profile, cart }
  
// const OTP_MAX_ATTEMPTS = 5;
// const otpStore = global.__OTP_STORE__ || new Map(); // in demo we re-use same store if available
// global.__OTP_STORE__ = otpStore;

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const phone = body?.phone;
//     const otp = body?.otp;

//     if (!phone || !otp) {
//       return new Response(JSON.stringify({ error: "phone and otp are required" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const entry = otpStore.get(phone);
//     if (!entry) {
//       return new Response(JSON.stringify({ error: "No OTP request found for this phone (or it expired)" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const now = Date.now();
//     if (now > entry.expiresAt) {
//       otpStore.delete(phone);
//       return new Response(JSON.stringify({ error: "OTP expired" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     if (entry.attempts >= OTP_MAX_ATTEMPTS) {
//       otpStore.delete(phone);
//       return new Response(JSON.stringify({ error: "Too many failed attempts. Request a new code." }), {
//         status: 429,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     const match = await bcrypt.compare(otp, entry.hash);
//     if (!match) {
//       entry.attempts += 1;
//       otpStore.set(phone, entry);
//       return new Response(JSON.stringify({ error: "Invalid OTP", attemptsLeft: OTP_MAX_ATTEMPTS - entry.attempts }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // success: delete stored OTP so it can't be reused
//     otpStore.delete(phone);

//     // Check if user exists and fetch profile + cart if so.
//     // numberExists should return an object like:
//     // { exists: true, profile: { id, name, phoneNumber, cart_id }, cart: [ ... ] }
//     // or { exists: false } when not found.
//     const userObject = await numberExists(phone);
//     console.log(userObject)

//     if (userObject && userObject.exists) {
//       // user exists: return profile + cart to client so frontend can populate Zustand
//       return new Response(
//         JSON.stringify({
//           ok: true,
//           exists: true,
//           message: "Phone verified — user exists",
//           profile: userObject.profile ?? null,
//           cart: userObject.cart ?? [],
//         }),
//         {
//           status: 200,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     } else {
//       // user does not exist: return phoneNumber so client can show register flow
//       return new Response(
//         JSON.stringify({
//           ok: true,
//           exists: false,
//           message: "Phone verified — new user",
//           phoneNumber: phone,
//         }),
//         {
//           status: 200,
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//     }
//   } catch (err) {
//     console.error("verify-otp error:", err);
//     return new Response(JSON.stringify({ error: "Server error while verifying OTP" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

















// // pages/api/verify-otp.js
// import bcrypt from "bcryptjs";
// import { numberExists } from "@/app/lib/auth";


// const OTP_MAX_ATTEMPTS = 5;
// const otpStore = global.__OTP_STORE__ || new Map(); // in demo we re-use same store if available
// global.__OTP_STORE__ = otpStore;

// export async function POST(req) {
  
//   const body = await req.json();
//   const phone = body?.phone;
//   const otp = body?.otp;

//   if (!phone || !otp) {
//     return new Response(JSON.stringify({ error: "phone and otp are required" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//   }
  

//   const entry = otpStore.get(phone);
//   if (!entry) {
//     return new Response(JSON.stringify({ error: "No OTP request found for this phone (or it expired)" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//   }
  

//   const now = Date.now();
//   if (now > entry.expiresAt) {
//     otpStore.delete(phone);
//     return new Response(JSON.stringify({ error: "OTP expired" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//   }

//   if (entry.attempts >= OTP_MAX_ATTEMPTS) {
//     otpStore.delete(phone);
//     return new Response(JSON.stringify({ error: "Too many failed attempts. Request a new code." }), {
//         status: 429,
//         headers: { "Content-Type": "application/json" },
//       });
//   }

//   const match = await bcrypt.compare(otp, entry.hash);
//   if (!match) {
//     entry.attempts += 1;
//     otpStore.set(phone, entry);
//     return new Response(JSON.stringify({error: "Invalid OTP", attemptsLeft: OTP_MAX_ATTEMPTS - entry.attempts }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//   }

//   // success: delete stored OTP
  
  
  



  


//   // At this point you can create a session token / issue JWT / mark phone verified in DB
  
// }
