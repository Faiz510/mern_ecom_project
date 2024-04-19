import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

interface PasswordInputGroupType {
  value: string;
  onChangInputHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValues: string;
}

const PasswordInputGroup: React.FC<PasswordInputGroupType> = ({
  value,
  onChangInputHandler,
  inputValues,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="mb-4">
      <label
        htmlFor={`${value}`}
        className="block text-sm font-medium text-gray-700 capitalize"
      >
        {value}
      </label>
      <div className="relative">
        <input
          type={`${!showPassword ? "password" : "text"}`}
          id={`${value}`}
          name={`${value}`}
          className="mt-1 p-2 w-full border rounded-md"
          placeholder="enter your Password "
          required
          value={inputValues}
          onChange={onChangInputHandler}
        />
        <span
          className="absolute right-2 top-3 bg-custom-primary cursor-pointer text-2xl"
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? <FaEye /> : <FaEyeSlash />}
        </span>
      </div>
    </div>
  );
};

export default PasswordInputGroup;
