import React, { useState } from "react";
import "./Card.css";
import RatingStar from "./RatingStar.tsx";
import { CardProps } from "../../Types.tsx";
import CardIcons from "./CardIcons.tsx";
import CardBgOverlay from "./CardBgOverlay.tsx";
import { Link, useSearchParams } from "react-router-dom";

const Card: React.FC<CardProps> = (props) => {
  const {
    id,
    title,
    img,
    price,
    discountPercentage,
    rating,
    category,
    cardList,
    description,
  } = props;

  const [searchParams, setSearchParams] = useSearchParams(); // to get searchParams from url

  return (
    <Link
      to={`/products/${id}`}
      relative="path"
      key={id}
      className={`${
        cardList
          ? "w-[80%] flex flex-col items-center h-[500px] md:h-[250px] md:flex-row gap-2 mx-auto"
          : "w-[300px]"
      }  bg-custom-primary rounded cursor-pointer relative group overflow-hidden transition-all duration-300 group-hover:shadow-lg `}
      state={{ search: searchParams.toString() }}
    >
      <div className="w-[500px]">
        <img
          src={`${img}`}
          alt={`${title}`}
          className={`${
            cardList ? "w-full" : "w-[400px]"
          } h-[250px] object-cover rounded`}
        />
      </div>

      <div className="p-3">
        <h3 className="font-semibold tracking-wider text-custom-secondary">
          {category}
        </h3>

        <h2 className="text-[1.2rem] font-medium tracking-widest">{title}</h2>

        <RatingStar rating={rating} />

        <div className="flex items-center justify-center gap-4">
          <del className="opacity-40 font-medium">$ {price + 100}</del> <br />
          <span className="price-color font-semibold tracking-wider">
            $ {price.toFixed(2)}
          </span>
          <br />
          <span className="price-bg-color text-white px-1 rounded-md">
            {discountPercentage.toFixed(0)} %
          </span>
        </div>

        <div className="mt-4 text-custom-font_primary px-2">
          <p>
            {cardList
              ? description.length > 100
                ? `${description.slice(0, 100)}...`
                : description
              : ""}
          </p>
        </div>
      </div>

      <CardIcons />

      <CardBgOverlay />
    </Link>
  );
};

export default Card;
