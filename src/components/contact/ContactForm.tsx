"use client";

import * as React from "react";
import Script from "next/script";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove?: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  website: string; // honeypot
};

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [form, setForm] = React.useState<FormState>(initialForm);
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const [startedAt, setStartedAt] = React.useState<number>(Date.now());
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: "idle" | "success" | "error";
    message?: string;
  }>({ type: "idle" });

  const widgetRef = React.useRef<HTMLDivElement | null>(null);
  const widgetIdRef = React.useRef<string | undefined>(undefined);
  const renderedRef = React.useRef(false);

  const resetWidget = React.useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
    setTurnstileToken("");
    setStartedAt(Date.now());
  }, []);

  const renderWidget = React.useCallback(() => {
    if (!TURNSTILE_SITE_KEY || !widgetRef.current || !window.turnstile || renderedRef.current) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(widgetRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: "dark",
      callback: (token: string) => {
        setTurnstileToken(token);
        setStatus((prev) => (prev.type === "error" ? { type: "idle" } : prev));
      },
      "expired-callback": () => {
        setTurnstileToken("");
      },
      "error-callback": () => {
        setTurnstileToken("");
        setStatus({
          type: "error",
          message: "Security check failed to load. Please refresh and try again.",
        });
      },
    });

    renderedRef.current = true;
  }, []);

  React.useEffect(() => {
    renderWidget();

    return () => {
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [renderWidget]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!turnstileToken) {
      setStatus({
        type: "error",
        message: "Please complete the security check before sending.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "idle" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          startedAt,
          turnstileToken,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        resetWidget();
        setStatus({
          type: "error",
          message: data.error || "Unable to send your message right now.",
        });
        return;
      }

      setForm(initialForm);
      resetWidget();
      setStatus({
        type: "success",
        message: "Thanks. Your message has been sent successfully.",
      });
    } catch {
      resetWidget();
      setStatus({
        type: "error",
        message: "Something went wrong while sending your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderWidget}
      />

      <div className="mt-8  bg-white/[0.03] p-5 sm:p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-white sm:text-2xl">Send us a message</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60 sm:text-base">
            Tell us what you need and we’ll route it to the right team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Honeypot */}
          <div
            className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Full name *"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
            />
            <Field
              label="Email address *"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Phone number *"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <Field
              label="Company name"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/80">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/25 focus:bg-white/[0.06]"
              placeholder="Briefly describe your project, request, or enquiry."
            />
          </div>

          <div className="pt-1">
            {TURNSTILE_SITE_KEY ? (
              <div ref={widgetRef} />
            ) : (
              <p className="text-sm text-red-300">
                Missing NEXT_PUBLIC_TURNSTILE_SITE_KEY environment variable.
              </p>
            )}
          </div>

          {status.type !== "idle" && (
            <p
              aria-live="polite"
              className={
                status.type === "success"
                  ? "text-sm text-emerald-300"
                  : "text-sm text-red-300"
              }
            >
              {status.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || !TURNSTILE_SITE_KEY}
            className="inline-flex min-h-12 items-center justify-center border border-white/15 bg-white px-5 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send enquiry"}
          </button>
        </form>
      </div>
    </>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Field({ label, name, type, value, required, onChange }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-white/80">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="h-12 w-full  border border-white/12 bg-white/[0.04] px-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/25 focus:bg-white/[0.06]"
      />
    </div>
  );
}