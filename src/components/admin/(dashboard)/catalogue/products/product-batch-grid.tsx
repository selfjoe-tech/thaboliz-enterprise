"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ClipboardEvent,
} from "react";
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";
import {
  CheckCircle2,
  Copy,
  Eraser,
  FileSpreadsheet,
  FileText,
  ImagePlus,
  Loader2,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/ui/confirm-modal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
} from "@/components/ui/file-upload";

import { batchCreateCatalogueProductsAction } from "@/app/lib/actions/dashboard-info/catalogue-product";
import {
  deleteFileByPublicUrl,
  uploadFile,
} from "@/app/lib/actions/dashboard-info/file";
import {
  useCatalogueProductBatchDraftStore,
  type CatalogueBatchDraftRow,
} from "@/stores/catalogue-product-batch-draft-store";
import CategoryMultiSelect from "./category-multi-select";

type Category = {
  id: string;
  name: string;
  slug?: string;
};

type Retailer = "Takealot" | "Makro";

type BatchRow = {
  rowId: string;
  title: string;
  slug: string;
  description: string;
  category_names: string[];
  retailer: Retailer;
  external_url: string;
  price: string;
  original_price: string;
  image_url: string;
  image_file: File | null;
  image_preview_url: string;
  rating: string;
  review_count: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: string;
  errors?: Partial<
    Record<
      | "title"
      | "category_id"
      | "external_url"
      | "price"
      | "original_price"
      | "rating"
      | "review_count"
      | "sort_order",
      string
    >
  >;
};

const TEMPLATE_HEADERS = [
  "title",
  "description",
  "categories",
  "retailer",
  "external_url",
  "price",
  "original_price",
  "image_url",
  "rating",
  "review_count",
  "is_featured",
  "is_published",
  "sort_order",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\\s-]/g, "")
    .replace(/\\s+/g, "-")
    .replace(/-+/g, "-");
}

function newRow(defaultCategoryId = ""): BatchRow {
  return {
    rowId: uuidv4(),
    title: "",
    slug: "",
    description: "",
    category_names: [],
    retailer: "Takealot",
    external_url: "",
    price: "",
    original_price: "",
    image_url: "",
    image_file: null,
    image_preview_url: "",
    rating: "",
    review_count: "0",
    is_featured: false,
    is_published: false,
    sort_order: "0",
    errors: {},
  };
}

function toDraftRow(row: BatchRow): CatalogueBatchDraftRow {
  return {
    rowId: row.rowId,
    title: row.title,
    slug: row.slug,
    description: row.description,
    category_names: row.category_names,
    retailer: row.retailer,
    external_url: row.external_url,
    price: row.price,
    original_price: row.original_price,
    image_url: row.image_url,
    rating: row.rating,
    review_count: row.review_count,
    is_featured: row.is_featured,
    is_published: row.is_published,
    sort_order: row.sort_order,
  };
}

function fromDraftRow(row: CatalogueBatchDraftRow): BatchRow {
  return {
    ...row,
    image_file: null,
    image_preview_url: "",
    errors: {},
  };
}

function normalizeBoolean(value: unknown) {
  const v = String(value ?? "").trim().toLowerCase();
  return v === "true" || v === "yes" || v === "1";
}

function normalizeRetailer(value: unknown): Retailer {
  const v = String(value ?? "").trim().toLowerCase();
  return v === "makro" ? "Makro" : "Takealot";
}

function mapCategoryToId(value: unknown, categories: Category[]) {
  const raw = String(value ?? "").trim().toLowerCase();
  if (!raw) return "";

  const match = categories.find(
    (c) =>
      c.id.toLowerCase() === raw ||
      c.name.toLowerCase() === raw ||
      (c.slug && c.slug.toLowerCase() === raw)
  );

  return match?.id ?? "";
}

