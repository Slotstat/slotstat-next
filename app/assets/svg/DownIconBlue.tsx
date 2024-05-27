import * as React from "react";
import { SVGProps } from "react";
const DownIconRed = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#FA4611"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M12.5 17.995V9M16.626 13.859l-4.125 4.143-4.126-4.143"
    />
  </svg>
);
export default DownIconRed;
