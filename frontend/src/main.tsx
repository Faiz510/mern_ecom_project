import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "./pages/Layouts/MainLayout";
import Home from "./pages/Home/Home";
import ProductPage from "./components/ProductPage/ProductPage";
import { store } from "./Redux/Store/Store";
import { Provider } from "react-redux";
import ShopPage from "./pages/Shop/ShopPage";
import AboutPage from "./pages/About/AboutPage";
import ContactPage from "./pages/Contact/ContactPage";
import Register from "./pages/SignPage/Register";
import SignIn from "./pages/SignPage/SignIn";
import ForgotPassword from "./pages/SignPage/ForgotPassword";
import ResetPassword from "./pages/SignPage/ResetPassword";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import CartCheckoutPage from "./pages/checkout/CartCheckoutPage";
import Checkout from "./pages/checkout/Checkout";
import ProtectLayout from "./components/ProtectedLayout/ProtectLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="products" element={<ShopPage />} />
      <Route path="register" element={<Register />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="forgotPassword" element={<ForgotPassword />} />
      <Route path="resetPassword/:resetToken" element={<ResetPassword />} />
      <Route path="products/:id" element={<ProductPage />} />
      {/* protected route  */}
      <Route element={<ProtectLayout />}>
        <Route path="cart" element={<CartCheckoutPage />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Route>
  )
);

function Root() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
