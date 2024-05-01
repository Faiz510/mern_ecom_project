import { FaPlus, FaMinus } from "react-icons/fa6";
import React from "react";

interface ProductQuanityCounterProps {
  quantityNum: number;
  setQuantityNum: React.Dispatch<React.SetStateAction<number>>;
}

const ProductQuanityCounter: React.FC<ProductQuanityCounterProps> = ({
  quantityNum,
  setQuantityNum,
}) => {
  const counterQuantityHandler = (val: string) => {
    val === "inc"
      ? setQuantityNum((pre) => pre + 1)
      : setQuantityNum((pre) => (pre > 1 ? pre - 1 : 1));
  };

  return (
    <div className="flex gap-2 justify-center items-center ">
      <button
        className="cursor-pointer border-[2px] p-1 text-2xl border-custom-primary"
        onClick={() => counterQuantityHandler("dec")}
      >
        <FaMinus />
      </button>

      <input
        placeholder="1"
        type="number"
        value={quantityNum}
        onChange={() => {}}
        className="w-10 text-center focus:outline-none text-[1.2rem] font-medium"
      />

      <button
        className="cursor-pointer border-[2px] p-1 text-2xl border-custom-primary"
        onClick={() => counterQuantityHandler("inc")}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default ProductQuanityCounter;
