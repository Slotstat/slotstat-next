import React, { useState } from "react";
import {
  EmailIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  GreenCheckIcon,
  KeyIcon,
  LockIcon,
  UserIcon,
} from "./Svgs";
import {  placeHolderHandler } from "./utils";



const AuthInput = ({
  extraContainerClasses = "",
  extraInputClasses = "",
  type = "text",
  name = "",
  id = "",
  inputFor = "email",
  customPlaceholder,
  onChange,
}: Props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const iconHandler = (type: InputForOptions) => {
    switch (type) {
      case "email":
        return <EmailIcon />;
      case "password":
        return <LockIcon />;
      case "userName":
        return <UserIcon />;
      case "verification":
        return <KeyIcon />;

      default:
        break;
    }
  };

  return (
    <div
      className={`${extraContainerClasses} w-full flex items-center rounded-lg p-3 bg-dark2 border border-dark3 focus-within:border-blue1 max-w-[311px]`}
    >
      {iconHandler(inputFor)}
      <input
        placeholder={customPlaceholder ?? placeHolderHandler(inputFor)}
        className={`${extraInputClasses} bg-transparent outline-none w-full ml-3 mr-3`}
        type={
          type === "password" ? (isPasswordVisible ? "text" : "password") : type
        }
        onChange={onChange}
        name={name}
        id={id}
      />

      {type === "password" ? (
        <div
          className="cursor-pointer"
          onClick={() => {
            setIsPasswordVisible((prev) => !prev);
          }}
        >
          {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default AuthInput;
