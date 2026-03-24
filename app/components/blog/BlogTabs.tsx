"use client";
import React, { useEffect, useState } from "react";
import FiatCryptoButton from "../table/FiatCryptoButton";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const categoryKeys = ["slots", "casinos", "providers", "news", "education"] as const;

export default function BlogTabs({
  ActiveCategory,
}: {
  ActiveCategory: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations("blog");

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
            <h1 className=" font-bold text-3xl mb-3">{t("title")}</h1>
            <p className="text-grey1 mb-2">
              {t("subtitle")}
            </p>
          </div>

          <div
            className={`flex justify-between w-full items-center gap-y-2 md:flex-none md:w-auto`}
          >
            {categoryKeys.map((key) => (
              <Link
                key={key}
                href={`/blog/${key}`}
              >
                <FiatCryptoButton
                  title={t(key)}
                  active={ActiveCategory === key}
                  click={(e: { stopPropagation: () => void }) =>
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
      </div>
      {scrolled && <div className="h-[124px] md:h-20"></div>}
    </>
  );
}
