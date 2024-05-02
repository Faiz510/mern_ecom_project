import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { addWishlistItem, fetchWishlistItem } from "./wishlistSliceApi";
import { RootState } from "../../Store/Store";

const initialState = {
  status: "idle",
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchWishlistItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlistItem.fulfilled, (state, action) => {
        state.status = "idle";
        state.wishlist = action.payload;
      })
      .addCase(fetchWishlistItem.rejected, (state) => {
        state.status = "error";
      })
      .addCase(addWishlistItem.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export default wishlistSlice.reducer;
