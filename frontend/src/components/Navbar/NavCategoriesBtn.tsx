import { useFetchData } from "../../Hooks/useFetchData";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { CategoriesTypes } from "../Types";

const NavCategoriesBtn = () => {
  const [searchParams] = useSearchParams();
  // fetch products
  const parseFunctionData = (data: any) => data as CategoriesTypes;
  const fetchUrl = `${
    import.meta.env.VITE_BASE_URL
  }/api/v1/products/product-categories`;
  const { responseData, fetchLoading } = useFetchData<CategoriesTypes>(
    `${fetchUrl}`,
    { categories: [] },
    parseFunctionData
  ); // fetch all categories title function

  const searchCatHanlder = (key: string, value: string) => {
    const cat = new URLSearchParams(searchParams);
    if (value === null) {
      cat.delete(key);
    } else {
      cat.set(key, value);
    }
    return `?${cat.toString()}`;
  };

  return (
    <>
      {!fetchLoading && (
        <motion.ul
          className="absolute top-20 grid grid-cols-1 md:grid-cols-3 md:pb-2 md:right-4 gap-1 border px-2 py-1 bg-custom-primary pb-28 "
          initial={{ translateY: -200, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
        >
          {responseData.categories.map((category, i) => (
            <Link
              to={"/products/" + searchCatHanlder("category", `${category}`)}
              key={i}
              className="font-light my-1 hover:text-custom-secondary"
            >
              {category}
            </Link>
          ))}
        </motion.ul>
      )}
    </>
  );
};

export default NavCategoriesBtn;
