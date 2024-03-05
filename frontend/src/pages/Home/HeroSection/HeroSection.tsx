import { motion, useTransform, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import "./HeroSection.css";
import AngleBtns from "./AngleBtns.tsx";
import { ANIMATION_VARIANTS } from "./Animate.tsx";
import { Link } from "react-router-dom";

const HeroArr = [
  {
    id: 1,
    title: "heading 1",
    subtitle: "Subtiltle no 1",
    description: "this is description no 1",
    img: "https://images.pexels.com/photos/305821/pexels-photo-305821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    title: "heading 2",
    subtitle: "Subtiltle no 2",
    description: "this is description no 2",
    img: "https://images.pexels.com/photos/322338/pexels-photo-322338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const HeroSection = () => {
  const [indNum, setIndNum] = useState<number>(0);
  const [angleBtnval, setAngleBtnVal] = useState<string>("");

  // fomer motion animation on scroll
  const { scrollY } = useScroll();
  const scrollOp = useTransform(scrollY, [0, 200, 400, 500], [1, 0.5, 0.3, 0]);
  const scrollScale = useTransform(
    scrollY,
    [0, 200, 400, 500],
    [1, 1.2, 1.3, 1.4]
  );
  const scrollLeft = useTransform(scrollY, [0, 200, 400], [0, 150, 200]);
  const scrollTop = useTransform(scrollY, [0, 200, 300], [0, 30, 60]);

  useEffect(() => {
    // onclick left and right btn logic
    if (angleBtnval === "left") {
      setIndNum((prev) => (prev === 0 ? HeroArr.length - 1 : prev - 1));
      setAngleBtnVal("");
    } else if (angleBtnval === "right") {
      setIndNum((prev) => (prev === HeroArr.length - 1 ? 0 : prev + 1));
      setAngleBtnVal("");
    }

    // click change slide after sec
    const intervalId = setInterval(() => {
      setIndNum((prev) => (prev >= HeroArr.length - 1 ? 0 : prev + 1));
      setAngleBtnVal("");
    }, 5000);
    return () => clearInterval(intervalId);
  }, [angleBtnval]);

  return (
    <motion.section
      className={`flex-cl h-[88vh] bg-cover bg-left-bottom  opacity-90 overflow-hidden transition-all duration-1000`}
      style={{
        backgroundImage: `url(${HeroArr[indNum].img})`,
        opacity: scrollOp,
      }}
    >
      <motion.ul
        className="w-[75vw] mx-auto flex flex-col gap-5 text-black tracking-wider"
        variants={ANIMATION_VARIANTS.container}
        style={{
          scale: scrollScale,
          translateX: scrollLeft,
          translateY: scrollTop,
        }}
        initial="hidden"
        animate="visible"
        key={`${HeroArr[indNum].id}`}
      >
        <motion.li
          className="text-4xl md:text-6xl font-[500] "
          variants={ANIMATION_VARIANTS.item}
        >
          {HeroArr[indNum].subtitle}
        </motion.li>
        <motion.li
          className="text-6xl md:text-8xl font-[700]"
          variants={ANIMATION_VARIANTS.item}
        >
          {HeroArr[indNum].title}
        </motion.li>
        <motion.li
          className="text-[1.2rem] md:text-2xl  font-[400]"
          variants={ANIMATION_VARIANTS.item}
        >
          {HeroArr[indNum].description}
        </motion.li>

        <div>
          <motion.div
            whileHover={ANIMATION_VARIANTS.AnimateWithHover}
            className="w-[7.5rem] text-center"
          >
            <Link to={"/products"} className="btn-cl">
              Shop Now
            </Link>
          </motion.div>
        </div>
      </motion.ul>
      <AngleBtns setAngle={setAngleBtnVal} />
    </motion.section>
  );
};

export default HeroSection;
