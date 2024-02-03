import React from "react";
import HeroSection from "../components/HeroSection/HeroSection.tsx";
import Products from "../components/Products/Products.tsx";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Products />
      <div className="bg-white h-[500px]"> Spacer</div>
    </>
  );
};

export default Home;
