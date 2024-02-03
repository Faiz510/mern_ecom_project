import { motion } from "framer-motion";

const CardBgOverlay = () => {
  return (
    <motion.div className="absolute top-0 left-0 w-full h-full  group-hover:z-10 group-hover:bg-custom-primary/50 shadow-lg  group-hover:opacity-100 group-hover:duration-300 transition-all" />
  );
};

export default CardBgOverlay;
