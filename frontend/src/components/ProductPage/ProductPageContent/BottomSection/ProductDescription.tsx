import { useOutletContext } from "react-router-dom";
import { Product } from "../../../Types";

const ProductDescription = () => {
  const context: Product = useOutletContext();

  return (
    <div className="text-med font-light tracking-tighter">
      {context?.description}{" "}
    </div>
  );
};

export default ProductDescription;
