"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateCatalogueCategoryAction } from "@/lib/actions/dashboard-info/catalogue-category";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

interface Props {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
  category: {
    id: string;
    name?: string;
    description?: string | null;
    is_active?: boolean;
    sort_order?: number;
  } | null;
}

export default function EditCategoryDialog({
  open,
  onOpenChange,
  onClose,
  category,
}: Props) {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isPending, setIsPending] = React.useState(false);

  React.useEffect(() => {
    if (open && category) {
      setName(category.name ?? "");
      setDescription(category.description ?? "");
      setIsPending(false);
    }
  }, [open, category]);

  const handleClose = React.useCallback(() => {
    if (onOpenChange) onOpenChange(false);
    else onClose?.();
  }, [onOpenChange, onClose]);

  const dialogOnOpenChange = React.useCallback(
    (v: boolean) => {
      if (onOpenChange) onOpenChange(v);
      else if (!v) onClose?.();
    },
    [onOpenChange, onClose]
  );

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!category) return;

    const trimmed = name.trim();
    if (!trimmed) {
      alert("Name is required");
      return;
    }

    setIsPending(true);

    try {
      const res = await updateCatalogueCategoryAction({
        id: category.id,
        name: trimmed,
        slug: slugify(trimmed),
        description,
        is_active: category.is_active ?? true,
        sort_order: category.sort_order ?? 0,
      });

      if (!res?.success) {
        alert(res?.error || "Failed to update category");
        return;
      }

      handleClose();
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to update category");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={dialogOnOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit category</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional description"
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}