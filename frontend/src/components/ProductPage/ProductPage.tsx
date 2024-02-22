import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import TrustSection from "../../pages/Home/trustSection/TrustSection";
import ProductImgGallery from "./ProductPageContent/ProductImgGallery";
import ProductDetailsSection from "./ProductPageContent/ProductDetailsSection";
import { FetchProduct } from "./ProductPageContent/FetchProduct";

const ProductPage = () => {
  const [imgVal, setImgVal] = useState<number>(0);
  const { id } = useParams<{ id: string | undefined }>();
  const productId: string | null = id || null;

  const { fetchProductData, productLoading } = FetchProduct(productId);
  return (
    <section>
      {/* <div className="text-center my-4">
        <h2 className="font-normal text-6xl tracking-widest">Product Page</h2>
      </div> */}
      {!productLoading ? (
        <div className="px-4 py-10 my-10 mx-auto w-[90vw] rounded-md lg:grid lg:gap-10 lg:grid-cols-2">
          <ProductImgGallery
            imgVal={imgVal}
            fetchProductData={fetchProductData}
            setImgVal={setImgVal}
          />

          <ProductDetailsSection fetchProductData={fetchProductData} />
        </div>
      ) : (
        <div>
          <Loader />
        </div>
      )}

      <TrustSection />
    </section>
  );
};

export default ProductPage;
