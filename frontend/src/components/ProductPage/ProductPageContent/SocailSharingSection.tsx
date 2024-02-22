import React from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaInstagramSquare,
} from "react-icons/fa";

const SocailSharingSection = () => {
  return (
    <div className="flex justify-start items-center gap-6">
      <span className="text-[1.2rem] font-thin">Share</span>
      <div className="sharing-icons flex justify-center items-start gap-2 ">
        <span>
          <FaFacebookSquare />
        </span>
        <span>
          <FaLinkedin />
        </span>
        <span>
          <FaInstagramSquare />
        </span>
        <span>
          <FaTwitterSquare />
        </span>
      </div>
    </div>
  );
};

export default SocailSharingSection;
