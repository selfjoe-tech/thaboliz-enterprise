"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import EditCategoryDialog from "./edit-category-dialog";
import { ConfirmActionDialog } from "./confirm-action-dialog";
import {
  deleteCatalogueCategoryAction,
  toggleCatalogueCategoryActiveAction,
} from "@/lib/actions/dashboard-info/catalogue-category";

type CategoryRow = {
  id: string;
  name?: string;
  description?: string | null;
  is_active?: boolean;
  sort_order?: number;
  slug?: string;
  created_at?: string;
  updated_at?: string;
};

export const TableRow = ({ cat }: { cat: CategoryRow }) => {
  const router = useRouter();

  const [localName, setLocalName] = useState<string>(cat?.name ?? "");
  const [isActive, setIsActive] = useState<boolean>(!!cat?.is_active);

  const [editingCategory, setEditingCategory] = useState<CategoryRow | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmToggleActive, setConfirmToggleActive] = useState(false);

  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await deleteCatalogueCategoryAction(id);

      if (!res?.success) {
        throw new Error(res?.error || "Failed to delete category");
      }

      router.refresh();
    } catch (err) {
      console.error("delete error", err);
      alert("Failed to delete category");
    } finally {
      setDeleting(false);
    }
  };

  const handleConfirmToggleActive = async () => {
    const previous = isActive;
    const next = !previous;

    setIsActive(next);
    setToggling(true);
    setConfirmToggleActive(false);

    try {
      const res = await toggleCatalogueCategoryActiveAction(cat.id);

      if (!res?.success) {
        throw new Error(res?.error || "Failed to update category status");
      }

      router.refresh();
    } catch (err) {
      console.error("toggle active failed", err);
      setIsActive(previous);
      alert("Failed to update category status. Please try again.");
    } finally {
      setToggling(false);
    }
  };

  const handleOptimisticNameUpdate = (newName: string) => {
    setLocalName(newName);
  };

  const handleRevertName = (prevName: string) => {
    setLocalName(prevName);
    alert("Failed to update category name. Reverting.");
  };

  const handleAfterNameSaved = () => {
    router.refresh();
  };

  return (
    <>
      <tr className="transition-colors hover:bg-gray-50">
        <td className="px-4 py-3">
          <div className="font-medium">{localName}</div>

          {editingCategory && (
            <EditCategoryDialog
              open={showEditModal}
              onClose={() => setShowEditModal(false)}
              category={editingCategory}
              onOptimisticUpdate={(newName: string) =>
                handleOptimisticNameUpdate(newName)
              }
              onRevert={(prevName: string) => handleRevertName(prevName)}
              onUpdated={() => handleAfterNameSaved()}
            />
          )}

          <ConfirmActionDialog
            open={confirmDelete}
            onClose={() => setConfirmDelete(false)}
            title="Delete category?"
            message="Are you sure you want to delete this category? This cannot be undone."
            confirmText="Delete"
            confirmVariant="destructive"
            onConfirm={() => handleDelete(cat.id)}
          />

          <ConfirmActionDialog
            open={confirmToggleActive}
            onClose={() => setConfirmToggleActive(false)}
            title={isActive ? "Deactivate category?" : "Activate category?"}
            message={
              isActive
                ? "This will deactivate the category. You can activate it again later."
                : "This will activate the category and make it available for use."
            }
            confirmText={isActive ? "Deactivate" : "Activate"}
            confirmVariant={isActive ? "warning" : "destructive"}
            onConfirm={() => handleConfirmToggleActive()}
          />
        </td>

        <td className="px-4 py-3">{cat.description ?? "-"}</td>

        <td className="px-4 py-3">
          <span
            className={`rounded-full px-2 py-0.5 text-xs ${
              isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </td>

        <td className="py-3 text-center">
          <div className="inline-flex gap-2">
            <button
              onClick={() => {
                setEditingCategory(cat);
                setShowEditModal(true);
              }}
              className="rounded-md border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100"
            >
              Edit
            </button>

            <button
              onClick={() => setConfirmDelete(true)}
              disabled={deleting}
              className="rounded-md border border-gray-300 px-3 py-1 text-xs hover:bg-gray-100"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>

            <button
              onClick={() => setConfirmToggleActive(true)}
              disabled={toggling}
              className={`rounded-md border border-gray-300 px-3 py-1 text-xs text-white ${
                isActive ? "bg-yellow-500" : "bg-green-500"
              }`}
            >
              {toggling
                ? isActive
                  ? "Deactivating..."
                  : "Activating..."
                : isActive
                ? "Deactivate"
                : "Activate"}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};