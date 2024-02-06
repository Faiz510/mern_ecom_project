import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar.tsx";
import Footer from "../../components/Footer/Footer.tsx";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
