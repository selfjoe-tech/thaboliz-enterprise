// app/api/charts/route.ts
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/app/lib/supabaseAdmin";

type CacheEntry = { expiresAt: number; body: any };
const CACHE_TTL_SECONDS = Number(process.env.CHARTS_CACHE_TTL || 10);
const inMemoryCache = new Map<string, CacheEntry>();

function cacheKeyFromParams(params: URLSearchParams) {
  const entries = Array.from(params.entries()).sort();
  return entries.map(([k, v]) => `${k}=${v}`).join("&");
}

async function getCached(key: string) {
  const ent = inMemoryCache.get(key);
  if (!ent) return null;
  if (Date.now() > ent.expiresAt) {
    inMemoryCache.delete(key);
    return null;
  }
  return ent.body;
}

async function setCached(key: string, body: any) {
  inMemoryCache.set(key, { expiresAt: Date.now() + CACHE_TTL_SECONDS * 1000, body });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const params = url.searchParams;
    const metric = (params.get("metric") || "").toLowerCase();
    const granularity = (params.get("granularity") || "year").toLowerCase();
    const year = params.get("year");
    const month = params.get("month");
    const startYear = Number(params.get("startYear") ?? new Date().getUTCFullYear() - 4);
    const endYear = Number(params.get("endYear") ?? new Date().getUTCFullYear());

    if (!["revenue", "orders", "users"].includes(metric)) {
      return NextResponse.json({ error: "metric must be revenue|orders|users" }, { status: 400 });
    }
    if (!["year", "month", "day"].includes(granularity)) {
      return NextResponse.json({ error: "granularity must be year|month|day" }, { status: 400 });
    }

    const key = `charts:${cacheKeyFromParams(params)}`;
    const cached = await getCached(key);
    if (cached) {
      return NextResponse.json(cached);
    }

    // Choose RPC and args
    let rpcName = "";
    let rpcArgs: any = null;

    if (metric === "orders") {
      if (granularity === "year") {
        rpcName = "orders_by_year";
        rpcArgs = { start_year: startYear, end_year: endYear };
      } else if (granularity === "month") {
        rpcName = "orders_by_month";
        rpcArgs = { y: Number(year || new Date().getUTCFullYear()) };
      } else {
        rpcName = "orders_by_day";
        rpcArgs = { y: Number(year || new Date().getUTCFullYear()), m: Number(month || new Date().getUTCMonth() + 1) };
      }
    } else if (metric === "revenue") {
      if (granularity === "year") {
        rpcName = "revenue_by_year";
        rpcArgs = { start_year: startYear, end_year: endYear };
      } else if (granularity === "month") {
        rpcName = "revenue_by_month";
        rpcArgs = { y: Number(year || new Date().getUTCFullYear()) };
      } else {
        rpcName = "revenue_by_day";
        rpcArgs = { y: Number(year || new Date().getUTCFullYear()), m: Number(month || new Date().getUTCMonth() + 1) };
      }
    } else {
      // users
      if (granularity === "year") {
        rpcName = "users_by_year";
        rpcArgs = { start_year: startYear, end_year: endYear };
      } else if (granularity === "month") {
        rpcName = "users_by_month";
        rpcArgs = { y: Number(year || new Date().getUTCFullYear()) };
      } else {
        rpcName = "users_by_day";
        rpcArgs = { y: Number(year || new Date().getUTCFullYear()), m: Number(month || new Date().getUTCMonth() + 1) };
      }
    }

    const { data, error } = await supabaseAdmin.rpc(rpcName, rpcArgs);
    if (error) {
      console.error("charts rpc error", { rpcName, rpcArgs, error });
      return NextResponse.json({ error: error.message || "RPC error" }, { status: 500 });
    }

    const buckets = Array.isArray(data)
      ? data.map((r: any) => ({ label: String(r.label), start: r.start, end: r.end, value: Number(r.value || 0) }))
      : [];

    const responseBody: any = { granularity, buckets };
    if (granularity === "month") responseBody.year = Number(params.get("year") || new Date().getUTCFullYear());
    if (granularity === "day") {
      responseBody.year = Number(params.get("year") || new Date().getUTCFullYear());
      responseBody.month = Number(params.get("month") || new Date().getUTCMonth() + 1);
    }

    await setCached(key, responseBody);
    return NextResponse.json(responseBody);
  } catch (err: any) {
    console.error("charts api error:", err);
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}
