export const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { x: 200, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  },
  AnimateWithHover: {
    scale: 1.1,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 500, duration: 0.3 },
  },
};
