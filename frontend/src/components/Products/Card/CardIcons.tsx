import React from "react";
import { FaHeart, FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";
import { motion } from "framer-motion";

const animateIconOnHover = {
  scale: 1.2,
  transition: { duration: 0.3, stiffness: 500, type: "spring" },
};

const CardIcons = () => {
  return (
    <React.Fragment>
      <motion.div className="absolute z-50 bottom-[-50px] justify-between w-full items-center px-5 bg-custom-primary py-3 hidden group-hover:flex transition-all group-hover:bottom-0 duration-500">
        <motion.span whileHover={animateIconOnHover}>
          <FaHeart className="card-icon" />
        </motion.span>
        <motion.span whileHover={animateIconOnHover}>
          <FaCartShopping className="card-icon" />
        </motion.span>
      </motion.div>

      <motion.span
        className="hidden items-center justify-center absolute w-full top-36  group-hover:z-30 group-hover:flex "
        whileHover={animateIconOnHover}
      >
        <FaMagnifyingGlass className="card-icon" />
      </motion.span>
    </React.Fragment>
  );
};

export default CardIcons;
