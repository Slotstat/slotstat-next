/* eslint-disable react/jsx-no-duplicate-props */

import React, { useState } from "react";

const DashedButton = ({ text }: { text: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <svg
      cursor="pointer"
      width="115"
      height="42"
      viewBox="0 0 115 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <rect
        x="0.25"
        y="0.25"
        width="114.5"
        height="41.5"
        rx="11.75"
        fill="#24262C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 14.4167C22.4142 14.4167 22.75 14.7525 22.75 15.1667V20.25H27.8333C28.2475 20.25 28.5833 20.5858 28.5833 21C28.5833 21.4142 28.2475 21.75 27.8333 21.75H22.75V26.8333C22.75 27.2475 22.4142 27.5833 22 27.5833C21.5858 27.5833 21.25 27.2475 21.25 26.8333V21.75H16.1667C15.7525 21.75 15.4167 21.4142 15.4167 21C15.4167 20.5858 15.7525 20.25 16.1667 20.25H21.25V15.1667C21.25 14.7525 21.5858 14.4167 22 14.4167Z"
        fill={isHovered ? "#ffffffa1" : "white"}
      />
      <rect
        x="0.25"
        y="0.25"
        width="114.5"
        height="41.5"
        rx="11.75"
        stroke="white"
        strokeWidth="0.5"
        strokeDasharray="5 5"
      />
      <text
        x="60%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={isHovered ? "#ffffffa1" : "white"}
        fontSize="14"
      >
        {text}
      </text>
    </svg>
  );
};
export default DashedButton;
