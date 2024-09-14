"use client";
import React, { useEffect, useState } from "react";
import FiatCryptoButton from "../table/FiatCryptoButton";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";
import FloatingButtons from "../FloatingButtons";

const categories: FloatingButtonsItems = [
  { label: "Slots", value: "slots", id: "0", width: "w-28" },
  { label: "Casinos", value: "casinos", id: "0", width: "w-28" },
  { label: "Providers", value: "providers", id: "0", width: "w-28" },
  { label: "News", value: "news", id: "0", width: "w-28" },
  { label: "Education", value: "education", id: "0", width: "w-28" },
];

export default function BlogTabs({
  ActiveCategory,
}: {
  ActiveCategory: string;
}) {
  const [selected, setSelected] = useState(categories[0]);
  const [scrolled, setScrolled] = useState(false);

  // const select = (v: any) => {
  //   // setSelected(v);
  //   // onChange(v.value);
  // };

  // useEffect(() => {
  //   const index = categories.findIndex(
  //     (x) => x.value === ActiveCategory
  //   );
  //   if (index === -1) {
  //     setSelected(categories[0]);
  //   } else {
  //     setSelected(categories[index]);
  //   }
  // }, []);

  const listenScrollEvent = () => {
    const checkIfMobile =
      window.innerWidth < 768
        ? window.scrollY > 184
        : window.scrollY > 110;

    if (checkIfMobile) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
  }, []);
  return (
    <>
      <div
        className={`flex justify-center bg-dark1/90 w-[100%]  ${scrolled && "fixed top-0 z-10 left-0 right-0 py-3 px-4 md:px-0 md:py-0"}`}
      >
        <div className="max-w-screen-xl w-[100%] md:flex  md:justify-between ">
          <div
            className={`${scrolled ? "hidden" : ""} md:flex flex-col mb-3 md:mb-0`}
          >
            <h1 className=" font-bold text-3xl mb-3">Blog</h1>
            <p className="text-grey1 mb-2">
              All players need to know.
            </p>
          </div>

          <div
            className={`flex justify-between w-full items-center gap-y-2 md:flex-none md:w-auto`}
          >
            {categories.map((category) => (
              <Link
                key={category.value}
                href={`/blog/${category.value}`}
              >
                <FiatCryptoButton
                  title={category.label}
                  active={ActiveCategory === category.value}
                  click={(e: { stopPropagation: () => any }) =>
                    e.stopPropagation()
                  }
                  className={
                    "py-2 px-2.5 text-xs md:ml-3 md:py-3 md:text-base"
                  }
                />
              </Link>
            ))}
          </div>
        </div>
        {/* <FloatingButtons selected={selected} items={categories} /> */}
      </div>
      {scrolled && <div className="h-[124px] md:h-20"></div>}
    </>
  );
}
