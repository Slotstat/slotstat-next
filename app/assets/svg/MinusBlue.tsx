import React, { SVGProps } from "react";

export default function MinusBlue(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={24}
      fill="none"
      {...props}
    >
      <rect width={14} height={6} y={10} fill="#5887F6" rx={1.5} />
    </svg>
  );
}
