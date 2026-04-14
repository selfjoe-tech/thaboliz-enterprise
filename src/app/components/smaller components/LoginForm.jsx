"use client";

import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export const LogInForm = ({ setErrorMessage = () => {} }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res) {
        setErrorMessage("Login failed. Please try again.");
        return;
      }

      if (res.error) {
        setErrorMessage("Incorrect email or password.");
        return;
      }

      router.replace(res.url || callbackUrl);
    } catch (err) {
      console.error("Unexpected login error", err);
      setErrorMessage("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleEmailLogin}>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-white/80">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-lg border border-white/20 bg-white/70 px-4 py-3 placeholder-gray-600 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm text-white/80">
          Password
        </label>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            required
            className="w-full rounded-lg border border-white/20 bg-white/70 px-4 py-3 pr-12 placeholder-gray-600 transition focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            id="password-toggle"
            type="button"
            onClick={() => setPasswordVisible((v) => !v)}
            aria-pressed={passwordVisible}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-3 flex items-center justify-center rounded p-1 text-white/90"
          >
            {passwordVisible ? (
              <FiEye className="h-5 w-5 text-gray-900" />
            ) : (
              <FiEyeOff className="h-5 w-5 text-gray-900" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-3 rounded-full bg-black py-3 font-semibold text-white shadow transition hover:bg-yellow-500 disabled:opacity-60"
          disabled={loading}
          aria-label="Login with Email"
        >
          {loading && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />
              <path d="M22 12a10 10 0 00-10-10" stroke="rgba(0,0,0,0.6)" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          <span>{loading ? "Signing in…" : "Login"}</span>
        </button>
      </div>
    </form>
  );
};