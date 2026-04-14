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
  createCatalogueProductAction,
  updateCatalogueProductAction,
} from "@/app/lib/actions/dashboard-info/catalogue-product";
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
    slug: string;
    description: string | null;
    category_id: string | null;
    retailer: "Takealot" | "Makro";
    external_url: string;
    price: number;
    original_price: number | null;
    image_url: string | null;
    rating: number | null;
    review_count: number;
    is_featured: boolean;
    is_published: boolean;
    sort_order: number;
  };
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ProductForm({
  mode,
  categories,
  product,
}: ProductFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(product?.title ?? "");
  const [slug, setSlug] = useState(product?.slug ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
    const [categoryNames, setCategoryNames] = useState<string[]>(
    product?.category_names ?? []
    );



const [retailer, setRetailer] = useState<"Takealot" | "Makro">(
    product?.retailer ?? "Takealot"
  );
  const [externalUrl, setExternalUrl] = useState(product?.external_url ?? "");
  const [price, setPrice] = useState(String(product?.price ?? ""));
  const [originalPrice, setOriginalPrice] = useState(
    product?.original_price != null ? String(product.original_price) : ""
  );
  const [rating, setRating] = useState(
    product?.rating != null ? String(product.rating) : ""
  );
  const [reviewCount, setReviewCount] = useState(
    String(product?.review_count ?? 0)
  );
  const [sortOrder, setSortOrder] = useState(String(product?.sort_order ?? 0));
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [isPublished, setIsPublished] = useState(product?.is_published ?? false);
  const [fileValue, setFileValue] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const previewUrl = useMemo(() => {
    if (fileValue[0]) return URL.createObjectURL(fileValue[0]);
    return product?.image_url ?? null;
  }, [fileValue, product?.image_url]);

  const handleGenerateSlug = () => {
    setSlug(slugify(title));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = product?.image_url ?? null;

      if (fileValue.length > 0) {
        const form = new FormData();
        form.append("file", fileValue[0]);

        const uploadRes = await uploadFile(form);
        if (!uploadRes?.success) {
          throw new Error(uploadRes?.error || "Image upload failed");
        }

        imageUrl = uploadRes.publicUrl;
      }

      const payload = {
        ...(mode === "edit" ? { id: product?.id } : {}),
        title,
        slug,
        description: description || null,
        category_id: categoryId || null,
        retailer,
        external_url: externalUrl,
        price: Number(price || 0),
        original_price: originalPrice ? Number(originalPrice) : null,
        image_url: imageUrl,
        rating: rating ? Number(rating) : null,
        review_count: Number(reviewCount || 0),
        is_featured: isFeatured,
        is_published: isPublished,
        sort_order: Number(sortOrder || 0),
      };

      const res =
        mode === "create"
          ? await createCatalogueProductAction(payload)
          : await updateCatalogueProductAction(payload);

      if (!res?.success) {
        throw new Error(res?.error || "Failed to save product");
      }

      if (
        mode === "edit" &&
        product?.image_url &&
        imageUrl &&
        product.image_url !== imageUrl
      ) {
        deleteFileByPublicUrl(product.image_url).catch(() => {});
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
    <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 border border-border">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Title</label>
          <input
            value={title}
            onChange={(e) => {
                const nextTitle = e.target.value;
                setTitle(nextTitle);
                setSlug(slugify(nextTitle));
            }}
            className="h-11 w-full border border-input bg-background px-3"
          />
        </div>

        
          

        <div>
          <label className="mb-2 block text-sm font-medium">Category</label>
          <div>
            <CategoryMultiSelect
                options={categories}
                value={categoryNames}
                onChange={setCategoryNames}
            />
            </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Retailer</label>
          <select
            value={retailer}
            onChange={(e) => setRetailer(e.target.value as "Takealot" | "Makro")}
            className="h-11 w-full border border-input bg-background px-3"
          >
            <option value="Takealot">Takealot</option>
            <option value="Makro">Makro</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">External URL</label>
          <input
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            className="h-11 w-full border border-input bg-background px-3"
            placeholder="https://www.takealot.com/..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="h-11 w-full border border-input bg-background px-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Original Price</label>
          <input
            type="number"
            step="0.01"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            className="h-11 w-full border border-input bg-background px-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Rating</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="h-11 w-full border border-input bg-background px-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Review Count</label>
          <input
            type="number"
            value={reviewCount}
            onChange={(e) => setReviewCount(e.target.value)}
            className="h-11 w-full border border-input bg-background px-3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Sort Order</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="h-11 w-full border border-input bg-background px-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Description</label>
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-input bg-background px-3 py-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">Image</label>

          {previewUrl ? (
            <div className="mb-4">
              <img
                src={previewUrl}
                alt="Preview"
                className="h-28 w-28 border border-border object-cover"
              />
            </div>
          ) : null}

          <FileUpload
            value={fileValue}
            onValueChange={(files: File[]) => setFileValue(files)}
            maxFiles={1}
            maxSize={5 * 1024 * 1024}
            multiple={false}
            className="w-full"
          >
            <FileUploadDropzone>
              <div className="flex flex-col items-center gap-2 p-4 text-center">
                <div className="border border-border p-3">
                  <Upload className="h-5 w-5" />
                </div>
                <p className="text-sm font-medium">Upload product image</p>
                <p className="text-xs text-muted-foreground">
                  1 file only, up to 5MB
                </p>
              </div>

              <FileUploadTrigger asChild>
                <Button type="button" variant="outline" size="sm">
                  Browse file
                </Button>
              </FileUploadTrigger>
            </FileUploadDropzone>

            <FileUploadList orientation="horizontal">
              {fileValue.map((file, i) => (
                <FileUploadItem key={i} value={file} className="relative p-0">
                  <FileUploadItemPreview className="size-20 [&>svg]:size-10">
                    <FileUploadItemProgress value={0} variant="circular" size={40} />
                  </FileUploadItemPreview>
                  <FileUploadItemMetadata>
                    <div className="max-w-[120px] truncate text-xs">{file.name}</div>
                  </FileUploadItemMetadata>
                  <FileUploadItemDelete asChild>
                    <button
                      type="button"
                      className="absolute -right-2 -top-2 border border-border bg-background p-1"
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

        <div className="flex items-center gap-3">
          <input
            id="featured"
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          <label htmlFor="featured" className="text-sm font-medium">
            Featured product
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="published"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label htmlFor="published" className="text-sm font-medium">
            Published
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : mode === "create" ? "Create product" : "Save changes"}
        </Button>

        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}