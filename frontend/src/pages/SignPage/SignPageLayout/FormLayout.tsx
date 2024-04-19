import { motion } from "framer-motion";
import React, { PropsWithChildren } from "react";

interface FormLoyoutProps {
  children: PropsWithChildren<any>;
  heading: string;
  onSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  userDataError: string;
}

const FormLayout: React.FC<FormLoyoutProps> = ({
  children,
  heading,
  onSubmitHandler,
  userDataError,
}) => {
  const animateVal = {
    x: [0, 5, -5, 5, 0],
    y: [0, -5, 5, -5, 0],
    transition: { stiffness: 500, type: "tween", duration: 0.2, repeat: 1 },
  };

  return (
    <div className="flex justify-center items-center py-4 opacity-85 w-full">
      <motion.form
        className="w-[60vw] md:w-[50vw] bg-custom-primary px-6 py-4 lg:w-[40vw] mx-auto my-10 rounded-lg shadow-md"
        onSubmit={onSubmitHandler}
        key={userDataError}
        animate={userDataError ? animateVal : {}}
        initial={{}}
      >
        <h3 className="text-4xl font-semibold mb-4 tracking-wider text-center">
          {heading}
        </h3>

        {children}
      </motion.form>
    </div>
  );
};

export default FormLayout;
