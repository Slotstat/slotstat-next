import * as React from "react";
import { SVGProps } from "react";
const UpIconGreen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#41D86A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M11.5 9.005v8.996M7.374 13.142 11.499 9l4.126 4.143"
    />
  </svg>
);
export default UpIconGreen;
