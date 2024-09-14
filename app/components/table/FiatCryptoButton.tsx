import React, { useState } from "react";

export default function FiatCryptoButton({
  active,
  click,
  className,
  title,
  imgSrc,
}: {
  active: boolean;
  click: (e: any) => void;
  className: string;
  title: string;
  imgSrc?: string;
}) {
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
      disabled={active}
      onClick={click}
      className={`
      ${active || isHovered ? "bg-blue3" : "bg-grey3"} 
      text-gray-800  rounded-lg inline-flex items-center 
      ${className}`}
    >
      <span
        className={`${active ? "text-blue1" : isHovered ? "text-white" : "text-grey1"} leading-6 `}
      >
        {title}
      </span>
      {imgSrc && (
        <img src={imgSrc} width={24} height={24} className="ml-2" />
      )}
    </button>
  );
}
