import { useOutletContext } from "react-router-dom";
import { Product } from "../../../Types";

const ProductDescription = () => {
  const context: Product = useOutletContext();

  return (
    <div className="text-med font-light tracking-wider w-[50vw] ml-0">
      {context?.description}{" "}
    </div>
  );
};

export default ProductDescription;
