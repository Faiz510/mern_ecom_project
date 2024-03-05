import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SmoothScrollTopProps {
  params: string;
}

const SmoothScrollTop: React.FC<SmoothScrollTopProps> = ({ params }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.body.classList.add("smooth-scroll");

    // Scroll to the top
    window.scrollTo(0, 0);

    const handleScroll = () => {
      document.body.classList.remove("smooth-scroll");
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname, params]);

  return null;
};

export default SmoothScrollTop;
