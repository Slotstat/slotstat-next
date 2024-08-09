"use client";
import React, { useEffect, useRef, useState } from "react";
import AuthInput from "../AuthInput";
import CheckboxComp from "../CheckboxComp";
import ButtonComp from "../ButtonComp";
import Link from "next/link";
import ResetPasswordEmailInput from "./ResetPasswordEmailInput";
import LoginInputs from "./LoginInputs";

type Props = {};

const LoginPage = (props: Props) => {
  const [isResetScreenVisible, setIsResetScreenVisible] = useState(false);
  const [userEmail, setUserEmail] = useState<any>();
  const returnToLogin = () => {
    setIsResetScreenVisible(false);
  };

  return (
    <div className="flex flex-col items-center min-h-[700px]">
      {isResetScreenVisible ? (
        <ResetPasswordEmailInput
          returnToLogin={returnToLogin}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
      ) : (
        <LoginInputs
          setIsResetScreenVisible={setIsResetScreenVisible}
          setUserEmail={setUserEmail}
          userEmail={userEmail}
        />
      )}
    </div>
  );
};

export default LoginPage;
