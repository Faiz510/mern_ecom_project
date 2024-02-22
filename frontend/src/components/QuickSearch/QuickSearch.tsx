import React, { useEffect, useState } from "react";
import Overlay from "../Overlay";
import axios from "axios";
import { Product } from "../Types";
import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import RatingStar from "../Products/Card/RatingStar";

const QuickSearch = ({ id }) => {
  const [showSearchModal, setShowSearchModal] = useState<boolean>(false);
  const [fetchProductData, setFetchProductData] = useState<Product | null>(
    null
  );
  const [imgVal, setImgVal] = useState<number>(0);

  const showModalHanlder = (): void =>
    setShowSearchModal((preModal) => !preModal);

  useEffect(() => {
    console.log(id);

    const ApiGetProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `https://dummyjson.com/products/${id}`
        );
        setFetchProductData(response.data);
        console.log(fetchProductData);
      } catch (error) {
        console.error(error);
      }
    };

    ApiGetProduct();
  }, [id]);

  return (
    <>
      {showSearchModal && (
        <section className="fixed z-50 lg:top-24 lg:left-20">
          <div className="bg-custom-primary px-4 py-8 w-[90vw] rounded-md lg:flex lg:gap-2 relative">
            <div className="w-[80vw] mx-auto ">
              <motion.div
                id={`imgVal-${imgVal}`}
                className="flex w-full"
                key={`imgVal-${imgVal}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.8 } }}
              >
                <img
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
            <button
              onClick={() => setShowSearchModal(false)}
              className="absolute top-4 right-4"
            >
              <FaXmark />
            </button>
            <div className="">
              <h3 className="text-4xl tracking-wider my-5">
                {fetchProductData?.title}
              </h3>

              <div className="my-4">
                <RatingStar rating={fetchProductData?.rating} />
              </div>

              <div className="text-4xl font-semibold my-4">
                ${fetchProductData?.price}
              </div>

              <p className="text-[1rem] font-thin tracking-wider">
                {fetchProductData?.description}
              </p>
              <div className="w-full text-center">
                <button className="text-white bg-custom-secondary text-2xl px-3 py-1 my-4 rounded-lg">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
      {showSearchModal && <Overlay onClick={() => setShowSearchModal(false)} />}
    </>
  );
};

export default QuickSearch;
