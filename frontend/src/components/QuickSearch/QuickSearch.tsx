import React, { useEffect, useState } from "react";
import Overlay from "../Overlay";
import axios from "axios";
import { Product } from "../Types";
import { AnimatePresence, motion } from "framer-motion";
import { FaCartShopping, FaHeart, FaRegHeart, FaXmark } from "react-icons/fa6";
import RatingStar from "../Products/Card/RatingStar";
import SocailSharingSection from "../ProductPage/ProductPageContent/SocailSharingSection";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCartItem } from "../../Redux/Slice/CartSlice/CartSliceApi";
import {
  addWishlistItem,
  removeWishlistItem,
} from "../../Redux/Slice/WishlistSlice/wishlistSliceApi";
import ProductQuanityCounter from "../ProductPage/ProductPageContent/ProductQuanityCounter";

interface QuickSearchProps {
  id: string;
  showSearchModal: boolean;
  setShowSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuickSearch = ({
  id,
  setShowSearchModal,
  showSearchModal,
}: QuickSearchProps) => {
  const [fetchProductData, setFetchProductData] = useState<Product | null>(
    null
  );
  const [quantityNum, setQuantityNum] = useState<number>(1);
  const [wishlistIcon, setWishlistIcon] = useState<boolean>(false);

  const curUser = useAppSelector((state) => state.auth.currentUser);
  const [imgVal, setImgVal] = useState<number>(0);

  useEffect(() => {
    const ApiGetProduct = async (id: string) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/v1/products/${id}`
        );
        const { data } = response;
        setFetchProductData(data?.products);
      } catch (error) {
        console.error(error);
        throw new Error();
      }
    };

    ApiGetProduct(id);
  }, [id]);

  const userReviews = useAppSelector((state) => state.reviews.reviews.reviews);
  const curWishlist = useAppSelector(
    (state) => state.wishlist.wishlist.wishlist
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onAddToCartHandler = () => {
    if (!curUser) return navigate("/signin");

    const cartData = {
      products: [
        {
          product: `${id}`,
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

  const onAddToWishlistHandler = () => {
    if (!curUser) return navigate("/signin");
    const wishData = {
      products: [{ product: id }],
    };

    dispatch(addWishlistItem(wishData));
  };

  useEffect(() => {
    const isProductInWishlist = curWishlist?.products.find(
      (item) => item.product.id === id
    );

    if (isProductInWishlist) {
      setWishlistIcon(true);
    } else {
      setWishlistIcon(false);
    }
  }, [curUser, curWishlist, id]);

  const onRemoveWishlistHandler = () => {
    const matchIndex = curWishlist?.products.findIndex(
      (item) => item.product.id === fetchProductData?.id
    );
    if (matchIndex !== -1) {
      const id = curWishlist.products[matchIndex].id;
      dispatch(removeWishlistItem(id));
      setWishlistIcon(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSearchModal && (
          <motion.section
            className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, translateY: -300 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5 },
              translateY: 0,
            }}
            exit={{
              opacity: 0,
              translateY: -300,
              transition: { duration: 0.2 },
            }}
          >
            <div className="bg-custom-primary px-4 py-8 w-[90vw] h-[600px] md:h-[500px] rounded-md lg:flex lg:gap-2  overflow-y-scroll md:overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-[80vw] mx-auto ">
                <motion.div
                  id={`imgVal-${imgVal}`}
                  className="flex w-full"
                  key={`imgVal-${imgVal}`}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.8 },
                  }}
                >
                  <img
                    src={
                      fetchProductData?.images[imgVal] ||
                      fetchProductData?.thumbnail
                    }
                    alt=""
                    className="w-full h-80 object-contain rounded-sm md:w-[600px] lg:w-[700px] mx-auto"
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

              <div className="w-[100%] px-4 ">
                <div className="flex gap-2 items-center md:gap-3">
                  <h3 className="text-2xl tracking-wider mb-5 md:text-4xl">
                    {fetchProductData?.title}
                  </h3>

                  <span className="text-sm font-light mb-3">
                    review {`(${userReviews?.length})`}
                  </span>
                </div>

                <div className="my-4">
                  <RatingStar rating={fetchProductData?.avgRating ?? 0} />
                </div>

                <div className="text-4xl font-semibold my-4">
                  ${fetchProductData?.price}
                </div>

                <p className="text-[1rem] font-thin tracking-wider">
                  {fetchProductData?.description &&
                  fetchProductData?.description.length > 120
                    ? `${fetchProductData?.description.slice(0, 120)}...`
                    : fetchProductData?.description}
                </p>
                <div className="w-full text-center flex flex-wrap justify-between items-center my-5 px-4">
                  {/* counter  */}
                  <ProductQuanityCounter
                    quantityNum={quantityNum}
                    setQuantityNum={setQuantityNum}
                  />

                  <div className="flex gap-4 ">
                    {wishlistIcon ? (
                      <button
                        className="text-custom-secondary text-2xl"
                        onClick={onRemoveWishlistHandler}
                      >
                        <FaHeart />
                      </button>
                    ) : (
                      <button
                        className="text-2xl"
                        onClick={onAddToWishlistHandler}
                      >
                        <FaRegHeart />
                      </button>
                    )}

                    <button
                      className="text-black bg-custom-white  text-[1.2rem] px-6 py-1  rounded-lg"
                      onClick={onAddToCartHandler}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>

                <motion.div
                  className="w-full my-10 text-center flex gap-2 justify-center items-center text-white bg-custom-secondary  text-2xl  py-1  rounded-lg font-extralight cursor-pointer"
                  whileHover={{
                    scale: 1.01,
                    opacity: 0.9,
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      duration: 0.3,
                    },
                  }}
                  onClick={onClickBuyHandler}
                >
                  <FaCartShopping />
                  <button className="text-center">Buy Now</button>
                </motion.div>

                <SocailSharingSection />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      {showSearchModal && <Overlay onClick={() => setShowSearchModal(false)} />}
    </>
  );
};

export default QuickSearch;
