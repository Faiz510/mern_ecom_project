import { createSlice } from "@reduxjs/toolkit";
import { createReview, fetchReview } from "./ReviewSliceApi";
import { ReviewsResponse } from "../../../components/Types";

interface reviewIntialStateType {
  reviews: ReviewsResponse | null;
  status: "idle" | "loading" | "error";
}

const initialState: reviewIntialStateType = {
  reviews: null,
  status: "idle",
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    getReveiws: (state, action) => {
      state.status = "idle";
      state.reviews = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReview.fulfilled, (state, action) => {
        state.status = "idle";
        state.reviews = action.payload;
      })
      .addCase(createReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createReview.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export const { getReveiws } = reviewSlice.actions;

export default reviewSlice.reducer;
