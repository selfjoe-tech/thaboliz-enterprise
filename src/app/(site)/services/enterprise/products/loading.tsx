import ProductCardSkeleton from "@/app/components/products/product-card-skeleton";
import CategorySkeleton from "@/app/components/products/category-skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f5f5f5] text-neutral-950">
      <section className="border-b border-neutral-200 bg-neutral-200">
        <div className="mx-auto h-[260px] max-w-7xl animate-pulse px-4 py-6 sm:h-[340px] sm:px-6 lg:h-[420px] lg:px-8" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="border border-neutral-200 bg-white p-5">
            <div className="mb-4 h-4 w-20 animate-pulse bg-neutral-200" />
            <div className="space-y-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <CategorySkeleton key={i} />
              ))}
            </div>
          </aside>

          <div>
            <div className="mb-4 border border-neutral-200 bg-white p-4">
              <div className="h-4 w-40 animate-pulse bg-neutral-200" />
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}