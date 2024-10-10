"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { check } from "@/app/assets";
import ButtonComp from "@/app/components/Authentication/ButtonComp";
import Link from "next/link";
import { FieldError, useForm } from "react-hook-form";
import { PasswordResetInput, passwordResetSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthInput from "@/app/components/Authentication/AuthInput";
import { resetPassword } from "@/app/actions/authActions";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  // const [email, setEmail] = useState<string | null>();
  // const [token, setToken] = useState<string | null>();
  const [error, setError] = useState<FieldError>();

  const [passwordResetStatus, setPasswordResetStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetInput>({
    resolver: zodResolver(passwordResetSchema),
  });

  useEffect(() => {
    // const currentUrl = window.location.href;
    // const decodedUrl = decodeURIComponent(currentUrl);
    // const urlObject = new URL(decodedUrl);
    // const searchParams = new URLSearchParams(urlObject.search);
    // const email = searchParams.get("email");
    // const token = searchParams.get("token");
    // setEmail(email);
    // setToken(fixedToken);
    // const verifyEmail = async () => {
    //   const email = searchParams.get("email");
    //   const token = searchParams.get("token");
    //   if (!email || !token) {
    //     setPasswordResetStatus("error");
    //     return;
    //   }
    //   let fixedToken = token.replace(/ /g, "+");
    //   const body = JSON.stringify({ email, token: fixedToken, password });
    //   console.log("22222", body);
    //   try {
    //     const response = await fetch("/api/user/email-verify", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body,
    //     });
    //     console.log("response", response);
    //     if (response.ok) {
    //       setPasswordResetStatus("success");
    //     } else {
    //       setPasswordResetStatus("error");
    //     }
    //   } catch (error) {
    //     setPasswordResetStatus("error");
    //   }
    // };
    // verifyEmail();
  }, [searchParams]);

  const onSubmit = async (data: PasswordResetInput) => {
    if (token && email && data.password) {
      try {
        const res = await resetPassword({ email, token, password: data.password });
        if (res?.status === 200) {
          setPasswordResetStatus("success");
        } else {
          setPasswordResetStatus("error");

          setError({ message: "incorrect email", type: "credential" });
        }
      } catch (error) {
        setPasswordResetStatus("error");

        setError({ message: "incorrect email", type: "credential" });
      }
    } else {
      setError({ message: "incorrect credentials", type: "credential" });
    }
  };

  const checkStatue = () => {
    if (passwordResetStatus === "verifying") {
      return (
        <>
          <h1 className="font-bold text-2xl text-white">Reset your password</h1>
          <p className="font-normal text-sm mt-3 mb-6 text-grey1">
            Enter a new password below to change your password.
          </p>
          {error && <p className="font-normal text-sm mb-3 text-red ">Password reset failed</p>}
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <AuthInput
              {...register("password")}
              extraContainerClasses="mb-6"
              inputFor="password"
              type="password"
              id="password"
              error={errors.password}
            />
            <AuthInput
              {...register("confirmPassword")}
              extraContainerClasses="mb-6"
              inputFor="password"
              type="password"
              id="confirmPassword"
              customPlaceholder="Confirm Password"
              error={errors.confirmPassword}
            />
            <ButtonComp
              isLoading={isSubmitting}
              extraButtonClasses="w-full text-white text-sm font-bold"
              title="Create a new password"
              type="submit"
            />
          </form>
        </>
      );
    } else if (passwordResetStatus === "success") {
      return (
        <>
          <Image src={check} alt="" className="h-9 w-9 my-6" />
          <h5 className="font-bold text-2xl text-white">Password reset complete</h5>
          <p className="font-normal text-sm mt-3 mb-6 text-grey1">
            Your password reset was successful.
          </p>

          <Link
            href="/en/auth/login"
            className="max-w-[311px] w-full flex items-center justify-between  mb-6 text-white bg-red-500"
          >
            <ButtonComp
              type="button"
              extraButtonClasses="w-full text-white !text-sm py-3 !font-normal"
              title="Log in"
            />
          </Link>
        </>
      );
    }
    return (
      <h5 className="font-bold text-2xl text-white">
        There was an error verifying your email. Please try again or contact support
      </h5>
    );
  };

  return (
    <div className="flex flex-col items-center min-h-[700px]">
      <div className="max-w-[311px] w-full flex flex-col items-start my-12">{checkStatue()}</div>
    </div>
  );
}
