import { NavLink, Outlet } from "react-router-dom";
import { Product } from "../../../Types";

interface ProductPageBottomSectionProps {
  products: Product | null;
}

const ProductPageBottomSection = ({
  products,
}: ProductPageBottomSectionProps) => {
  return (
    <div className="my-10 w-[80%] mx-auto min-h-[200px] overflow-x-hidden">
      <div className="flex gap-4 text-black text-[1.25rem] tracking-wider my-4 font-medium">
        <NavLink
          className={
            location.pathname === `/products/${products?.id}`
              ? "pb-2 scale-105 border-b-4"
              : ""
          }
          to={`/products/${products?.id}`}
        >
          Review
        </NavLink>
        <NavLink
          className={
            location.pathname === `/products/${products?.id}/description`
              ? "pb-2 scale-105 border-b-4"
              : ""
          }
          to={`/products/${products?.id}/description`}
        >
          Description
        </NavLink>
      </div>

      <div>
        <Outlet context={products} />
      </div>
    </div>
  );
};

export default ProductPageBottomSection;
