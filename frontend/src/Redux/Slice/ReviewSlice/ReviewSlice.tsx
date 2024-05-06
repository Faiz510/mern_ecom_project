import { createSlice } from "@reduxjs/toolkit";
import { createReview, fetchReview } from "./ReviewSliceApi";

const initialState = {
  reviews: [],
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
