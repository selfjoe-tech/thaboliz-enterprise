import ProductForm from "@/components/admin/(dashboard)/products/product-form";
import {
  getProductById,
  listCategories,
} from "@/app/lib/actions/dashboard-info/product";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolved = await params;
  const id = resolved?.id;

  if (!id || id === "undefined" || id === "null") {
    throw new Error(`Invalid route param id: ${String(id)}`);
  }

  const [product, categoryOptions] = await Promise.all([
    getProductById(id),
    listCategories(),
  ]);

  const categories = categoryOptions.map((cat) => ({
    id: cat.value,
    name: cat.label,
  }));

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit Product</h1>
        <p className="mt-1 text-sm text-slate-600">
          Update this product for the current company account.
        </p>
      </div>

      <ProductForm
        mode="edit"
        categories={categories}
        product={product}
      />
    </div>
  );
}