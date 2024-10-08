import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { EmailIcon, EyeClosedIcon, EyeOpenIcon, KeyIcon, LockIcon, UserIcon } from "./Svgs";
import { placeHolderHandler } from "./utils";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  extraContainerClasses?: string;
  extraInputClasses?: string;
  type?: string;
  id?: string;
  inputFor: "email" | "password" | "userName" | "verification";
  customPlaceholder?: string;
  error?: FieldError;
}

type InputForOptions = "email" | "password" | "userName" | "verification" | "emailOrUsername";

const AuthInput = forwardRef<HTMLInputElement, Props & React.InputHTMLAttributes<HTMLInputElement>>(
  (
    {
      extraContainerClasses = "",
      extraInputClasses = "",
      type,
      id,
      inputFor,
      customPlaceholder,
      error,
      ...res
    },
    ref
  ) => {
    // const inputRef = useRef<HTMLInputElement>(null);

    // useImperativeHandle(
    //   ref,
    //   () =>
    //     ({
    //       focus: () => {
    //         if (inputRef.current) {
    //           inputRef.current.focus();
    //         }
    //       },
    //     }) as unknown as HTMLInputElement,
    //   []
    // );
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const iconHandler = (type: InputForOptions) => {
      switch (type) {
        case "email":
          return <EmailIcon />;
        case "emailOrUsername":
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
      <div className={`${extraContainerClasses} w-full `}>
        <div
          className={`${!!error ? "!border-red" : ""} w-full flex items-center rounded-lg p-3 bg-dark2 
        border border-dark3 focus-within:border-blue1 max-w-[311px]`}
        >
          {iconHandler(inputFor)}
          <input
            placeholder={customPlaceholder ?? placeHolderHandler(inputFor)}
            className={`${extraInputClasses} bg-transparent outline-none w-full ml-3 mr-3 text-sm text-white`}
            type={type === "password" ? (isPasswordVisible ? "text" : "password") : type}
            id={id}
            ref={ref}
            {...res}
          />

          {type === "password" ? (
            <button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                setIsPasswordVisible((prev) => !prev);
              }}
            >
              {isPasswordVisible ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </button>
          ) : (
            <></>
          )}
        </div>
        <p className="text-red text-xs max-w-[311px] ml-3 mt-1  ">{error?.message}</p>
      </div>
    );
  }
);

export default AuthInput;
