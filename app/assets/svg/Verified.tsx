import { SVGProps } from "react";

export const Verified = (props: SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
    >
      <path
        fill="#5887F6"
        d="M10.823 2.234a3.076 3.076 0 0 1 2.354 0l4.896 2.028a3.076 3.076 0 0 1 1.665 1.665l2.028 4.896c.312.754.312 1.6 0 2.354l-2.028 4.896a3.075 3.075 0 0 1-1.665 1.665l-4.896 2.028c-.754.312-1.6.312-2.354 0l-4.896-2.028a3.076 3.076 0 0 1-1.665-1.665l-2.028-4.896a3.076 3.076 0 0 1 0-2.354l2.028-4.896a3.076 3.076 0 0 1 1.665-1.665l4.896-2.028Z"
      />
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m8 12 2.667 3L16 9"
      />
    </svg>
  )