"use client";

import { useState } from "react";

type PasswordFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  minLength?: number;
};

export default function PasswordField({
  id,
  name,
  label,
  placeholder,
  minLength,
}: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-white/70">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          required
          minLength={minLength}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pr-16 text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
        />

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-white/70 transition hover:text-white"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}