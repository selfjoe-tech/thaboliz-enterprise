"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Edit, Trash2, Globe } from "lucide-react";

import EditCategoryModal from "./edit-category-dialog";
import { ConfirmActionDialog } from "./confirm-action-dialog";
import {
  deleteCatalogueCategoryAction,
  toggleCatalogueCategoryActiveAction,
} from "@/lib/actions/dashboard-info/catalogue-category";

type CategoryCardType = {
  id: string;
  name?: string;
  description?: string | null;
  is_active?: boolean;
  sort_order?: number;
  slug?: string;
  created_at?: string;
  updated_at?: string;
};

export const CategoryCard = ({ cat }: { cat: CategoryCardType }) => {
  const router = useRouter();

  const [localName, setLocalName] = useState<string>(cat?.name ?? "");
  const [isActive, setIsActive] = useState<boolean>(!!cat?.is_active);

  const [editingCategory, setEditingCategory] = useState<CategoryCardType | null>(
    null
  );
  const [showEditModal, setShowEditModal] = useState(false);

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmToggleActive, setConfirmToggleActive] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [toggling, setToggling] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

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
    <div className="relative block rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          <div className="text-base font-semibold">{localName}</div>
          <div className="text-sm text-gray-600">{cat.description ?? "-"}</div>

          <div className="mt-2">
            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-full p-2 hover:bg-gray-100"
            aria-expanded={menuOpen}
            aria-haspopup="true"
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 z-10 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-lg">
              <button
                onClick={() => {
                  setEditingCategory(cat);
                  setShowEditModal(true);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit className="h-4 w-4" />
                Edit
              </button>

              <button
                onClick={() => {
                  setConfirmDelete(true);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                disabled={deleting}
              >
                <Trash2 className="h-4 w-4" />
                {deleting ? "Deleting..." : "Delete"}
              </button>

              <button
                onClick={() => {
                  setConfirmToggleActive(true);
                  setMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                disabled={toggling}
              >
                <Globe className="h-4 w-4" />
                {isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          )}
        </div>
      </div>

      {editingCategory && (
        <EditCategoryModal
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
    </div>
  );
};