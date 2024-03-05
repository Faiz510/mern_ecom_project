import { useFetchData } from "../../../Hooks/useFetchData";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import RatingStar from "../../../components/Products/Card/RatingStar";
import FilterSectionLayout from "./FilterSectionLayout.tsx";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Overlay from "../../../components/Overlay.tsx";
import { motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";

const ShopMainFilter = () => {
  const [showFilter, setShowFilters] = useState<boolean>(false); // display filter on small device

  const isSmallDevice = useMediaQuery({ maxWidth: 768 });
  useEffect(() => {
    if (!isSmallDevice) setShowFilters(false);
  }, [showFilter, isSmallDevice]);

  const parseFunctionData = (data: any) => data as string[];
  const fetchUrl = "https://dummyjson.com/products/categories";
  const { responseData, fetchLoading } = useFetchData<string[]>(
    `${fetchUrl}`,
    [],
    parseFunctionData
  ); // fetch all categories title function

  const [searchParams, setSearchParams] = useSearchParams();
  const searchCat = searchParams.get("category"); // getting category from url

  const ratingFilterArr: number[] = [4.5, 4, 3.5, 3]; // rating value Arr

  const searchCatHanlder = (key: string, value: string) => {
    const cat = new URLSearchParams(searchParams);
    if (value === null) {
      cat.delete(key);
    } else {
      cat.set(key, value);
    }
    return `?${cat.toString()}`;
  };

  const searchParamsHanlder = (key: string, value: string) => {
    // const cat = new URLSearchParams(searchParams);
    setSearchParams((preSearch) => {
      if (value === null) {
        preSearch.delete(key);
      } else {
        preSearch.set(key, value);
      }
      return preSearch;
    });
  };

  //   loading
  if (fetchLoading) return <Loader />;

  const showFilterHandler = () => setShowFilters((preFilter) => !preFilter);

  return (
    <motion.aside className="">
      <div
        className={`md:hidden sm:flex items-center justify-center gap-1 absolute  cursor-pointer z-50  right-4 bg-custom-primary font-light px-4 py-1`}
        onClick={showFilterHandler}
      >
        {!showFilter ? (
          <span>Filters</span>
        ) : (
          <span className="flex items-center gap-2">
            <FaXmark /> Filters
          </span>
        )}
      </div>
      <motion.div
        className={`lg:w-[25vw] bg-white lg:flex flex-col pl-6 ${
          showFilter
            ? "flex w-[50vw] absolute z-50 h-[100%] top-[76px] pb-48 left-0 overflow-y-scroll"
            : "hidden"
        }`}
        key={`view-${showFilter}`}
        initial={{ translateX: -200, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1, transition: { duration: 0.4 } }}
      >
        <h3 className="text-2xl font-medium tracking-wider">Filter By</h3>

        {/* Categories  */}

        <FilterSectionLayout title={"Categories"}>
          {!fetchLoading &&
            responseData?.map((category: string, i: number) => (
              <Link to={searchCatHanlder("category", `${category}`)} key={i}>
                <label
                  htmlFor={`checkbox-${i}`}
                  className="cursor-pointer flex gap-2"
                >
                  <input
                    type="checkbox"
                    id={`checkbox-${i}`}
                    checked={searchCat === category} // if category url === clicked category
                    onChange={() => {}}
                  />
                  {category}
                </label>
              </Link>
            ))}
        </FilterSectionLayout>

        {/* Prices   */}
        <FilterSectionLayout title={"Price"}>
          <button onClick={() => searchParamsHanlder("price", "10-25")}>
            up to $10 to $25
          </button>
          <button onClick={() => searchParamsHanlder("price", "25-50")}>
            up to $25 to $50
          </button>
          <button onClick={() => searchParamsHanlder("price", "50-100")}>
            up to $50 to $100
          </button>
          <button onClick={() => searchParamsHanlder("price", "100-above")}>
            up to 100$ to above
          </button>
        </FilterSectionLayout>

        {/* ratings  */}

        <FilterSectionLayout title={"Rating"}>
          {ratingFilterArr.map((rating, i) => (
            <button
              onClick={() => searchParamsHanlder("rating", `${rating}`)}
              className="flex gap-2 items-center"
              key={i}
            >
              <RatingStar rating={rating} />
              <span>{rating} & up</span>
            </button>
          ))}
        </FilterSectionLayout>
      </motion.div>

      {showFilter && <Overlay onClick={showFilterHandler} />}
    </motion.aside>
  );
};

export default ShopMainFilter;
