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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="products" element={<ShopPage />} />
      <Route path="products/:id" element={<ProductPage />} />
    </Route>
  )
);

function Root() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
