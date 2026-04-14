"use client";

import React from "react";

export default function ProductFormSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-hidden>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-100/0" />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Price */}
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Description (full width) */}
        <div className="md:col-span-2 space-y-2">
          <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2">
            <div className="h-24 rounded-md bg-gray-100 dark:bg-gray-800" />
            <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Status */}
        <div className="space-y-2">
          <div className="h-3 w-16 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
        </div>

        {/* Image/File upload (full width) */}
        <div className="md:col-span-2">
          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
          <div className="flex items-start gap-4">
            <div className="h-24 w-24 rounded-md bg-gray-100 dark:bg-gray-800 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800" />
              <div className="h-6 w-44 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <div className="h-10 rounded-md bg-gray-900/80 dark:bg-white/10 w-40" />
        <div className="h-10 rounded-md bg-gray-100 dark:bg-gray-800 w-28" />
      </div>
    </div>
  );
}
