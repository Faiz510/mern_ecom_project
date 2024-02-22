import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../../Types";

export const FetchProduct = (id: string | null) => {
  const [fetchProductData, setFetchProductData] = useState<Product | null>(
    null
  );
  const [productError, setProductError] = useState<boolean>(false);
  const [productLoading, setProductLoading] = useState<boolean>(false);

  useEffect(() => {
    const ApiGetProduct = async () => {
      try {
        setProductLoading(true);
        const response = await axios.get<Product>(
          `https://dummyjson.com/products/${id}`
        );
        setFetchProductData(response.data);
        setProductLoading(false);
        console.log(fetchProductData);
      } catch (error) {
        setProductLoading(false);
        console.error(error);
        setProductError(true);
      }
    };

    ApiGetProduct();
  }, []);

  return { fetchProductData, productLoading, productError };
};
