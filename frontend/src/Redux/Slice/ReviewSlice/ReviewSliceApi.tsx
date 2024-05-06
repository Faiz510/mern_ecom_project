import { createAsyncThunk } from "@reduxjs/toolkit";
import { sliceApiHandler } from "../SliceApi";

export const fetchReview = createAsyncThunk(
  "review/fetchReview",
  async (id: string) => {
    return sliceApiHandler({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/products/${id}/reviews`,
      withCredentials: true,
    });
  }
);

interface createReviewType {
  id: string;
  review: string;
  rating: number;
}

export const createReview = createAsyncThunk(
  "review/createReview",
  async (data: createReviewType, thankApi) => {
    const res = await sliceApiHandler({
      method: "POST",
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/products/${
        data?.id
      }/reviews`,
      withCredentials: true,
      data: { review: data?.review, rating: data?.rating },
    });

    thankApi.dispatch(fetchReview(data?.id));
    return res;
  }
);
