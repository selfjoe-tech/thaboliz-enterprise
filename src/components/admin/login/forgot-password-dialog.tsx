// app/components/auth/forgot-password-dialog.tsx
"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NumericOTP from "@/components/ui/otp";
import { Eye, EyeOff } from "lucide-react";


type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialEmail?: string;
};

export function ForgotPasswordDialog({ open, onOpenChange, initialEmail = "" }: Props) {
  const [step, setStep] = React.useState<"email" | "otp" | "setPassword">("email");
  const [email, setEmail] = React.useState(initialEmail);
  const [isPending, setIsPending] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [otp, setOtp] = React.useState(""); // '123456'
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  React.useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
  }, [initialEmail]);

  React.useEffect(() => {
    if (!open) {
      setStep("email");
      setEmail(initialEmail);
      setOtp("");
      setPassword("");
      setConfirmPassword("");
      setServerError(null);
      setIsPending(false);
    }
  }, [open, initialEmail]);

  // request reset code
  const handleRequestCode = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setServerError(null);
    setIsPending(true);
    try {
      const res = await fetch("/api/auth/request-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json();
      if (!res.ok) {
        setServerError(body?.error || "Failed to request code");
        return;
      }
      setStep("otp");
    } catch (err: any) {
      setServerError(err?.message || "Network error");
    } finally {
      setIsPending(false);
    }
  };

  // verify code
  const handleVerifyCode = async () => {
    setServerError(null);
    setIsPending(true);
    try {
      const res = await fetch("/api/auth/verify-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otp }),
      });
      const body = await res.json();
      if (!res.ok) {
        setServerError(body?.error || "Invalid code");
        return;
      }
      setStep("setPassword");
    } catch (err: any) {
      setServerError(err?.message || "Network error");
    } finally {
      setIsPending(false);
    }
  };

  // set new password using existing route
  const handleSetPassword = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setServerError(null);
    if (!password) return setServerError("Password required");
    if (password !== confirmPassword) return setServerError("Passwords do not match");

    setIsPending(true);
    try {
      const res = await fetch("/api/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const body = await res.json();
      if (!res.ok) {
        setServerError(body?.error || "Failed to set password");
        return;
      }
      // success — close and let user login with new password (optionally auto login)
      onOpenChange(false);
    } catch (err: any) {
      setServerError(err?.message || "Network error");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Forgot password</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          {step === "email" && (
            <form onSubmit={handleRequestCode} className="space-y-4">
              
              <div>
                <label className="block text-sm">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-black rounded-md p-2 text-sm"
                  type="email"
                  placeholder="youremail@gmail.com"
                  required
                />
              </div>

              {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                <Button onClick={handleRequestCode} disabled={isPending}>
                  {isPending ? "Sending..." : "Send code"}
                </Button>
              </DialogFooter>
            </form>
          )}

          {step === "otp" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code sent to <strong>{email}</strong>
              </p>

              {/* Example shadcn InputOTP usage — adapt if your implementation differs */}
              <NumericOTP
                length={6}
                value={otp}
                onValueChange={(val) => setOtp(val)}
                autoFocus
                inputClassName="border-gray-200"
                />

              {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setStep("email")}>Back</Button>
                <Button onClick={handleVerifyCode} disabled={isPending || otp.length < 6}>
                  {isPending ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>
          )}

          {step === "setPassword" && (
            <form onSubmit={handleSetPassword} className="space-y-4">
              <div className="space-y-4">
                <div>
                    <label className="block text-sm">New password</label>
                    <div className="relative">
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? "text" : "password"}
                        className="mt-1 block w-full border border-black rounded-md p-2 pr-10 text-sm"
                        required
                        inputMode="text"
                        aria-label="New password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-pressed={showPassword}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm">Confirm password</label>
                    <div className="relative">
                    <input
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type={showConfirm ? "text" : "password"}
                        className="mt-1 block w-full border border-black rounded-md p-2 pr-10 text-sm"
                        required
                        inputMode="text"
                        aria-label="Confirm password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirm((s) => !s)}
                        aria-pressed={showConfirm}
                        aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                    >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    </div>
                </div>
            </div>

              {serverError && <p className="text-red-500 text-sm">{serverError}</p>}

              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setStep("otp")}>Back</Button>
                <Button type="submit" onClick={handleSetPassword} disabled={isPending}>
                  {isPending ? "Saving..." : "Set password"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
