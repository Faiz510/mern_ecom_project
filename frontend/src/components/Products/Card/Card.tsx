import React, { useState } from 'react';
import './Card.css';
import RatingStar from './RatingStar.tsx';
import { CardProps } from '../../Types.tsx';
import CardIcons from './CardIcons.tsx';
import CardBgOverlay from './CardBgOverlay.tsx';
import { Link, useSearchParams } from 'react-router-dom';
import QuickSearch from '../../QuickSearch/QuickSearch.tsx';

const Card: React.FC<CardProps> = (props) => {
  const {
    id,
    title,
    img,
    price,
    discountPercentage,
    category,
    cardList,
    description,
    avgRating,
  } = props;

  const [searchParams] = useSearchParams(); // to get searchParams from url
  const [showQuickModal, setShowQuickModal] = useState<boolean>(false);

  const disVal = discountPercentage / 100;
  const discountedPrice = price + price * disVal;

  return (
    <>
      <Link
        to={`/products/${id}`}
        relative="path"
        key={id}
        id={`${id}`}
        className={`${
          cardList
            ? 'w-[80%] grid grid-cols-1  md:grid-cols-2  items-center h-[500px] md:h-[250px] gap-10 mx-auto'
            : 'w-[300px]'
        }  bg-custom-primary rounded cursor-pointer relative group overflow-hidden transition-all duration-300 group-hover:shadow-lg `}
        state={{ search: searchParams.toString() }}
      >
        <div className="w-[500px]">
          <img
            src={`${img}`}
            alt={`${title}`}
            className={`${
              cardList ? 'w-[80%] h-[250px] object-cover mt-0' : 'w-[400px]'
            } h-[250px] object-cover rounded`}
          />
        </div>

        <div className="p-3">
          <h3 className="font-semibold tracking-wider text-custom-secondary">
            {category.join(' , ')}
          </h3>

          <h2 className="text-[1.2rem] font-medium tracking-widest">{title}</h2>

          <RatingStar rating={avgRating} />

          <div className="flex items-center justify-center gap-4">
            <del className="opacity-40 font-medium">
              $ {discountedPrice.toFixed(2)}
            </del>{' '}
            <br />
            <span className="price-color font-semibold tracking-wider">
              $ {price.toFixed(2)}
            </span>
            <br />
            <span className="price-bg-color text-white px-1 rounded-md">
              {discountPercentage.toFixed(0)} %
            </span>
          </div>

          <div className="mt-2 pb-4 text-custom-font_primary px-2">
            <p>
              {cardList
                ? description.length > 100
                  ? `${description.slice(0, 100)}...`
                  : description
                : ''}
            </p>
          </div>
        </div>

        <CardIcons id={id} setShowModal={setShowQuickModal} />

        <CardBgOverlay />
      </Link>

      <QuickSearch
        id={id}
        setShowSearchModal={setShowQuickModal}
        showSearchModal={showQuickModal}
      />
    </>
  );
};

export default Card;
