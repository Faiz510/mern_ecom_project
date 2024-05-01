interface CartCheckoutRowProps {
  title: string | number;
  price: string | number;
}

const CartCheckoutRow = ({ title, price }: CartCheckoutRowProps) => {
  return (
    <div className="flex justify-between px-4 w-full my-2">
      <span className="text-med font-normal">{title}</span>
      <span className="text-med font-medium">{price}</span>
    </div>
  );
};

export default CartCheckoutRow;
