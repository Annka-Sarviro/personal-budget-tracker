export interface Category {
  id: number;
  name: string;
  type: "income" | "expense";
  createdAt: Date;
  updatedAt: Date;
}
