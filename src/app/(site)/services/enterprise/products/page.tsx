"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal, Star, X } from "lucide-react";
import {
  catalogueProducts,
  type CatalogueProduct,
  type ProductCategory,
} from "@/data/catalogue-products";
import { Button } from "@/components/ui/button";
import ScrollLink from "@/components/ScrollLink";

const categories: ProductCategory[] = [
  "Kitchen Appliance"
];

const priceOptions = [0, 250, 500, 1000, 2500, 5000, 10000, 20000];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(price);
}

function getDiscountPercent(price: number, originalPrice?: number) {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

function ProductCard({ product }: { product: CatalogueProduct }) {
  const discount = getDiscountPercent(product.price, product.originalPrice);

  return (
    <Link
      href={product.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="group block border border-neutral-200 bg-white transition hover:border-neutral-400 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-neutral-200 bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-contain p-4 transition duration-300 group-hover:scale-[1.02]"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="border border-neutral-300 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-neutral-700">
            {product.retailer}
          </span>
          <span className="text-[11px] uppercase tracking-[0.08em] text-neutral-500">
            {product.category}
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[44px] text-[14px] font-medium leading-5 text-neutral-900 sm:text-[15px]">
          {product.title}
        </h3>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-2xl font-semibold tracking-tight text-neutral-950">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice ? (
            <span className="pb-0.5 text-sm text-neutral-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          ) : null}
        </div>

        <div className="mt-1 min-h-[20px]">
          {discount ? (
            <p className="text-sm font-medium text-green-600">{discount}% off</p>
          ) : null}
        </div>

        {typeof product.rating === "number" ? (
          <div className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
            <div className="flex items-center gap-1 text-green-600">
              <Star className="h-4 w-4 fill-current" />
              <span className="font-medium">{product.rating.toFixed(1)}</span>
            </div>
            <span>({product.reviews ?? 0})</span>
          </div>
        ) : null}
      </div>
    </Link>
  );
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedMin, setSelectedMin] = useState<string>("0");
  const [selectedMax, setSelectedMax] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc">("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const numericMin = Number(selectedMin);
  const numericMax = selectedMax === "all" ? Infinity : Number(selectedMax);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = catalogueProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      const matchesPrice =
        product.price >= numericMin && product.price <= numericMax;

      const matchesSearch =
        query.length === 0 ||
        product.title.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.retailer.toLowerCase().includes(query);

      return matchesCategory && matchesPrice && matchesSearch;
    });

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [selectedCategory, numericMin, numericMax, searchQuery, sortBy]);

  const activeFilterCount =
    (selectedCategory !== "All" ? 1 : 0) +
    (selectedMin !== "0" ? 1 : 0) +
    (selectedMax !== "all" ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  function resetFilters() {
    setSelectedCategory("All");
    setSelectedMin("0");
    setSelectedMax("all");
    setSortBy("featured");
    setSearchQuery("");
  }

  function handleMinChange(value: string) {
    setSelectedMin(value);

    if (selectedMax !== "all" && Number(value) > Number(selectedMax)) {
      setSelectedMax("all");
    }
  }

  function handleMaxChange(value: string) {
    setSelectedMax(value);

    if (value !== "all" && Number(value) < Number(selectedMin)) {
      setSelectedMin("0");
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] text-neutral-950">
      {/* Full-width banner */}
      <section className="relative w-full overflow-hidden border-b border-neutral-200">
        <div className="relative h-[260px] sm:h-[340px] lg:h-[420px]">
          <Image
            src="/product/appli-2.jpg"
            alt="Thaboliz catalogue banner"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/25" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                

                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    Find all products we sell at different stores
                </h1>


                <div
                    className="flex gap-3 mt-10 items-center"
                >
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
        {/* Mobile controls */}
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

          <div className="relative min-w-[180px]">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "featured" | "price-asc" | "price-desc")
              }
              className="h-11 w-full appearance-none border border-neutral-300 bg-white px-3 pr-10 text-sm text-neutral-900 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]">
          {/* Sidebar */}
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
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={[
                      "block w-full border px-3 py-2 text-left text-sm transition",
                      selectedCategory === category
                        ? "border-black bg-black text-white"
                        : "border-transparent bg-transparent text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-5 py-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Price
              </h3>

              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-end gap-3">
                <div className="relative">
                  <label className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                    Min
                  </label>
                  <select
                    value={selectedMin}
                    onChange={(e) => handleMinChange(e.target.value)}
                    className="h-11 w-full appearance-none border border-neutral-300 bg-white px-3 pr-10 text-sm text-neutral-900 outline-none"
                  >
                    {priceOptions.map((value) => (
                      <option key={value} value={String(value)}>
                        {value === 0 ? "Min" : formatPrice(value)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-[38px] h-4 w-4 -translate-y-1/2 text-neutral-500" />
                </div>

                <div className="pb-3 text-sm text-neutral-400">to</div>

                <div className="relative">
                  <label className="mb-1 block text-[11px] uppercase tracking-[0.14em] text-neutral-500">
                    Max
                  </label>
                  <select
                    value={selectedMax}
                    onChange={(e) => handleMaxChange(e.target.value)}
                    className="h-11 w-full appearance-none border border-neutral-300 bg-white px-3 pr-10 text-sm text-neutral-900 outline-none"
                  >
                    <option value="all">Any</option>
                    {priceOptions.map((value) => (
                      <option key={value} value={String(value)}>
                        {formatPrice(value)}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-[38px] h-4 w-4 -translate-y-1/2 text-neutral-500" />
                </div>
              </div>

              <div className="mt-4 border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm text-neutral-700">
                Range:{" "}
                <span className="font-medium text-neutral-950">
                  {selectedMin === "0" ? "Any" : formatPrice(Number(selectedMin))}
                </span>{" "}
                to{" "}
                <span className="font-medium text-neutral-950">
                  {selectedMax === "all" ? "Any" : formatPrice(Number(selectedMax))}
                </span>
              </div>
            </div>
          </aside>

          {/* Main content */}
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

                      {selectedMin !== "0" ? (
                        <span className="border border-neutral-300 bg-neutral-50 px-2 py-1 text-xs text-neutral-700">
                          Min: {formatPrice(Number(selectedMin))}
                        </span>
                      ) : null}

                      {selectedMax !== "all" ? (
                        <span className="border border-neutral-300 bg-neutral-50 px-2 py-1 text-xs text-neutral-700">
                          Max: {formatPrice(Number(selectedMax))}
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

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative min-w-[210px]">
                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(
                          e.target.value as "featured" | "price-asc" | "price-desc"
                        )
                      }
                      className="h-11 w-full appearance-none border border-neutral-300 bg-white px-3 pr-10 text-sm text-neutral-900 outline-none"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-asc">Price: Low to high</option>
                      <option value="price-desc">Price: High to low</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
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
            </div>

            {filteredProducts.length === 0 ? (
              <div className="border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
                <h3 className="text-lg font-semibold text-neutral-900">
                  No products found
                </h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Try another category or widen the price range.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}