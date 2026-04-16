"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";
import CategorySkeleton from "./category-skeleton";
import { CatalogCategory, CatalogProduct } from "@/app/lib/actions/catalog";
import { Button } from "@/components/ui/button";
import ScrollLink from "@/components/ScrollLink";

export default function ProductsCatalogClient({
  initialProducts,
  initialProductsCursor,
  initialProductsHasMore,
  initialCategories,
  initialCategoriesCursor,
  initialCategoriesHasMore,
  initialSearch = "",
  initialCategory = "All",
}: {
  initialProducts: CatalogProduct[];
  initialProductsCursor: string | null;
  initialProductsHasMore: boolean;
  initialCategories: CatalogCategory[];
  initialCategoriesCursor: string | null;
  initialCategoriesHasMore: boolean;
  initialSearch?: string;
  initialCategory?: string;
}) {
  const [products, setProducts] = useState<CatalogProduct[]>(initialProducts);
  const [productCursor, setProductCursor] = useState<string | null>(
    initialProductsCursor,
  );
  const [hasMoreProducts, setHasMoreProducts] = useState(initialProductsHasMore);
  const [loadingInitialProducts, setLoadingInitialProducts] = useState(false);
  const [loadingMoreProducts, setLoadingMoreProducts] = useState(false);

  const [categories, setCategories] = useState<CatalogCategory[]>(
    initialCategories,
  );
  const [categoryCursor, setCategoryCursor] = useState<string | null>(
    initialCategoriesCursor,
  );
  const [hasMoreCategories, setHasMoreCategories] = useState(
    initialCategoriesHasMore,
  );
  const [loadingMoreCategories, setLoadingMoreCategories] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const productsSentinelRef = useRef<HTMLDivElement | null>(null);
  const isFirstRenderRef = useRef(true);

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) + (searchQuery.trim() ? 1 : 0);

  const loadProducts = async ({
    append = false,
    cursor = null,
    search = searchQuery,
    category = selectedCategory,
  }: {
    append?: boolean;
    cursor?: string | null;
    search?: string;
    category?: string;
  } = {}) => {
    if (append) {
      if (loadingMoreProducts || !hasMoreProducts) return;
      setLoadingMoreProducts(true);
    } else {
      setLoadingInitialProducts(true);
    }

    try {
      const url = new URL("/api/catalog/products", window.location.origin);
      url.searchParams.set("limit", "12");
      if (cursor) url.searchParams.set("cursor", cursor);
      if (search.trim()) url.searchParams.set("search", search.trim());
      if (category && category !== "All") url.searchParams.set("category", category);

      const res = await fetch(url.toString(), { cache: "no-store" });
      const json = await res.json();

      if (!json?.success) {
        throw new Error(json?.error || "Failed to load products");
      }

      const nextItems: CatalogProduct[] = json.items ?? [];

      if (append) {
        setProducts((prev) => [...prev, ...nextItems]);
      } else {
        setProducts(nextItems);
      }

      setProductCursor(json.nextCursor ?? null);
      setHasMoreProducts(Boolean(json.hasMore));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingInitialProducts(false);
      setLoadingMoreProducts(false);
    }
  };

  const loadMoreCategories = async () => {
    if (loadingMoreCategories || !hasMoreCategories) return;

    setLoadingMoreCategories(true);

    try {
      const url = new URL("/api/catalog/categories", window.location.origin);
      url.searchParams.set("limit", "10");
      if (categoryCursor) url.searchParams.set("cursor", categoryCursor);

      const res = await fetch(url.toString(), { cache: "no-store" });
      const json = await res.json();

      if (!json?.success) {
        throw new Error(json?.error || "Failed to load categories");
      }

      const nextItems: CatalogCategory[] = json.items ?? [];

      setCategories((prev) =>
        [...prev, ...nextItems].sort((a, b) => a.name.localeCompare(b.name)),
      );
      setCategoryCursor(json.nextCursor ?? null);
      setHasMoreCategories(Boolean(json.hasMore));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMoreCategories(false);
    }
  };

  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => products, [products]);

  useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }

    const timer = setTimeout(() => {
      void loadProducts({ append: false, cursor: null, search: searchQuery, category: selectedCategory });
    }, 250);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMoreProducts && !loadingMoreProducts) {
          void loadProducts({
            append: true,
            cursor: productCursor,
            search: searchQuery,
            category: selectedCategory,
          });
        }
      },
      { rootMargin: "250px" },
    );

    const node = productsSentinelRef.current;
    if (node) observer.observe(node);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCursor, hasMoreProducts, loadingMoreProducts, searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-neutral-950">
      <section className="relative w-full overflow-hidden border-b border-neutral-200">
        <div className="relative h-[260px] sm:h-[340px] lg:h-[420px]">
          <img
            src="/product/appli-2.jpg"
            alt="Thaboliz catalogue banner"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/25" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  Find all products we sell at different stores
                </h1>

                <div className="mt-10 flex items-center gap-3">
                  <p className="max-w-2xl text-lg text-white">
                    Want a quote for a bulk order?
                  </p>

                  <Button
                    className="hidden md:inline-flex h-10 rounded-none bg-white px-6 text-black hover:bg-white/90"
                    asChild
                  >
                    <ScrollLink href="/#contact">Contact Us</ScrollLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((v) => !v)}
            className="inline-flex h-11 items-center gap-2 border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-900"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {activeFilterCount > 0 ? (
              <span className="border border-neutral-300 px-2 py-0.5 text-xs">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside
            className={[
              "border border-neutral-200 bg-white lg:sticky lg:top-24 lg:block lg:self-start",
              mobileFiltersOpen ? "block" : "hidden",
            ].join(" ")}
          >
            <div className="border-b border-neutral-200 px-5 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                  Filters
                </h2>

                {activeFilterCount > 0 ? (
                  <button
                    type="button"
                    onClick={resetFilters}
                    className="text-xs font-medium uppercase tracking-[0.12em] text-neutral-700 hover:text-black"
                  >
                    Clear all
                  </button>
                ) : null}
              </div>
            </div>

            <div className="border-b border-neutral-200 px-5 py-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                Search
              </h3>

              <div className="relative mt-3">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="h-11 w-full border border-neutral-300 bg-white pl-10 pr-10 text-sm text-neutral-900 outline-none placeholder:text-neutral-400"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                  >
                    <X className="h-4 w-4" />
                  </button>
                ) : null}
              </div>
            </div>

            <div className="border-b border-neutral-200 px-5 py-5">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                Categories
              </h3>

              <div className="mt-3 space-y-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                  className={[
                    "block w-full border px-3 py-2 text-left text-sm transition",
                    selectedCategory === "All"
                      ? "border-black bg-black text-white"
                      : "border-transparent bg-transparent text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50",
                  ].join(" ")}
                >
                  All
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.name)}
                    className={[
                      "block w-full border px-3 py-2 text-left text-sm transition",
                      selectedCategory === category.name
                        ? "border-black bg-black text-white"
                        : "border-transparent bg-transparent text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    {category.name}
                  </button>
                ))}

                {loadingMoreCategories ? (
                  <div className="mt-3 space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <CategorySkeleton key={i} />
                    ))}
                  </div>
                ) : null}

                {hasMoreCategories ? (
                  <button
                    type="button"
                    onClick={loadMoreCategories}
                    className="mt-3 w-full border border-neutral-300 bg-white px-3 py-2 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
                  >
                    Load more categories
                  </button>
                ) : null}
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-4 border border-neutral-200 bg-white">
              <div className="flex flex-col gap-4 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm text-neutral-600">
                    Showing{" "}
                    <span className="font-semibold text-neutral-950">
                      {filteredProducts.length}
                    </span>{" "}
                    products
                  </p>

                  {activeFilterCount > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {selectedCategory !== "All" ? (
                        <span className="border border-neutral-300 bg-neutral-50 px-2 py-1 text-xs text-neutral-700">
                          {selectedCategory}
                        </span>
                      ) : null}

                      {searchQuery.trim() ? (
                        <span className="border border-neutral-300 bg-neutral-50 px-2 py-1 text-xs text-neutral-700">
                          Search: {searchQuery}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="h-11 border border-neutral-300 bg-white px-4 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50"
                >
                  Reset
                </button>
              </div>
            </div>

            {loadingInitialProducts && products.length === 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
                <h3 className="text-lg font-semibold text-neutral-900">
                  No products found
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Try another category or another search term.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {loadingMoreProducts ? (
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                  </div>
                ) : null}

                {hasMoreProducts ? <div ref={productsSentinelRef} className="h-10" /> : null}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}