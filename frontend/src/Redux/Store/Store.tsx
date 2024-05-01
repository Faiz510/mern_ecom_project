import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../Slice/AuthSlice/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import CartSlice from "../Slice/CartSlice/cartSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["cart"],
};

const reducer = combineReducers({
  auth: AuthSlice,
  cart: CartSlice,
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