function parseCategoriesCell(value: unknown): string[] {
  return String(value ?? "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function rowFromImportedRecord(
  record: Record<string, unknown>,
  categories: Category[]
): BatchRow {
  const title = String(record.title ?? "").trim();

  return {
    rowId: uuidv4(),
    title,
    slug: slugify(title),
    description: String(record.description ?? "").trim(),
    category_names: parseCategoriesCell(record.categories ?? record.category),    retailer: normalizeRetailer(record.retailer),
    external_url: String(record.external_url ?? "").trim(),
    price: String(record.price ?? "").trim(),
    original_price: String(record.original_price ?? "").trim(),
    image_url: String(record.image_url ?? "").trim(),
    image_file: null,
    image_preview_url: "",
    rating: String(record.rating ?? "").trim(),
    review_count: String(record.review_count ?? "0").trim(),
    is_featured: normalizeBoolean(record.is_featured),
    is_published: normalizeBoolean(record.is_published),
    sort_order: String(record.sort_order ?? "0").trim(),
    errors: {},
  };
}

function validateRow(row: BatchRow) {
  const errors: BatchRow["errors"] = {};

  if (!row.title.trim()) errors.title = "Required";
    if (!row.category_names?.length) errors.category_names = "Choose at least one category";  if (!row.external_url.trim()) errors.external_url = "Required";

  if (row.external_url.trim()) {
    try {
      new URL(row.external_url.trim());
    } catch {
      errors.external_url = "Invalid URL";
    }
  }

  if (!row.price.trim()) {
    errors.price = "Required";
  } else if (Number(row.price) <= 0 || Number.isNaN(Number(row.price))) {
    errors.price = "Must be > 0";
  }

  if (row.original_price.trim() && Number.isNaN(Number(row.original_price))) {
    errors.original_price = "Invalid number";
  }

  if (row.rating.trim()) {
    const n = Number(row.rating);
    if (Number.isNaN(n) || n < 0 || n > 5) {
      errors.rating = "0 to 5";
    }
  }

  if (row.review_count.trim() && Number.isNaN(Number(row.review_count))) {
    errors.review_count = "Invalid number";
  }

  if (row.sort_order.trim() && Number.isNaN(Number(row.sort_order))) {
    errors.sort_order = "Invalid number";
  }

  return { ...row, errors };
}

function templateRows() {
  return [
    {
      title: "",
      description: "",
      categories: "",
      retailer: "Takealot",
      external_url: "",
      price: "",
      original_price: "",
      image_url: "",
      rating: "",
      review_count: "0",
      is_featured: "false",
      is_published: "false",
      sort_order: "0",
    },
  ];
}

function fieldClass(error?: string) {
  return [
    "h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition",
    error ? "border-destructive" : "border-input",
  ].join(" ");
}

function textareaClass() {
  return "min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition resize-y";
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-destructive">{message}</p>;
}

function RowImageUploader({
  imageUrl,
  previewUrl,
  onPickFile,
  onRemove,
}: {
  imageUrl: string;
  previewUrl: string;
  onPickFile: (file: File | null, previewUrl: string) => void;
  onRemove: () => void;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [isPicking, setIsPicking] = useState(false);

  const visibleImage = previewUrl || imageUrl;

  function handleFiles(nextFiles: File[]) {
    setFiles(nextFiles);

    const file = nextFiles[0];
    if (!file) {
      onPickFile(null, "");
      return;
    }

    setIsPicking(true);
    const localPreview = URL.createObjectURL(file);
    onPickFile(file, localPreview);
    setIsPicking(false);
  }

  return (
    <div className="space-y-3">
      {visibleImage ? (
        <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-3">
          <img
            src={visibleImage}
            alt="Product preview"
            className="h-20 w-20 rounded-md border border-border object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs text-muted-foreground">
              {previewUrl ? "Selected local image" : imageUrl}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Local files upload only when you click Publish All.
            </p>

            <button
              type="button"
              onClick={() => {
                setFiles([]);
                onRemove();
              }}
              className="mt-2 inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </button>
          </div>
        </div>
      ) : null}

      <FileUpload
        value={files}
        onValueChange={handleFiles}
        maxFiles={1}
        maxSize={5 * 1024 * 1024}
        multiple={false}
        className="w-full"
      >
        <FileUploadDropzone className="rounded-xl border border-dashed border-border bg-background p-4">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              {isPicking ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ImagePlus className="h-4 w-4" />
              )}
              <span className="text-sm">
                {visibleImage ? "Replace image" : "Choose image"}
              </span>
            </div>

            <FileUploadTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm"
              >
                <Upload className="h-4 w-4" />
                Browse
              </button>
            </FileUploadTrigger>
          </div>
        </FileUploadDropzone>
      </FileUpload>
    </div>
  );
}

function RowStatusBadge({
  invalid,
  retailer,
}: {
  invalid: boolean;
  retailer: Retailer;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={[
          "inline-flex rounded-full px-2 py-1 text-[11px] font-medium",
          invalid
            ? "bg-red-100 text-red-700"
            : "bg-emerald-100 text-emerald-700",
        ].join(" ")}
      >
        {invalid ? "Needs fixes" : "Valid"}
      </span>

      <span className="inline-flex rounded-full bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground">
        {retailer}
      </span>
    </div>
  );
}

export default function ProductBatchGrid({
  categories,
}: {
  categories: Category[];
}) {
  const [rows, setRows] = useState<BatchRow[]>([newRow(categories[0]?.id ?? "")]);
  const [activeItem, setActiveItem] = useState<string | undefined>(rows[0]?.rowId);
  const [isPublishing, setIsPublishing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [summary, setSummary] = useState<{
    success: number;
    failed: number;
    errors: string[];
  } | null>(null);
  const [restoredDraft, setRestoredDraft] = useState(false);

  const csvInputRef = useRef<HTMLInputElement | null>(null);
  const excelInputRef = useRef<HTMLInputElement | null>(null);
  const didBootFromDraftRef = useRef(false);

  const draftRows = useCatalogueProductBatchDraftStore((state) => state.draftRows);
  const draftActiveRowId = useCatalogueProductBatchDraftStore(
    (state) => state.activeRowId
  );
  const draftSavedAt = useCatalogueProductBatchDraftStore(
    (state) => state.draftSavedAt
  );
  const saveDraftToStore = useCatalogueProductBatchDraftStore(
    (state) => state.saveDraft
  );
  const clearDraftStore = useCatalogueProductBatchDraftStore(
    (state) => state.clearDraft
  );
  const hasHydrated = useCatalogueProductBatchDraftStore(
    (state) => state.hasHydrated
  );

  

  const validatedRows = useMemo(() => rows.map(validateRow), [rows]);

  const invalidCount = validatedRows.filter(
    (row) => Object.keys(row.errors ?? {}).length > 0
  ).length;

  useEffect(() => {
    if (!hasHydrated || didBootFromDraftRef.current) return;

    if (draftRows.length > 0) {
      const revivedRows = draftRows.map(fromDraftRow);
      setRows(revivedRows);
      setActiveItem(draftActiveRowId ?? revivedRows[0]?.rowId);
      setRestoredDraft(true);
    } else {
      const initial = [newRow(categories[0]?.id ?? "")];
      setRows(initial);
      setActiveItem(initial[0]?.rowId);
    }

    didBootFromDraftRef.current = true;
  }, [hasHydrated, draftRows, draftActiveRowId, categories]);

  useEffect(() => {
    if (!hasHydrated || !didBootFromDraftRef.current) return;
    saveDraftToStore(rows.map(toDraftRow), activeItem ?? null);
  }, [rows, activeItem, hasHydrated, saveDraftToStore]);

  function updateRow(rowId: string, patch: Partial<BatchRow>) {
    setRows((prev) =>
      prev.map((row) => {
        if (row.rowId !== rowId) return row;

        const next = { ...row, ...patch };

        if (Object.prototype.hasOwnProperty.call(patch, "title")) {
          next.slug = slugify(next.title);
        }

        return next;
      })
    );
  }

  function addRows(count = 1) {
    const nextRows = Array.from({ length: count }, () =>
      newRow(categories[0]?.id ?? "")
    );

    setRows((prev) => [...prev, ...nextRows]);
    if (nextRows[0]) {
      setActiveItem(nextRows[0].rowId);
    }
  }

  function duplicateRow(rowId: string) {
    const target = rows.find((r) => r.rowId === rowId);
    if (!target) return;

    const duplicate: BatchRow = {
      ...target,
      rowId: uuidv4(),
      title: `${target.title} Copy`.trim(),
      slug: slugify(`${target.title} Copy`),
      image_file: null,
      image_preview_url: "",
      errors: {},
    };

    setRows((prev) => [...prev, duplicate]);
    setActiveItem(duplicate.rowId);
  }

  function deleteRow(rowId: string) {
    setRows((prev) => {
      const target = prev.find((row) => row.rowId === rowId);
      if (target?.image_preview_url?.startsWith("blob:")) {
        URL.revokeObjectURL(target.image_preview_url);
      }

      const next = prev.filter((row) => row.rowId !== rowId);

      if (!next.length) {
        const fallback = newRow(categories[0]?.id ?? "");
        setActiveItem(fallback.rowId);
        return [fallback];
      }

      if (activeItem === rowId) {
        setActiveItem(next[0]?.rowId);
      }

      return next;
    });
  }

  function clearAll() {
    rows.forEach((row) => {
      if (row.image_preview_url?.startsWith("blob:")) {
        URL.revokeObjectURL(row.image_preview_url);
      }
    });

    const fresh = newRow(categories[0]?.id ?? "");
    setRows([fresh]);
    setActiveItem(fresh.rowId);
    setSummary(null);
    setRestoredDraft(false);
    clearDraftStore();
  }

  function saveDraftNow() {
    saveDraftToStore(rows.map(toDraftRow), activeItem ?? null);
  }

  function validateAllIntoState() {
    setRows(validatedRows);
  }

  function exportCsvTemplate() {
    const csv = Papa.unparse(templateRows());
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "catalogue-batch-template.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportExcelTemplate() {
    const worksheet = XLSX.utils.json_to_sheet(templateRows(), {
      header: TEMPLATE_HEADERS,
    });
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "catalogue-batch-template.xlsx");
  }

  function applyImportedRows(imported: BatchRow[]) {
    if (!imported.length) return;
    setRows(imported);
    setActiveItem(imported[0]?.rowId);
    setSummary(null);
  }

  function handleCsvImport(file: File) {
    Papa.parse<Record<string, unknown>>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const imported = (results.data ?? [])
          .filter((row) =>
            Object.values(row).some((v) => String(v ?? "").trim() !== "")
          )
          .map((row) => rowFromImportedRecord(row, categories));

        applyImportedRows(imported);
      },
      error: (error) => {
        alert(`CSV import failed: ${error.message}`);
      },
    });
  }

  async function handleExcelImport(file: File) {
    try {
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer);
      const firstSheet = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheet];
      const json = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheet, {
        defval: "",
      });

      const imported = json
        .filter((row) =>
          Object.values(row).some((v) => String(v ?? "").trim() !== "")
        )
        .map((row) => rowFromImportedRecord(row, categories));

      applyImportedRows(imported);
    } catch (error) {
      alert(`Excel import failed: ${String(error)}`);
    }
  }

  function handlePasteGrid(e: ClipboardEvent<HTMLTextAreaElement>) {
    const text = e.clipboardData.getData("text");
    if (!text.trim()) return;

    const parsed = Papa.parse<Record<string, unknown>>(text, {
      header: true,
      skipEmptyLines: true,
      delimiter: "\\t",
    });

    if (!parsed.data?.length) return;

    const imported = parsed.data
      .filter((row) =>
        Object.values(row).some((v) => String(v ?? "").trim() !== "")
      )
      .map((row) => rowFromImportedRecord(row, categories));

    if (imported.length) {
      applyImportedRows(imported);
      e.preventDefault();
    }
  }

  

  async function handlePublishAll() {
    const checked = validatedRows;
    setRows(checked);

    const validRows = checked.filter(
      (row) => Object.keys(row.errors ?? {}).length === 0
    );

    if (!validRows.length) {
      alert("No valid products to publish.");
      return;
    }

    setIsPublishing(true);

    const uploadedUrls: string[] = [];

    try {
      const payload = [];

      for (const row of validRows) {
        let finalImageUrl = row.image_url.trim() || null;

        if (row.image_file) {
          const form = new FormData();
          form.append("file", row.image_file);

          const uploadRes = await uploadFile(form);
          if (!uploadRes?.success) {
            throw new Error(
              uploadRes?.error || `Image upload failed for ${row.title || "item"}`
            );
          }

          finalImageUrl = uploadRes.publicUrl;
          uploadedUrls.push(uploadRes.publicUrl);
        }

        payload.push({
          title: row.title.trim(),
          slug: slugify(row.title),
          description: row.description.trim() || null,
          category_names: row.category_names,
          retailer: row.retailer,
          external_url: row.external_url.trim(),
          price: Number(row.price),
          original_price: null,
          image_url: finalImageUrl,
          rating: null,
          review_count: 0,
          is_featured: row.is_featured || false,
          is_published: row.is_published,
          sort_order: 0,
        });
      }

      const res = await batchCreateCatalogueProductsAction(payload);

      if (!res?.success) {
        throw new Error(res?.error || "Batch publish failed");
      }

      rows.forEach((row) => {
        if (row.image_preview_url?.startsWith("blob:")) {
          URL.revokeObjectURL(row.image_preview_url);
        }
      });

      clearDraftStore();

      const fresh = newRow(categories[0]?.id ?? "");
      setRows([fresh]);
      setActiveItem(fresh.rowId);

      setSummary({
        success: res.insertedCount ?? payload.length,
        failed: res.failedCount ?? 0,
        errors: res.errors ?? [],
      });
      setRestoredDraft(false);
      setConfirmState("success");


    } catch (error) {
      await Promise.allSettled(
        uploadedUrls.map((url) => deleteFileByPublicUrl(url))
      );
      alert(String(error));
    } finally {
      setIsPublishing(false);
    }
  }

