import Card from "./Card/Card.tsx";
import Loader from "../Loader.tsx";
import { ProductData } from "../Types.tsx";
import { useFetchData } from "../../Hooks/useFetchData.tsx";

const Products = () => {
  // fetchResquest
  const parseFunctionData = (data: any) => data as ProductData;

  const fetchUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/products?limit=3`;
  const { responseData, fetchLoading } = useFetchData<ProductData>(
    `${fetchUrl}`,
    {
      products: [],
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
          responseData?.products?.map((product) => (
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
