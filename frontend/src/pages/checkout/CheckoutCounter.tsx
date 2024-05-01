import { FaPlus, FaMinus } from "react-icons/fa6";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { updateQuantity } from "../../Redux/Slice/CartSlice/CartSliceApi";

interface checkoutCounterProps {
  productQuantity: number;
  productId: string;
}

const CheckoutCounter: React.FC<checkoutCounterProps> = ({
  productQuantity,
  productId,
}) => {
  const [quantityNum, setQuantityNum] = useState<number>(productQuantity);

  const dispatch = useAppDispatch();

  const counterQuantityHandler = (val: string) => {
    val === "inc"
      ? setQuantityNum((pre) => pre + 1)
      : setQuantityNum((pre) => (pre > 1 ? pre - 1 : 1));
  };

  useEffect(() => {
    dispatch(updateQuantity({ id: productId, quantity: quantityNum }));
  }, [quantityNum]);

  return (
    <div className="flex gap-2  items-center">
      <button
        className="cursor-pointer border-[2px] p-1 text-sm border-custom-primary"
        onClick={() => counterQuantityHandler("dec")}
      >
        <FaMinus />
      </button>

      <input
        placeholder="1"
        type="number"
        value={quantityNum}
        onChange={() => {}}
        className="w-10 text-center focus:outline-none text-sm font-medium md:text-[1.2rem]"
      />

      <button
        className="cursor-pointer border-[2px] p-1 text-sm border-custom-primary"
        onClick={() => counterQuantityHandler("inc")}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default CheckoutCounter;