const [confirmState, setConfirmState] = useState<"confirm" | "success">("confirm");

  const savedLabel = draftSavedAt
    ? new Date(draftSavedAt).toLocaleString()
    : null;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-border bg-card p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" onClick={() => addRows(1)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Item
          </Button>

          <Button type="button" variant="outline" onClick={() => addRows(5)}>
            <Plus className="mr-2 h-4 w-4" />
            Add 5 Items
          </Button>

          <Button type="button" variant="outline" onClick={validateAllIntoState}>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Validate
          </Button>

          <Button type="button" variant="outline" onClick={saveDraftNow}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>

          <Button type="button" variant="outline" onClick={exportCsvTemplate}>
            <FileText className="mr-2 h-4 w-4" />
            CSV Template
          </Button>

          <Button type="button" variant="outline" onClick={exportExcelTemplate}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            XLSX Template
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => csvInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => excelInputRef.current?.click()}
          >
            <Upload className="mr-2 h-4 w-4" />
            Import Excel
          </Button>

          <Button type="button" variant="outline" onClick={clearAll}>
            <Eraser className="mr-2 h-4 w-4" />
            Clear
          </Button>

          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {rows.length} item{rows.length === 1 ? "" : "s"} • {invalidCount} invalid
            </span>

            <Button
              type="button"
              disabled={isPublishing}
              onClick={() => {
                setConfirmState("confirm");
                setConfirmOpen(true);
            }}
            >
              <Upload className="mr-2 h-4 w-4" />
              {isPublishing ? "Publishing..." : "Publish All"}
            </Button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
          <span>
            Draft status: {savedLabel ? `saved locally at ${savedLabel}` : "not saved yet"}
          </span>
          <span>Auto-save is enabled for form changes.</span>
          {restoredDraft ? <span>Recovered your previous local draft.</span> : null}
        </div>

        <div className="mt-4 rounded-xl border border-dashed border-border p-4">
          <p className="text-sm font-medium">Paste from Excel / Google Sheets</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Copy rows with the template headers, then paste here.
          </p>
          <textarea
            rows={4}
            onPaste={handlePasteGrid}
            className="mt-3 w-full rounded-md border border-input bg-background p-3 text-sm outline-none"
            placeholder={`Paste tabular rows with headers:
title	description	category	retailer	external_url	price	original_price	image_url	rating	review_count	is_featured	is_published	sort_order`}
          />
        </div>

        <input
          ref={csvInputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleCsvImport(file);
            e.currentTarget.value = "";
          }}
        />

        <input
          ref={excelInputRef}
          type="file"
          accept=".xlsx,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleExcelImport(file);
            e.currentTarget.value = "";
          }}
        />
      </div>

      {summary ? (
        <div className="rounded-2xl border border-border bg-card p-4 text-sm">
          <p>
            Published <strong>{summary.success}</strong> product(s).
            {summary.failed > 0 ? (
              <>
                {" "}
                Failed: <strong>{summary.failed}</strong>.
              </>
            ) : null}
          </p>

          {summary.errors.length > 0 ? (
            <ul className="mt-2 space-y-1 text-destructive">
              {summary.errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-card">
        <Accordion
          type="single"
          collapsible
          value={activeItem}
          onValueChange={(value) => setActiveItem(value || undefined)}
          className="divide-y divide-border"
        >
          {validatedRows.map((row, index) => {
            const errorCount = Object.keys(row.errors ?? {}).length;
            const hasErrors = errorCount > 0;
            const categoryName =
              categories.find((cat) => cat.id === row.category_id)?.name ||
              "No category";

            return (
              <AccordionItem key={row.rowId} value={row.rowId} className="border-b-0">
                <AccordionTrigger className="px-4 py-4 hover:no-underline md:px-5">
                  <div className="flex min-w-0 flex-1 flex-col gap-3 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded-full bg-muted px-2 py-1 text-[11px] font-medium">
                        Item {index + 1}
                      </span>
                      <RowStatusBadge invalid={hasErrors} retailer={row.retailer} />
                    </div>

                    <div className="flex min-w-0 flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold md:text-base">
                          {row.title || `New product ${index + 1}`}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {categoryName} • slug: {row.slug || "auto-generated"}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <span>
                          Price: {row.price ? `R ${row.price}` : "Not set"}
                        </span>
                        <span>•</span>
                        <span>{errorCount} issue{errorCount === 1 ? "" : "s"}</span>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-5 md:px-5">
                  <div className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium">Title</label>
                        <input
                          value={row.title}
                          onChange={(e) =>
                            updateRow(row.rowId, { title: e.target.value })
                          }
                          className={fieldClass(row.errors?.title)}
                          placeholder="Product title"
                        />
                        <p className="mt-1 text-xs text-muted-foreground">
                          slug: {row.slug || "auto-generated"}
                        </p>
                        <FieldError message={row.errors?.title} />
                      </div>

                      <div className="md:col-span-2">
                        <CategoryMultiSelect
                            options={categories}
                            value={row.category_names}
                            onChange={(next) =>
                            updateRow(row.rowId, { category_names: next })
                            }
                        />
                        <FieldError message={row.errors?.category_names} />
                        </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">Retailer</label>
                        <select
                          value={row.retailer}
                          onChange={(e) =>
                            updateRow(row.rowId, {
                              retailer: e.target.value as Retailer,
                            })
                          }
                          className={fieldClass()}
                        >
                          <option value="Takealot">Takealot</option>
                          <option value="Makro">Makro</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium">Price</label>
                        <input
                          value={row.price}
                          onChange={(e) =>
                            updateRow(row.rowId, { price: e.target.value })
                          }
                          className={fieldClass(row.errors?.price)}
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                        />
                        <FieldError message={row.errors?.price} />
                      </div>

                      

                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium">
                          External URL
                        </label>
                        <input
                          value={row.external_url}
                          onChange={(e) =>
                            updateRow(row.rowId, { external_url: e.target.value })
                          }
                          className={fieldClass(row.errors?.external_url)}
                          placeholder="https://..."
                        />
                        <FieldError message={row.errors?.external_url} />
                      </div>


                      

                      

                      <div className="flex flex-col gap-3 md:justify-end">
                        

                        <label className="inline-flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={row.is_published}
                            onChange={(e) =>
                              updateRow(row.rowId, {
                                is_published: e.target.checked,
                              })
                            }
                          />
                          Published
                        </label>
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium">Description</label>
                        <textarea
                          rows={5}
                          value={row.description}
                          onChange={(e) =>
                            updateRow(row.rowId, { description: e.target.value })
                          }
                          className={textareaClass()}
                          placeholder="Product description"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium">Image</label>
                        <RowImageUploader
                          imageUrl={row.image_url}
                          previewUrl={row.image_preview_url}
                          onPickFile={(file, previewUrl) => {
                            if (
                              row.image_preview_url &&
                              row.image_preview_url.startsWith("blob:")
                            ) {
                              URL.revokeObjectURL(row.image_preview_url);
                            }

                            updateRow(row.rowId, {
                              image_file: file,
                              image_preview_url: previewUrl,
                            });
                          }}
                          onRemove={() => {
                            if (
                              row.image_preview_url &&
                              row.image_preview_url.startsWith("blob:")
                            ) {
                              URL.revokeObjectURL(row.image_preview_url);
                            }

                            updateRow(row.rowId, {
                              image_url: "",
                              image_file: null,
                              image_preview_url: "",
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4">
                      <div className="text-xs text-muted-foreground">
                        Item {index + 1} • {errorCount} validation issue
                        {errorCount === 1 ? "" : "s"}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"
                          onClick={() => duplicateRow(row.rowId)}
                        >
                          <Copy className="h-4 w-4" />
                          Duplicate
                        </button>

                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-md border border-destructive px-3 py-2 text-sm text-destructive"
                          onClick={() => deleteRow(row.rowId)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <ConfirmModal
        open={confirmOpen}
        state={confirmState}
        title="Publish valid products?"
        description={`There are ${rows.length} item(s). ${invalidCount} item(s) currently have validation issues and will be excluded unless fixed.`}
        confirmLabel="Publish All"
        confirmIntent="primary"
        isProcessing={isPublishing}
        successTitle="Products published"
        successDescription="Your products were published successfully."
        successAutoCloseMs={1800}
        onClose={() => {
            setConfirmOpen(false);
            setConfirmState("confirm");
        }}
        onConfirm={handlePublishAll}
        />
    </div>
  );
}