"use server";

import { Category } from "@/types/category.props";
import { revalidatePath } from "next/cache";

export const addTransaction = async (
  amount: string,
  categoryType: "income" | "expense",
  description: string,
  categoryId: string
): Promise<Category> => {
  const response = await fetch("http://localhost:3000/api/transaction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: parseInt(amount),
      type: categoryType,
      description: description,
      category_id: parseInt(categoryId),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add category: ${response.statusText}`);
  }

  const categories = await response.json();

  revalidatePath(`/categories`);
  return categories;
};
