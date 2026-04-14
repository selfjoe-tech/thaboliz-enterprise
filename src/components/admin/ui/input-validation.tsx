"use client";

import { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface InputValidatedProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  isPending: boolean;
  stateError?: Record<string, string[]>;
}

const InputValidated = ({
  name,
  type,
  label,
  placeholder,
  register,
  errors,
  isPending,
  stateError,
}: InputValidatedProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          id={name}
          type={isPassword && showPassword ? "text" : type}
          disabled={isPending}
          placeholder={placeholder}
          {...register(name)}
          className="mt-1 block w-full border border-black rounded-md p-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-black"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
            tabIndex={-1} // prevent stealing form focus
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}

      {stateError?.[name] && (
        <p className="text-red-500 text-sm mt-1">{stateError[name][0]}</p>
      )}
    </div>
  );
};

export default InputValidated;
