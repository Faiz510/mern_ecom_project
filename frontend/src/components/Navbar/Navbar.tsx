import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LogoImg from "../../assests/logo.png";
import {
  FaMagnifyingGlass,
  FaLock,
  FaCartShopping,
  FaBars,
  FaXmark,
  FaAngleUp,
  FaRegHeart,
} from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import "./Navbar.css";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Overlay from "../Overlay";
import NavCategoriesBtn from "./NavCategoriesBtn";
import Cart from "./Cart";
import { clearState, logoutUser } from "../../Redux/Slice/AuthSlice/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchCartItem } from "../../Redux/Slice/CartSlice/CartSliceApi";
const Navbar = () => {
  const [showNavCat, setShowNavCat] = useState<boolean>(false);
  // On Mobile
  const [showNav, setShowNav] = useState<boolean>(false);
  const isSmallDevice = useMediaQuery({ maxWidth: 768 });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const curUser = useAppSelector((state) => state.auth.currentUser);
  // const curUser = useAppSelector(currentUser);
  const cartItems = useAppSelector((state) => state.cart.cart.cart);

  const quantites = cartItems?.totalQuantity;

  const onLogoutHandler = () => {
    dispatch(logoutUser());
    dispatch(clearState());
    navigate("/");
  };

  useEffect(() => {
    if (curUser) {
      dispatch(fetchCartItem());
    }
  }, [dispatch, curUser, quantites]);

  const onShowNavHandler = (): void =>
    setShowNav((prevShowNav) => !prevShowNav);

  useEffect(() => {
    if (!isSmallDevice) setShowNav(false);
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

  const onClicCartIcon = () => {
    if (!curUser) {
      navigate("/signin");
    }
  };

  ///////////////////////////////

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
              {curUser && (
                <li className="text-black">
                  <Link to={"/wishlist"}>
                    <FaRegHeart />
                  </Link>
                </li>
              )}

              <li className="">
                <Link to={"/search"}>
                  <FaMagnifyingGlass />
                </Link>
              </li>

              <li className="group">
                <span
                  className="group-hover:text-custom-secondary flex"
                  onClick={onClicCartIcon}
                >
                  <FaCartShopping />{" "}
                  {quantites !== 0 && cartItems && curUser && (
                    <span className="absolute bg-custom-secondary rounded-full w-4 h-4 flex items-center justify-center top-6 ml-[-8px]  text-white font-semibold opacity-95 ">
                      {quantites}
                    </span>
                  )}
                </span>

                {curUser && <Cart cartItems={cartItems} />}
              </li>

              <li>
                {!curUser ? (
                  <Link to={"/signin"}>
                    <FaLock />
                  </Link>
                ) : (
                  <a onClick={onLogoutHandler}>
                    <FaSignOutAlt />
                  </a>
                )}
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
