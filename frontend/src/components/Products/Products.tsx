import Card from "./Card/Card.tsx";
import Loader from "../Loader.tsx";
import { ProductData } from "../Types.tsx";
import { useFetchData } from "../../Hooks/useFetchData.tsx";

const Products = () => {
  // fetchResquest
  const parseFunctionData = (data: any) => data as ProductData;

  const fetchUrl = "https://dummyjson.com/products?limit=3";
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
    <section className="grid grid-cols-1 w-[50vw] md:grid-cols-2 md:w-[70vw] lg:grid-cols-3 lg:w-[90vw] mx-auto gap-5 sm:gap-8 md:mx-[8rem] lg:mx-[6vw] md:pl-4 lg:pl-8">
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
          />
        ))
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Products;
