// app/lib/phone.ts
export const DEFAULT_COUNTRY_CODE = "27";

/**
 * Convert a user-entered number to E.164-like digits (no +).
 * Examples:
 *  "067 123 4567" => "2771234567"
 *  "2771234567"   => "2771234567" (already okay)
 *  "+27 67 123 4567" => "27671234567"
 */
export function toE164(digits?: string | null): string {
  if (!digits) return "";
  let d = String(digits).replace(/\D/g, ""); // remove non-digits
  // handle leading 0 local format (0XXXXXXXXX length 10)
  if (d.startsWith("0") && d.length === 10) {
    return DEFAULT_COUNTRY_CODE + d.slice(1);
  }
  // if already includes country code (e.g., 27XXXXXXXXX)
  if (d.length >= 11) return d;
  // fallback: prefix default country code
  return DEFAULT_COUNTRY_CODE + d;
}
