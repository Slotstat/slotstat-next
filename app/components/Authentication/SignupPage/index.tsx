"use client";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import AuthInput from "../AuthInput";
import CheckboxComp from "../CheckboxComp";
import ButtonComp from "../ButtonComp";
import { cookie, image18, policy } from "@/app/assets";
import Link from "next/link";

const SignupPage = () => {
  const childRef = useRef<{ focus: () => void }>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateMeCheckboxCliced, setIsUpdateMeCheckboxCliced] =
    useState(false);

  const clickHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (childRef.current) {
      childRef.current.focus();
    }
  }, [childRef]);
  return (
    <div className="flex flex-col items-center min-h-[700px]">
      <div className="max-w-[311px] w-full flex flex-col items-start mb-6 mt-3">
        <h1 className="font-bold text-2xl text-white">Sign up</h1>
        <p className="font-normal text-sm mt-3 text-grey1">Join as a Player</p>
      </div>
      <AuthInput
        extraContainerClasses="mb-6"
        onChange={(e) => {}}
        inputFor="email"
        type="text"
      />
      <AuthInput
        inputFor="userName"
        type="text"
        extraContainerClasses={`!border-red mb-6`}
        onChange={(e) => {}}
      />
      <AuthInput
        ref={childRef}
        extraContainerClasses="mb-6"
        onChange={(e) => {}}
        inputFor="password"
        type="password"
      />
      {/* <AuthInput
        extraContainerClasses="mb-6"
        onChange={(e) => {}}
        inputFor="verification"
        type="text"
      /> */}

      <button
        type="button"
        onClick={() => {
          setIsUpdateMeCheckboxCliced((prev) => !prev);
        }}
        className="mb-4 flex items-center max-w-[311px] w-full cursor-pointer text-left"
      >
        <CheckboxComp checked={isUpdateMeCheckboxCliced} />
        <div className="text-sm text-grey1 ml-3">
          Keep me updated by email with the latest slot news
        </div>
      </button>

      <ButtonComp
        title="Create an account"
        extraButtonClasses="max-w-[311px] text-white"
        onClick={() => {
          clickHandler();
        }}
        isLoading={isLoading}
      />

      <div className="max-w-[311px] w-full flex items-center text-[10px] !justify-start mt-6 text-grey1">
        <Image src={image18} alt="" className="h-5 w-5 mr-3" /> By registering,
        you confirm you are over 18.
      </div>

      <div className="max-w-[311px] w-full flex items-center text-[10px] !justify-start mt-2 text-grey1">
        <Image src={policy} alt="" className="h-5 w-5 mr-3" />
        <div>
          By registering, you confirm acceptance of our{" "}
          <a href="https://google.com" target="_blank" className="text-blue1">
            Terms
          </a>{" "}
          &{" "}
          <a href="https://google.com" target="_blank" className="text-blue1">
            Privacy Policy
          </a>
          .
        </div>
      </div>
      <div className="max-w-[311px] w-full flex items-center text-[10px] !justify-start mt-2 text-grey1">
        <Image src={cookie} alt="" className="h-5 w-5 mr-3" />
        <div>
          By registering, you confirm acceptance of our{" "}
          <a href="https://google.com" target="_blank" className="text-blue1">
            Cookie Policy
          </a>
          .
        </div>
      </div>
      <div className="max-w-[311px] w-full border border-dark3 mt-6 rounded-full" />

      <div className="max-w-[311px] w-full flex items-center justify-between mt-6 mb-6">
        <div className="text-sm text-grey1">Already have an account? </div>
        <Link
          href={"/en/auth/login"}
          type="button"
          className="text-sm text-blue1"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
