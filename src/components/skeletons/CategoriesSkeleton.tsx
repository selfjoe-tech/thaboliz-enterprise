"use client";

export default function CategoriesSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-hidden>
      <div className="flex items-center justify-between">
        <div className="h-6 w-48 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-10 w-32 rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* table header */}
      <div className="hidden md:block">
        <div className="grid grid-cols-6 gap-4 bg-gray-50 p-3 rounded">
          <div className="h-4 w-32 bg-gray-200 rounded col-span-2" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-24 bg-gray-200 rounded" />
        </div>

        <div className="mt-3 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 items-center bg-white p-3 rounded shadow-sm">
              <div className="h-4 bg-gray-100 rounded col-span-2" />
              <div className="h-4 bg-gray-100 rounded" />
              <div className="h-4 bg-gray-100 rounded" />
              <div className="h-4 bg-gray-100 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* mobile list */}
      <div className="md:hidden space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-3 bg-white rounded shadow-sm flex justify-between items-center">
            <div className="space-y-2 w-full">
              <div className="h-4 w-40 rounded bg-gray-200" />
              <div className="h-3 w-28 rounded bg-gray-200" />
            </div>
            <div className="h-8 w-8 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
