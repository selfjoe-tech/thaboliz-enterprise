"use client";

import { useEffect, useMemo, useState } from "react";
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
import StoreAutocomplete from "./store-autocomplete";
import QuestionTooltip from "./question-tooltip";
import StoreCombobox from "./store-combobox";

type CategoryOption = {
  id: string;
  name: string;
};

type StoreItem = {
  id: string;
  name: string;
  slug: string;
  website_url: string | null;
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
    store_id: string | null;
    store_name?: string | null;
    store_slug?: string | null;
    store_website_url?: string | null;
    price: number | null;
    compare_at_price: number | null;
    cover_image_url: string | null;
    status: "draft" | "active" | "archived";
    inventory_mode: "tracked" | "untracked";
    stock_quantity: number | null;
    stock_status: "in_stock" | "out_of_stock" | "preorder";
    sku: string | null;
    purchase_mode: "internal" | "external";
  };
};

function fieldClassName() {
  return "h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";
}

function textareaClassName() {
  return "w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10";
}

function Label({
  children,
  tip,
}: {
  children: React.ReactNode;
  tip: string;
}) {
  return (
    <div className="mb-2 flex items-center gap-2">
      <label className="block text-sm font-medium text-slate-800">{children}</label>
      <QuestionTooltip text={tip} />
    </div>
  );
}

export default function ProductForm({
  mode,
  categories,
  product,
}: ProductFormProps) {
  const router = useRouter();

const [store, setStore] = useState<{
  id: string;
  name: string;
} | null>(null);


  const [title, setTitle] = useState(product?.title ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    product?.categories ?? [],
  );
  const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>(categories);

  const [purchaseMode, setPurchaseMode] = useState<"internal" | "external">(
    product?.purchase_mode ?? "internal",
  );

  const [externalUrl, setExternalUrl] = useState(product?.external_url ?? "");
  const [selectedStore, setSelectedStore] = useState<StoreItem | null>(
    product?.store_id && product?.store_name
      ? {
          id: product.store_id,
          name: product.store_name,
          slug: product.store_slug ?? "",
          website_url: product.store_website_url ?? null,
        }
      : null,
  );

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

  useEffect(() => {
    if (purchaseMode === "internal") {
      setExternalUrl("");
      setSelectedStore(null);
    }
  }, [purchaseMode]);

  const previewUrl = useMemo(() => {
    if (fileValue[0]) return URL.createObjectURL(fileValue[0]);
    return product?.cover_image_url ?? null;
  }, [fileValue, product?.cover_image_url]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (purchaseMode === "external" && !store?.id) {
        alert("Choose a store for external products.");
        setIsSubmitting(false);
        return;
      }

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
            storeId: purchaseMode === "external" ? store?.id ?? null : null, // 👈 REQUIRED FIX

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
          <Label tip="The name customers and staff will see for this product.">
            Product title
          </Label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldClassName()}
            placeholder="Enter product title"
            required
          />
        </div>

        <div>
          <Label tip="An internal tracking code for your own reference.">
            SKU
          </Label>
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
          <Label tip="The selling price for this product.">
            Price
          </Label>
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
          <Label tip="An optional old price used to show a discount.">
            Compare at price
          </Label>
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
          <Label tip="Choose whether this product is sold inside your own store or redirected to another store.">
            Product type
          </Label>
          <select
            value={purchaseMode}
            onChange={(e) =>
              setPurchaseMode(e.target.value as "internal" | "external")
            }
            className={fieldClassName()}
          >
            <option value="internal">Internal</option>
            <option value="external">External</option>
          </select>
        </div>

        <div>
          <Label tip="The current product status shown in the admin system.">
            Product status
          </Label>
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
          <Label tip="Choose whether stock is tracked by quantity or by a simple stock state.">
            Inventory mode
          </Label>
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
            <Label tip="How many units are currently available.">
              Stock quantity
            </Label>
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
            <Label tip="Use this when you are not tracking exact quantity.">
              Stock status
            </Label>
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

        {purchaseMode === "external" ? (
          <>
            <div className="md:col-span-2">
              <Label tip="Search and select the store this external product belongs to.">
                Store
              </Label>
               <StoreCombobox
                  value={store}
                    onChange={(s) => setStore(s)}
                />

                <p className="mt-2 text-xs text-slate-500">
                  Select or create the store where this product is sold.
                </p>
            </div>

            <div className="md:col-span-2">
              <Label tip="The exact page customers will be sent to when they click the product.">
                External buying link
              </Label>
              <input
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                className={fieldClassName()}
                placeholder="https://..."
              />
              <p className="mt-2 text-xs text-slate-500">
                This is the destination URL for the customer.
              </p>
            </div>
          </>
        ) : null}

        <div className="md:col-span-2">
          <Label tip="A longer description of the product.">
            Description
          </Label>
          <textarea
            rows={6}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={textareaClassName()}
            placeholder="Describe the product"
          />
        </div>

        <div className="md:col-span-2">
          <Label tip="Upload the main product image. One image is enough.">
            Product image
          </Label>

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