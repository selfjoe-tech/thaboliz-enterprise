import { listCatalogCategories, listCatalogProducts } from "@/app/lib/actions/catalog";
import ProductsCatalogClient from "@/app/components/products/products-catalog-client";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  search?: string;
  category?: string;
}>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const initialSearch = params?.search ?? "";
  const initialCategory = params?.category ?? "All";

  const [{ items: products, nextCursor: productsCursor, hasMore: productsHasMore }, { items: categories, nextCursor: categoriesCursor, hasMore: categoriesHasMore }] =
    await Promise.all([
      listCatalogProducts({
        limit: 12,
        search: initialSearch,
        category: initialCategory,
      }),
      listCatalogCategories({
        limit: 10,
      }),
    ]);

  return (
    <ProductsCatalogClient
      initialProducts={products}
      initialProductsCursor={productsCursor}
      initialProductsHasMore={productsHasMore}
      initialCategories={categories}
      initialCategoriesCursor={categoriesCursor}
      initialCategoriesHasMore={categoriesHasMore}
      initialSearch={initialSearch}
      initialCategory={initialCategory}
    />
  );
}