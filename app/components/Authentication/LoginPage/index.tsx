"use client";
import React, { useEffect, useRef, useState } from "react";
import AuthInput from "../AuthInput";
import CheckboxComp from "../CheckboxComp";
import ButtonComp from "../ButtonComp";
import Link from "next/link";
import ResetPasswordEmailInput from "./ResetPasswordEmailInput";
import LoginInputs from "./LoginInputs";
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Props = {};

const LoginPage = (props: Props) => {
  const [isResetScreenVisible, setIsResetScreenVisible] = useState(false);
  const [userEmail, setUserEmail] = useState<any>();
  const returnToLogin = () => {
    setIsResetScreenVisible(false);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      // Handle error
      console.error(result.error);
    } else {
      // Redirect to dashboard or home page
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex flex-col items-center min-h-[700px]">
      {isResetScreenVisible ? (
        <ResetPasswordEmailInput
          returnToLogin={returnToLogin}
          userEmail={userEmail}
          setUserEmail={setUserEmail}
        />
      ) : (
        <LoginInputs
          setIsResetScreenVisible={setIsResetScreenVisible}
          setUserEmail={setUserEmail}
          userEmail={userEmail}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default LoginPage;
