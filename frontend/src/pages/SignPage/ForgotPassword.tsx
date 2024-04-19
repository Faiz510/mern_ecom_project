import React, { useState } from "react";
import FormLayout from "./SignPageLayout/FormLayout";
import InputGroup from "./SignPageLayout/InputGroup";
import SubmitButton from "./SignPageLayout/SubmitButton";
import FormError from "./SignPageLayout/FormError";
import PostFormApi from "./PostFormApi";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [sucessMsg, setSucessMsg] = useState<string>("");

  const {
    loading,
    error: userDataError,
    makeApiRequest,
  } = PostFormApi({
    method: "POST",
    endPoint: "/forgotPassword",
    navigateTo: "",
  });

  const submitForgotPasswordHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const res = await makeApiRequest({ email });

    if (res.status === "sucess") {
      setSucessMsg(res.message);
    } else {
      setSucessMsg("");
    }
  };

  return (
    <FormLayout
      heading={"Forgot Password"}
      onSubmitHandler={submitForgotPasswordHandler}
      userDataError={userDataError}
    >
      {/* email  */}
      <InputGroup
        value={"email"}
        onChangInputHandler={(e) => setEmail(e.target.value)}
        inputValues={email}
      />

      <SubmitButton btntext="Submit" />

      <FormError FormError={userDataError} />

      {!loading && sucessMsg && (
        <p className="text-custom-secondary font-light mx-auto my-2">
          {sucessMsg}
        </p>
      )}
    </FormLayout>
  );
};

export default ForgotPassword;
