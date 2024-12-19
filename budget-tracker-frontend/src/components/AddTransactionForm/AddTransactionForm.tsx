"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { Category } from "@/types/category.props";
import { addTransaction } from "@/actions/addTransaction";

export const AddTransactionForm = ({
  categories,
}: {
  categories: Category[];
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categoryType, setCategoryType] = useState<"income" | "expense">(
    "income"
  );
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      alert("Please enter a transaction amount.");
      return;
    }

    if (!categoryId) {
      alert("Please select a category ");
      return;
    }

    try {
      await addTransaction(amount, categoryType, description, categoryId);
      setAmount("");
      setDescription("");
      setCategoryId("");
      router.refresh();
    } catch (error) {
      console.error("Error adding transactions:", error);
    }
  };

  return (
    <>
      <p>Add Transaction</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 ">
        <div className="flex gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-1/3"
          />
          <input
            type="text"
            placeholder="Amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2"
          />
          <div className="flex gap-4 items-center">
            <p className="text-lg">Description type:</p>
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

          <select
            name="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="border p-2"
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-fit bg-blue-600 text-white p-2 hover:bg-blue-800 focus:bg-blue-800 transition-all duration-300"
        >
          Add Transaction
        </button>
      </form>
    </>
  );
};
