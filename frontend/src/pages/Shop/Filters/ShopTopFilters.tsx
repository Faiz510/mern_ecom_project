import { ReactNode, ChangeEvent } from "react";
import { CiGrid41 } from "react-icons/ci";
import { LiaListUlSolid } from "react-icons/lia";
import { motion } from "framer-motion";
import "./ShopFilters.css";
import React from "react";
import { useSearchParams } from "react-router-dom";

interface SpanBtnLayoutProps {
  children: ReactNode;
}
const SpanBtnLayout: React.FC<SpanBtnLayoutProps> = ({ children }) => (
  <motion.span whileHover={{ opacity: 0.9, scale: 1.1, color: "#fac423" }}>
    {children}
  </motion.span>
);
///////////////////

interface ShopTopFiltersProps {
  productViewHandler: (data: string) => string;
  productView: string;
}

const ShopTopFilters: React.FC<ShopTopFiltersProps> = ({
  productViewHandler,
  productView,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchSortBy = searchParams.get("sort");

  // set search params in url
  const searchParamsHanlder = (key: string, value: string) => {
    setSearchParams((preSearch) => {
      if (value === null) {
        preSearch.delete(key);
      } else {
        preSearch.set(key, value);
      }
      return preSearch;
    });
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) =>
    searchParamsHanlder("sort", event.target.value); // set value to params

  return (
    <section className="flex flex-col lg:flex-row w-full justify-between items-center px-12">
      <div className="icon-box flex gap-2">
        <SpanBtnLayout>
          {
            <CiGrid41
              className={`${
                productView == "grid" ? "text-custom-secondary" : ""
              }`}
              onClick={() => productViewHandler("grid")}
            />
          }
        </SpanBtnLayout>
        <SpanBtnLayout>
          <LiaListUlSolid
            className={`${
              productView == "list" ? "text-custom-secondary" : ""
            }`}
            onClick={() => productViewHandler("list")}
          />
        </SpanBtnLayout>
      </div>

      <div className="my-4">
        <label
          htmlFor="sortOptions"
          className="mr-2 text-custom-font_primary font-normal"
        >
          Sort By:
        </label>
        <select
          id="sortOptions"
          value={searchSortBy || "relevance"}
          onChange={handleSortChange}
          className="border p-2 rounded-md focus:outline-none  text-custom-font_primary font-light text-sm"
        >
          <option value="relevence"> Relevance</option>
          <option value="title">Name A to Z</option>
          <option value="-title">Name Z to A</option>
          <option value="price">Price Low to High</option>
          <option value="-price">Price High to Low</option>
        </select>
      </div>
    </section>
  );
};

export default ShopTopFilters;
