import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormLayout from "./SignPageLayout/FormLayout";
import InputGroup from "./SignPageLayout/InputGroup";
import PasswordInputGroup from "./SignPageLayout/PasswordInputGroup";
import SubmitButton from "./SignPageLayout/SubmitButton";
import FormError from "./SignPageLayout/FormError";
import PostFormApi from "./PostFormApi";
import { setUser } from "../../Redux/Slice/AuthSlice";
import { useDispatch } from "react-redux";

interface InputValueType {
  email: string;
  password: string;
}

const SignIn = () => {
  const [inputValues, setInputValues] = useState<InputValueType>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const onChangInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputValues((preVal) => ({
      ...preVal,
      [id]: value,
    }));
  };

  const { error: userDataError, makeApiRequest } = PostFormApi({
    method: "POST",
    endPoint: "/login",
    navigateTo: "/",
  });

  const submitSiginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await makeApiRequest(inputValues);

    if (res) {
      dispatch(setUser(res));
    }
  };
  return (
    <FormLayout
      heading={"Login"}
      onSubmitHandler={submitSiginHandler}
      userDataError={userDataError}
    >
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

      <SubmitButton btntext="Sigin in " />

      <p className="text-center my-4 flex justify-between">
        <span>
          {" "}
          No Account ? <Link to={"/register"}>Create One </Link>{" "}
        </span>
        <Link to={`/forgotPassword`}>forgotPassword ?</Link>
      </p>

      <FormError FormError={userDataError} />
    </FormLayout>
  );
};

export default SignIn;
