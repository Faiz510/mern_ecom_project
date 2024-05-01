import { createAsyncThunk } from "@reduxjs/toolkit";
import { sliceApiHandler } from "../SliceApi";

interface updateQuantityPayload {
  id: string;
  quantity: number;
}

export const fetchCartItem = createAsyncThunk("cart/fetchitems", async () => {
  return sliceApiHandler({
    method: "GET",
    url: `${import.meta.env.VITE_BASE_URL}/api/v1/cart`,
    withCredentials: true,
  });
});

export const addCartItem = createAsyncThunk(
  "cart/addItem",
  async (cartData: {}, thunkAPI) => {
    const res = await sliceApiHandler({
      method: "POST",
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/cart`,
      withCredentials: true,
      data: cartData,
    });

    thunkAPI.dispatch(fetchCartItem());
    return res;
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeItem",
  async (id: string, thunkAPI) => {
    const res = await sliceApiHandler({
      method: "PATCH",
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/cart/${id}`,
      withCredentials: true,
    });
    thunkAPI.dispatch(fetchCartItem());
    return res;
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ id, quantity }: updateQuantityPayload, thunkAPI) => {
    const res = await sliceApiHandler({
      method: "PATCH",
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/cart/updateQuantity/${id}`,
      withCredentials: true,
      data: { quantity },
    });

    thunkAPI.dispatch(fetchCartItem());
    return res;
  }
);

export const clearCart = createAsyncThunk(
  "cart/clearItem",
  async (_, thunkAPI) => {
    const res = await sliceApiHandler({
      method: "POST",
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/cart/clearAll`,
      withCredentials: true,
    });
    thunkAPI.dispatch(fetchCartItem());
    return res;
  }
);
