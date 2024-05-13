import React, { useEffect, useState } from 'react';
import { FaHeart, FaMagnifyingGlass, FaRegHeart } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { RootState } from '../../../Redux/Store/Store';
import { fetchWishlistItem } from '../../../Redux/Slice/WishlistSlice/wishlistSliceApi';
import { IoCartOutline } from 'react-icons/io5';
import {
  useAddWishlistItem,
  useRemoveWishlistItem,
} from '../../../Hooks/Handlers/WishlistHandlers.tsx';
import { useAddCartItemHandler } from '../../../Hooks/Handlers/CartHandlers.tsx';

const animateIconOnHover = {
  scale: 1.2,
  transition: { duration: 0.3, stiffness: 500, type: 'spring' },
};

interface CartIconsProps {
  id: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardIcons = ({ id, setShowModal }: CartIconsProps) => {
  const [wishlistIcon, setWishlistIcon] = useState<boolean>(false);
  const curUser = useAppSelector((state: RootState) => state.auth.currentUser);
  const curWishlist = useAppSelector(
    (state) => state?.wishlist?.wishlist?.wishlist,
  );
  const dispatch = useAppDispatch();

  const { removeWishlistItemHandler } = useRemoveWishlistItem({
    id,
    setWishlistIcon,
  });
  const { addWishlishHandler } = useAddWishlistItem({ id });

  const { addCartItemHandler } = useAddCartItemHandler({ id });

  useEffect(() => {
    const wishlistitemsFetch = () => {
      if (!curWishlist) return;
      dispatch(fetchWishlistItem());
    };

    wishlistitemsFetch();
  }, [curUser, dispatch]);

  useEffect(() => {
    const isProductInWishlist = curWishlist?.products.find(
      (item) => item?.product?.id === id,
    );

    if (isProductInWishlist) {
      setWishlistIcon(true);
    } else {
      setWishlistIcon(false);
    }
  }, [curUser, curWishlist, id]);

  const onClickIconsHandler = (
    e: React.MouseEvent<HTMLSpanElement>,
    val: string,
  ) => {
    e.preventDefault();
    switch (val) {
      case 'addToCart':
        addCartItemHandler();
        break;
      case 'removeFromWishlist':
        removeWishlistItemHandler();
        break;
      case 'addToWishlist':
        addWishlishHandler();
        setWishlistIcon(true);
        break;

      case 'onSearch':
        setShowModal(true);
        break;
    }
  };

  return (
    <React.Fragment>
      <motion.div className="absolute z-50 bottom-[-50px] justify-between w-full items-center px-5 bg-custom-primary py-3 hidden group-hover:flex transition-all group-hover:bottom-0 duration-500">
        {wishlistIcon ? (
          <motion.span
            whileHover={animateIconOnHover}
            className="text-green-700 text-2xl"
            onClick={(e) => onClickIconsHandler(e, 'removeFromWishlist')}
          >
            <FaHeart className="card-icon" />
          </motion.span>
        ) : (
          <motion.span
            whileHover={animateIconOnHover}
            className="text-2xl"
            onClick={(e) => onClickIconsHandler(e, 'addToWishlist')}
          >
            <FaRegHeart className="card-icon" />
          </motion.span>
        )}

        <motion.span
          whileHover={animateIconOnHover}
          className="text-2xl"
          onClick={(e) => onClickIconsHandler(e, 'addToCart')}
        >
          <IoCartOutline className="card-icon" />
        </motion.span>
      </motion.div>

      <motion.span
        className="hidden items-center justify-center absolute left-[45%] top-[45%] group-hover:z-30 group-hover:flex "
        whileHover={animateIconOnHover}
        onClick={(e) => onClickIconsHandler(e, 'onSearch')}
      >
        <FaMagnifyingGlass className="card-icon" />
      </motion.span>
    </React.Fragment>
  );
};

export default CardIcons;
