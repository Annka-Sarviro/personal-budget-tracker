"use client";

import { useState } from "react";
import { addCategory } from "@/actions/addCategories";
import { useRouter } from "next/navigation";

export const AddCategoryForm = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState<"income" | "expense">(
    "income"
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName) {
      alert("Please enter a category name.");
      return;
    }

    try {
      await addCategory(categoryName, categoryType);
      setCategoryName("");
      router.refresh();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 items-center justify-between"
    >
      <input
        type="text"
        placeholder="Category Name"
        name="name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="border p-2 w-1/2"
      />
      <div className="flex gap-4 items-center">
        <p className="text-lg">Category type:</p>
        <label>
          <input
            type="radio"
            name="categoryType"
            value="income"
            checked={categoryType === "income"}
            onChange={() => setCategoryType("income")}
          />
          Income
        </label>
        <label>
          <input
            type="radio"
            name="categoryType"
            value="expense"
            checked={categoryType === "expense"}
            onChange={() => setCategoryType("expense")}
          />
          Expense
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 hover:bg-blue-800 focus:bg-blue-800 transition-all duration-300"
      >
        Add Category
      </button>
    </form>
  );
};
