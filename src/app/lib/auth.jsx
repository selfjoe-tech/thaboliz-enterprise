// lib/auth.js

"use server";

import { createClient } from "@supabase/supabase-js";
import cookie from "cookie";
import { redirect } from "next/navigation";
import { useStore } from "@/app/lib/ZustandManager"; // adjust path if needed




if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
}
if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET env var");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const SESSION_COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "session";
const SESSION_MAX_AGE_SECONDS = Number(process.env.SESSION_MAX_AGE_SECONDS || 60 * 60 * 24 * 7); // default 7 days

/**
 * Check if a phone exists in `profile` table.
 * Returns: { exists: boolean, profile: object | null }
 * - phone must match the stored 'phoneNumber' value (use the same format your DB stores)
 */
// lib/auth.js (or wherever supabase client lives)
// export async function numberExists(phone) {
//   if (!phone) return false;

//   // Normalize phone: remove non-digits so we always query the same canonical form
//   const normalized = phone.toString().replace(/\D/g, "");
//   if (!normalized) return false;

//   try {
//     // select only id (lightweight). maybeSingle returns data=null when no row exists.
//     const { data, error } = await supabase
//       .from("profile")
//       .select("id")
//       .eq("phoneNumber", normalized)
//       .maybeSingle();


//     // data is the row if found, or null if not
//     if (data) {
//       console.log(data)
//       return true
//     } else {
//       return false
//     }


//   } catch (err) {
//     console.error("numberExists failed:", err);
//     return false // let the caller decide how to handle server errors
//   }
// }


export async function numberExists(phone) {
  

  try {
    // 1) fetch profile by phoneNumber
    const { data: profileRow, error: profileError } = await supabase
      .from("profile")
      .select("id, name, phoneNumber, cart_id")
      .eq("phoneNumber", phone)
      .maybeSingle();

    if (profileError) {
      console.error("Supabase error fetching profile:", profileError);
      return { exists: false };
    }

    if (!profileRow) {
      // not found
      return { exists: false };
    }

    // if profile has no cart_id -> return profile with empty cart
    const cartId = profileRow.cart_id || null;
    if (!cartId) {
      return {
        exists: true,
        profile: {
          id: profileRow.id,
          name: profileRow.name ?? null,
          phoneNumber: profileRow.phoneNumber ?? phone,
          cart_id: null,
        },
        cart: [],
      };
    }

    // 2) fetch cart_items for that cart, including product details (products table)
    // We'll use a joined select: cart_items (fields...) and nested products (id,name,image_url,weight,category,price)
    const { data: itemsRows, error: itemsError } = await supabase
      .from("cart_items")
      .select(`id, cart_id, product_id, quantity, products ( id, name, image_url, weight, category, price )`)
      .eq("cart_id", cartId);

    if (itemsError) {
      console.error("Supabase error fetching cart_items:", itemsError);
      // still return profile with empty cart to avoid breaking flow
      return {
        exists: true,
        profile: {
          id: profileRow.id,
          name: profileRow.name ?? null,
          phoneNumber: profileRow.phoneNumber ?? phone,
          cart_id: cartId,
        },
        cart: [],
      };
    }

    // 3) map to the shape your Zustand expects
    // Zustand item shape:
    // { id, productId, name, price, quantity, meta, image, weight, description }
    const cart = (itemsRows || []).map((ci) => {
      const product = ci.products ?? null;
      return {
        id: ci.id,
        productId: ci.product_id,
        name: product?.name ?? (product?.id ?? "Unknown product"),
        price: product?.price ? Number(product.price) : 0,
        quantity: Number(ci.quantity || 1),
        meta: {}, // you can expand if you store product-variant info
        image: product?.image_url ?? "",
        weight: product?.weight ?? "",
        description: "",
      };
    });

    return {
      exists: true,
      profile: {
        id: profileRow.id,
        name: profileRow.name ?? null,
        phoneNumber: profileRow.phoneNumber ?? phone,
        cart_id: cartId,
      },
      cart,
    };
  } catch (err) {
    console.error("numberExists failed:", err);
    return { exists: false };
  }
}


/**
 * Create a JWT session for the given profile and set cookie on the response.
 *
 * - res: the Next.js API response object (res)
 * - profile: object returned from Supabase profile row { id, name, surname, phoneNumber }
 *
 * Returns: { token } (the signed JWT)
 *
 * Cookie attributes:
 *  - HttpOnly, Secure in production, SameSite=Lax, Path=/, Max-Age=SESSION_MAX_AGE_SECONDS
 */
export async function createSession(phone) {

  // minimal JWT payload (you can add more fields if needed)
  const payload = {
    phone: phone || null,
  };


  // serialize cookie
  

  console.log("SESSION CREATED")

  // set cookie header (overwrites previous Set-Cookie header if one exists)
  // If you need to set multiple cookies, read existing header and append.
  return new Response(JSON.stringify({ ok: true, exists: true, message: "Phone verified" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": cookieStr,
        },
      });

  // Optionally you can also return the token so caller can use it immediately
  return { token };
}

// lib/auth.js  (append or add below your existing helpers)
// ... existing imports (jwt, cookie, etc.) ...

// assuming you already have created `supabase` client above
// e.g. const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

/**
 * Create a user profile row in Supabase `profile` table.
 *
 * @param {string} fullName - Full name (e.g. "Jane Doe" or "Jane Maria Doe")
 * @param {string} phone - Phone number (E.164-like or digits). Will be normalized by removing non-digits.
 * @returns {object} inserted profile row
 * @throws {Error} on validation, duplicate phone, or DB error
 */
export async function createUser(fullName, phone) {
  
  // if (!fullName || typeof fullName !== "string") {
  //   throw new Error("createUser requires a fullName string");
  // }

  // if (!phone || typeof phone !== "string") {
  //   throw new Error("createUser requires a phone string");
  // }

  // Normalize phone: remove non-digits
  // const normalizedPhone = phone.replace(/\D/g, "");
  // if (!normalizedPhone) throw new Error("Invalid phone format after normalization");
  console.log(phone, "phone here")

  // Optional: ensure normalized phone length looks reasonable (e.g., min 9 digits)
  // if (normalizedPhone.length < 9) {
  //   throw new Error("Phone number too short after normalization");
  // }

  try {
    // Check if phone already exists (uses numberExists helper if present)
    // If you exported numberExists above in this module, call it. Otherwise do a direct query:

    

    // Split full name into first name + surname (rest)
    

    // Insert new profile row
    const insertPayload = {
      name: fullName,
      phoneNumber: phone,
    };

    const { data, error } = await supabase
      .from("profile")
      .insert([insertPayload])
      .select() // return inserted row(s)
      .maybeSingle();

    if (error) {
      console.error("Supabase insert error in createUser:", error);
      throw error;
    }

  return {
    name: fullName,
    phone: phone,
  }

  
  } catch (err) {
    // rethrow so caller (API route) can handle and return appropriate HTTP error
    throw err;
  }
}

