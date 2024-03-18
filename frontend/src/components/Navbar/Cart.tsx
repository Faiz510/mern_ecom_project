import React from "react";
import { FaXmark } from "react-icons/fa6";
import { Product } from "../Types";

interface CartProps {
  productLoading: boolean;
  fetchProductData: Product | null;
}

const Cart: React.FC<CartProps> = ({ productLoading, fetchProductData }) => {
  return (
    <div className="hidden group-hover:flex absolute top-[2.9rem] ml-[-12rem] bg-custom-primary pt-10 px-5 group-hover:transition-all group-hover:duration-300 w-[300px] pb-4 mx-auto flex-col">
      {/* Content to be displayed on hover */}
      {!productLoading && (
        <div className="flex w-full items-center justify-between font-light text-med my-4 bg-white p-2 rounded-lg relative">
          <div className="flex items-center justify-center gap-2">
            <img src={fetchProductData?.thumbnail} className="w-20" alt="" />
            <div className="flex flex-col">
              <span className="font-light">{fetchProductData?.title}</span>
              <span className="font-medium">${fetchProductData?.price}</span>
            </div>
          </div>
          <span>
            <FaXmark />
          </span>

          <span className="absolute bg-custom-secondary rounded-full w-6 h-6 flex items-center justify-center top-2 left-0 text-white font-thin">
            2
          </span>
        </div>
      )}
      <div className="flex w-full items-center justify-between font-light text-med my-4">
        <span>items</span>
        <span>Totol</span>
      </div>

      <button className="w-full bg-custom-secondary py-2 rounded-lg">
        Checkout
      </button>
    </div>
  );
};

export default Cart;
