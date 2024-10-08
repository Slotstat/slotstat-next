"use client";

import React, { useState } from "react";
import AuthInput from "../AuthInput";
import CheckboxComp from "../CheckboxComp";
import Link from "next/link";
import ButtonComp from "../ButtonComp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loginSchema, LoginInput } from "@/lib/validations";

type Props = {
  setIsResetScreenVisible: any;
};

const LoginInputs = ({ setIsResetScreenVisible }: Props) => {
  const [isKeepLoggedInChecked, setIsKeepLoggedInChecked] = useState(false);
  const [error, setError] = useState<boolean>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setError(false);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        userIdentifier: data.userIdentifier,
        password: data.password,
      });

      if (result?.error) {
        console.error("SignIn error:", result.error);
        setError(true);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
      setError(true);
    }
  };

  // const childRef = useRef<{ focus: () => void }>(null);

  // useEffect(() => {
  //   if (childRef.current) {
  //     childRef.current.focus();
  //   }
  // }, [childRef]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-[311px] w-full flex flex-col items-start mb-6 mt-3"
    >
      <h1 className="font-bold text-2xl text-white mb-6">Log in</h1>
      {error && <p className="text-xs text-red mb-6">Invalid Username or Password</p>}
      <AuthInput
        // ref={childRef}
        extraContainerClasses="mb-6"
        inputFor="email"
        {...register("userIdentifier")}
        type="text"
        id="userIdentifier"
        error={errors.userIdentifier}
      />
      <AuthInput
        {...register("password")}
        extraContainerClasses="mb-6"
        inputFor="password"
        type="password"
        id="password"
        error={errors.password}
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
        type="button"
        onClick={() => setIsKeepLoggedInChecked((prev) => !prev)}
      >
        <CheckboxComp checked={isKeepLoggedInChecked} />
        <p className="text-grey1 text-sm ml-3">Keep me logged in</p>
      </button>

      <ButtonComp
        type="submit"
        extraButtonClasses="w-full text-white mt-6 !text-sm py-3 !font-normal"
        title="Log in"
        isLoading={isSubmitting}
      />
      {/* {state?.message && <p>{state.message}</p>} */}
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
