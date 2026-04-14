import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export function UsersCardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 border rounded-xl shadow-sm bg-gradient-to-br from-yellow-50 to-white transition">
      {/* icon circle */}
      <div className="p-3 bg-yellow-100 rounded-full">
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>

      {/* text */}
      <div className="flex flex-col">
        <Skeleton className="h-4 w-20 mb-2" />   {/* small label */}
        <Skeleton className="h-8 w-28" />       {/* large number */}
      </div>
    </div>
  );
}
