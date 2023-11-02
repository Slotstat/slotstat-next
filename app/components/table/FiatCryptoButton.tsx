import React, { useState } from "react";

export default function FiatCryptoButton(props: any) {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={props.active}
      onClick={props.click}
      className={`
      ${props.active || isHovered ? "bg-blue3" : "bg-grey3"} 
      ${props.paddingY ? props.paddingY : "py-2"}
      text-gray-800 font-bold px-4 rounded-lg inline-flex items-center ml-3`}
    >
      <span
        className={`${
          props.active ? "text-blue1" : isHovered ? "text-white" : "text-grey1"
        } leading-6 text-sm`}
      >
        {props.title}
      </span>
    </button>
  );
}
