import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormLayout from "./SignPageLayout/FormLayout";
import PasswordInputGroup from "./SignPageLayout/PasswordInputGroup";
import SubmitButton from "./SignPageLayout/SubmitButton";
import FormError from "./SignPageLayout/FormError";
import PostFormApi from "./PostFormApi";

interface InputValueType {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const [inputValues, setInputValues] = useState<InputValueType>({
    password: "",
    confirmPassword: "",
  });

  const { resetToken } = useParams();

  const { error: userDataError, makeApiRequest } = PostFormApi({
    method: "PATCH",
    endPoint: `/resetPassword/${resetToken}`,
    navigateTo: "/signin",
  });

  const onChangInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues((preVal) => ({
      ...preVal,
      [id]: value,
    }));
  };

  const submitResetPasswordHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await makeApiRequest(inputValues);
  };

  return (
    <FormLayout
      heading={"Reset Password"}
      onSubmitHandler={submitResetPasswordHandler}
      userDataError={userDataError}
    >
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

      <SubmitButton btntext="Submit" />

      <p className="text-center my-4">
        Already have Account ? <Link to={"/signin"}>Sign in </Link>
      </p>

      <FormError FormError={userDataError} />
    </FormLayout>
  );
};

export default ResetPassword;
