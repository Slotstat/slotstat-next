import React, { useEffect, useRef } from "react";
import AuthInput from "../AuthInput";
import ButtonComp from "../ButtonComp";
import Link from "next/link";
import { ArrowBackIcon } from "../Svgs";

type Props = {
  returnToLogin: () => void;
  userEmail: string;
  setUserEmail: (val: string) => void;
};

const ResetPasswordEmailInput = ({
  returnToLogin,
  userEmail,
  setUserEmail,
}: Props) => {
  const childRef = useRef<{ focus: () => void }>(null);

  useEffect(() => {
    if (childRef.current) {
      childRef.current.focus();
    }
  }, [childRef]);
  return (
    <div className="max-w-[311px] w-full flex flex-col items-start mb-6 mt-3">
      <h1 className="font-bold text-2xl text-white">Reset your password</h1>
      <p className="font-normal text-sm mt-3 mb-6 text-grey1">
        Enter your email address and we will send you instructions to reset your
        password.
      </p>
      <AuthInput
        extraContainerClasses="mb-6"
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
        inputFor="email"
        type="text"
        value={userEmail}
        ref={childRef}
      />
      <ButtonComp
        extraButtonClasses="w-full text-white text-sm font-bold"
        title="Reset password"
      />
      <div className="max-w-[311px] w-full border border-dark3 mt-6 rounded-full" />
      <div className="max-w-[311px] w-full flex items-center justify-start mt-5 mb-6 text-white">
        <div>
          <ArrowBackIcon />
        </div>
        <button type="button" onClick={returnToLogin} className="text-sm ml-2">
          Back to login
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordEmailInput;
