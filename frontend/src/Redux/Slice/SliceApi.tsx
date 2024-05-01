import axios from "axios";

interface sliceApiHandlerType {
  method: "GET" | "PATCH" | "POST" | "DELETE";
  url: string;
  withCredentials: boolean;
  data?: any;
}

export const sliceApiHandler = async ({
  method,
  url,
  withCredentials,
  data,
}: sliceApiHandlerType) => {
  try {
    const res = await axios({
      method,
      url,
      withCredentials,
      data,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
