import { FaPlus, FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store/Store";
import { decrement, increment } from "../../../Redux/Slice/CounterSlice";

const ProductQuanityCounter = () => {
  const ProductCount = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="flex gap-2 justify-center items-center ">
      <button
        className="cursor-pointer border-[2px] p-1 text-2xl border-custom-primary"
        onClick={() => dispatch(decrement())}
      >
        <FaMinus />
      </button>

      <input
        placeholder="1"
        type="number"
        value={ProductCount}
        className="w-10 text-center focus:outline-none text-[1.2rem] font-medium"
      />

      <button
        className="cursor-pointer border-[2px] p-1 text-2xl border-custom-primary"
        onClick={() => dispatch(increment())}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default ProductQuanityCounter;
