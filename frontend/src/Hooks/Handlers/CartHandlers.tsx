import { useNavigate } from "react-router-dom";
import { addCartItem } from "../../Redux/Slice/CartSlice/CartSliceApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../Redux/Store/Store";

interface useAddCartItemHandlerType {
  id: string;
  quantity?: number;
}

export const useAddCartItemHandler = ({
  id,
  quantity,
}: useAddCartItemHandlerType) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const curUser = useAppSelector((state: RootState) => state.auth.currentUser);

  const addCartItemHandler = () => {
    if (!curUser) return navigate("/signin");

    const cartData = {
      products: [
        {
          product: id,
          quantity: quantity || 1,
        },
      ],
    };
    dispatch(addCartItem(cartData));
  };
  return { addCartItemHandler };
};
