import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface PostFormApiProps {
  method: "POST" | "PATCH";
  endPoint: string;
  navigateTo?: string;
}

type ApiRequestFunction = (data: any) => Promise<any>;

const PostFormApi = ({
  method,
  endPoint,
  navigateTo,
}: PostFormApiProps): {
  loading: boolean;
  error: string;
  makeApiRequest: ApiRequestFunction;
} => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const makeApiRequest: ApiRequestFunction = async (data) => {
    try {
      setLoading(true);
      const res = await axios({
        method,
        url: `${import.meta.env.VITE_BASE_URL}/api/v1/user${endPoint}`,
        data,
      });
      setLoading(false);
      navigate(`${navigateTo}`);
      return res.data;
    } catch (error: any) {
      setError(error.response.data.message);
      setLoading(false);
      // throw error;
    }
  };

  return { loading, error, makeApiRequest };
};

export default PostFormApi;
