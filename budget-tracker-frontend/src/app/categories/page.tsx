import { getAllCategories } from "@/actions/getAllCategories";
import { AddCategoryForm } from "@/components/AddCategoryForm/AddCategoryForm";

export const revalidate = 30;
const page = async () => {
  const categories = await getAllCategories();

  return (
    <section className="py-4">
      <div className="container">
        <h1 className="text-2xl font-bold mb-4">Categories</h1>

        <ul className="mb-6 flex flex-col gap-y-2 max-h-[348px] overflow-y-scroll">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="border p-2 bg-white/80 hover:shadow-md transition-all "
            >
              {cat.name} / {cat.type}
            </li>
          ))}
        </ul>

        <AddCategoryForm />
      </div>
    </section>
  );
};

export default page;
