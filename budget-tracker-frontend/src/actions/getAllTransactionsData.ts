"use server";

export const getAllTransactionsData = async () => {
  const response = await fetch(`http://localhost:3000/api/transaction/total`, {
    next: { tags: ["transactions"] },
  });
  const data = await response.json();

  const totalIncome = data.income;
  const totalExpenses = data.expense;
  const totalBalance = data.totalBalance;

  return { totalIncome, totalExpenses, totalBalance };
};
