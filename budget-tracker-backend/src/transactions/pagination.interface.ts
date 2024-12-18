import { Transaction } from 'typeorm';

export interface PaginatedTransactions {
  data: Transaction[];
  total: number;
}
