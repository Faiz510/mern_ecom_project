import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import CartCheckoutRow from "./CartCheckoutRow";

interface OncartProps {
  OnCart: boolean;
}

const CartDetailSection = ({ OnCart }: OncartProps) => {
  const cartItems = useAppSelector((state) => state.cart.cart?.cart);
  return (
    <div className="w-[60vw] lg:w-[20vw] mx-auto py-4">
      <div className="bg-gray-50 text-center mt-4 min-h-[300px] px-4">
        <h3 className="font-medium text-3xl my-2 pt-4 tracking-wide">
          {OnCart ? "Cart Details" : "Make Payment"}
        </h3>

        <CartCheckoutRow
          title={`${cartItems?.totalQuantity} items`}
          price={`$${cartItems?.totalAmount}`}
        />

        <CartCheckoutRow title={"Shipping"} price={`$${12}`} />
        {cartItems && (
          <CartCheckoutRow
            title={"Total (tax excl.)"}
            price={`$${cartItems?.totalAmount + 12}`}
          />
        )}
        {cartItems && (
          <CartCheckoutRow
            title={"Total (tax incl.)"}
            price={`$${cartItems?.totalAmount + 12}`}
          />
        )}

        <CartCheckoutRow title={"Taxes"} price={"00.0"} />

        {OnCart && (
          <Link
            to={"/checkout"}
            className="bg-slate-500 text-white py-1 w-full px-4 mt-3 hover:text-white"
          >
            Procced to Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartDetailSection;
