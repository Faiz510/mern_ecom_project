import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoImg from "../../assests/logo.png";
import {
  FaMagnifyingGlass,
  FaLock,
  FaCartShopping,
  FaBars,
  FaXmark,
} from "react-icons/fa6";
import "./Navbar.css";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import Overlay from "./Overlay";

const Navbar = () => {
  const [showNav, setShowNav] = useState<boolean>(false);
  const isSmallDevice = useMediaQuery({ maxWidth: 768 });

  const onShowNavHandler = (): void =>
    setShowNav((prevShowNav) => !prevShowNav);

  const ANIMATION_VARIANTS = {
    HoverIcon: {
      rotate: -90,
      transition: { duration: 0.1 },
      scale: 1.1,
    },

    NavOnMobile: {
      left: 0,
      opacity: 1,
      top: 75,
      transition: { duration: 0.2 },
    },
    initailNavOnMobile: { opacity: 0, left: -100 },
  };

  useEffect(() => {
    if (!isSmallDevice) setShowNav(false);
  }, [showNav, isSmallDevice]);

  return (
    <React.Fragment>
      <header className="flex justify-between items-center px-8 bg-custom-primary z-50 relative">
        {/* logo  */}
        <NavLink to={"/"} aria-label="home">
          <img src={LogoImg} className="w-24 " alt="logo" />
        </NavLink>

        <nav>
          <div className="md:flex gap-6 items-center">
            {/* nav links  */}
            <motion.ul
              className={`nav-lg-screen-cl nav-link-hover ${
                isSmallDevice ? "hidden" : ""
              } ${showNav ? "nav-mobile-cl" : ""}`}
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
                <NavLink to="/"> Home </NavLink>
              </li>
              <li>
                <NavLink to=""> About </NavLink>
              </li>
              <li>
                <NavLink to=""> Contact Us </NavLink>
              </li>
              <li>
                <NavLink to=""> Category </NavLink>
              </li>
            </motion.ul>

            <motion.ul className="flex gap-2 navLinkHover">
              <li>
                <FaMagnifyingGlass />
              </li>
              <li>
                <FaLock />
              </li>
              <li>
                <FaCartShopping />
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
    </React.Fragment>
  );
};

export default Navbar;
