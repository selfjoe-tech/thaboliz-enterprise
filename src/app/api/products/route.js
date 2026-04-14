// app/api/products/route.js
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/**
 * GET /api/products?page=1&limit=10&category=vegetables&name=apple
 */
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "10");
    const rawCategory = url.searchParams.get("category") || "";
    const rawName = url.searchParams.get("name") || "";

    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(100, limit));
    const from = (safePage - 1) * safeLimit;
    const to = from + safeLimit - 1;

    // Start a query
    let query = supabase
      .from("products")
      .select("id, name, weight, category, price, image_url")
      .order("created_at", { ascending: false });

    // apply category filter (exact match). Expect caller to pass lowercase if you normalise.
    const category = (rawCategory || "").trim();
    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    // apply name search (case-insensitive substring)
    const name = (rawName || "").trim();
    if (name) {
      query = query.ilike("name", `%${name}%`);
    }

    // apply range pagination
    const { data, error } = await query.range(from, to);

    if (error) {
      console.error("Supabase error fetching products:", error);
      return new Response(
        JSON.stringify({ error: "Failed to load products" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Normalize image_url so it is always an array
    const normalized = (data ?? []).map((row) => {
      let images = [];
      // if already array, use it; if string, wrap into array; otherwise empty
      if (Array.isArray(row.image_url)) {
        images = row.image_url;
      } else if (typeof row.image_url === "string" && row.image_url.length > 0) {
        images = [row.image_url];
      } else {
        images = [];
      }

      // return a new object and keep other properties intact
      return {
        ...row,
        image_url: images,
      };
    });

    return new Response(
      JSON.stringify({ data: normalized, fetched: normalized.length }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("products API error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}






// // app/api/products/route.js
// import { createClient } from "@supabase/supabase-js";

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// /**
//  * GET /api/products?page=1&limit=10&category=vegetables&name=apple
//  */
// export async function GET(req) {
//   try {
//     const url = new URL(req.url);
//     const page = Number(url.searchParams.get("page") || "1");
//     const limit = Number(url.searchParams.get("limit") || "10");
//     const rawCategory = url.searchParams.get("category") || "";
//     const rawName = url.searchParams.get("name") || "";

//     const safePage = Math.max(1, page);
//     const safeLimit = Math.max(1, Math.min(100, limit));
//     const from = (safePage - 1) * safeLimit;
//     const to = from + safeLimit - 1;

//     // Start a query
//     let query = supabase
//       .from("products")
//       .select("id, name, weight, category, price, image_url")
//       .order("created_at", { ascending: false });

//     // apply category filter (exact match). Expect caller to pass lowercase if you normalise.
//     const category = (rawCategory || "").trim();
//     if (category && category !== "all") {
//       // using eq for exact matching (DB should be normalized). If you need case-insensitive, use ilike.
//       query = query.eq("category", category);
//     }

//     // apply name search (case-insensitive substring)
//     const name = (rawName || "").trim();
//     if (name) {
//       // ilike with % for substring match
//       query = query.ilike("name", `%${name}%`);
//     }

//     // apply range pagination
//     const { data, error } = await query.range(from, to);
//     console.log(data)

//     if (error) {
//       console.error("Supabase error fetching products:", error);
//       return new Response(JSON.stringify({ error: "Failed to load products" }), { status: 500, headers: { "Content-Type": "application/json" } });
//     }

//     return new Response(JSON.stringify({ data: data ?? [], fetched: (data ?? []).length }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("products API error:", err);
//     return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
//   }
// }



// // // app/api/products/route.js
// // import { createClient } from "@supabase/supabase-js";

// // const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
// // const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// // // Use service role key on server only
// // const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// // /**
// //  * GET /api/products?page=1&limit=10&category=vegetables
// //  * Returns { data: [...], fetched: number }
// //  */
// // export async function GET(req) {
// //   try {
// //     const url = new URL(req.url);
// //     const page = Number(url.searchParams.get("page") || "1");
// //     const limit = Number(url.searchParams.get("limit") || "10");
// //     const rawCategory = url.searchParams.get("category") || "";

// //     // defensive defaults
// //     const safePage = Math.max(1, page);
// //     const safeLimit = Math.max(1, Math.min(100, limit));
// //     const from = (safePage - 1) * safeLimit;
// //     const to = from + safeLimit - 1;

// //     // normalize incoming category param to lower-case trimmed (client uses lowercase)
// //     const category = (typeof rawCategory === "string" ? rawCategory.trim().toLowerCase() : "");

// //     // build base query
// //     let query = supabase
// //       .from("products")
// //       .select("id, name, weight, category, price, image_url")
// //       .order("created_at", { ascending: false })
// //       .range(from, to);

// //     // If a specific category was requested (and isn't "all") add a case-insensitive filter.
// //     // Using ilike without % acts like a case-insensitive equality check.
// //     if (category && category !== "all") {
// //       // Important: DB values may be Title Case ("Vegetables"), client sends "vegetables".
// //       // ilike performs case-insensitive matching.
// //       query = query.ilike("category", category);
// //     }

// //     const { data, error } = await query;

// //     if (error) {
// //       console.error("Supabase error fetching products:", error);
// //       return new Response(
// //         JSON.stringify({ error: "Failed to load products" }),
// //         { status: 500, headers: { "Content-Type": "application/json" } }
// //       );
// //     }

// //     // Return rows and number of rows fetched (client uses fetched length to decide next page visibility)
// //     return new Response(
// //       JSON.stringify({ data: data ?? [], fetched: (data ?? []).length }),
// //       { status: 200, headers: { "Content-Type": "application/json" } }
// //     );
// //   } catch (err) {
// //     console.error("products API error:", err);
// //     return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
// //   }
// // }

