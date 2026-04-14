// lib/cacheClient.ts
export async function getCachedProfile(accessToken: string) {
  const res = await fetch("/api/cache/profile", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.ok ? await res.json() : null;
}

export async function refreshAndCacheProfile(accessToken: string) {
  const res = await fetch("/api/cache/profile", {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
  });
  return res.ok ? await res.json() : null;
}
