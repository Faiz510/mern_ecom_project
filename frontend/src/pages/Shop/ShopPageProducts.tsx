import React, { useEffect, useState } from "react";
import Card from "../../components/Products/Card/Card";
import { ProductData, Product } from "../../components/Types";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useFetchData } from "../../Hooks/useFetchData";
import SmoothScrollTop from "../../components/SmoothScrollTop/SmoothScrollTop";
import ActiveFilters from "./Filters/ActiveFilters";
import Pagination from "./Pagination";

interface ProductViewProp {
  productView: string;
}

const ShopPageProducts: React.FC<ProductViewProp> = ({ productView }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // search Params
  const [searchParams, setSearchParams] = useSearchParams();
  const searchCategory = searchParams.get("category");
  const searchRating = searchParams.get("avgRating");
  const searchPrice = searchParams.get("price");
  const searchByOrder = searchParams.get("sort");

  // Calling Api
  let newPriceVal: string | undefined;

  if (searchPrice) {
    const [minPrice, maxPrice] = searchPrice?.split("-");
    newPriceVal = `${
      maxPrice !== "above"
        ? `price[gte]=${minPrice}&price[lte]=${maxPrice}`
        : `price[gte]=${minPrice}`
    }`;
  }

  const newParams: string = `${
    searchParams.has("category") ? `category=${searchCategory}` : ""
  }&${searchParams.has("avgRating") ? `avgRating[gte]=${searchRating}` : ""}&${
    searchParams.has("price") ? `${newPriceVal}` : ""
  }&${searchParams.has("sort") ? `sort=${searchByOrder}` : ""}`;

  const fields =
    "_id,category,title,price,avgRating,discountPercentage,description,thumbnail,createdAt";
  const parseFunctionData = (data: any) => data as ProductData;
  const fetchUrl = `${
    import.meta.env.VITE_BASE_URL
  }/api/v1/products?field=${fields}&page=${currentPage}&limit=9${
    newParams ? `&${newParams}` : ""
  }`;
  const { responseData, fetchLoading, fetchError } = useFetchData<ProductData>(
    `${fetchUrl}`,
    {
      products: [],
      productLenght: 0,
      total: 0,
      skip: 0,
      limit: 0,
    },
    parseFunctionData
  ); // fetch api function

  //////////// pagination /////////////

  useEffect(() => {
    if (
      responseData &&
      responseData.total !== undefined &&
      responseData.limit !== undefined
    ) {
      setTotalPages(Math.ceil(responseData.total / responseData.limit));
    }
  }, [currentPage, responseData]);

  useEffect(() => {
    if (searchCategory || searchPrice || searchRating) {
      setCurrentPage(1);
    }
  }, [searchCategory, searchPrice, searchRating]);

  const getNumber = () => {
    const PageNum = [];
    for (let i = 1; i <= totalPages; i++) {
      PageNum.push(i);
    }
    return PageNum;
  };

  //////////// pagination  ends /////////////

  // rendered product card handler
  const renderedCard = (product: Product, cardListVal: boolean) => {
    return (
      <Card
        title={product.title}
        img={product.thumbnail}
        price={product.price}
        discountPercentage={product.discountPercentage}
        rating={product.rating}
        category={product.category}
        id={product.id}
        key={product.id}
        cardList={cardListVal}
        avgRating={product.avgRating}
        description={product.description}
      />
    );
  };

  // remove searchParams individually handler
  const removeQureyParamsHandler = (paramKey: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(paramKey);
    setSearchParams(newSearchParams.toString());
  };

  return (
    <>
      <SmoothScrollTop params={searchParams.toString()} />
      {/* active filter section  */}
      <ActiveFilters handler={removeQureyParamsHandler} />

      <section className="flex justify-center items-center">
        <motion.div
          className={`grid grid-cols-1 gap-6 mt-10 ${
            productView === "grid" ? "lg:grid-cols-3 " : "lg:grid-cols-1"
          }`}
          key={`view-${searchParams.toString()}-${currentPage}`} // animate on value changes
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, type: "just", stiffness: 800 },
          }}
        >
          {fetchLoading ? (
            <Loader />
          ) : fetchError ? (
            <div className="w-full my-10 font-semibold text-4xl text-center">
              <h3>Nothing to show</h3>
            </div>
          ) : responseData?.productLenght === 0 ? (
            <div className="w-full my-10 font-semibold text-4xl text-center">
              <h3>Nothing to show</h3>
            </div>
          ) : (
            // if product view = grid show grid else show list
            responseData.products?.map((product) =>
              renderedCard(product, productView !== "grid")
            )
          )}
        </motion.div>
      </section>

      {responseData?.products?.length !== 0 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
          getPageNumbers={getNumber}
        />
      )}
    </>
  );
};

export default ShopPageProducts;
