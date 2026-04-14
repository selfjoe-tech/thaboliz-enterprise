"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const OTP_MIN_LENGTH = 6;
const OTP_MAX_LENGTH = 10;

export default function VerifySignUpForm({ email }: { email: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleVerify(formData: FormData) {
    const code = String(formData.get("token") ?? "").trim();
    setError("");
    setNotice("");

    const isValidLength =
      code.length >= OTP_MIN_LENGTH && code.length <= OTP_MAX_LENGTH;

    if (!email || !isValidLength) {
      setError(
        `Enter the verification code from your email (${OTP_MIN_LENGTH} to ${OTP_MAX_LENGTH} digits).`,
      );
      return;
    }

    startTransition(async () => {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: "email",
      });

      if (verifyError) {
        setError(verifyError.message);
        return;
      }

      const claimRes = await fetch("/api/auth/claim-tenant-setup", {
        method: "POST",
      });

      const claimJson = await claimRes.json();

      if (!claimRes.ok) {
        setError(claimJson.error ?? "Could not finish workspace setup.");
        return;
      }

      router.replace("/admin/products");
      router.refresh();
    });
  }

  async function handleResend() {
    setError("");
    setNotice("");

    const { error: resendError } = await supabase.auth.resend({
      type: "signup",
      email,
    });

    if (resendError) {
      setError(resendError.message);
      return;
    }

    setNotice("A new code has been sent.");
  }

  return (
    <div className="space-y-4">
      {error ? (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {notice ? (
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {notice}
        </div>
      ) : null}

      <form action={handleVerify} className="space-y-4">
        <div>
          <label htmlFor="token" className="mb-2 block text-sm text-white/70">
            Verification code
          </label>
          <input
            id="token"
            name="token"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={OTP_MAX_LENGTH}
            value={token}
            onChange={(e) =>
              setToken(e.target.value.replace(/\D/g, "").slice(0, OTP_MAX_LENGTH))
            }
            placeholder="Enter code from email"
            className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-center text-2xl tracking-[0.2em] text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
          <p className="mt-2 text-xs text-white/45">
            Enter the code exactly as it appears in the email.
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 font-medium text-black transition hover:opacity-90 disabled:opacity-60"
        >
          {isPending ? "Verifying..." : "Verify and continue"}
        </button>
      </form>

      <button
        type="button"
        onClick={handleResend}
        className="inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-sm font-medium text-white transition hover:border-white/25"
      >
        Resend code
      </button>
    </div>
  );
}