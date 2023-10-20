import React from "react";

export default function FiatCryptoButton(props: any) {
  return (
    <button
      disabled={props.active}
      onClick={props.click}
      className={`${props.active ? "bg-blue3" : " bg-grey3"} ${
        props.paddingY ? props.paddingY : "py-2"
      } text-gray-800 font-bold px-4 rounded-lg inline-flex items-center ml-3`}
    >
      <span
        className={`${
          props.active ? "text-blue1" : "text-grey1"
        } leading-6 text-sm`}
      >
        {props.title}
      </span>
    </button>
  );
}
