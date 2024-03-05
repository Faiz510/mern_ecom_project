import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import TrustSection from "../../pages/Home/trustSection/TrustSection";
import ProductImgGallery from "./ProductPageContent/ProductImgGallery";
import ProductDetailsSection from "./ProductPageContent/ProductDetailsSection";
import { FetchProduct } from "./ProductPageContent/FetchProduct";
import { useLocation, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import SmoothScrollTop from "../SmoothScrollTop/SmoothScrollTop";

const ProductPage = () => {
  const [imgVal, setImgVal] = useState<number>(0);
  const { id } = useParams<{ id: string | undefined }>();
  const productId: string | null = id || null;
  const location = useLocation();

  const { fetchProductData, productLoading } = FetchProduct(productId);
  return (
    <>
      <SmoothScrollTop params={""} />
        to={`..?${location.state.search}`}
        relative="path"
        className="flex justify-start gap-2 items-center text-start mt-5 ml-20 absolute"
      >
        <span>
          <FaArrowLeft />
        </span>
        <span> Back to Products </span>
      </Link>
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
    </>
  );
};

export default ProductPage;
