// components/UpdateOrderStatus.tsx  (or wherever your component lives)
"use client";

import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function UpdateOrderStatus({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [error, setError] = useState("")

  // helper to dispatch update events
  function dispatchOrderUpdated(detail: any) {
    window.dispatchEvent(new CustomEvent("order-updated", { detail }));
  }

  async function updateStatus(status: string) {
    // optimistic update: notify other components immediately
    dispatchOrderUpdated({ id: orderId, status, optimistic: true });

    startTransition(async () => {
      try {
        const res = await fetch("/api/orders/update-status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, status }),
        });

        const json = await res.json();
        if (!res.ok || json?.error) {
          // tell listeners to revert (they can choose how to handle)
          window.dispatchEvent(new CustomEvent("order-update-failed", { detail: { id: orderId, prevStatus: currentStatus, error: json?.error } }));
          setError(json.error)
          console.error("Update failed", json);
          return;
        }

        // final update: send full updated row to listeners
        window.dispatchEvent(new CustomEvent("order-updated", { detail: { ...json.data, optimistic: false } }));

        // refresh local server-rendered pages if you want (optional)
        // router.refresh();
      } catch (err) {
        window.dispatchEvent(new CustomEvent("order-update-failed", { detail: { id: orderId, prevStatus: currentStatus, error: String(err) } }));
        console.error("Update error", err);
      }
    });
  }

  return (
    <div className="div">
    <div className="flex flex-wrap gap-3">
      {currentStatus !== "shipped" && (
        <button
          onClick={() => updateStatus("shipped")}
          disabled={isPending}
          className="p-2 w-[161px] flex items-center justify-center rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          {isPending ? <LoaderIcon className="animate-spin" /> : "Mark as Shipped"}
        </button>
      )}

      {currentStatus !== "delivered" && (
        <button
          onClick={() => updateStatus("delivered")}
          disabled={isPending}
          className="p-2 w-[161px] flex items-center justify-center rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
        >
          {isPending ? <LoaderIcon className="animate-spin" /> : "Mark as Delivered"}
        </button>
      )}

      {currentStatus !== "cancelled" && (
        <button
          onClick={() => updateStatus("cancelled")}
          disabled={isPending}
          className="p-2 w-[127px] flex items-center justify-center rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
        >
          {isPending ? <LoaderIcon className="animate-spin" /> : "Cancel Order"}
        </button>
      )}
    </div>

    <span>{error}</span>
    </div>

  );
}
