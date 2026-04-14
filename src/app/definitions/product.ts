// src/definitions/product.ts
import { Types } from "mongoose";
import { z } from "zod";

export interface ICategory {
  name: string;
  description?: string;
  isPublished?: boolean;
}

export interface IProduct {
  id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: Types.ObjectId | string;
  imageUrl: string;
  isPublished?: boolean;
}

export type ProductFormState = {
  errors: {
    name?: string[];
    description?: string[];
    price?: string[];
    stock?: string[];
    categoryId?: string[];
    imageUrl?: string[];
    global?: string[]; // 👈 added global here
  };
  message: string;
};

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image_url: string;
  isPublished: boolean;
  status: string;
}
