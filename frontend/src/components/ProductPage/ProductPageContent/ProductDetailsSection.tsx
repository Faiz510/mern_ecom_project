import React, { useState } from "react";
import RatingStar from "../../Products/Card/RatingStar";
import { Product } from "../../Types";
import { FaCartShopping } from "react-icons/fa6";
import SocailSharingSection from "./SocailSharingSection.tsx";
import "./ProductPageContent.css";
import ProductQuanityCounter from "./ProductQuanityCounter.tsx";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { addCartItem } from "../../../Redux/Slice/CartSlice/CartSliceApi.tsx";
import { currentUser } from "../../../Redux/Slice/AuthSlice/AuthSlice.tsx";

interface ProductDetProps {
  fetchProductData: Product | null;
}

const ProductDetailsSection: React.FC<ProductDetProps> = ({
  fetchProductData,
}) => {
  const [quantityNum, setQuantityNum] = useState<number>(1);
  const rating = fetchProductData?.rating ?? 0; // rating undified than return 0 return

  const dispatch = useAppDispatch();
  const curUser = useAppSelector(currentUser);
  const navigate = useNavigate();

  const onAddToCartHandler = () => {
    if (!curUser) return navigate("/signin");

    const cartData = {
      products: [
        {
          product: `${fetchProductData?.id}`,
          quantity: quantityNum,
        },
      ],
    };
    dispatch(addCartItem(cartData));
  };

  const onClickBuyHandler = () => {
    onAddToCartHandler();
    setTimeout(() => navigate("/cart"), 100); //
  };

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
        <ProductQuanityCounter
          quantityNum={quantityNum}
          setQuantityNum={setQuantityNum}
        />
        <button
          className="text-black bg-custom-primary  text-[1.2rem] px-6 py-1  rounded-lg"
          onClick={onAddToCartHandler}
        >
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
        onClick={onClickBuyHandler}
      >
        <FaCartShopping />
        <button className="text-center">Buy Now</button>
      </motion.div>

      <SocailSharingSection />
    </div>
  );
};

export default ProductDetailsSection;
