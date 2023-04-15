import * as React from "react";
import { SVGProps } from "react";
const MoreIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#969CB0"
      d="M22.75 12c0 5.93-4.82 10.75-10.75 10.75S1.25 17.93 1.25 12 6.07 1.25 12 1.25 22.75 6.07 22.75 12Zm-20 0c0 5.1 4.15 9.25 9.25 9.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75 2.75 6.9 2.75 12Z"
    />
    <path
      fill="#969CB0"
      d="M13 12c0 .56-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .44 1 1ZM13 8c0 .56-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .44 1 1ZM13 16c0 .56-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .44 1 1Z"
    />
  </svg>
);
export default MoreIcon;
