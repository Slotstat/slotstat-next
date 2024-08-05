"use client";

import React from "react";
import AuthInput from "./AuthInput";

type Props = {};

const AuthComponent = ({}: Props) => {
  return (
    <div className="h-96 flex flex-col justify-between">
      <AuthInput
        inputFor="userName"
        type="text"
        extraContainerClasses={`!border-red`}
        onChange={(e) => {}}
      />
      <AuthInput onChange={(e) => {}} inputFor="password" type="password" />
      <AuthInput onChange={(e) => {}} inputFor="email" type="text" />
      <AuthInput onChange={(e) => {}} inputFor="verification" type="text" />
    </div>
  );
};

export default AuthComponent;
