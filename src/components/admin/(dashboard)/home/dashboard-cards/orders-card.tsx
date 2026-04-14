"use client";

import React, { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { UsersCardSkeleton } from "@/app/components/skeletons/dashboardCardSkeleton";

export function OrdersCards() {
  const [totalNumber, setTotalNumber] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch("/api/stats/orders", { signal: controller.signal });
        if (!res.ok) throw new Error("Network error");
        const json = await res.json();
        if (!mounted) return;
        const val = typeof json?.value === "number" ? json.value : Number(json?.value || 0);
        setTotalNumber(Number.isNaN(val) ? 0 : val);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("OrdersCards load error", err);
        if (mounted) {
          setError("Failed to load");
          setTotalNumber(0);
        }
      }
    }

    load();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  if (totalNumber === null) return <UsersCardSkeleton />;

  return (
    <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gradient-to-br from-blue-50 to-white hover:shadow-md transition">
      <div className="p-3 bg-blue-100 rounded-full">
        <ShoppingCart className="text-blue-600" size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-600">Total Orders</p>
        <p className="text-2xl font-bold">{totalNumber.toLocaleString()}</p>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
    </div>
  );
}

export default OrdersCards;
