// components/skeletons/OrdersTableSkeleton.tsx
"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function OrdersTableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="w-48">
          <Skeleton className="h-6 w-full rounded" />
        </div>
        <div className="w-32">
          <Skeleton className="h-6 w-full rounded" />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="hidden md:flex bg-gray-50 px-4 py-3 text-sm">
          <div className="w-1/6"><Skeleton className="h-4 w-24" /></div>
          <div className="w-1/6"><Skeleton className="h-4 w-20" /></div>
          <div className="w-1/6"><Skeleton className="h-4 w-24" /></div>
          <div className="w-1/6"><Skeleton className="h-4 w-28" /></div>
          <div className="w-1/6"><Skeleton className="h-4 w-16" /></div>
          <div className="w-1/6"><Skeleton className="h-4 w-16" /></div>
        </div>

        <div className="space-y-2 p-3">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="bg-white p-3 rounded-md shadow-sm md:flex md:items-center md:gap-4">
              <div className="mb-2 md:mb-0 md:w-1/6">
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="mb-2 md:mb-0 md:w-1/6">
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="mb-2 md:mb-0 md:w-1/6">
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="mb-2 md:mb-0 md:w-1/6">
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="mb-2 md:mb-0 md:w-1/6">
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="md:w-1/6">
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
