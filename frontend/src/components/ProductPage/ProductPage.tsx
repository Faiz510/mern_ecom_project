import { useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader";
import TrustSection from "../../pages/Home/trustSection/TrustSection";
import ProductImgGallery from "./ProductPageContent/ProductImgGallery";
import ProductDetailsSection from "./ProductPageContent/ProductDetailsSection";
import { useLocation, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import SmoothScrollTop from "../SmoothScrollTop/SmoothScrollTop";
import { useFetchData } from "../../Hooks/useFetchData";
import { Product } from "../Types";

const ProductPage = () => {
  const [imgVal, setImgVal] = useState<number>(0);
  const { id } = useParams<{ id: string | undefined }>();
  const productId: string | null = id || null;
  const location = useLocation();

  interface SingleProductPageDataType {
    products: Product;
  }

  const fetchUrl = `${
    import.meta.env.VITE_BASE_URL
  }/api/v1/products/${productId}`;

  const parseFunctionData = (data: any) => data as SingleProductPageDataType;

  const { responseData: fetchProductData, fetchLoading } =
    useFetchData<SingleProductPageDataType>(
      `${fetchUrl}`,
      {
        products: {
          id: 0,
          title: "",
          description: "",
          price: 0,
          discountPercentage: 0,
          rating: 0,
          avgRating: 0,
          stock: 0,
          brand: "",
          category: [],
          thumbnail: "",
          images: [],
          reviews: [],
        },
      },
      parseFunctionData
    ); // fetch function

  return (
    <>
      <SmoothScrollTop params={""} />
      <Link
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
        {!fetchLoading ? (
          <div className="px-4 py-10 my-10 mx-auto w-[90vw] rounded-md lg:grid lg:gap-10 lg:grid-cols-2">
            <ProductImgGallery
              imgVal={imgVal}
              fetchProductData={fetchProductData?.products}
              setImgVal={setImgVal}
            />

            <ProductDetailsSection
              fetchProductData={fetchProductData?.products}
            />
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
