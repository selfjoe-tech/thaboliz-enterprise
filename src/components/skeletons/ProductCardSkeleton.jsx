"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * ProductCardSkeleton
 * - Matches the layout of your ProductCard
 * - Mobile-first and looks good on desktop
 */
export default function ProductCardSkeleton() {
  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col">
      {/* Image area */}
      <Skeleton className="rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center h-56 mb-4 w-full" />

      {/* Title & description */}
      <div className="text-center">
        <Skeleton className="h-5 w-3/4 mx-auto rounded" />
        <div className="mt-2">
          <Skeleton className="h-4 w-1/2 mx-auto rounded" />
        </div>
      </div>

      {/* Price */}
      <div className="mt-4 text-center">
        <Skeleton className="h-6 w-24 mx-auto rounded" />
      </div>

      {/* Add to cart button */}
      <div className="mt-6">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
}
