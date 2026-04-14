"use client";

import React, { useEffect } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

type ConfirmModalProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmIntent?: "danger" | "primary";
  isProcessing?: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;

  // optional success mode
  state?: "confirm" | "success";
  successTitle?: string;
  successDescription?: string;
  successAutoCloseMs?: number;
};

export default function ConfirmModal({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmIntent = "danger",
  isProcessing = false,
  onClose,
  onConfirm,

  state = "confirm",
  successTitle = "Success",
  successDescription = "The action completed successfully.",
  successAutoCloseMs = 5000,
}: ConfirmModalProps) {
  const isSuccess = state === "success";

  useEffect(() => {
    if (!open || !isSuccess) return;

    const timer = window.setTimeout(() => {
      onClose();
    }, successAutoCloseMs);

    return () => window.clearTimeout(timer);
  }, [open, isSuccess, successAutoCloseMs, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          if (!isProcessing && !isSuccess) onClose();
        }}
      />

      <div className="relative z-10 w-[92%] max-w-md rounded-xl bg-white p-6 shadow-lg">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-9 w-9 text-green-600" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {successTitle}
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              {successDescription}
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm text-gray-600">{description}</p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => !isProcessing && onClose()}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm transition hover:bg-gray-50"
                disabled={isProcessing}
              >
                {cancelLabel}
              </button>

              <button
                onClick={async () => {
                  if (isProcessing) return;
                  await onConfirm();
                }}
                className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition ${
                  confirmIntent === "danger"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-sky-600 text-white hover:bg-sky-700"
                } ${isProcessing ? "cursor-not-allowed opacity-70" : ""}`}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait...
                  </>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}