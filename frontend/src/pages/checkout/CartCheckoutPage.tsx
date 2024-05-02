import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FaXmark } from "react-icons/fa6";
import { removeCartItem } from "../../Redux/Slice/CartSlice/CartSliceApi";
import CheckoutCounter from "./CheckoutCounter";
import CartDetailSection from "./CartDetailSection";
import { Link } from "react-router-dom";
import { CartProductTypes } from "../../components/Types";

const CartCheckoutPage = () => {
  const cartItems = useAppSelector((state) => state.cart.cart.cart);

  const dispatch = useAppDispatch();

  const onCloseHandler = (id: string) => {
    dispatch(removeCartItem(id));
  };

  const thClass =
    "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider";
  return (
    <section className="overflow-x-hidden flex flex-wrap min-h-[350px] w-[95vw] mx-auto">
      <div>
        <table className="w-[70vw]  divide-y divide-gray-200 mx-auto">
          <thead className="bg-gray-50 opacity-0 md:opacity-100">
            <tr>
              <th scope="col" className={thClass}>
                Product
              </th>
              <th scope="col" className={thClass}>
                Quantity
              </th>
              <th scope="col" className={thClass}>
                Price
              </th>
              <th scope="col" className={thClass}>
                Total
              </th>
              <th
                scope="col"
                className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              ></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 top-0 ">
            {cartItems?.products.map((product: CartProductTypes) => (
              <tr key={product.id} className="">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.product.thumbnail}
                      className="w-40 md:w-20"
                      alt=""
                    />
                    <div className="flex flex-col gap-[2px]">
                      <span className="font-medium">
                        {product.product.title}
                      </span>
                      <span className="md:hidden">
                        {
                          <CheckoutCounter
                            productQuantity={product.quantity}
                            productId={product.id}
                          />
                        }
                      </span>
                      <div className="flex justify-between mt-2">
                        <span className="md:hidden font-medium">
                          ${product.product.price}
                        </span>
                        <span className="md:hidden font-medium">
                          ${product?.quantity * product?.product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap opacity-0 absolute font-medium pointer-events-none md:opacity-100 md:relative md:pointer-events-auto">
                  <CheckoutCounter
                    productQuantity={product.quantity}
                    productId={product.id}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap opacity-0 absolute font-medium pointer-events-none md:opacity-100 md:relative md:pointer-events-auto">
                  ${product.product.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap opacity-0 absolute font-medium pointer-events-none md:opacity-100 md:relative md:pointer-events-auto">
                  ${product?.quantity * product?.product.price}
                </td>

                <td className="py-4 whitespace-nowrap cursor-pointer pl-8 md:pl-0">
                  <span onClick={() => onCloseHandler(product.id)} className="">
                    <FaXmark />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

          {cartItems?.products.length === 0 && (
            <div className="flex justify-center h-40 items-center text-4xl font-normal">
              <h3>Empty Cart</h3>
            </div>
          )}
        </table>

        <Link
          to={"/products"}
          className="bg-slate-500 text-white py-1 w-full px-4 mt-12 hover:text-white"
        >
          Continue Shoping
        </Link>
      </div>

      <CartDetailSection OnCart={true} />
    </section>
  );
};

export default CartCheckoutPage;
