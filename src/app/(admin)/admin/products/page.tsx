import ProductListPage from "@/components/admin/(dashboard)/products/product-list";
import {
  listProductsPaged,
  listCategories,
} from "@/app/lib/actions/dashboard-info/product";

type SearchParams = Promise<{
  page?: string;
  pageSize?: string;
  search?: string;
  category?: string;
  status?: string;
}>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  const page = Math.max(1, Number(sp?.page ?? 1));
  const pageSize = Math.max(1, Number(sp?.pageSize ?? 10));
  const search = typeof sp?.search === "string" ? sp.search : "";
  const category = typeof sp?.category === "string" ? sp.category : "all";
  const status = typeof sp?.status === "string" ? sp.status : "all";

  const [{ items, total }, cats] = await Promise.all([
    listProductsPaged(page, pageSize, search, category, status),
    listCategories(),
  ]);

  return (
    <ProductListPage
      cats={cats}
      initialItems={items}
      total={total}
      initialPage={page}
      initialPageSize={pageSize}
      initialSearch={search}
      initialCategory={category}
      initialStatus={status}
    />
  );
}