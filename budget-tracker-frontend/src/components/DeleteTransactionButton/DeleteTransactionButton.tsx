"use client";

import { deleteTransaction } from "@/actions/deleteTransaction";
import { useRouter } from "next/navigation";

export const DeleteTransactionButton = ({
  transaction_id,
}: {
  transaction_id: number;
}) => {
  const router = useRouter();
  const handleDelete = async (transaction_id: number) => {
    try {
      await deleteTransaction(transaction_id);
      router.refresh();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <button
      aria-label="Delete transaction"
      onClick={() => handleDelete(transaction_id)}
      className="p-1 size-8  rounded-full bg-white border flex items-center justify-center hover:shadow-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6 text-gray-600 hover:text-gray-900"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};
