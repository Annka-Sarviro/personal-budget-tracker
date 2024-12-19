import Link from "next/link";

export const Navigation = ({ pathname }: { pathname: string }) => {
  return (
    <nav>
      <Link
        href="/categories"
        className={`mr-4 transition-all duration-300 hover:text-blue-800 ${
          pathname === "/categories" ? "underline underline-offset-2" : ""
        }`}
      >
        Categories
      </Link>
      <Link
        href="/transactions"
        className={`transition-all duration-300 hover:text-blue-800 ${
          pathname === "/transactions" ? "underline underline-offset-2" : ""
        }`}
      >
        Transactions
      </Link>
    </nav>
  );
};
