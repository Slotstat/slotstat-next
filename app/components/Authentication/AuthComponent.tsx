"use client";
import React, { useEffect, useRef, useState } from "react";
import AuthInput from "./AuthInput";
import ButtonComp from "./ButtonComp";
import CheckboxComp from "./CheckboxComp";

const AuthComponent = () => {
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
    <div className="flex flex-col items-center">
      <div className="max-w-[311px] w-full flex flex-col items-start mb-6 mt-3">
        <h1 className="font-bold text-2xl">Sign up</h1>
        <p className="font-normal text-sm mt-3 text-grey1">Join as a Player</p>
      </div>
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
      <AuthInput
        extraContainerClasses="mb-6"
        onChange={(e) => {}}
        inputFor="email"
        type="text"
      />
      <AuthInput
        extraContainerClasses="mb-6"
        onChange={(e) => {}}
        inputFor="verification"
        type="text"
      />

      <ButtonComp
        title="Create an account"
        extraButtonClasses="max-w-[311px]"
        onClick={() => {
          clickHandler();
        }}
        isLoading={isLoading}
      />
      <button
        type="button"
        onClick={() => {
          setIsUpdateMeCheckboxCliced((prev) => !prev);
        }}
        className="mt-4 flex items-center max-w-[311px] w-full cursor-pointer text-left"
      >
        <CheckboxComp checked={isUpdateMeCheckboxCliced} />
        <div className="text-sm text-grey1 ml-3">
          Keep me updated by email with the latest slot news
        </div>
      </button>
    </div>
  );
};

export default AuthComponent;
