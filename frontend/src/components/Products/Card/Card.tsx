import React from "react";
import "./Card.css";
import RatingStar from "./RatingStar.tsx";
import { CardProps } from "../../Types.tsx";
import CardIcons from "./CardIcons.tsx";
import CardBgOverlay from "./CardBgOverlay.tsx";

const Card: React.FC<CardProps> = (props) => {
  const { id, title, img, price, discountPercentage, rating, category } = props;

  return (
    <div
      key={id}
      className="w-[300px] bg-custom-primary rounded cursor-pointer relative group overflow-hidden transition-all duration-300 group-hover:shadow-lg"
    >
      <img
        src={`${img}`}
        alt={`${title}`}
        className="w-full h-[220px] object-cover rounded"
      />

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
      </div>

      <CardIcons />

      <CardBgOverlay />
    </div>
  );
};

export default Card;
