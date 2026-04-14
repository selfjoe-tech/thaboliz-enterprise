"use client";

import React from "react";

export default function UserDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* Back + title */}
      <div className="flex items-center gap-4">
        <div className="h-8 w-24 rounded bg-gray-200" />
      </div>

      {/* Profile card skeleton */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 border border-gray-200 rounded-xl bg-white">
        <div className="w-20 h-20 rounded-full bg-gray-200" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-64 rounded bg-gray-200" />
          <div className="h-4 w-40 rounded bg-gray-200" />
          <div className="h-4 w-36 rounded bg-gray-200" />
        </div>
      </div>

      {/* search + controls */}
      <div className="flex gap-3 items-center">
        <div className="h-10 rounded-lg bg-gray-200 flex-1" />
        <div className="h-10 w-24 rounded bg-gray-200" />
      </div>

      {/* Mobile orders skeleton */}
      <div className="md:hidden bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="h-6 w-48 rounded bg-gray-200" />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="p-4 border border-gray-100 rounded-lg">
            <div className="flex justify-between">
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-4 w-16 rounded bg-gray-200" />
            </div>
            <div className="mt-3 h-4 w-20 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* Desktop orders skeleton */}
      <div className="hidden md:block bg-white border border-gray-200 rounded-xl p-6">
        <div className="h-6 w-48 rounded bg-gray-200 mb-4" />

        <div className="overflow-x-auto">
          <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-5 gap-0 bg-gray-50 p-3">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>

            <div className="divide-y divide-gray-200">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="grid grid-cols-5 gap-0 items-center p-4">
                  <div className="h-4 w-48 rounded bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-200 mx-auto" />
                  <div className="h-4 w-20 rounded bg-gray-200 ml-auto" />
                  <div className="h-4 w-24 rounded bg-gray-200 mx-auto" />
                  <div className="h-8 w-20 rounded bg-gray-200 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* pagination skeleton */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="h-8 w-16 rounded bg-gray-200" />
          <div className="h-8 w-8 rounded bg-gray-200" />
          <div className="h-8 w-8 rounded bg-gray-200" />
          <div className="h-8 w-16 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
