"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type DraftRetailer = "Takealot" | "Makro";

export type CatalogueBatchDraftRow = {
  rowId: string;
  title: string;
  slug: string;
  description: string;
  category_names: string[];
  retailer: DraftRetailer;
  external_url: string;
  price: string;
  original_price: string;
  image_url: string;
  rating: string;
  review_count: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: string;
};

type CatalogueProductBatchDraftStore = {
  draftRows: CatalogueBatchDraftRow[];
  activeRowId: string | null;
  draftSavedAt: string | null;
  hasHydrated: boolean;
  saveDraft: (rows: CatalogueBatchDraftRow[], activeRowId: string | null) => void;
  clearDraft: () => void;
  setHasHydrated: (value: boolean) => void;
};

type PersistedDraftSlice = Pick<
  CatalogueProductBatchDraftStore,
  "draftRows" | "activeRowId" | "draftSavedAt"
>;

export const useCatalogueProductBatchDraftStore =
  create<CatalogueProductBatchDraftStore>()(
    persist(
      (set) => ({
        draftRows: [],
        activeRowId: null,
        draftSavedAt: null,
        hasHydrated: false,

        saveDraft: (rows, activeRowId) =>
          set({
            draftRows: rows,
            activeRowId,
            draftSavedAt: new Date().toISOString(),
          }),

        clearDraft: () =>
          set({
            draftRows: [],
            activeRowId: null,
            draftSavedAt: null,
          }),

        setHasHydrated: (value) => set({ hasHydrated: value }),
      }),
      {
        name: "catalogue-product-batch-draft",
        storage: createJSONStorage(() => localStorage),
        partialize: (state): PersistedDraftSlice => ({
          draftRows: state.draftRows,
          activeRowId: state.activeRowId,
          draftSavedAt: state.draftSavedAt,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  );