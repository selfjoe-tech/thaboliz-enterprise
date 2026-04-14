// components/ui/skeletons/ProductListSkeleton.tsx
"use client";

import React from "react";

export default function ProductListSkeleton() {
  // helper repeat
  const rows = Array.from({ length: 5 });

  return (
    <div className="p-0 md:p-4 animate-pulse">
      <div className="flex items-center justify-between mb-6 gap-4">
        <div className="flex-1 md:max-w-md h-10 bg-gray-200 rounded-lg" />
        <div className="w-40 h-10 bg-gray-200 rounded-lg hidden md:block" />
        <div className="w-28 h-10 bg-gray-200 rounded-lg" />
      </div>

      {/* mobile cards skeleton */}
      <div className="md:hidden space-y-4 mb-6">
        {rows.map((_, i) => (
          <div key={i} className="border border-gray-200 shadow-sm p-4 rounded-xl flex gap-4 bg-white">
            <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>

      {/* desktop table skeleton */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-sm">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {rows.map((_, i) => (
              <tr key={i} className="border-t">
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-md" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-40 bg-gray-200 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-3 w-24 bg-gray-200 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-10 bg-gray-200 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="h-4 w-20 bg-gray-200 rounded" />
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <div className="h-8 w-16 bg-gray-200 rounded" />
                    <div className="h-8 w-12 bg-gray-200 rounded" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* pagination skeleton */}
      <div className="mt-4 flex items-center justify-between">
        <div className="h-8 w-32 bg-gray-200 rounded" />
        <div className="h-8 w-40 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
