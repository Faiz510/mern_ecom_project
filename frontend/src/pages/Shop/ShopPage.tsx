import { useState } from "react";
import ShopPageProducts from "./ShopPageProducts.tsx";
import ShopTopFilters from "./Filters/ShopTopFilters.tsx";
import ShopMainFilter from "./Filters/ShopMainFilter.tsx";

const ShopPage = () => {
  const [productsView, setProductsView] = useState<string>("grid"); // Default product grid view option

  // set product view handler
  const productViewHandler = (val: string) => {
    setProductsView(val);
    return val;
  };

  return (
    <section className="flex gap-2  justify-start px-4 py-20">
      {/* Aside filter  */}
      <ShopMainFilter />

      <main className="w-full">
        {/* top filters section */}
        <ShopTopFilters
          productViewHandler={productViewHandler}
          productView={productsView}
        />

        {/* Product displaying section  */}
        <ShopPageProducts productView={productsView} />
      </main>
    </section>
  );
};

export default ShopPage;
