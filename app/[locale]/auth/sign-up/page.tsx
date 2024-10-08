"use client";
import React, { useState } from "react";
import Image from "next/image";

import { cookie, email, image18, policy } from "@/app/assets";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema, RegisterInput } from "@/lib/validations";
import AuthInput from "@/app/components/Authentication/AuthInput";
import CheckboxComp from "@/app/components/Authentication/CheckboxComp";
import ButtonComp from "@/app/components/Authentication/ButtonComp";

const SignUpPage = () => {
  const [error, setError] = useState<boolean | null>();
  const [verifyEmail, setVerifyEmail] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      const response = await fetch("/api/user/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setVerifyEmail(true);
        // router.push("/");
      } else {
        const errorData = await response.json();
        setError(true);
      }
    } catch (err) {
      setError(true);
    }
  };

  const [isUpdateMeCheckboxClicked, setIsUpdateMeCheckboxClicked] = useState(false);

  // const childRef = useRef<{ focus: () => void }>(null);
  // useEffect(() => {
  //   if (childRef.current) {
  //     childRef.current.focus();
  //   }
  // }, [childRef]);

  return (
    <div className="flex flex-col items-center min-h-[700px]">
      {verifyEmail ? (
        <div className="max-w-[311px] w-full flex flex-col items-start mt-12 mb-6">
          <Image src={email} alt="" className="h-9 w-9 my-6" />
          <h5 className="font-bold text-2xl text-white">Thank you for registering with us!</h5>
          <p className="font-normal text-sm mt-3 mb-2 text-grey1">
            To complete the sign-up process, please verify your email address.
          </p>
          <p className="font-normal text-sm mt-3 mb-3 text-grey1">
            Simply click the link sent to your email.
          </p>
          <Link
            href="/"
            className="max-w-[311px] w-full flex items-center justify-between mt-5 mb-6 text-white bg-red-500"
          >
            <ButtonComp
              type="button"
              extraButtonClasses="w-full text-white mt-6 !text-sm py-3 !font-normal"
              title=" go to main page"
            />
          </Link>
        </div>
      ) : (
        <>
          <div className="max-w-[311px] w-full flex flex-col items-start mb-6 mt-3">
            <h1 className="font-bold text-2xl text-white">Sign up</h1>
            <p className="font-normal text-sm mt-3 text-grey1">Join as a Player</p>
            {error && <p className="font-normal text-sm mt-3 text-red ">Registration failed</p>}
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <AuthInput
              {...register("email")}
              extraContainerClasses="mb-6"
              inputFor="email"
              type="email"
              id="email"
              error={errors.email}
            />
            <AuthInput
              {...register("userName")}
              inputFor="userName"
              type="text"
              id="userName"
              extraContainerClasses="mb-6"
              error={errors.userName}
            />
            <AuthInput
              {...register("password")}
              extraContainerClasses="mb-6"
              inputFor="password"
              type="password"
              id="password"
              error={errors.password}
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
                setIsUpdateMeCheckboxClicked((prev) => !prev);
              }}
              className="mb-4 flex items-center max-w-[311px] w-full cursor-pointer text-left"
            >
              <CheckboxComp checked={isUpdateMeCheckboxClicked} />
              <div className="text-sm text-grey1 ml-3">
                Keep me updated by email with the latest slot news
              </div>
            </button>

            <ButtonComp
              title="Create an account"
              extraButtonClasses="max-w-[311px] text-white"
              isLoading={isSubmitting}
              type="submit"
            />
          </form>

          <div className="max-w-[311px] w-full flex items-center text-[10px] !justify-start mt-6 text-grey1">
            <Image src={image18} alt="" className="h-5 w-5 mr-3" /> By registering, you confirm you
            are over 18.
          </div>

          <div className="max-w-[311px] w-full flex items-center text-[10px] !justify-start mt-2 text-grey1">
            <Image src={policy} alt="" className="h-5 w-5 mr-3" />
            <div>
              By registering, you confirm acceptance of our{" "}
              <a href="/en/terms-of-use" target="_blank" className="text-blue1">
                Terms
              </a>
              &{" "}
              <a href="/en/privacy-policy" target="_blank" className="text-blue1">
                Privacy Policy
              </a>
              .
            </div>
          </div>
          <div className="max-w-[311px] w-full flex items-center text-[10px] !justify-start mt-2 text-grey1">
            <Image src={cookie} alt="" className="h-5 w-5 mr-3" />
            <div>
              By registering, you confirm acceptance of our{" "}
              <a href="/en/privacy-policy" target="_blank" className="text-blue1">
                Cookie Policy
              </a>
              .
            </div>
          </div>
          <div className="max-w-[311px] w-full border border-dark3 mt-6 rounded-full" />

          <div className="max-w-[311px] w-full flex items-center justify-between mt-6 mb-6">
            <div className="text-sm text-grey1">Already have an account? </div>
            <Link href={"/en/auth/login"} type="button" className="text-sm text-blue1">
              Log in
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUpPage;
