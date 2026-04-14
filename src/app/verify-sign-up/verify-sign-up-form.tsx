"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const OTP_MIN_LENGTH = 6;
const OTP_MAX_LENGTH = 10;

export default function VerifySignUpForm({
  email,
  inviteToken,
}: {
  email: string;
  inviteToken?: string;
}) {
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

      if (inviteToken) {
        const acceptRes = await fetch("/api/auth/accept-invite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: inviteToken }),
        });

        const acceptJson = await acceptRes.json();

        if (!acceptRes.ok || !acceptJson?.success) {
          setError(acceptJson.error ?? "Could not accept organization invite.");
          return;
        }
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
        <div className="rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      {notice ? (
        <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
          {notice}
        </div>
      ) : null}

      <form action={handleVerify} className="space-y-4">
        <div>
          <label htmlFor="token" className="mb-2 block text-sm font-medium text-white/85">
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
            className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-white px-4 text-sm font-medium text-black transition disabled:opacity-60"
        >
          {isPending ? "Verifying..." : "Verify and continue"}
        </button>
      </form>

      <button
        type="button"
        onClick={handleResend}
        className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white transition hover:bg-white/10"
      >
        Resend code
      </button>
    </div>
  );
}