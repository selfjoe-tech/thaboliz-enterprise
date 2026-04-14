"use client";

import React, { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ConfirmModal from "@/components/ui/confirm-modal";
import { uploadFile } from "@/app/lib/actions/dashboard-info/file";
import { createProductAction } from "@/app/lib/actions/dashboard-info/product";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// Dice UI file upload components (your demo path)
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

type CategoryOption = { label: string; value: string };

type BatchItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  imageFile: File | null;
  image_url?: string | null;
  weight?: string;
  status?: "published" | "unpublished";
};

export default function ProductBatchForm({ categories }: { categories: CategoryOption[] }) {
  const [items, setItems] = useState<BatchItem[]>(() => [
    {
      id: uuidv4(),
      name: "",
      description: "",
      price: "",
      category: categories?.[0]?.label ?? "",
      imageFile: null,
      image_url: null,
      weight: "",
      status: "unpublished",
    },
  ]);

  const [activeValue, setActiveValue] = useState<string | null>(items[0].id);
  const [removeRequest, setRemoveRequest] = useState<{ index: number; open: boolean } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  // per-item upload progress 0..100
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  // store fileupload controlled arrays per item (Dice FileUpload uses File[])
  const [fileValues, setFileValues] = useState<Record<string, File[]>>({});

  // helpers
  const updateItem = (index: number, patch: Partial<BatchItem>) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...patch };
      return copy;
    });
  };

  const addItem = () => {
    const newItem: BatchItem = {
      id: uuidv4(),
      name: "",
      description: "",
      price: "",
      category: categories?.[0]?.label ?? "",
      imageFile: null,
      image_url: null,
      weight: "",
      status: "unpublished",
    };
    setItems((prev) => [...prev, newItem]);
    setActiveValue(newItem.id);
  };

  const confirmRemoveIndex = (index: number) => {
    setRemoveRequest({ index, open: true });
  };

  const doRemoveConfirmed = () => {
    if (!removeRequest) return;
    const idx = removeRequest.index;
    setItems((prev) => prev.filter((_, i) => i !== idx));
    setRemoveRequest(null);
  };

  const cancelRemove = () => setRemoveRequest(null);

  // simulate smooth progress while uploading: increments until stopped
  const startSimulatedProgress = (id: string) => {
    setProgressMap((p) => ({ ...p, [id]: 0 }));
    const interval = setInterval(() => {
      setProgressMap((prev) => {
        const cur = prev[id] ?? 0;
        const next = Math.min(98, cur + Math.random() * 12); // cap <100 while uploading
        return { ...prev, [id]: next };
      });
    }, 300);

    return () => clearInterval(interval);
  };

  // Batch create/upload: sequential for simpler error handling
  const handleBatchCreate = async () => {
    setIsUploading(true);
    setResults([]);
    const out: any[] = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      // basic validation
      if (!item.name || !item.price) {
        out.push({ index: i, success: false, error: "Missing name or price" });
        continue;
      }

      // upload file if present (Dice FileUpload stores File in fileValues[item.id][0])
      let url: string | null = item.image_url ?? null;
      const fileArr = fileValues[item.id];
      const fileToUpload = fileArr?.[0] ?? null;

      if (fileToUpload) {
        // start simulated progress
        const stop = startSimulatedProgress(item.id);

        try {
          const form = new FormData();
          form.append("file", fileToUpload);
          const res = await uploadFile(form); // your client helper: POST /api/files/upload
          stop(); // stop simulation
          setProgressMap((p) => ({ ...p, [item.id]: 100 }));
          if (res?.success) {
            url = res.publicUrl
          } else {
            out.push({ index: i, success: false, error: res?.error || "Upload failed" });
            continue;
          }
        } catch (err) {
          setProgressMap((p) => ({ ...p, [item.id]: 0 }));
          out.push({ index: i, success: false, error: String(err) });
          continue;
        }
      }

      // create product payload
      const payload: any = {
        name: item.name,
        description: item.description,
        price: parseFloat(String(item.price)),
        category: item.category,
        image_url: url,
        weight: item.weight || null,
        status: item.status ?? "unpublished",
      };

      try {
        const createRes = await createProductAction(payload);
        if (createRes?.success) {
          out.push({ index: i, success: true, product: createRes.product });
        } else {
          out.push({ index: i, success: false, error: createRes?.error || "Create failed" });
        }
      } catch (err) {
        out.push({ index: i, success: false, error: String(err) });
      } finally {
        // ensure progress set to 100 for UI if no file uploaded
        setProgressMap((p) => ({ ...p, [item.id]: fileToUpload ? p[item.id] ?? 0 : 100 }));
      }
    }

    setResults(out);
    setIsUploading(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">Add multiple products (fill each accordion item)</div>
        <div className="flex gap-2">
          <Button type="button" onClick={addItem} className="bg-sky-600 text-white">
            + Add item
          </Button>
          <Button
            type="button"
            disabled={isUploading}
            onClick={handleBatchCreate}
            className="bg-black text-white"
          >
            {isUploading ? "Uploading..." : "Publish"}
          </Button>
        </div>
      </div>

      <Accordion type="single" collapsible value={activeValue ?? undefined} onValueChange={(v) => setActiveValue(v ?? null)}>
        {items.map((it, idx) => (
          <AccordionItem key={it.id} value={it.id}>
            <AccordionTrigger className="flex items-center justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="truncate text-sm font-medium">{it.name || `New product ${idx + 1}`}</div>
                <div className="text-xs text-muted-foreground ml-2">— {it.category}</div>
              </div>

              <div className="flex items-center gap-2">
                {/* show small progress indicator if uploading */}
                <div className="text-xs text-gray-500 min-w-[48px] text-right">{progressMap[it.id] ? `${Math.round(progressMap[it.id])}%` : ""}</div>

                {/* Remove button inside the trigger (stops propagation to avoid toggling) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    confirmRemoveIndex(idx);
                  }}
                  aria-label={`Remove product ${idx + 1}`}
                  className="px-2 py-1 text-xs rounded bg-red-50 text-red-600 hover:bg-red-100"
                >
                  Remove
                </button>
              </div>
            </AccordionTrigger>

            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm">Name</label>
                  <input
                    value={it.name}
                    onChange={(e) => updateItem(idx, { name: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="Product name"
                  />
                </div>

                <div>
                  <label className="block text-sm">Category</label>
                  <select
                    value={it.category}
                    onChange={(e) => updateItem(idx, { category: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                  >
                    {categories.map((c) => (
                      <option key={c.value} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm">Price (R)</label>
                  <input
                    value={it.price}
                    onChange={(e) => updateItem(idx, { price: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                  />
                </div>

                

                <div className="md:col-span-2">
                  <label className="block text-sm">Description</label>
                  <textarea
                    value={it.description}
                    onChange={(e) => updateItem(idx, { description: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm">Weight (optional)</label>
                  <input
                    value={it.weight}
                    onChange={(e) => updateItem(idx, { weight: e.target.value })}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="e.g. 500g"
                  />
                </div>

                <div>
                  <label className="block text-sm">Status</label>
                  <select
                    value={it.status}
                    onChange={(e) =>
                      updateItem(idx, { status: e.target.value as "published" | "unpublished" })
                    }
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="published">Published</option>
                    <option value="unpublished">Unpublished</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">Image</label>

                  {/* Dice FileUpload (single file) */}
                  <FileUpload
                    value={fileValues[it.id] ?? []}
                    onValueChange={(files: any) => {
                      setFileValues((prev) => ({ ...prev, [it.id]: files }));
                      updateItem(idx, { imageFile: files?.[0] ?? null });
                    }}
                    maxFiles={1}
                    maxSize={5 * 1024 * 1024}
                    className="w-full"
                    multiple={false}
                  >
                    <FileUploadDropzone>
                      <div className="flex flex-col items-center gap-1 text-center p-3">
                        <div className="flex items-center justify-center rounded-full border p-2.5">
                          <Upload className="size-6 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-sm">Drag & drop a file</p>
                        <p className="text-muted-foreground text-xs">Or click to browse (1 file, up to 5MB)</p>
                      </div>
                      <FileUploadTrigger asChild>
                        <Button variant="outline" size="sm" className="mt-2 w-fit">
                          Browse file
                        </Button>
                      </FileUploadTrigger>
                    </FileUploadDropzone>

                    <FileUploadList orientation="horizontal">
                      {(fileValues[it.id] ?? []).map((file, i) => (
                        <FileUploadItem key={i} value={file} className="p-0 relative">
                          <FileUploadItemPreview className="size-20 [&>svg]:size-12">
                            <FileUploadItemProgress variant="circular" size={40} value={progressMap[it.id] ?? 0} />
                          </FileUploadItemPreview>
                          <FileUploadItemMetadata>
                            <div className="text-xs truncate max-w-[120px]">{file.name}</div>
                            <div className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</div>
                          </FileUploadItemMetadata>
                          <FileUploadItemDelete asChild>
                            <button
                              type="button"
                              className="absolute -top-2 -right-2 size-5 rounded-full bg-white border"
                              onClick={() => {
                                // remove file for this item
                                setFileValues((prev) => ({ ...prev, [it.id]: [] }));
                                updateItem(idx, { imageFile: null });
                              }}
                            >
                              <X className="size-3" />
                            </button>
                          </FileUploadItemDelete>
                        </FileUploadItem>
                      ))}
                    </FileUploadList>
                  </FileUpload>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Confirm modal for removing item */}
      {removeRequest && (
        <ConfirmModal
          open={removeRequest.open}
          title="Remove item?"
          description="This will remove the product form. Are you sure?"
          confirmLabel="Remove"
          confirmIntent="danger"
          onClose={() => setRemoveRequest(null)}
          isProcessing={false}
          onConfirm={() => {
            doRemoveConfirmed();
          }}
        />
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Results</h3>
          <ul className="space-y-2">
            {results.map((r, i) => (
              <li key={i} className={`p-2 rounded ${r.success ? "bg-green-50" : "bg-red-50"}`}>
                Item {r.index + 1}: {r.success ? "Uploaded" : "Failed"} {r.error ? ` — ${r.error}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
