import * as React from "react";
import { SVGProps } from "react";
const LinkIconSmall = (props: SVGProps<SVGSVGElement>) => {
  const fill = props.fill || "#5887F6";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <path
        fill={fill}
        stroke={fill}
        d="M10.386 10a.382.382 0 0 1-.274-.113.389.389 0 0 1 0-.547l4.23-4.228a.39.39 0 0 1 .546 0c.15.15.15.397 0 .547l-4.23 4.228a.382.382 0 0 1-.272.113Z"
      />
      <path
        fill={fill}
        stroke={fill}
        d="M15.437 7.5a.4.4 0 0 1-.397-.397V4.96h-2.143a.4.4 0 0 1-.397-.396.4.4 0 0 1 .397-.397h2.54a.4.4 0 0 1 .396.397v2.54a.4.4 0 0 1-.396.396ZM11.63 15.833H8.372c-2.946 0-4.205-1.259-4.205-4.205V8.372c0-2.946 1.259-4.205 4.205-4.205H9.46a.41.41 0 0 1 .407.407.41.41 0 0 1-.407.407H8.373c-2.501 0-3.391.89-3.391 3.391v3.256c0 2.502.89 3.391 3.391 3.391h3.256c2.502 0 3.392-.89 3.392-3.391v-1.085a.41.41 0 0 1 .407-.407.41.41 0 0 1 .407.407v1.085c0 2.946-1.26 4.205-4.206 4.205Z"
      />
    </svg>
  );
};
export default LinkIconSmall;
