import React, { useEffect, useState } from 'react';
import RatingStar from '../../Products/Card/RatingStar';
import { Product, WishlistItem } from '../../Types';
import { FaCartShopping, FaRegHeart, FaHeart } from 'react-icons/fa6';
import SocailSharingSection from './SocailSharingSection.tsx';
import './ProductPageContent.css';
import ProductQuanityCounter from './ProductQuanityCounter.tsx';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchWishlistItem } from '../../../Redux/Slice/WishlistSlice/wishlistSliceApi.tsx';
import { FaEdit } from 'react-icons/fa';
import AddReviewModal from './BottomSection/Reviews/AddReviewModal.tsx';
import {
  useAddWishlistItem,
  useRemoveWishlistItem,
} from '../../../Hooks/Handlers/WishlistHandlers.tsx';
import { useAddCartItemHandler } from '../../../Hooks/Handlers/CartHandlers.tsx';

interface ProductDetProps {
  fetchProductData: Product | null;
}

const ProductDetailsSection: React.FC<ProductDetProps> = ({
  fetchProductData,
}) => {
  const [quantityNum, setQuantityNum] = useState<number>(1);
  const [wishlistIcon, setWishlistIcon] = useState<boolean>(false);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const rating = fetchProductData?.avgRating ?? 0;

  const dispatch = useAppDispatch();
  const curUser = useAppSelector((state) => state.auth.currentUser);
  const userReviews = useAppSelector((state) => state.reviews.reviews?.reviews);
  const curWishlist = useAppSelector(
    (state) => state?.wishlist.wishlist?.wishlist,
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const productId = id ?? '';

  const { removeWishlistItemHandler } = useRemoveWishlistItem({
    id: productId,
    setWishlistIcon,
  });

  const { addWishlishHandler } = useAddWishlistItem({ id: productId });

  const { addCartItemHandler } = useAddCartItemHandler({
    id: productId,
    quantity: quantityNum,
  });

  const onAddToCartHandler = () => {
    addCartItemHandler();
  };

  const onClickBuyHandler = () => {
    onAddToCartHandler();
    setTimeout(() => navigate('/cart'), 100); //
  };

  const onAddToWishlistHandler = () => {
    addWishlishHandler();
  };

  useEffect(() => {
    dispatch(fetchWishlistItem());
  }, [dispatch, curUser]);

  useEffect(() => {
    const isProductInWishlist = curWishlist?.products.find(
      (item: WishlistItem) => item?.product?.id === id,
    );

    if (isProductInWishlist) {
      setWishlistIcon(true);
    } else {
      setWishlistIcon(false);
    }
  }, [curUser, curWishlist, id]);

  const onRemoveWishlistHandler = () => {
    removeWishlistItemHandler();
  };

  const onAddReviewHandler = () => {
    if (!curUser) {
      navigate('/signin');
    }
    setShowReviewModal(true);
  };

  return (
    <>
      <div className="w-[100%] px-4 ">
        <div className="flex gap-2 items-center md:gap-3">
          <h3 className="text-2xl tracking-wider mb-5 md:text-4xl">
            {fetchProductData?.title}
          </h3>

          <span className="text-sm font-light mb-3">
            review {`(${userReviews?.length})`}
          </span>

          <span
            className="text-sm font-light mb-3 flex gap-1 items-center cursor-pointer"
            onClick={onAddReviewHandler}
          >
            write review <FaEdit />{' '}
          </span>
        </div>

        <div className="my-4">
          <RatingStar rating={rating} />
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
              <button className="text-2xl" onClick={onAddToWishlistHandler}>
                <FaRegHeart />
              </button>
            )}

            <button
              className="text-black bg-custom-primary  text-[1.2rem] px-6 py-1  rounded-lg"
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
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            transition: { type: 'spring', stiffness: 500, duration: 0.3 },
          }}
          onClick={onClickBuyHandler}
        >
          <FaCartShopping />
          <button className="text-center">Buy Now</button>
        </motion.div>

        <SocailSharingSection />
      </div>
      {showReviewModal && <AddReviewModal setModal={setShowReviewModal} />}
    </>
  );
};

export default ProductDetailsSection;
