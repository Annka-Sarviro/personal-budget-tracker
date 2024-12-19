"use client";
import { Category } from "@/types/category.props";
import { useRouter } from "next/navigation";

export const Filters = ({ categories }: { categories: Category[] }) => {
  const router = useRouter();
  return (
    <div className="flex gap-4 mb-4">
      <div>
        <label htmlFor="category" className="block font-semibold">
          Category:
        </label>
        <select
          id="category"
          className="p-2 border rounded h-12 cursor-pointer"
          defaultValue=""
          onChange={(e) => {
            const url = new URL(window.location.href);
            if (e.target.value === "all") {
              url.searchParams.delete("category");
            } else {
              url.searchParams.set("category", e.target.value);
            }
            router.push(url.toString());
          }}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="date" className="block font-semibold">
          Date:
        </label>
        <input
          id="date"
          type="date"
          className="p-2 border rounded h-12 cursor-pointer"
          defaultValue=""
          onChange={(e) => {
            const url = new URL(window.location.href);
            url.searchParams.set("date", e.target.value);
            router.push(url.toString());
          }}
        />
      </div>
    </div>
  );
};
