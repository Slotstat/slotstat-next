"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const LanguageToggleButton = ({
  css,
  lang,
}: {
  css: string;
  lang: { ge: string; en: string };
}) => {
  const { ge, en } = lang;
  const pathName = usePathname();

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale === "en" ? "ge" : "en";
    return segments.join("/");
  };

  const getPath = () => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    return segments[1];
  };

  return (
    <div>
      <button className={css}>
        <Link href={redirectedPathName(getPath())}>
          {getPath() === "en" ? ge : en}
        </Link>
      </button>
    </div>
  );
};
export default LanguageToggleButton;
