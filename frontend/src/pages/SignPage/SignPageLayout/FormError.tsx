import React from "react";

interface FormErrorProps {
  FormError: any;
}

const FormError: React.FC<FormErrorProps> = ({ FormError }) => {
  return (
    FormError && (
      <p className="text-red-500 font-light mx-auto my-2">{FormError}</p>
    )
  );
};

export default FormError;
