import React, { useEffect, useState } from "react";
import {
  FaHeart,
  FaCartShopping,
  FaMagnifyingGlass,
  FaRegHeart,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { addCartItem } from "../../../Redux/Slice/CartSlice/CartSliceApi";
import { RootState } from "../../../Redux/Store/Store";
import { useNavigate } from "react-router-dom";
import {
  addWishlistItem,
  fetchWishlistItem,
  removeWishlistItem,
} from "../../../Redux/Slice/WishlistSlice/wishlistSliceApi";
import { IoCartOutline } from "react-icons/io5";

const animateIconOnHover = {
  scale: 1.2,
  transition: { duration: 0.3, stiffness: 500, type: "spring" },
};

interface CartIconsProps {
  id: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardIcons = ({ id, setShowModal }: CartIconsProps) => {
  const [wishlistIcon, setWishlistIcon] = useState<boolean>(false);
  const curUser = useAppSelector((state: RootState) => state.auth.currentUser);
  const curWishlist = useAppSelector(
    (state) => state.wishlist.wishlist.wishlist
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchWishlistItem());
  }, [curUser, dispatch]);

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

  const onClickHeart = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (!curUser) return navigate("/signin");

    const wishData = {
      products: [{ product: id }],
    };
    dispatch(addWishlistItem(wishData));
    setWishlistIcon(true);
  };

  const onClickCart = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    if (!curUser) return navigate("/signin");

    const cartData = {
      products: [
        {
          product: id,
          quantity: 1,
        },
      ],
    };
    dispatch(addCartItem(cartData));
  };

  const onClickSearch = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    setShowModal(true);
  };

  const onClickRemoveWishlistItem = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    const matchIndex = curWishlist?.products.findIndex(
      (item) => item.product.id === id
    );
    if (matchIndex !== -1) {
      const id = curWishlist.products[matchIndex].id;
      dispatch(removeWishlistItem(id));
      setWishlistIcon(false);
    }
  };

  return (
    <React.Fragment>
      <motion.div className="absolute z-50 bottom-[-50px] justify-between w-full items-center px-5 bg-custom-primary py-3 hidden group-hover:flex transition-all group-hover:bottom-0 duration-500">
        {wishlistIcon ? (
          <motion.span
            whileHover={animateIconOnHover}
            className="text-green-700 text-2xl"
            onClick={(e) => onClickRemoveWishlistItem(e)}
          >
            <FaHeart className="card-icon" />
          </motion.span>
        ) : (
          <motion.span
            whileHover={animateIconOnHover}
            className="text-2xl"
            onClick={(e) => onClickHeart(e)}
          >
            <FaRegHeart className="card-icon" />
          </motion.span>
        )}

        <motion.span
          whileHover={animateIconOnHover}
          onClick={(e) => onClickCart(e)}
          className="text-2xl"
        >
          {/* <FaCartShopping className="card-icon" /> */}
          <IoCartOutline className="card-icon" />
        </motion.span>
      </motion.div>

      <motion.span
        className="hidden items-center justify-center absolute left-[45%] top-[45%] group-hover:z-30 group-hover:flex "
        whileHover={animateIconOnHover}
        onClick={(e) => onClickSearch(e)}
      >
        <FaMagnifyingGlass className="card-icon" />
      </motion.span>
    </React.Fragment>
  );
};

export default CardIcons;
