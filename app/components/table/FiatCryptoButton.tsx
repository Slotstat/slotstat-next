import React from "react";

export default function FiatCryptoButton(props: any) {
  return (
    <button
      disabled={props.active}
      onClick={props.click}
      className={`${
        props.active ? "bg-blue3" : " bg-grey3"
      } text-gray-800 font-bold py-2 px-4 rounded-md inline-flex items-center ml-3`}
    >
      <span className={`${props.active ? "text-blue1" : "text-grey1"} text-sm`}>
        {props.title}
      </span>
    </button>
  );
}
