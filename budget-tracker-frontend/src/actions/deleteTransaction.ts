"use server";

import { Category } from "@/types/category.props";
import { revalidatePath } from "next/cache";

export const deleteTransaction = async (
  transaction_id: number
): Promise<Category> => {
  const response = await fetch(
    `http://localhost:3000/api/transaction/${transaction_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to add category: ${response.statusText}`);
  }

  const categories = await response.json();

  revalidatePath(`/categories`);
  return categories;
};
