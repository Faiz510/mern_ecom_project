import Card from "./Card/Card.tsx";
import Loader from "../Loader.tsx";
import { Product } from "../Types.tsx";
import { ProductData } from "../Types.tsx";
import { useFetchData } from "../../Hooks/useFetchData.tsx";
import { FC } from "react";

interface ProductProps {
  fetchUrl: string;
}

const Products: FC<ProductProps> = ({ fetchUrl }) => {
  // fetchResquest
  const parseFunctionData = (data: any) => data as ProductData;

  const { responseData, fetchLoading } = useFetchData<ProductData>(
    fetchUrl,
    {
      products: [],
      productLenght: 0,
      total: 0,
      skip: 0,
      limit: 0,
    },
    parseFunctionData
  );

  return (
    <section className="flex justify-center items-center">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {!fetchLoading ? (
          responseData?.products?.map((product: Product) => (
            <Card
              title={product.title}
              img={product.thumbnail}
              price={product.price}
              discountPercentage={product.discountPercentage}
              rating={product.rating}
              category={product.category}
              id={product.id}
              cardList={false}
              avgRating={product.avgRating}
              key={product.id}
              description={product.description}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
};

export default Products;
