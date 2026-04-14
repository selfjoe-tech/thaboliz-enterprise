// app/components/admin/(dashboard)/products/product-form.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileUpload, FileUploadDropzone, FileUploadList, FileUploadItem, FileUploadItemPreview, FileUploadItemProgress, FileUploadItemDelete, FileUploadItemMetadata, FileUploadTrigger } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

import { uploadFile, deleteFileByPublicUrl } from "@/app/lib/actions/dashboard-info/file";
import { updateProductAction } from "@/app/lib/actions/dashboard-info/product";

type CategoryOption = { label: string; value: string };

export default function ProductEditForm({ product, categories }: { product: any; categories: CategoryOption[] }) {
  const router = useRouter();

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price ?? 0);
  const [category, setCategory] = useState(product?.category ?? (categories?.[0]?.label ?? ""));
  const [weight, setWeight] = useState(product?.weight ?? null);
  const [status, setStatus] = useState(product?.status ?? "unpublished");

  const [fileValue, setFileValue] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Public URL helper (used for preview)
  const publicUrlFor = (pathOrUrl?: string | null) => {
    if (!pathOrUrl) return null;
    // if already a full URL, return as-is
    try {
      const u = new URL(pathOrUrl);
      // valid URL => return as-is
      return pathOrUrl;
    } catch {
      // not a full URL — build one (fallback)
      const base = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
      return base ? `${base}/storage/v1/object/public/images/${encodeURIComponent(pathOrUrl)}` : null;
    }
  };

  useEffect(() => {
    // You could set fileValue to an empty array (we show preview separately via publicUrlFor())
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let newPublicUrl = product?.image_url ?? null; // store public URL here if changed

      // upload new file if selected
      if (fileValue && fileValue.length > 0) {
        const form = new FormData();
        form.append("file", fileValue[0]);
        const res = await uploadFile(form);
        if (!res?.success) throw new Error(res?.error || "Upload failed");
        newPublicUrl = res.publicUrl;
      }

      // update product in DB (store publicUrl directly)
      const payload: any = {
        id: product.id,
        name,
        description,
        price: Number(price),
        category,
        image_url: newPublicUrl,
        weight: Number(weight),
        status,
      };

      console.log(payload, "<========== payloaddd")

      const updateRes = await updateProductAction(payload);
      if (!updateRes?.success) throw new Error(updateRes?.error || "Update failed");

      // if there was an old image and it's different from the new one, delete it (async)
      const old = product?.image_url;
      if (old && newPublicUrl && old !== newPublicUrl) {
        // delete asynchronously — if deletion fails, show console warning
        deleteFileByPublicUrl(old).then((r: any) => {
          if (!r?.success) console.warn("Failed to delete old file", r);
        });
      }

      // navigate back or show success
      router.back();
    } catch (err: any) {
      console.error("Update failed:", err);
      alert("Failed to update product: " + (err?.message ?? err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border px-3 py-2 rounded">
            {categories.map((c) => (
              <option key={c.value} value={c.label}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm">Price (R)</label>
          <input value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" step="0.01" className="w-full border px-3 py-2 rounded" />
        </div>

        

        <div className="md:col-span-2">
          <label className="block text-sm">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border px-3 py-2 rounded" rows={4} />
        </div>

        <div>
          <label className="block text-sm">Weight (optional)</label>
          <input value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label className="block text-sm">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="published">Published</option>
            <option value="unpublished">Unpublished</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-2">Image</label>

          {product?.image_url && (
            <div className="mb-3">
              <img src={publicUrlFor(product.image_url) ?? ""} alt={product.name} className="h-24 w-24 object-cover rounded" />
            </div>
          )}

          <FileUpload value={fileValue} onValueChange={(files: File[]) => setFileValue(files)} maxFiles={1} maxSize={5 * 1024 * 1024} multiple={false} className="w-full">
            <FileUploadDropzone>
              <div className="flex flex-col items-center gap-1 text-center p-3">
                <div className="flex items-center justify-center rounded-full border p-2.5">
                  <Upload className="size-6 text-muted-foreground" />
                </div>
                <p className="font-medium text-sm">Drag & drop a file</p>
                <p className="text-muted-foreground text-xs">Or click to browse (1 file, up to 5MB)</p>
              </div>
              <FileUploadTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2 w-fit">Browse file</Button>
              </FileUploadTrigger>
            </FileUploadDropzone>

            <FileUploadList orientation="horizontal">
              {fileValue.map((file, i) => (
                <FileUploadItem key={i} value={file} className="p-0 relative">
                  <FileUploadItemPreview className="size-20 [&>svg]:size-12">
                    <FileUploadItemProgress variant="circular" size={40} value={0} />
                  </FileUploadItemPreview>
                  <FileUploadItemMetadata>
                    <div className="text-xs truncate max-w-[120px]">{file.name}</div>
                    <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</div>
                  </FileUploadItemMetadata>
                  <FileUploadItemDelete asChild>
                    <button type="button" className="absolute -top-2 -right-2 size-5 rounded-full bg-white border" onClick={() => setFileValue([])}>
                      <X className="size-3" />
                    </button>
                  </FileUploadItemDelete>
                </FileUploadItem>
              ))}
            </FileUploadList>
          </FileUpload>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="bg-black text-white" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save changes"}</Button>
        <Button type="button" onClick={() => router.back()} className="border">Cancel</Button>
      </div>
    </form>
  );
}
