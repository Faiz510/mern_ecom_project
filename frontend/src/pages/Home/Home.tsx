import HeroSection from "./HeroSection/HeroSection";
import AllProducts from "./AllProducts/AllProducts";
import TrustSection from "./trustSection/TrustSection";
import Testimonials from "./Testimonials/Testimonials";
import TopProducts from "./TopProducts/TopProducts";

const Home = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <AllProducts />
      <Testimonials />
      <TopProducts />
      <TrustSection />
    </main>
  );
};

export default Home;
