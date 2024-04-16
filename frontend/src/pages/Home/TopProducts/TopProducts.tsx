import { motion } from "framer-motion";
import Products from "../../../components/Products/Products";

const TopProducts = () => {
  // fetchResquest

  const fetchUrl = `${
    import.meta.env.VITE_BASE_URL
  }/api/v1/products?sort=-avgRating,price&field=_id,category,title,price,avgRating,discountPercentage,thumbnail&limit=3`;

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      whileInView={{ opacity: 1, transition: { duration: 0.5 }, x: 0 }}
    >
      <div className="text-center my-10 ">
        <h3 className="text-4xl tracking-wider font-medium py-2 md:text-6xl opacity-90 overflow-hidden">
          Feature Products
        </h3>
        <p className="font-thin tracking-wider text-[1.2rem] px-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
          dolor!
        </p>
      </div>

      <Products fetchUrl={fetchUrl} />
    </motion.div>
  );
};

export default TopProducts;
