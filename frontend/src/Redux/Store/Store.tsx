import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Slice/AuthSlice/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import CartSlice from "../Slice/CartSlice/cartSlice";
import WishlistSlice from "../Slice/WishlistSlice/WishlistSlice";
import ReviewSlice from "../Slice/ReviewSlice/ReviewSlice";
import Reviews from "../../components/ProductPage/ProductPageContent/BottomSection/Reviews/Reviews";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["cart", "wishlist"],
};

const reducer = combineReducers({
  auth: AuthSlice,
  cart: CartSlice,
  wishlist: WishlistSlice,
  reviews: ReviewSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  // reducer: {
  //   auth: AuthSlice,
  //   cart: CartSlice,
  // },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
