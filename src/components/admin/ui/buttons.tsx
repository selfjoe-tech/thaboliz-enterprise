"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SubmitButtonProps {
  name: string;
  isPending: boolean;
}

/**
 * Primary submit button — roomy padding, subtle shadow, accessible focus ring,
 * and a small spinner when pending.
 */
export const SubmitButton = ({ name, isPending }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={isPending}
      aria-busy={isPending}
      className={`w-full flex items-center justify-center gap-3 rounded-lg px-4 py-3 font-medium transition
        shadow-sm hover:shadow-md
        bg-black text-white hover:bg-gray-900
        disabled:opacity-60 disabled:cursor-not-allowed
        focus:outline-none focus:ring-4 focus:ring-black/20`}
    >
      {isPending ? (
        <>
          <svg
            aria-hidden="true"
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <span>Loading…</span>
        </>
      ) : (
        <span>{name}</span>
      )}
    </button>
  );
};

export const BackButton = ({ name }: { name: string }) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4 p-3">
      <button
        onClick={() => router.back()}
        aria-label="Go back"
        className="flex items-center justify-center rounded-full p-2 bg-gray-100 hover:bg-gray-200 text-gray-700
                   focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-400 transition"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      <div className="min-w-0">
        <h1 className="text-lg sm:text-2xl font-semibold leading-tight">{name}</h1>
        <p className="mt-0.5 text-xs text-gray-500">Return to previous screen</p>
      </div>
    </div>
  );
};
