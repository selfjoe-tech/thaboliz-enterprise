import "server-only";

type VerifyTurnstileArgs = {
  token: string;
  ip?: string;
};

type TurnstileResponse = {
  success: boolean;
  hostname?: string;
  "error-codes"?: string[];
};

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export async function verifyTurnstileToken({
  token,
  ip,
}: VerifyTurnstileArgs) {
  const formData = new URLSearchParams();
  formData.append("secret", requiredEnv("TURNSTILE_SECRET_KEY"));
  formData.append("response", token);

  if (ip) {
    formData.append("remoteip", ip);
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
      cache: "no-store",
    }
  );

  const result = (await response.json()) as TurnstileResponse;

  if (!response.ok || !result.success) {
    return {
      ok: false as const,
      errors: result["error-codes"] ?? ["turnstile-verification-failed"],
    };
  }

  const allowedHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (
    allowedHostnames.length > 0 &&
    result.hostname &&
    !allowedHostnames.includes(result.hostname)
  ) {
    return {
      ok: false as const,
      errors: ["hostname-mismatch"],
    };
  }

  return {
    ok: true as const,
    hostname: result.hostname,
  };
}