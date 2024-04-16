import Products from "../../../components/Products/Products";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AllProducts = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      whileInView={{ opacity: 1, transition: { duration: 0.5 }, x: 0 }}
    >
      <div className="text-center my-10 ">
        <h3 className="text-4xl tracking-wider font-medium py-2 md:text-6xl opacity-90">
          Newly Arrived Product
        </h3>
        <p className="font-thin tracking-wider text-[1.2rem] px-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
          dolor!
        </p>
      </div>

      <Products
        fetchUrl={`${
          import.meta.env.VITE_BASE_URL
        }/api/v1/products?sort=-createdAt&field=_id,category,title,price,avgRating,discountPercentage,thumbnail&limit=3`}
      />

      <div className="text-center w-full">
        <motion.div
          className="text-center my-10 w-[10.5rem] mx-auto"
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3, type: "spring", stiffness: 300 },
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Link
            to={"/products"}
            className="text-center bg-custom-secondary text-white px-3 py-1 border-none shadow-sm rounded-md hover:text-white"
          >
            Show All products
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AllProducts;
