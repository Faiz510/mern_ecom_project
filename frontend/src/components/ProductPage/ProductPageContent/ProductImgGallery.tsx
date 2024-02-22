import { motion } from "framer-motion";
import React from "react";
import { Product } from "../../Types";

interface ProductGalleryProps {
  imgVal: number;
  setImgVal: (val: number) => void;
  fetchProductData: Product | null;
}

const ProductImgGallery: React.FC<ProductGalleryProps> = ({
  imgVal,
  setImgVal,
  fetchProductData,
}) => {
  return (
    <div className="w-[100%] mx-auto">
      <motion.div
        id={`imgVal-${imgVal}`}
        className="flex w-full"
        key={`imgVal-${imgVal}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.8 } }}
      >
        <motion.img
          src={fetchProductData?.images[imgVal]}
          alt=""
          className="w-[500px] h-80 object-contain rounded-sm md:w-[600px] lg:w-[700px] mx-auto"
        />
      </motion.div>

      <div className="flex items-center justify-center md:gap-1 w-full mx-auto">
        {fetchProductData?.images.map((imgs, i) => (
          <motion.img
            src={imgs}
            alt=""
            key={i}
            className="w-16 h-20 object-contain cursor-pointer md:w-24 lg:w-32"
            onClick={() => setImgVal(i)}
            whileHover={{
              opacity: 0.6,
              transition: { duration: 0.3 },
              scale: 1.01,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImgGallery;
