import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchCartItem, addCartItem, removeCartItem } from "./CartSliceApi";
import { RootState } from "../../Store/Store";

const initialState = {
  cart: {},
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCartItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartItem.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload;
      })
      .addCase(fetchCartItem.rejected, (state) => {
        state.status = "error";
      })
      .addCase(addCartItem.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(removeCartItem.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(removeCartItem.rejected, (state) => {
        state.status = "error";
      });
  },
});


export default cartSlice.reducer;
