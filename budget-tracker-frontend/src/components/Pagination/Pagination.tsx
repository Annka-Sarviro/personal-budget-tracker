"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSearchParams } from "next/navigation";

export const Pagination = ({
  page,
  total_page,
}: {
  page: string;
  total_page: number;
}) => {
  const passName = usePathname();
  const searchParams = useSearchParams();
  const page_number = parseInt(page, 10);

  const updatePageInParams = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    return `${passName}?${params.toString()}`;
  };

  const PageNumber = ({ page, ind }: { page: number; ind: number }) => (
    <li>
      <Link
        href={updatePageInParams(ind)}
        className={`
   ${
     page === ind ? "font-semibold underline underline-offset-2" : "font-normal"
   },
        })`}
      >
        <span>{ind}</span>
      </Link>
    </li>
  );

  const getPageNumbers = (page: number, total_page: number) => {
    const pageNumbers = [];

    if (total_page <= 7) {
      return [...Array(total_page)].map((_, ind) => (
        <PageNumber key={ind} page={page} ind={ind + 1} />
      ));
    }

    if (page < 4) {
      for (let i = 1; i <= 4; i++) {
        pageNumbers.push(<PageNumber key={i} page={page} ind={i} />);
      }

      pageNumbers.push(<p key="dots">...</p>);
      pageNumbers.push(
        <PageNumber key={total_page - 1} page={page} ind={total_page - 1} />
      );
      pageNumbers.push(
        <PageNumber key={total_page} page={page} ind={total_page} />
      );
    } else if (page >= 4 && page < total_page - 2) {
      pageNumbers.push(<PageNumber key={1} page={page} ind={1} />);

      pageNumbers.push(<p key="dots2">...</p>);

      pageNumbers.push(
        <PageNumber key={page - 1} page={page} ind={page - 1} />
      );
      pageNumbers.push(<PageNumber key={page} page={page} ind={page} />);
      pageNumbers.push(
        <PageNumber key={page + 1} page={page} ind={page + 1} />
      );

      pageNumbers.push(<p key="dots3">...</p>);

      pageNumbers.push(
        <PageNumber key={total_page} page={page} ind={total_page} />
      );
    } else if (page >= total_page - 2) {
      pageNumbers.push(<PageNumber key={1} page={page} ind={1} />);
      pageNumbers.push(<PageNumber key={2} page={page} ind={2} />);
      pageNumbers.push(<p key="dots4">...</p>);
      for (let i = total_page - 3; i <= total_page; i++) {
        pageNumbers.push(<PageNumber key={i} page={page} ind={i} />);
      }
    }

    return pageNumbers;
  };

  return (
    <nav className="mb-4">
      <ul className="flex gap-2 items-center justify-center">
        <li>
          <Link
            href={updatePageInParams(page_number - 1)}
            className={`flex items-center justify-center bg-white w-8 h-8 border rounded-full ${
              page_number === 1
                ? "cursor-not-allowed fill-gray-500"
                : "cursor-pointer fill-black"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="fill-inherit"
            >
              <path d="M14 7l-5 5 5 5V7z" />
            </svg>
          </Link>
        </li>

        {getPageNumbers(page_number, total_page)}

        <li>
          <Link
            href={updatePageInParams(page_number + 1)}
            className={`flex items-center justify-center w-8 h-8 bg-white border rounded-full ${
              page_number === total_page
                ? "cursor-not-allowed fill-gray-500"
                : "cursor-pointer fill-black"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="fill-inherit"
            >
              <path d="M10 17l5-5-5-5v10z" />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
};
