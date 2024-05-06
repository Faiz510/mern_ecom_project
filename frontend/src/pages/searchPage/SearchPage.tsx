import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ProductData } from "../../components/Types";
import Loader from "../../components/Loader";

const SearchPage = () => {
  const [searchData, setSearchData] = useState<ProductData | null>(null);
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchApiHandler = async (title: string) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/products?title=${title}`
      );
      const { data } = res;
      setIsLoading(false);
      setSearchData(data);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchVal !== "" || searchVal === null) {
      searchApiHandler(searchVal);
    }
  }, [searchVal]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-[600px]">
        <div className="flex justify-center items-center gap-2 bg-custom-primary py-4 px-6 rounded-lg w-[80%] md:w-[40%]">
          <input
            type="text"
            placeholder="search by title"
            className="px-2 rounded-lg py-1 text-med font-light w-full focus:outline-none"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <span className="text-black/70 cursor-pointer">
            <FaSearch size={20} />
          </span>
        </div>

        {isLoading && (
          <div>
            <Loader />
          </div>
        )}

        {!isLoading && searchVal !== "" && searchData?.productLenght === 0 && (
          <div className="mt-4 text-2xl">No result found</div>
        )}

        {searchData &&
          searchVal !== "" &&
          !isLoading &&
          searchData.productLenght > 0 && (
            <div className="p-4 bg-custom-primary w-[80%] md:w-[40%] mt-4 rounded-lg ">
              {searchData?.products.map((product) => {
                return (
                  <Link
                    to={`/products/${product.id}`}
                    className="cursor-pointer my-2 flex gap-4 items-center w-full hover:text-black hover:bg-custom-primary hover:scale-105 px-6 border-b-2 border-white"
                    key={product.id}
                  >
                    <img src={product.thumbnail} alt="" width={50} />
                    <div className="flex flex-col">
                      <span className="text-2xl">{product.title}</span>
                      <span className="text-med font-semibold">
                        ${product.price}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchPage;
