import React, { useState } from "react";
import AuthInput from "../AuthInput";
import ButtonComp from "../ButtonComp";
import { ArrowBackIcon } from "../Svgs";
import { FieldError, useForm } from "react-hook-form";
import { resetPassword, resetPasswordSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import sendPasswordResetTokenToEmail from "@/lib/clientSide/sendPasswordResetTokenToEmail";
import { email } from "@/app/assets";
import Image from "next/image";

type Props = {
  returnToLogin: () => void;
};

const ResetPasswordEmailInput = ({ returnToLogin }: Props) => {
  const [error, setError] = useState<FieldError>();
  const [userEmail, setUserEmail] = useState<string | undefined>(undefined);
  const [isResendEmailIn60sc, setIsResendEmailIn60sc] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<resetPassword>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: resetPassword) => {
    try {
      const res = await sendPasswordResetTokenToEmail(data.email);
      if (res?.status === 200) {
        setUserEmail(data.email);
        setIsResendEmailIn60sc(true);
        setTimeout(() => {
          setIsResendEmailIn60sc(false);
        }, 60000);
      } else {
        setError({ message: "incorrect email", type: "credential" });
      }
    } catch (error) {
      setError({ message: "incorrect email", type: "credential" });
    }
  };

  // const childRef = useRef<{ focus: () => void }>(null);

  // useEffect(() => {
  //   if (childRef.current) {
  //     childRef.current.focus();
  //   }
  // }, [childRef]);

  return (
    <div className="max-w-[311px] w-full flex flex-col items-start mb-6 mt-3">
      {!userEmail ? (
        <>
          <h1 className="font-bold text-2xl text-white">Reset your password</h1>
          <p className="font-normal text-sm mt-3 mb-6 text-grey1">
            Enter your email address and we will send you instructions to reset your password.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <AuthInput
              {...register("email")}
              extraContainerClasses="mb-6"
              inputFor="email"
              type="email"
              id="email"
              error={errors.email || error}
            />
            <ButtonComp
              isLoading={isSubmitting}
              extraButtonClasses="w-full text-white text-sm font-bold"
              title="Reset password"
              type="submit"
            />
          </form>
          <div className="max-w-[311px] w-full border border-dark3 mt-6 rounded-full" />
          <div className="max-w-[311px] w-full flex items-center justify-start mt-5 mb-6 text-white">
            <div>
              <ArrowBackIcon />
            </div>
            <button type="button" onClick={returnToLogin} className="text-sm ml-2">
              Back to login
            </button>
          </div>
        </>
      ) : (
        <>
          <Image src={email} alt="" className="h-9 w-9 my-6" />
          <h1 className="font-bold text-2xl text-white">Check your email</h1>
          <p className="font-normal text-sm mt-3 mb-6 text-grey1">
            Please check the email address <span className="text-white">{userEmail}</span> for
            instructions to reset your password. If it doesn't arrive, be sure to check your spam
            folder.
          </p>
          <div className="max-w-[311px] w-full border border-dark3  rounded-full" />
          <div className="max-w-[311px] w-full flex items-center justify-between mt-5 mb-6 text-white bg-red-500">
            <div className="flex items-center justify-center">
              <div>
                <ArrowBackIcon />
              </div>
              <button
                type="button"
                onClick={() => setUserEmail(undefined)}
                className="text-sm ml-2"
              >
                Back
              </button>
            </div>

            <button
              type="button"
              disabled={isSubmitting || isResendEmailIn60sc}
              onClick={() => onSubmit({ email: userEmail })}
              className={`text-sm ml-2 text-blue1 ${isResendEmailIn60sc ? "opacity-50" : ""}`}
            >
              Resend email
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ResetPasswordEmailInput;
