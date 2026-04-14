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
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/85">
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
          className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3 pr-16 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
        />

        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60 transition hover:text-white"
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}