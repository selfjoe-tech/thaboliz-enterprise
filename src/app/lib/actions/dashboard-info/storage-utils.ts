export function extractObjectPathFromPublicUrl(publicUrl?: string | null): string | null {
  if (!publicUrl) return null;

  try {
    const url = new URL(publicUrl);
    const marker = "/object/public/catalogue-images/";
    const idx = url.pathname.indexOf(marker);

    if (idx === -1) {
      return null;
    }

    return decodeURIComponent(url.pathname.slice(idx + marker.length));
  } catch {
    return null;
  }
}