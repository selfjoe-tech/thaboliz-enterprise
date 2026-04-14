import ProductForm from "@/components/admin/(dashboard)/products/product-form";
import { listCategories } from "@/app/lib/actions/dashboard-info/product";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const categories = await listCategories();

  const normalizedCategories = categories.map((cat) => ({
    id: cat.value,
    name: cat.label,
  }));

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Add Product</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Create a new product for this company account.
        </p>
      </div>

      <ProductForm
        mode="create"
        categories={normalizedCategories}
      />
    </div>
  );
}