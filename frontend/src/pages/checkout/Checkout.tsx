import { FormEvent } from "react";
import CartDetailSection from "./CartDetailSection";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { clearCart } from "../../Redux/Slice/CartSlice/CartSliceApi";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onsubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    navigate("/");
    dispatch(clearCart());
  };

  return (
    <section className="overflow-x-hidden flex flex-wrap min-h-[350px] w-[95vw] mx-auto justify-center items-center ">
      <div className="w-[70vw] bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={onsubmitHandler}>
          <div className="mb-4">
            <label htmlFor="cardHolder" className="block mb-2 font-medium">
              Card Holder
            </label>
            <input
              type="text"
              id="cardHolder"
              placeholder="Holder name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cardNo" className="block mb-2 font-medium">
              Card Number
            </label>
            <input
              type="text"
              id="cardNo"
              placeholder="Enter card number"
              maxLength={16}
              minLength={16}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4 flex">
            <div className="mr-2">
              <label htmlFor="expiryDate" className="block mb-2 font-medium">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                placeholder="MM/YY"
                maxLength={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="cvv" className="block mb-2 font-medium">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                placeholder="CVV"
                maxLength={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <button className="bg-slate-500 text-white py-1  px-4 mt-3 mx-auto hover:text-white">
            Make Payment
          </button>
          {/* Add more payment options here */}
        </form>
      </div>
      <CartDetailSection OnCart={false} />
    </section>
  );
};

export default Checkout;
