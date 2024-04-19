import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputGroup from "./SignPageLayout/InputGroup";
import PasswordInputGroup from "./SignPageLayout/PasswordInputGroup";
import FormLayout from "./SignPageLayout/FormLayout";
import SubmitButton from "./SignPageLayout/SubmitButton";
import FormError from "./SignPageLayout/FormError";
import PostFormApi from "./PostFormApi";

interface FormInputTypes {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [inputValues, setInputValues] = useState<FormInputTypes>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues((preValue) => ({
      ...preValue,
      [id]: value,
    }));
  };

  const { error, makeApiRequest } = PostFormApi({
    method: "POST",
    endPoint: "/signup",
    navigateTo: "/signin",
  });

  const submitRegisterHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await makeApiRequest(inputValues);
  };

  return (
    <FormLayout
      heading={"Register"}
      onSubmitHandler={submitRegisterHandler}
      userDataError={error}
    >
      {/* username  */}
      <InputGroup
        value={"username"}
        onChangInputHandler={onChangInputHandler}
        inputValues={inputValues?.username}
      />
      {/* email  */}
      <InputGroup
        value={"email"}
        onChangInputHandler={onChangInputHandler}
        inputValues={inputValues?.email}
      />
      {/* password  */}
      <PasswordInputGroup
        value="password"
        onChangInputHandler={onChangInputHandler}
        inputValues={inputValues?.password}
      />
      {/* confirmPassword  */}
      <PasswordInputGroup
        value="confirmPassword"
        onChangInputHandler={onChangInputHandler}
        inputValues={inputValues?.confirmPassword}
      />

      <SubmitButton btntext="Register" />

      <p className="text-center my-4">
        Already have Account ? <Link to={"/signin"}>Sign in </Link>
      </p>

      <FormError FormError={error} />
    </FormLayout>
  );
};

export default Register;
