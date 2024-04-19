import React from "react";

interface SubmitButtonProps {
  btntext: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ btntext }) => {
  return (
    <button
      type="submit"
      className="w-full bg-white py-2 rounded-lg text-black font-normal shadow-lg"
    >
      {btntext}
    </button>
  );
};

export default SubmitButton;
