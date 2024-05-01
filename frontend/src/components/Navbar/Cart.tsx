import React from "react";
import { FaXmark } from "react-icons/fa6";
import { CartTypes } from "../Types";
import { useAppDispatch } from "../../app/hooks";
import { removeCartItem } from "../../Redux/Slice/CartSlice/CartSliceApi";
import { Link } from "react-router-dom";

interface CartProps {
  // productLoading: boolean;
  cartItems: CartTypes | null;
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const dispatch = useAppDispatch();

  const onCloseHandler = (id: string) => {
    dispatch(removeCartItem(id));
  };

  return (
    <div className="hidden group-hover:flex absolute top-[2.9rem] ml-[-12rem] bg-custom-primary pt-10 px-5 group-hover:transition-all group-hover:duration-300 w-[300px] pb-4 mx-auto flex-col">
      {/* Content to be displayed on hover */}
      {cartItems?.products.length === 0 && <div>Empty Cart</div>}
      {cartItems?.products.map((product) => (
        <div
          key={product.id}
          className="flex w-full items-center justify-between font-light text-med my-4 bg-white p-2 rounded-lg relative"
        >
          <div className="flex items-center justify-center gap-2">
            <img src={product.product.thumbnail} className="w-20" alt="" />
            <div className="flex flex-col">
              <span className="font-light">{product.product.title}</span>
              <span className="font-medium">${product.product.price}</span>
            </div>
          </div>
          <span onClick={() => onCloseHandler(product.id)}>
            <FaXmark />
          </span>
          <span className="absolute bg-custom-secondary rounded-full w-6 h-6 flex items-center justify-center top-2 left-0 text-white font-thin">
            {product.quantity}
          </span>
        </div>
      ))}
      <div className="flex w-full items-center justify-between font-light text-med my-4">
        <span>Total Items: {cartItems?.totalProducts}</span>
        <span>Total: ${cartItems?.totalAmount}</span>
      </div>

      {cartItems?.products?.length && cartItems?.products?.length !== 0 ? (
        <Link
          to="/cart"
          className="w-full bg-custom-secondary py-2 rounded-lg hover:text-black text-center"
        >
          Checkout
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
