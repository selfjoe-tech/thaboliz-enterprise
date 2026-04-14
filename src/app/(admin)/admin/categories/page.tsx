import { Suspense } from "react";
import CategoriesClient from "@/components/admin/(dashboard)/categories/categories";
import CategoriesSkeleton from "@/components/skeletons/CategoriesSkeleton";
import { listCatalogueCategoriesPaged } from "@/lib/actions/dashboard-info/catalogue-category";

type Props = {
  searchParams?: any;
};

export default async function CatalogueCategoriesPage({ searchParams }: Props) {
  const sp =
    searchParams && typeof searchParams.then === "function"
      ? await searchParams
      : searchParams ?? {};

  const page = Math.max(1, Number(sp?.page ?? 1));
  const pageSize = Math.max(1, Number(sp?.pageSize ?? 10));
  const search = typeof sp?.search === "string" ? sp.search : "";

  const { items, total } = await listCatalogueCategoriesPaged(page, pageSize, search);

  return (
    <Suspense fallback={<CategoriesSkeleton />}>
      <CategoriesClient
        initialItems={items}
        total={total}
        initialPage={page}
        initialPageSize={pageSize}
        initialSearch={search}
      />
    </Suspense>
  );
}