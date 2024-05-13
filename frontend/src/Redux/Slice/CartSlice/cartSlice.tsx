import { createSlice } from "@reduxjs/toolkit";
import { fetchCartItem, addCartItem, removeCartItem } from "./CartSliceApi";
import { CartApiResponse } from "../../../components/Types";

interface CartState {
  cart: CartApiResponse | null;
  status: "idle" | "loading" | "error";
}

const initialState: CartState = {
  cart: null,
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
