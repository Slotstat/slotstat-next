import * as React from "react";

const ArrowLink = () => {
  const isBig = window?.innerWidth > 768;

  return (
    <>
      {isBig ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
        >
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="m14.679 10.32-6.36 6.361M8.836 10.328l5.846-.013-.012 5.847"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={16}
          height={16}
          fill="none"
        >
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m9.786 6.881-4.24 4.24M5.89 6.886l3.899-.009-.009 3.898"
          />
        </svg>
      )}
    </>
  );
};
export default ArrowLink;
