import React from "react";
import {
  addWishlistItem,
  removeWishlistItem,
} from "../../Redux/Slice/WishlistSlice/wishlistSliceApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../Redux/Store/Store";

interface removeWishlistItemHandlerType {
  id: string;
  setWishlistIcon: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useRemoveWishlistItem = ({
  id,
  setWishlistIcon,
}: removeWishlistItemHandlerType) => {
  const dispatch = useAppDispatch();
  const curWishlist = useAppSelector(
    (state) => state?.wishlist?.wishlist?.wishlist
  );

  const removeWishlistItemHandler = () => {
    const matchIndex = curWishlist?.products?.findIndex(
      (item) => item?.product.id === id
    );
    if (matchIndex !== -1 && matchIndex !== undefined) {
      const id = curWishlist?.products[matchIndex].id;
      if (id) {
        dispatch(removeWishlistItem(id));
      }
      setWishlistIcon(false);
    }
  };

  return { removeWishlistItemHandler };
};

/////////////////////////////

interface AddWishlistItemTypes {
  id: string;
}

export const useAddWishlistItem = ({ id }: AddWishlistItemTypes) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const curUser = useAppSelector((state: RootState) => state.auth.currentUser);

  const addWishlishHandler = (): void => {
    if (!curUser) return navigate("/signin");
    const wishData = {
      products: [{ product: id }],
    };
    dispatch(addWishlistItem(wishData));
  };

  return { addWishlishHandler };
};
