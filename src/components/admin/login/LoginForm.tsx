"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import InputValidated from "../ui/input-validation";
import { SubmitButton } from "../ui/buttons";

type FormValues = {
  email: string;
  password?: string;
  confirmPassword?: string;
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = "/admin/products";

  const [stage, setStage] = useState<"email" | "enter-password" | "set-password">(
    "email"
  );
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  async function finishSignIn(email: string, password: string) {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (!result || result.error) {
      setServerError("Incorrect email or password.");
      return;
    }

    router.replace(result.url || callbackUrl);
    router.refresh();
  }

  async function checkEmail(values: FormValues) {
    setServerError(null);
    setIsPending(true);

    try {
      const res = await fetch("/api/auth/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      const body = await res.json();

      if (!res.ok) {
        setServerError(body?.error || "Server error");
        return;
      }

      if (!body.exists) {
        setServerError("You are not authorized to access the admin panel.");
        return;
      }

      setStage(body.hasPassword ? "enter-password" : "set-password");
      reset({
        email: values.email,
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      setServerError(err?.message || "Network error");
    } finally {
      setIsPending(false);
    }
  }

  async function setPassword(values: FormValues) {
    setServerError(null);

    if (!values.password) {
      setError("password", { message: "Password required" });
      return;
    }

    if (values.password.length < 8) {
      setError("password", {
        message: "Password must be at least 8 characters",
      });
      return;
    }

    if (values.password !== values.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    setIsPending(true);

    try {
      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const body = await res.json();

      if (!res.ok) {
        setServerError(body?.error || "Failed to set password");
        return;
      }

      await finishSignIn(values.email, values.password);
    } catch (err: any) {
      setServerError(err?.message || "Network error");
    } finally {
      setIsPending(false);
    }
  }

  async function verifyPassword(values: FormValues) {
    setServerError(null);

    if (!values.password) {
      setError("password", { message: "Password required" });
      return;
    }

    setIsPending(true);

    try {
      await finishSignIn(values.email, values.password);
    } catch (err: any) {
      setServerError(err?.message || "Network error");
    } finally {
      setIsPending(false);
    }
  }

  const onSubmit = handleSubmit(async (values) => {
    if (stage === "email") return checkEmail(values);
    if (stage === "set-password") return setPassword(values);
    return verifyPassword(values);
  });

  function backToEmail() {
    setStage("email");
    setServerError(null);
    reset({ email: "", password: "", confirmPassword: "" });
  }

  const stageTitle =
    stage === "email"
      ? "Start with your email"
      : stage === "enter-password"
      ? "Enter your password"
      : "Create your password";

  const stageDescription =
    stage === "email"
      ? "We’ll check whether your account already has a password."
      : stage === "enter-password"
      ? "Use your existing password to sign in."
      : "This looks like your first login. Set a password to continue.";

  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-semibold tracking-tight text-neutral-950">
          {stageTitle}
        </h3>
        <p className="mt-2 text-sm leading-6 text-neutral-600">
          {stageDescription}
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4"
      >
        <div>
          <InputValidated
            name="email"
            type="email"
            label="Email"
            placeholder="admin@example.com"
            register={register}
            errors={errors}
            isPending={isPending}
          />

          {stage === "enter-password" && (
            <InputValidated
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              register={register}
              errors={errors}
              isPending={isPending}
            />
          )}

          {stage === "set-password" && (
            <>
              <InputValidated
                name="password"
                type="password"
                label="Create password"
                placeholder="Create a password"
                register={register}
                errors={errors}
                isPending={isPending}
              />

              <InputValidated
                name="confirmPassword"
                type="password"
                label="Confirm password"
                placeholder="Confirm your password"
                register={register}
                errors={errors}
                isPending={isPending}
              />
            </>
          )}
        </div>

        {serverError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          {stage !== "email" && (
            <button
              type="button"
              onClick={backToEmail}
              className="inline-flex w-full items-center justify-center rounded-lg border border-neutral-300 px-4 py-3 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 sm:w-auto"
            >
              Back
            </button>
          )}

          <div className="w-full">
            <SubmitButton
              name={
                stage === "email"
                  ? "Continue"
                  : stage === "enter-password"
                  ? "Sign In"
                  : "Set Password"
              }
              isPending={isPending}
            />
          </div>
        </div>
      </form>
    </>
  );
}