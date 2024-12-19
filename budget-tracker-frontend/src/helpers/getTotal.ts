import { Transaction } from "@/types/transactions.props";

export const getTotalIncome = (transactions: Transaction[]) => {
  return transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const getTotalExpenses = (transactions: Transaction[]) => {
  return transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);
};

export const getTotalBalance = (transactions: Transaction[]) => {
  return transactions.reduce((balance, transaction) => {
    if (transaction.type === "income") {
      return balance + transaction.amount;
    } else if (transaction.type === "expense") {
      return balance - transaction.amount;
    }
    return balance;
  }, 0);
};
