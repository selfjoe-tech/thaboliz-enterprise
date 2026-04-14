// app/api/cache-profile/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Redis } from "@upstash/redis";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// change this if your table is named differently
const PROFILE_TABLE = "profile";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("Supabase service role key or URL missing in environment.");
}

// Upstash env (adjust names to your env)
const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || process.env.REDIS_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || process.env.REDIS_TOKEN;

const redis =
  UPSTASH_URL && UPSTASH_TOKEN
    ? new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN })
    : null;

export async function POST(req: Request) {
  try {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ ok: false, error: "server_config" }, { status: 500 });
    }

    const { access_token } = await req.json().catch(() => ({}));

    if (!access_token) {
      return NextResponse.json({ ok: false, error: "missing_token" }, { status: 400 });
    }

    // server/admin client
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    });

    const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(access_token);
    if (userErr) {
      console.error("supabase getUser error:", userErr);
      return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 401 });
    }
    const user = userData?.user;
    if (!user) {
      return NextResponse.json({ ok: false, error: "user_not_found" }, { status: 404 });
    }

    const profileRow = {
      id: user.id,
      email: user.email ?? null,
      username: (user.user_metadata && (user.user_metadata.username || user.user_metadata.name)) ?? null,
      avatar_url: (user.user_metadata && user.user_metadata.avatar_url) ?? null,
      raw_metadata: user.user_metadata ?? null,
      updated_at: new Date().toISOString(),
    };

    // Try to upsert into the profiles table. Use array form + onConflict "id".
    let upserted = null;
    try {
      const { data: upsertData, error: upsertErr } = await supabaseAdmin
        .from(PROFILE_TABLE)
        .upsert([profileRow], { onConflict: "id" })
        .select()
        .limit(1);

      if (upsertErr) {
        // Specific server error that indicates missing table (PGRST205)
        console.error("profiles upsert error:", upsertErr);
      } else {
        upserted = Array.isArray(upsertData) ? upsertData[0] ?? null : upsertData;
      }
    } catch (err: any) {
      console.error("profiles upsert exception:", err);
      // If the error text indicates no such table, log a helpful message
      if (typeof err?.message === "string" && err.message.includes("Could not find the table")) {
        console.warn(
          `Supabase table "${PROFILE_TABLE}" not found. Create the table (see docs) or update PROFILE_TABLE env var.`
        );
      }
    }

    // cache in redis if available
    if (redis) {
      try {
        const key = `profile:${user.id}`;
        const toCache = {
          id: profileRow.id,
          username: profileRow.username,
          email: profileRow.email,
          avatar_url: profileRow.avatar_url,
          updated_at: profileRow.updated_at,
        };
        // ttl 7 days
        await redis.set(key, JSON.stringify(toCache), { ex: 60 * 60 * 24 * 7 });
      } catch (err) {
        console.warn("redis cache error:", err);
      }
    }

    return NextResponse.json({ ok: true, profile: upserted ?? profileRow });
  } catch (err) {
    console.error("cache-profile error:", err);
    return NextResponse.json({ ok: false, error: "internal" }, { status: 500 });
  }
}
