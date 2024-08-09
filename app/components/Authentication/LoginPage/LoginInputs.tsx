"use client";

import React, { useEffect, useRef, useState } from "react";
import AuthInput from "../AuthInput";
import CheckboxComp from "../CheckboxComp";
import Link from "next/link";
import ButtonComp from "../ButtonComp";

type Props = {
  setUserEmail: any;
  userEmail: any;
  setIsResetScreenVisible: any;
};

const LoginInputs = ({
  setUserEmail,
  userEmail,
  setIsResetScreenVisible,
}: Props) => {
  const [isKeepLoggedInChecked, setIsKeepLoggedInChecked] = useState(false);

  const childRef = useRef<{ focus: () => void }>(null);

  useEffect(() => {
    if (childRef.current) {
      childRef.current.focus();
    }
  }, [childRef]);
  return (
    <div className="max-w-[311px] w-full flex flex-col items-start mb-6 mt-3">
      <h1 className="font-bold text-2xl text-white mb-6">Log in</h1>

      <AuthInput
        ref={childRef}
        extraContainerClasses="mb-6"
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
        value={userEmail}
        inputFor="email"
        type="text"
      />
      <AuthInput
        extraContainerClasses="mb-6"
        onChange={(e) => {}}
        inputFor="password"
        type="password"
      />
      <div className="w-full flex justify-end">
        <button
          onClick={() => {
            setIsResetScreenVisible(true);
          }}
          type="button"
          className="text-blue1 text-sm"
        >
          Forgot password?
        </button>
      </div>
      <button
        type="button"
        className="w-full flex justify-start items-center mt-6"
        onClick={() => setIsKeepLoggedInChecked((prev) => !prev)}
      >
        <CheckboxComp checked={isKeepLoggedInChecked} />
        <p className="text-grey1 text-sm ml-3">Keep me logged in</p>
      </button>
      <ButtonComp
        extraButtonClasses="w-full text-white mt-6 !text-sm py-3 !font-normal"
        title="Log in"
      />
      <div className="max-w-[311px] w-full border border-dark3 mt-6 rounded-full" />
      <div className="max-w-[311px] w-full flex items-center justify-between mt-6 mb-6">
        <div className="text-sm text-grey1">Don’t have an account? </div>
        <Link
          href={"/en/auth/sign-up"}
          type="button"
          className="text-sm text-blue1"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default LoginInputs;
