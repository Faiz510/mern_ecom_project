import React from "react";
import RatingStar from "../../Products/Card/RatingStar";
import { Product } from "../../Types";
import { FaCartShopping } from "react-icons/fa6";
import SocailSharingSection from "./SocailSharingSection.tsx";
import "./ProductPageContent.css";
import ProductQuanityCounter from "./ProductQuanityCounter.tsx";
import { motion } from "framer-motion";

interface ProductDetProps {
  fetchProductData: Product | null;
}

const ProductDetailsSection: React.FC<ProductDetProps> = ({
  fetchProductData,
}) => {
  const rating = fetchProductData?.rating ?? 0; // rating undified than return 0 return

  return (
    <div className="w-[100%] px-4">
      <h3 className="text-4xl tracking-wider mb-5">
        {fetchProductData?.title}
      </h3>

      <div className="my-4">
        <RatingStar rating={rating} />
      </div>

      <div className="text-4xl font-semibold my-4">
        ${fetchProductData?.price}
      </div>

      <p className="text-[1rem] font-thin tracking-wider">
        {fetchProductData?.description}
      </p>
      <div className="w-full text-center flex justify-between items-center my-5 px-4">
        {/* counter  */}
        <ProductQuanityCounter />
        <button className="text-black bg-custom-primary  text-[1.2rem] px-6 py-1  rounded-lg">
          Add To Cart
        </button>
      </div>

      <motion.div
        className="w-full my-10 text-center flex gap-2 justify-center items-center text-white bg-custom-secondary  text-2xl  py-1  rounded-lg font-extralight cursor-pointer"
        whileHover={{
          scale: 1.01,
          opacity: 0.9,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          transition: { type: "spring", stiffness: 500, duration: 0.3 },
        }}
      >
        <FaCartShopping />
        <button className="text-center">Buy Now</button>
      </motion.div>

      <SocailSharingSection />
    </div>
  );
};

export default ProductDetailsSection;
