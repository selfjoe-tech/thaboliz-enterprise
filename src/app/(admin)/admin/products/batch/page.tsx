import ProductBatchGrid from "@/components/admin/(dashboard)/catalogue/products/product-batch-grid";
import { listCatalogueCategoryOptions } from "@/app/lib/actions/dashboard-info/catalogue-product";

export default async function BatchProductsPage() {
  const categories = await listCatalogueCategoryOptions();

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Batch Add Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Paste rows, import CSV/XLSX, validate, then save all at once.
          </p>
        </div>
      </div>

      <ProductBatchGrid categories={categories} />
    </div>
  );
}