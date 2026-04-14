// components/skeletons/BarChartSkeleton.tsx
"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export type BarChartSkeletonProps = {
  className?: string;
  /** number of bars to show (defaults to 6) */
  bars?: number;
};

export function BarChartSkeleton({ className = "", bars = 6 }: BarChartSkeletonProps) {
  // generate some varying heights for visual variety
  const heights = [28, 44, 20, 52, 36, 30, 48, 24].slice(0, bars);

  return (
    <div
      role="status"
      aria-label="Loading chart"
      className={`bg-white rounded-lg p-4 shadow-sm overflow-hidden ${className} h-full`}
    >
      {/* header placeholder */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-40">
          <Skeleton className="h-4 w-full rounded" />
        </div>
        <div className="w-20">
          <Skeleton className="h-4 w-full rounded" />
        </div>
      </div>

      <div className="relative flex">
        {/* Y-axis ticks / labels (left column) */}
        <div className="flex flex-col items-end mr-3 space-y-6 pt-2">
          {/* a few ticks */}
          <Skeleton className="h-3 w-8 rounded" />
          <Skeleton className="h-3 w-6 rounded" />
          <Skeleton className="h-3 w-10 rounded" />
          <Skeleton className="h-3 w-7 rounded" />
        </div>

        {/* Chart area */}
        <div className="flex-1">
          {/* axis (horizontal) — faint line */}
          <div className="relative">
            <div className="w-full h-[1px] bg-slate-200 absolute left-0 bottom-9" />

            {/* Bars area */}
            <div className="flex items-end justify-between gap-3 px-1 pt-2 pb-8 min-h-[120px]">
              {heights.map((h, i) => (
                <div key={i} className="flex flex-col items-center w-full">
                  <Skeleton className={`w-full max-w-[56px] rounded-b ${`h-${h}`}`} style={{ height: `${h * 2}px` }} />
                </div>
              ))}
            </div>

            {/* x-axis labels */}
            <div className="flex items-center justify-between gap-3 mt-2 px-1">
              {heights.map((_, i) => (
                <div key={i} className="w-full max-w-[56px] flex justify-center">
                  <Skeleton className="h-3 w-10 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
