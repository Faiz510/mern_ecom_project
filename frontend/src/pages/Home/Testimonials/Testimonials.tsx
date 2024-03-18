import React, { useState } from "react";
import bgImg from "../../../assests/img-bg-1.jpg";
import profileImg1 from "../../../assests/profile-img-1.jpg";
import profileImg2 from "../../../assests/profile-img-2.jpg";
import profileImg3 from "../../../assests/profile-img-3.jpg";
import { FaQuoteLeft } from "react-icons/fa6";
import { motion } from "framer-motion";

const testimonialsData = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget suscipit urna.",
    userProfileImg: `${profileImg1}`,
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Manager",
    review:
      "Vivamus maximus ex sed elit tempor, sit amet pretium ante efficitur.",
    userProfileImg: `${profileImg2}`,
  },
  {
    id: 3,
    name: "Michael Johnson",
    role: "Developer",
    review: "Fusce eu sapien in justo gravida sagittis.",
    userProfileImg: `${profileImg3}`,
  },
];

const Testimonials = () => {
  const [testNum, setTestNum] = useState<number>(0); // testimonial num

  return (
    <section
      style={{ backgroundImage: `url(${bgImg})` }}
      className="h-[400px] bg-cover bg-center my-20 flex justify-center items-center relative flex-col w-full "
    >
      <div className="z-30 w-[1000px] overflow-hidden">
        <div
          className={`px-8 z-30 text-center text-white flex items-center w-[3000px] `}
        >
          {testimonialsData?.map((testi) => (
            <motion.div
              className="w-[1000px]"
              animate={{ x: -1000 * testNum, transition: { duration: 0.4 } }}
              key={testi.id}
            >
              <img
                src={testi.userProfileImg}
                alt="profile picture"
                className="h-20 w-20 rounded-full object-cover mx-auto border border-white"
              />

              <p className="text-2xl font-light tracking-wide my-4 w-[400px] mx-auto">
                {testi.review}
              </p>

              <div className="flex justify-center items-center gap-2 my-4">
                <div className="text-custom-secondary/80 text-5xl">
                  <FaQuoteLeft />
                </div>
                <div className="flex flex-col">
                  <span>{testi.name}</span>
                  <span className="text-custom-primary/80">{testi.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="bg-black/30 h-full w-full absolute z-10"></div>
      <div className="flex gap-2 z-30">
        {testimonialsData?.map((btn, i) => (
          <span
            key={btn.id}
            className={`w-3 h-3 rounded-full cursor-pointer mt-10 ${
              i === testNum ? "bg-custom-secondary" : "bg-white"
            }`}
            onClick={() => setTestNum(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
