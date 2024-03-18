import { FaPlus, FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/Store";
import { decrement, increment } from "../../../Redux/Slice/CounterSlice";
import { useState } from "react";

const ProductQuanityCounter = () => {
  const [counterQuantity, setCounterQuantity] = useState<number>(1);
  const ProductCount = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  const counterQuantityHandler = (val: string) =>
    val === "inc"
      ? setCounterQuantity((pre) => pre + 1)
      : setCounterQuantity((pre) => (pre > 0 ? pre - 1 : 0));

  return (
    <div className="flex gap-2 justify-center items-center ">
      <button
        className="cursor-pointer border-[2px] p-1 text-2xl border-custom-primary"
        onClick={() => counterQuantityHandler("dec")}
        // onClick={() => dispatch(decrement())}
      >
        <FaMinus />
      </button>

      <input
        placeholder="1"
        type="number"
        value={counterQuantity}
        className="w-10 text-center focus:outline-none text-[1.2rem] font-medium"
      />

      <button
        className="cursor-pointer border-[2px] p-1 text-2xl border-custom-primary"
        onClick={() => counterQuantityHandler("inc")}
        // onClick={() => dispatch(increment())}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default ProductQuanityCounter;
