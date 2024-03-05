import React, { useEffect, useState } from "react";
import Card from "../../components/Products/Card/Card";
import { ProductData, Product } from "../../components/Types";
import Loader from "../../components/Loader";
import { motion } from "framer-motion";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";
import { useFetchData } from "../../Hooks/useFetchData";
import SmoothScrollTop from "../../components/SmoothScrollTop/SmoothScrollTop";
import ActiveFilters from "./Filters/ActiveFilters";

// type
interface ProductViewProp {
  productView: string;
}

const ShopPageProducts: React.FC<ProductViewProp> = ({ productView }) => {
  // search Params logic
  const [searchParams, setSearchParams] = useSearchParams();
  const searchCategory = searchParams.get("category");
  const searchRating = searchParams.get("rating");
  const searchPrice = searchParams.get("price");
  const searchByOrder = searchParams.get("order");

  // fetch products
  const parseFunctionData = (data: any) => data as ProductData;
  const fetchUrl = searchCategory
    ? `https://dummyjson.com/products/category/${searchCategory}`
    : "https://dummyjson.com/products"; // if searchCategory then show categories else All products
  const { responseData, fetchLoading } = useFetchData<ProductData>(
    `${fetchUrl}`,
    {
      products: [],
      total: 0,
      skip: 0,
      limit: 0,
    },
    parseFunctionData
  ); // fetch function

  const [filteredItems, setFilteredItems] = useState<Product[]>(
    responseData.products
  );

  const [currentPage, setCurrentPage] = useState(1); // current page for pagination

  // useEffect to handle filtering whenever search parameters change
  useEffect(() => {
    let updatedItems = [...responseData.products];

    // filter on rating
    if (searchRating) {
      updatedItems = updatedItems.filter(
        (product) => product.rating >= parseInt(searchRating)
      );
    }

    // filter on prices
    if (searchPrice) {
      const [min, max] = searchPrice?.split("-"); // split search by -
      updatedItems = updatedItems.filter(
        (product) =>
          product.price > parseInt(min) &&
          (max !== "above" ? product.price < parseInt(max) : true) // price greater than min and less than max - if above than all product greater than 100
      );
    }

    // sortBy filters
    if (searchByOrder) {
      if (searchByOrder === "nameAsc") {
        updatedItems = updatedItems.sort((a, b) =>
          a.title.localeCompare(b.title)
        );
      } else if (searchByOrder === "nameDesc") {
        updatedItems = updatedItems.sort((a, b) =>
          b.title.localeCompare(a.title)
        );
      } else if (searchByOrder === "priceAsc") {
        updatedItems = updatedItems.sort((a, b) => a.price - b.price);
      } else if (searchByOrder === "priceDesc") {
        updatedItems = updatedItems.sort((a, b) => b.price - a.price);
      }
    }

    setFilteredItems(updatedItems);
    setCurrentPage(1); // setpage 1 when params changes
  }, [searchRating, searchPrice, responseData.products, searchByOrder]);

  // pagination logic
  const itemsPerPage = 10; // Set the number of items to display per page
  const totalItems = filteredItems.length; // Replace with the total number of items in your dataset

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Use the range to get the items for the current page
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // show pages no
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  //////////// pagination logic ends /////////////

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
        cardList={cardListVal}
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

      <ActiveFilters handler={removeQureyParamsHandler} />
      <section className="flex justify-center items-center">
        <motion.div
          className={`grid grid-cols-1 gap-6 mt-10 ${
            productView === "grid" ? "lg:grid-cols-3 " : "lg:grid-cols-1"
          }`}
          key={`view-${productView}-${currentPage}-${searchCategory}-${searchPrice}-${searchRating}-${searchByOrder}`} // animate on value changes
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, type: "just", stiffness: 800 },
          }}
        >
          {/* if product view = grid show grid else show list */}
          {!fetchLoading ? (
            productView === "grid" ? (
              currentItems?.map((product) => renderedCard(product, false))
            ) : (
              currentItems?.map((product) => renderedCard(product, true))
            )
          ) : (
            <Loader />
          )}
        </motion.div>
      </section>

      {/* if no item to show  */}
      {currentItems?.length === 0 && (
        <div className="w-full my-10 font-semibold text-4xl text-center">
          <h3>Noting to show</h3>
        </div>
      )}

      {/* shop page pagination  */}
      {currentItems?.length > 0 && (
        <Pagination
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          currentPage={currentPage}
          getPageNumbers={getPageNumbers}
        />
      )}
    </>
  );
};

export default ShopPageProducts;
