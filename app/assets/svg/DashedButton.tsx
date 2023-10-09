/* eslint-disable react/jsx-no-duplicate-props */

import React, { useState } from "react";
import Plus from "./Plus";

const DashedButton = ({
  text,
  onPressCompare,
}: {
  text: string;
  onPressCompare: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <div
        onClick={onPressCompare}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative rounded-3xl bg-dark1 h-[40px] lg:w-32 flex flex-col items-center "
      >
        <svg
          cursor="pointer"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100%" height="100%" rx="11.75" fill="#24262C" />
          <rect
            width="100%"
            height="100%"
            rx="11.75"
            stroke="white"
            strokeDasharray="5 5"
          />
        </svg>
        <div className="absolute cursor-pointer w-full h-full flex items-center justify-center">
          <Plus fill={isHovered ? "#ffffffa1" : "#fff"} />
          <p
            className={` ml-2 ${isHovered ? "text-[#ffffffa1]" : "text-white"}`}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
export default DashedButton;
