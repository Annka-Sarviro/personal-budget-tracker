"use server";

import { Transactions } from "@/types/transactions.props";

export const getAllTransactions = async (
  category_id?: string,
  date?: string,
  page?: string
): Promise<Transactions> => {
  const response = await fetch(
    `http://localhost:3000/api/transaction?category_id=${category_id}&date=${date}&page=${page}`,
    {
      next: { tags: ["transactions"] },
    }
  );
  const data = await response.json();

  return data;
};
