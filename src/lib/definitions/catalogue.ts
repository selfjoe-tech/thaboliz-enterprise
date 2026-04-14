export type CatalogueCategory = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CatalogueProduct = {
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
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type CatalogueProductRow = CatalogueProduct & {
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
};