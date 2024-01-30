import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./HeroSection.css";
import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "./Animate";

interface AngleBtnProps {
  setAngle: (val: string) => void;
}

const AngleBtns: React.FC<AngleBtnProps> = ({ setAngle }) => {
  const onAngleHandler = (angle: string) => setAngle(angle);
  return (
    <div className="absolute md:flex justify-between w-[90%] hidden">
      <motion.span
        className="angle-btn-cl"
        onClick={() => onAngleHandler("left")}
        whileHover={ANIMATION_VARIANTS.AnimateWithHover}
      >
        <FaAngleLeft />
      </motion.span>
      <motion.span
        className="angle-btn-cl"
        onClick={() => onAngleHandler("right")}
        whileHover={ANIMATION_VARIANTS.AnimateWithHover}
      >
        <FaAngleRight />
      </motion.span>
    </div>
  );
};

export default AngleBtns;
