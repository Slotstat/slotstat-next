"use client";
import React, { useState } from "react";

export default function TooltipComponent({
  text,
  big = false,
}: {
  text: string;
  big?: boolean;
}) {
  const [color, setColor] = useState("#969CB0");

  return (
    <div className={big ? "w-6 h-6" : "w-4 h-4"}>
      <a data-tooltip-id="my-tooltip" data-tooltip-content={text}>
        <svg
          onMouseEnter={() => setColor("#5887F5")}
          onMouseLeave={() => setColor("#969CB0")}
          className="ml-2 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            fill={color}
            d="M8 15.167A7.173 7.173 0 0 1 .833 8 7.173 7.173 0 0 1 8 .833 7.173 7.173 0 0 1 15.167 8 7.173 7.173 0 0 1 8 15.167ZM8 1.833A6.174 6.174 0 0 0 1.833 8c0 3.4 2.767 6.167 6.167 6.167S14.167 11.4 14.167 8 11.4 1.833 8 1.833Z"
          />
          <path
            fill={color}
            d="M8 9.167a.504.504 0 0 1-.5-.5V5.333c0-.273.227-.5.5-.5s.5.227.5.5v3.334c0 .273-.227.5-.5.5ZM8 11.333a.664.664 0 0 1-.253-.053.771.771 0 0 1-.22-.14.69.69 0 0 1-.14-.22.664.664 0 0 1-.054-.253c0-.087.02-.174.054-.254a.77.77 0 0 1 .14-.22.769.769 0 0 1 .22-.14.667.667 0 0 1 .506 0c.08.034.154.08.22.14a.77.77 0 0 1 .14.22c.034.08.054.167.054.254 0 .086-.02.173-.054.253a.69.69 0 0 1-.14.22.771.771 0 0 1-.22.14.664.664 0 0 1-.253.053Z"
          />
        </svg>
      </a>
    </div>
  );
}
