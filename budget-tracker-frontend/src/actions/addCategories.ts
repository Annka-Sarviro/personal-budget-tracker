"use server";

import { Category } from "@/types/category.props";
import { revalidatePath } from "next/cache";

export const addCategory = async (
  categoryName: string,
  categoryType: "income" | "expense"
): Promise<Category> => {
  const response = await fetch("http://localhost:3000/api/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: categoryName, type: categoryType }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add category: ${response.statusText}`);
  }

  const categories = await response.json();

  revalidatePath(`/categories`);
  return categories;
};
