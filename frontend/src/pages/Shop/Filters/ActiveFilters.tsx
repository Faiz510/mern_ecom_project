import React from "react";
import { useSearchParams } from "react-router-dom";
import { FaXmark } from "react-icons/fa6";
// import { removeQureyParamsHandler } from "./SearchQueryParamsHandler";

interface ActiveFiltersProps {
  handler: (data: string) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ handler }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchCategory = searchParams.get("category");
  const searchRating = searchParams.get("avgRating");
  const searchPrice = searchParams.get("price");

  return (
    <div className="flex items-center justify-start gap-4">
      {searchCategory ? (
        <button
          onClick={() => handler("category")}
          className="flex items-center gap-2 bg-custom-primary text-black px-2 py-1 font-light"
        >
          category: {searchCategory} <FaXmark />
        </button>
      ) : (
        <></>
      )}
      {searchRating ? (
        <button
          onClick={() => handler("avgRating")}
          className="flex items-center gap-2 bg-custom-primary text-black px-2 py-1 font-light"
        >
          rating : up to {searchRating} <FaXmark />
        </button>
      ) : (
        <></>
      )}
      {searchPrice ? (
        <button
          onClick={() => handler("price")}
          className="flex items-center gap-2 bg-custom-primary text-black px-2 py-1 font-light"
        >
          price : {searchPrice} <FaXmark />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ActiveFilters;
