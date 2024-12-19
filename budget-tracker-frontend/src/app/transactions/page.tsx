import { getAllCategories } from "@/actions/getAllCategories";
import { getAllTransactions } from "@/actions/getAllTransactions";
import { getAllTransactionsData } from "@/actions/getAllTransactionsData";
import { AddTransactionForm } from "@/components/AddTransactionForm/AddTransactionForm";
import { DeleteTransactionButton } from "@/components/DeleteTransactionButton/DeleteTransactionButton";
import { Filters } from "@/components/Fiters/Filters";
import { Pagination } from "@/components/Pagination/Pagination";

export const revalidate = 30;

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  const category_id = searchParams?.category || "";

  const date = searchParams.date || "";
  const page = searchParams.page || "1";

  const transactionsData = await getAllTransactions(category_id, date, page);
  const totalTransaction = await getAllTransactionsData();
  const categories = await getAllCategories();

  return (
    <section className="py-4">
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">Transactions</h1>

        <Filters categories={categories} />
        {transactionsData?.transactions?.length === 0 ? (
          <p className="mb-2">Not transaction</p>
        ) : (
          <ul className="mb-4 py-2 flex flex-col gap-y-2 ">
            {transactionsData?.transactions?.map((transaction) => (
              <li
                key={transaction.id}
                className="flex justify-between border p-2 bg-white/80 hover:shadow-md transition-all "
              >
                <div>
                  <p>
                    <span className="font-semibold">type:</span>{" "}
                    {transaction?.type}
                  </p>
                  <p>
                    <span className="font-semibold"> amount: </span>
                    {transaction?.amount} |{" "}
                    <span className="font-semibold">category:</span>
                    {transaction?.category.name}
                  </p>
                  <p>
                    <span className="font-semibold">description:</span>
                    {transaction?.description}
                  </p>
                </div>
                <DeleteTransactionButton transaction_id={transaction?.id} />
              </li>
            ))}
          </ul>
        )}
        <Pagination page={page} total_page={transactionsData.totalPages} />
        {totalTransaction && (
          <ul className="mb-8 flex flex-col justify-between border p-2 bg-white/80 hover:shadow-md transition-all">
            <li>
              <p>
                <span className="font-semibold">Total **Income**: </span>
                {totalTransaction.totalIncome}
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">Total **Expenses**:</span>
                {totalTransaction.totalExpenses}
              </p>
            </li>

            <li>
              <p>
                <span className="font-semibold">Overall **Balance**:</span>
                {totalTransaction.totalBalance}
              </p>
            </li>
          </ul>
        )}

        <AddTransactionForm categories={categories} />
      </div>
    </section>
  );
};

export default page;
