import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitRegisterHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = { fullName, email, password };
    // console.log(formData);

    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex justify-center items-center py-4 opacity-85 w-full ">
      <form
        className="w-[60vw] md:w-[50vw] bg-custom-primary px-6 py-4 lg:w-[40vw] mx-auto my-10 rounded-lg shadow-md"
        onSubmit={submitRegisterHandler}
      >
        <h3 className="text-4xl font-semibold mb-4 tracking-wider text-center">
          Register
        </h3>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your Full name"
            required
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <div className="relative">
            <input
              type={`${!showPassword ? "password" : "text"}`}
              id="password"
              name="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="enter  Password "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-2 top-3 bg-custom-primary cursor-pointer text-2xl"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-white py-2 rounded-lg text-black font-normal shadow-lg "
        >
          Register
        </button>

        <p className="text-center my-4">
          Already have Account ? <Link to={"/signin"}>Sign in </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
