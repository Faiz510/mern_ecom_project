import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoImg from "../../assests/logo.png";
import {
  FaMagnifyingGlass,
  FaLock,
  FaCartShopping,
  FaBars,
  FaXmark,
  FaAngleUp,
  FaUserLarge,
} from "react-icons/fa6";
import "./Navbar.css";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Overlay from "../Overlay";
import NavCategoriesBtn from "./NavCategoriesBtn";
import Cart from "./Cart";
import { useFetchData } from "../../Hooks/useFetchData";
import { CartApiResponse } from "../Types";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../Redux/Slice/AuthSlice";
// import Cookies from "js-cookie";
import Cookies from "js-cookie";
import { RootState } from "../../Redux/Store/Store";

const Navbar = () => {
  const [showNavCat, setShowNavCat] = useState<boolean>(false);
  // On Mobile
  const [showNav, setShowNav] = useState<boolean>(false);
  const isSmallDevice = useMediaQuery({ maxWidth: 768 });

  const curUser = useSelector((state: RootState) => state.auth.currentUser);
  const disptach = useDispatch();

  // console.log(curUser);
  const onLogoutHandler = () => {
    Cookies.remove("jwtToken");

    disptach(logoutUser());
  };

  const onShowNavHandler = (): void =>
    setShowNav((prevShowNav) => !prevShowNav);

  useEffect(() => {
    if (!isSmallDevice) setShowNav(false);

    // console.log();
    // const token = Cookie.get("jwtToken");
    console.log(document.cookie);
  }, [showNav, isSmallDevice]);
  /////////////

  // Animation
  const ANIMATION_VARIANTS = {
    HoverIcon: {
      rotate: -90,
      transition: { duration: 0.1 },
      scale: 1.05,
    },

    NavOnMobile: {
      left: 0,
      opacity: 1,
      top: 75,
      transition: { duration: 0.2 },
    },
    initailNavOnMobile: { opacity: 0, left: -100 },
  };

  /////////////
  const showNavCatHandler = () => setShowNavCat((preShow) => !preShow);

  ///////////////////////////////
  // const { fetchProductData, productLoading } = FetchProduct("1");
  const fetchUrl = `${import.meta.env.VITE_BASE_URL}/api/v1/cart`;
  const parseData = (data: any) => data as CartApiResponse;
  const { responseData: fetchProductData, fetchLoading } =
    useFetchData<CartApiResponse>(
      fetchUrl,
      {
        cart: {
          _id: "",
          userId: "",
          products: [],
          totalAmount: 0,
          totalProducts: 0,
          totalQuantity: 0,
          id: "",
        },
      },
      parseData
    );
  return (
    <>
      <header className="flex justify-between items-center px-8 bg-custom-primary z-50 relative">
        {/* logo  */}
        <NavLink to={"/"} aria-label="home">
          <img src={LogoImg} className="w-24 " alt="logo" />
        </NavLink>

        <nav>
          <div className="md:flex gap-6 items-center pr-16">
            {/* nav links  */}
            <motion.ul
              className={`nav-lg-screen-cl nav-link-hover ${
                isSmallDevice ? "hidden" : ""
              } ${showNav ? "nav-mobile-cl overflow-y-scroll" : ""}`}
              initial={
                isSmallDevice && showNav
                  ? ANIMATION_VARIANTS.initailNavOnMobile
                  : {}
              }
              animate={
                showNav && isSmallDevice ? ANIMATION_VARIANTS.NavOnMobile : {}
              }
            >
              {/* btn close nav on mobile  */}
              <motion.li
                onClick={onShowNavHandler}
                className="absolute right-2 top-2 md:hidden"
                whileHover={ANIMATION_VARIANTS.HoverIcon}
              >
                <FaXmark />
              </motion.li>

              <li className="">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-custom-secondary scale-105" : ""
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <div className={`relative`} onClick={showNavCatHandler}>
                  <div
                    className={`flex items-center hover:text-custom-secondary hover:scale-105 ${
                      showNavCat ? "text-custom-secondary" : ""
                    }`}
                  >
                    Category
                    <motion.span
                      initial={showNavCat ? { rotate: 180 } : {}}
                      animate={{ rotate: showNavCat ? 0 : 180 }}
                    >
                      {/* {!showNavCat ? <FaAngleDown /> : <FaAngleUp />} */}
                      <FaAngleUp />
                    </motion.span>
                  </div>
                </div>

                <div className="" onClick={() => setShowNavCat(false)}>
                  {showNavCat && <NavCategoriesBtn />}
                </div>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-custom-secondary scale-105" : ""
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-custom-secondary scale-105" : ""
                  }
                >
                  Contact Us
                </NavLink>
              </li>
            </motion.ul>

            <motion.ul className="flex gap-2  nav-link-hover">
              <li className="">
                <FaMagnifyingGlass />
              </li>
              <li>
                {!curUser ? (
                  <Link to={"/signin"}>
                    <FaLock />
                  </Link>
                ) : (
                  <a onClick={onLogoutHandler}>
                    <FaUserLarge />
                  </a>
                )}
              </li>
              <li className="group">
                <span className="group-hover:text-custom-secondary">
                  <FaCartShopping />
                </span>

                <Cart
                  productLoading={fetchLoading}
                  fetchProductData={fetchProductData.cart}
                />
              </li>
            </motion.ul>
          </div>
        </nav>

        <ul className="flex navLinkHover md:hidden">
          {/* Fabar to show nav  */}
          {!showNav && (
            <motion.li
              whileHover={ANIMATION_VARIANTS.HoverIcon}
              onClick={onShowNavHandler}
            >
              <FaBars />
            </motion.li>
          )}
        </ul>
      </header>
      {/* overlay  */}
      {showNav && <Overlay onClick={onShowNavHandler} />}
    </>
  );
};

export default Navbar;
