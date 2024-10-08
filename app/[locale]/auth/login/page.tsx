"use client";
import React, { useEffect, useRef, useState } from "react";
import LoginInputs from "@/app/components/Authentication/LoginPage/LoginInputs";
import ResetPasswordEmailInput from "@/app/components/Authentication/LoginPage/ResetPasswordEmailInput";

const Login = () => {
  const [isResetScreenVisible, setIsResetScreenVisible] = useState(false);
  const returnToLogin = () => {
    setIsResetScreenVisible(false);
  };

  return (
    <div className="flex flex-col items-center min-h-[700px]">
      {isResetScreenVisible ? (
        <ResetPasswordEmailInput
          returnToLogin={returnToLogin}

        />
      ) : (
        <LoginInputs setIsResetScreenVisible={setIsResetScreenVisible} />
      )}
    </div>
  );
};

export default Login;
