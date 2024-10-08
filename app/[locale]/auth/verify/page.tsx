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

      // const email = "giorgikhimshiashvili@gmail.com";
      // const userName = "kh1msh0";
      // const token =

      if (!email || !userName || !token) {
        setVerificationStatus("error");
        return;
      }
      // let noSpacesToken = token.replace(/\s+/g, "");
      let fixedToken = token.replace(/ /g, "+");

      const body = JSON.stringify({ email, userName, token: fixedToken });
      console.log(
        "11111",
        "CfDJ8OfmCGunE6ZPo6JL1dTsVjEqnoqfzUMWj91Tym067+tB0HW+ZsD/dbOUn8hcxChJXMlxm025MUnVCHmYCkRAnCc4fqwQrfexm60Y+6+NCyfMWsVZKrN76r+8tAeeJY5rUW5TWeOBYGY4DIwlQrK/vJpzeO00WTWrl+1a7mAmT3ik6fYPYwOc1SBxNFS0WyYSpZ/s9GvurbVF50+M302TKoOZDHpTZelkmKXvqe+C2zPCvBVhmJSrm69wIvG/+lko1A=="
      );
      console.log("22222", fixedToken);

      try {
        const response = await fetch("/api/user/email-verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        });
        console.log("response", response);
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
