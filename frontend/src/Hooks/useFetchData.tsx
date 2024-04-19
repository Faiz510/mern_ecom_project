import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T> {
  data: T;
}

export const useFetchData = <T,>(
  url: string,
  initialData: T,
  parseFunction: (data: any) => T
) => {
  const [responseData, setResponseData] = useState<T>(initialData);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<unknown>("");

  useEffect(() => {
    const fetchApiFunction = async () => {
      try {
        setFetchError("");
        setFetchLoading(true);
        const response: AxiosResponse<ApiResponse<T>> = await axios.get(url);

        const parsedData = parseFunction(response.data);

        setResponseData(parsedData);

        setFetchLoading(false);
      } catch (error: any) {
        console.error(error);

        setFetchLoading(false);
        setFetchError(error);
        // if (error?.response.data?.error.statusCode === 404) {
        //   // console.log("page not found");
        //   setFetchError(error.response.data.statusCode);
        // } else {
        //   setFetchError(error);
        //   // console.log("ditnot found");
        // }
      }
    };

    fetchApiFunction();
  }, [url]);

  return { responseData, fetchLoading, setFetchLoading, fetchError };
};

// export const useFetch
