"use client";

import React from "react";

export default function UsersListSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Title */}
      <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700" />

      {/* Search + controls */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="relative flex-1">
          <div className="h-10 rounded-lg bg-gray-200 dark:bg-gray-700 w-full pl-10 pr-3" />
        </div>

        <div className="flex items-center gap-3">
          <div className="h-10 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 w-28 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      {/* Mobile cards */}
      <div className="flex flex-col gap-4 md:hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 border border-gray-200 rounded-xl bg-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-48 rounded bg-gray-100 dark:bg-gray-700" />
                <div className="h-3 w-36 rounded bg-gray-100 dark:bg-gray-700 mt-2" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table skeleton */}
      <div className="hidden md:block overflow-x-auto">
        <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-white">
          {/* header */}
          <div className="grid grid-cols-5 gap-0 bg-gray-50 p-3">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-4 w-24 rounded bg-gray-200" />
          </div>

          {/* rows */}
          <div className="divide-y divide-gray-200">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-5 gap-0 items-center p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="h-4 w-36 rounded bg-gray-200" />
                </div>
                <div className="h-4 w-28 rounded bg-gray-200" />
                <div className="h-4 w-12 rounded bg-gray-200 mx-auto" />
                <div className="h-4 w-24 rounded bg-gray-200 ml-auto" />
                <div className="h-8 w-20 rounded bg-gray-200 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="flex items-center justify-center mt-4 gap-2">
        <div className="h-8 w-16 rounded bg-gray-200" />
        <div className="h-8 w-8 rounded bg-gray-200" />
        <div className="h-8 w-8 rounded bg-gray-200" />
        <div className="h-8 w-16 rounded bg-gray-200" />
      </div>
    </div>
  );
}
