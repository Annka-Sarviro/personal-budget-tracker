"use server";

import { Category } from "@/types/category.props";

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await fetch("http://localhost:3000/api/category", {
    next: { tags: ["categories"] },
  });
  const data = await response.json();

  return data;
};
