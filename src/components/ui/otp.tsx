"use client";

import * as React from "react";
import { OTPInput, SlotProps } from "input-otp";
import { cn } from "@/lib/utils";

type NumericOTPProps = {
  length?: number;
  value: string;
  onValueChange: (value: string) => void;
  autoFocus?: boolean;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
};

function OTPSlot({
  char,
  hasFakeCaret,
  isActive,
  inputClassName,
}: SlotProps & { inputClassName?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-12 w-10 items-center justify-center rounded-md border bg-white text-sm font-medium text-black shadow-sm transition",
        isActive
          ? "border-sky-500 ring-2 ring-sky-200"
          : "border-gray-300",
        inputClassName
      )}
    >
      <span>{char}</span>

      {hasFakeCaret ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-px animate-pulse bg-black" />
        </div>
      ) : null}
    </div>
  );
}

export default function NumericOTP({
  length = 6,
  value,
  onValueChange,
  autoFocus = false,
  disabled = false,
  className,
  inputClassName,
}: NumericOTPProps) {
  return (
    <OTPInput
      maxLength={length}
      value={value}
      onChange={onValueChange}
      autoFocus={autoFocus}
      disabled={disabled}
      pattern={"/^\d*$/"}
      inputMode="numeric"
      containerClassName={cn("flex items-center gap-2", className)}
      render={({ slots }) => (
        <>
          {slots.slice(0, length).map((slot, index) => (
            <OTPSlot
              key={index}
              {...slot}
              inputClassName={inputClassName}
            />
          ))}
        </>
      )}
    />
  );
}