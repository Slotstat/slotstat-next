"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import AuthInput from "../AuthInput";
import CheckboxComp from "../CheckboxComp";
import Link from "next/link";
import ButtonComp from "../ButtonComp";
import { authenticate, handleCredentialsSignin } from "@/app/actions/authActions";

type Props = {
  setIsResetScreenVisible: any;
};

const LoginInputs = ({ setIsResetScreenVisible }: Props) => {
  // const [errorMessage, formAction, isPending] = useFormState(authenticate, undefined);

  const [isKeepLoggedInChecked, setIsKeepLoggedInChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const childRef = useRef<{ focus: () => void }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Use email and password for your login action here
      const result = await handleCredentialsSignin({ email, password });
    } catch (error) {
      console.log("something went wrong:", error);
    }
  };

  // const handleSubmitAction = async (FormData: FormData) => {
  //   console.log("FormData", FormData);
  //   try {
  //     // Use email and password for your login action here
  //     // const result = await handleCredentialsSignin({ email, password });
  //   } catch (error) {
  //     console.log("something went wrong:", error);
  //   }
  // };

  useEffect(() => {
    if (childRef.current) {
      childRef.current.focus();
    }
  }, [childRef]);

  return (
    <form
      onSubmit={handleSubmit}
      // action={formAction}
      className="max-w-[311px] w-full flex flex-col items-start mb-6 mt-3"
    >
      <h1 className="font-bold text-2xl text-white mb-6">Log in</h1>

      <AuthInput
        ref={childRef}
        extraContainerClasses="mb-6"
        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
        value={email} // Bind the email state to the input
        inputFor="email"
        type="email"
        name="email"
        id="email"
      />
      <AuthInput
        extraContainerClasses="mb-6"
        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
        value={password} // Bind the password state to the input
        inputFor="password"
        type="password"
        name="password"
        id="password"
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
        className="w-full flex justify-start items-center mt-6"
        onClick={() => setIsKeepLoggedInChecked((prev) => !prev)}
      >
        <CheckboxComp checked={isKeepLoggedInChecked} />
        <p className="text-grey1 text-sm ml-3">Keep me logged in</p>
      </button>

      <ButtonComp
        type="submit"
        extraButtonClasses="w-full text-white mt-6 !text-sm py-3 !font-normal"
        title="Log in"
      />
      <div className="max-w-[311px] w-full border border-dark3 mt-6 rounded-full" />
      <div className="max-w-[311px] w-full flex items-center justify-between mt-6 mb-6">
        <div className="text-sm text-grey1">Don’t have an account? </div>
        <Link href={"/en/auth/sign-up"} type="button" className="text-sm text-blue1">
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default LoginInputs;
