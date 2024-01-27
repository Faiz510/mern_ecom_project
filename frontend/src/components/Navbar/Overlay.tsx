import React from "react";

interface OverlayProps {
  onClick: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClick }) => {
  return (
    <div
      className="bg-black/20 absolute z-10 h-[100vh] w-full top-0 left-0 overflow-hidden"
      onClick={onClick}
    />
  );
};

export default Overlay;
