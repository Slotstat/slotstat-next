"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { check } from "@/app/assets";
import ButtonComp from "@/app/components/Authentication/ButtonComp";
import Link from "next/link";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState<"verifying" | "success" | "error">(
    "verifying"
  );

  useEffect(() => {
    const verifyEmail = async () => {
      const email = searchParams.get("email");
      const userName = searchParams.get("user-name");
      const token = searchParams.get("token");

      if (!email || !userName || !token) {
        setVerificationStatus("error");
        return;
      }

      const body = JSON.stringify({ email, userName, token });

      try {
        const response = await fetch("/api/user/email-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });

        if (response.ok) {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("error");
        }
      } catch (error) {
        setVerificationStatus("error");
      }
    };

    verifyEmail();
  }, [searchParams]);

  const checkStatue = () => {
    if (verificationStatus === "verifying") {
      return <h5 className="font-bold text-2xl text-white">Verifying your email...</h5>;
    }
    if (verificationStatus === "success") {
      return (
        <>
          <Image src={check} alt="" className="h-9 w-9 my-6" />
          <h5 className="font-bold text-2xl text-white">
            Your email has been successfully verified. You can now log in.
          </h5>
          <Link
            href="en/auth/login"
            className="max-w-[311px] w-full flex items-center justify-between mt-5 mb-6 text-white bg-red-500"
          >
            <ButtonComp
              type="button"
              extraButtonClasses="w-full text-white mt-6 !text-sm py-3 !font-normal"
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
