import { createAsyncThunk } from "@reduxjs/toolkit";
import { sliceApiHandler } from "../SliceApi";

export const fetchWishlistItem = createAsyncThunk(
  "wishlist/fetchitems",
  async () => {
    return sliceApiHandler({
      method: "GET",
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/wishlist`,
      withCredentials: true,
    });
  }
);

export const addWishlistItem = createAsyncThunk(
  "wishlist/addItem",
  async (product: any, thankApi) => {
    const res = await sliceApiHandler({
      method: "POST",
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/wishlist`,
      withCredentials: true,
      data: product,
    });

    thankApi.dispatch(fetchWishlistItem());
    return res;
  }
);

export const removeWishlistItem = createAsyncThunk(
  "wishlist/removeItem",
  async (id: string, thankApi) => {
    const res = await sliceApiHandler({
      method: "PATCH",
      url: `${import.meta.env.VITE_BASE_URL}/api/v1/wishlist/removeItem/${id}`,
      withCredentials: true,
    });

    thankApi.dispatch(fetchWishlistItem());
    return res;
  }
);
