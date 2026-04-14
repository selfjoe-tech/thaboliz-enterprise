"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "default" | "destructive" | "warning";
  onConfirm: () => Promise<void> | void;
}

export function ConfirmActionDialog({
  open,
  onOpenChange,
  onClose,
  title = "Confirm",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "destructive",
  onConfirm,
}: Props) {
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleClose = React.useCallback(() => {
    if (onOpenChange) onOpenChange(false);
    else onClose?.();
  }, [onOpenChange, onClose]);

  const dialogOnOpenChange = React.useCallback(
    (v: boolean) => {
      if (onOpenChange) onOpenChange(v);
      else if (!v) onClose?.();
    },
    [onOpenChange, onClose]
  );

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm();
      handleClose();
    } catch (err) {
      console.error("confirm action error", err);
      alert("Action failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={dialogOnOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="mt-2 text-sm text-muted-foreground">{message}</div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleClose} disabled={isProcessing}>
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            className={confirmVariant === "destructive" ? "bg-red-600 text-white" : ""}
          >
            {isProcessing ? "Processing..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
