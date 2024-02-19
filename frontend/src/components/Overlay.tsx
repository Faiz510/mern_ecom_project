import React, { useEffect } from "react";

interface OverlayProps {
  onClick: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  return (
    <div
      className="bg-black/40 fixed z-10 h-[100vh] w-full top-0 left-0 overflow-hidden overflow-y-hidden"
      onClick={onClick}
    />
  );
};

export default Overlay;
