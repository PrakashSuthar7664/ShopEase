import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="mt-3">
        <div className="flex flex-col justify-start gap-6">
          {categories.map((c) => (
            <div className="" key={c._id}>
              <Link to={`/category/${c.slug}`} className="bg-zinc-600 text-white rounded-sm p-2">
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;