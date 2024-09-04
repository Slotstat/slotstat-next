import * as React from "react";
export const Checkmark = () => (
  <svg width={9} height={16} fill="none">
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7 7-3.2 3.2-1.6-1.6"
    />
  </svg>
);

export const ArrowDown = () => (
  <svg className=" ml-1" xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none">
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11 6 7.8 9.2 4.6 6"
    />
  </svg>
);

export const ArrowLeft = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M11.53 5.47a.75.75 0 010 1.06l-4.72 4.72H19a.75.75 0 010 1.5H6.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const ArrowLinkBig = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={3}
          d="m14.679 10.32-6.36 6.361M8.836 10.328l5.846-.013-.012 5.847"
        />
      </svg>
    </>
  );
};
export const ArrowLinkSmall = () => {
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="m9.786 6.881-4.24 4.24M5.89 6.886l3.899-.009-.009 3.898"
        />
      </svg>
    </>
  );
};

export const ArrowUp = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width={10} height={6} fill="none">
    <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="m1 5 4-4 4 4" />
  </svg>
);

export const ArrowUpWithStickIcon = ({ isWriting }: { isWriting: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none" viewBox="0 0 11 11">
    <path
      stroke={isWriting ? "#fff" : "#3C3F49"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5.126 1.007v8.995M1 5.143L5.125.999l4.126 4.144"
    ></path>
  </svg>
);
