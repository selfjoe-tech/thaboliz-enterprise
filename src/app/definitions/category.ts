// app/definitions/category.ts
export type Category = {
  id: string;
  created_at: string | null;
  name: string;
  status: "published" | "unpublished" | string;
};
