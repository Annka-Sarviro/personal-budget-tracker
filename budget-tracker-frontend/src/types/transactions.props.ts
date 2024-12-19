import { Category } from "./category.props";

export interface Transactions {
  transactions: Transaction[];
  total: number;
  page: number;
  totalPages: number;
  limit: number;
}

export interface Transaction {
  id: number;
  amount: number;
  type: "income" | "expense";
  description: string;
  category_id: number;
  createdAt: Date;
  updatedAt: string;
  category: Category;
}
