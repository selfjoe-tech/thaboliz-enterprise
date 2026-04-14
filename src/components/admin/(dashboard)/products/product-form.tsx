"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { uploadFile, deleteFileByPublicUrl } from "@/app/lib/actions/dashboard-info/file";
import {
  createProductAction,
  updateProductAction,
} from "@/app/lib/actions/dashboard-info/product";
import CategoryMultiSelect from "./category-multi-select";

type CategoryOption = {
  id: string;
  name: string;
};

type ProductFormProps = {
  mode: "create" | "edit";
  categories: CategoryOption[];
  product?: {
    id: string;
    title: string;
    description: string | null;
    categories: string[] | null;
    external_url: string | null;
    price: number | null;
    compare_at_price: number | null;
    cover_image_url: string | null;
    status: "draft" | "active" | "archived";
    inventory_mode: "tracked" | "untracked";
    stock_quantity: number | null;
    stock_status: "in_stock" | "out_of_stock" | "preorder";
    sku: string | null;
  };
};

function fieldClassName() {
  return "h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";
}

function textareaClassName() {
  return "w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";
}

function labelClassName() {
  return "mb-2 block text-sm font-medium text-slate-800";
}

export default function ProductForm({
  mode,
  categories,
  product,
}: ProductFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(product?.title ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    product?.categories ?? [],
  );
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>(categories);
  const [externalUrl, setExternalUrl] = useState(product?.external_url ?? "");
  const [price, setPrice] = useState(
    product?.price != null ? String(product.price) : "",
  );
  const [compareAtPrice, setCompareAtPrice] = useState(
    product?.compare_at_price != null ? String(product.compare_at_price) : "",
  );
  const [inventoryMode, setInventoryMode] = useState<"tracked" | "untracked">(
    product?.inventory_mode ?? "tracked",
  );
  const [stockQuantity, setStockQuantity] = useState(
    product?.stock_quantity != null ? String(product.stock_quantity) : "0",
  );
  const [stockStatus, setStockStatus] = useState<
    "in_stock" | "out_of_stock" | "preorder"
  >(product?.stock_status ?? "in_stock");
  const [status, setStatus] = useState<"draft" | "active" | "archived">(
    product?.status ?? "draft",
  );
  const [sku, setSku] = useState(product?.sku ?? "");
  const [fileValue, setFileValue] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const previewUrl = useMemo(() => {
    if (fileValue[0]) return URL.createObjectURL(fileValue[0]);
    return product?.cover_image_url ?? null;
  }, [fileValue, product?.cover_image_url]);

  const purchaseMode = externalUrl.trim() ? "external" : "internal";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let coverImageUrl = product?.cover_image_url ?? null;

      if (fileValue.length > 0) {
        const form = new FormData();
        form.append("file", fileValue[0]);

        const uploadRes = await uploadFile(form);
        if (!uploadRes?.success) {
          throw new Error(uploadRes?.error || "Image upload failed");
        }

        coverImageUrl = uploadRes.publicUrl;
      }

      const payload = {
        ...(mode === "edit" ? { id: product?.id } : {}),
        title: title.trim(),
        description: description.trim() || null,
        categories: selectedCategories,
        externalUrl: externalUrl.trim() || null,
        price: price !== "" ? Number(price) : null,
        compareAtPrice: compareAtPrice !== "" ? Number(compareAtPrice) : null,
        inventoryMode,
        stockQuantity:
          inventoryMode === "tracked" ? Number(stockQuantity || 0) : null,
        stockStatus: inventoryMode === "untracked" ? stockStatus : null,
        status,
        coverImageUrl,
        sku: sku.trim() || null,
        purchaseMode,
      };

      const res =
        mode === "create"
          ? await createProductAction(payload)
          : await updateProductAction(payload);

      if (!res?.success) {
        throw new Error(res?.error || "Failed to save product");
      }

      if (
        mode === "edit" &&
        product?.cover_image_url &&
        coverImageUrl &&
        product.cover_image_url !== coverImageUrl
      ) {
        deleteFileByPublicUrl(product.cover_image_url).catch(() => {});
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error: any) {
      alert(error?.message ?? "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className={labelClassName()}>Product title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldClassName()}
            placeholder="Enter product title"
            required
          />
        </div>

        <div>
          <label className={labelClassName()}>SKU</label>
          <input
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className={fieldClassName()}
            placeholder="Optional SKU"
          />
        </div>

        <div className="md:col-span-2">
          <CategoryMultiSelect
            options={categoryOptions}
            value={selectedCategories}
            onChange={setSelectedCategories}
            onOptionsChange={setCategoryOptions}
          />
        </div>

        <div>
          <label className={labelClassName()}>Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className={fieldClassName()}
            placeholder="0.00"
          />
        </div>

        <div>
          <label className={labelClassName()}>Compare at price</label>
          <input
            type="number"
            step="0.01"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(e.target.value)}
            className={fieldClassName()}
            placeholder="Optional original price"
          />
        </div>

        <div>
          <label className={labelClassName()}>Product status</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "draft" | "active" | "archived")
            }
            className={fieldClassName()}
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div>
          <label className={labelClassName()}>Inventory mode</label>
          <select
            value={inventoryMode}
            onChange={(e) =>
              setInventoryMode(e.target.value as "tracked" | "untracked")
            }
            className={fieldClassName()}
          >
            <option value="tracked">Tracked stock</option>
            <option value="untracked">No stock tracking</option>
          </select>
        </div>

        {inventoryMode === "tracked" ? (
          <div>
            <label className={labelClassName()}>Stock quantity</label>
            <input
              type="number"
              min="0"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              className={fieldClassName()}
              placeholder="0"
            />
          </div>
        ) : (
          <div>
            <label className={labelClassName()}>Stock status</label>
            <select
              value={stockStatus}
              onChange={(e) =>
                setStockStatus(
                  e.target.value as "in_stock" | "out_of_stock" | "preorder",
                )
              }
              className={fieldClassName()}
            >
              <option value="in_stock">In stock</option>
              <option value="out_of_stock">Out of stock</option>
              <option value="preorder">Preorder</option>
            </select>
          </div>
        )}

        <div className="md:col-span-2">
          <label className={labelClassName()}>External buying link</label>
          <input
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            className={fieldClassName()}
            placeholder="Leave blank if customers buy on this platform"
          />
          <p className="mt-2 text-xs text-slate-500">
            If you paste a link here, this product will behave as an external redirect listing.
          </p>
        </div>

        <div className="md:col-span-2">
          <label className={labelClassName()}>Description</label>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={textareaClassName()}
            placeholder="Describe the product"
          />
        </div>

        <div className="md:col-span-2">
          <label className={labelClassName()}>Product image</label>

          

          <FileUpload
            value={fileValue}
            onValueChange={(files: File[]) => setFileValue(files)}
            maxFiles={1}
            maxSize={5 * 1024 * 1024}
            multiple={false}
            className="w-full"
          >
            <FileUploadDropzone className="rounded-2xl border border-dashed border-slate-300 bg-slate-50">
              <div className="flex flex-col items-center gap-2 p-6 text-center">
                <div className="rounded-xl border border-slate-300 bg-white p-3 text-slate-700">
                  <Upload className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium text-slate-800">
                  Upload product image
                </p>
                <p className="text-xs text-slate-500">
                  One image, up to 5MB
                </p>
              </div>

              <FileUploadTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                >
                  Browse file
                </Button>
              </FileUploadTrigger>
            </FileUploadDropzone>

            <FileUploadList orientation="horizontal">
              {fileValue.map((file, i) => (
                <FileUploadItem
                  key={i}
                  value={file}
                  className="relative rounded-xl border border-slate-200 bg-white p-0"
                >
                  <FileUploadItemPreview className="size-20 [&>svg]:size-10">
                    <FileUploadItemProgress value={0} variant="circular" size={40} />
                  </FileUploadItemPreview>

                  <FileUploadItemMetadata>
                    <div className="max-w-[120px] truncate text-xs text-slate-700">
                      {file.name}
                    </div>
                  </FileUploadItemMetadata>

                  <FileUploadItemDelete asChild>
                    <button
                      type="button"
                      className="absolute -right-2 -top-2 rounded-full border border-slate-300 bg-white p-1 text-slate-700 shadow-sm"
                      onClick={() => setFileValue([])}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </FileUploadItemDelete>
                </FileUploadItem>
              ))}
            </FileUploadList>
          </FileUpload>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 md:col-span-2">
          Buying mode:{" "}
          <span className="font-medium text-slate-900">
            {purchaseMode === "external" ? "External redirect" : "Internal"}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 border-t border-slate-200 pt-6">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-slate-900 text-white hover:bg-slate-800"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "create"
            ? "Create product"
            : "Save changes"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}