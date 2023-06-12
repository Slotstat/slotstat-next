import * as React from "react";
type SvgType = { onClick: () => void; active: number };

export const Ascending = (props: SvgType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    onClick={props.onClick}
  >
    <path
      fill={props.active === 1 ? "#fff" : "#77787C"}
      d="M6 15.837c0 .53.448.96 1 .96h10c.552 0 1-.43 1-.96s-.448-.96-1-.96H7c-.552 0-1 .43-1 .96ZM8 11.997c0 .53.448.96 1 .96h6c.552 0 1-.43 1-.96s-.448-.96-1-.96H9c-.552 0-1 .43-1 .96ZM11 9.117c-.552 0-1-.43-1-.96s.448-.96 1-.96h2c.552 0 1 .43 1 .96s-.448.96-1 .96h-2Z"
    />
  </svg>
);

export const Descending = (props: SvgType) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    onClick={props.onClick}
  >
    <path
      fill={props.active === -1 ? "#fff" : "#77787C"}
      d="M18 8.163c0-.53-.448-.96-1-.96H7c-.552 0-1 .43-1 .96s.448.96 1 .96h10c.552 0 1-.43 1-.96ZM16 12.003c0-.53-.448-.96-1-.96H9c-.552 0-1 .43-1 .96s.448.96 1 .96h6c.552 0 1-.43 1-.96ZM13 14.883c.552 0 1 .43 1 .96s-.448.96-1 .96h-2c-.552 0-1-.43-1-.96s.448-.96 1-.96h2Z"
    />
  </svg>
);
