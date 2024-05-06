import React from "react";
import { FaStar, FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

interface RatingStarProps {
  rating: number;
}

const RatingStar: React.FC<RatingStarProps> = ({ rating }) => {
  const ratingNum = Array.from({ length: 5 }, (el, i) => {
    let number = i + 0.5;

    return (
      <span key={i} className="text-custom-secondary flex text-2xl">
        {rating >= i + 1 ? (
          <FaStar />
        ) : rating >= number ? (
          <FaStarHalfStroke />
        ) : (
          <FaRegStar />
        )}
      </span>
    );
  });

  return <div className="flex gap-[2px]"> {ratingNum} </div>;
};

export default RatingStar;
