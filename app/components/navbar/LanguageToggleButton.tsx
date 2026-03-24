"use client";

import { usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";

const localeOptions = ["en", "es", "pt"] as const;

const LanguageToggleButton = () => {
  const t = useTranslations("lang");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLocale = (newLocale: "en" | "es" | "pt") => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="mt-4 ml-4 hover:bg-grey2 cursor-pointer rounded-lg border border-grey1 text-[10px] font-normal text-grey1 lg:mt-0 lg:ml-8 lg:flex h-8 w-8 flex items-center justify-center"
      >
        {t(locale)}
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-50 rounded-lg border border-grey1 bg-dark2 shadow-lg min-w-[60px]">
          {localeOptions
            .filter((l) => l !== locale)
            .map((l) => (
              <button
                key={l}
                onClick={() => changeLocale(l as "en" | "es" | "pt")}
                className="block w-full px-3 py-2 text-[10px] text-grey1 hover:bg-grey2 hover:text-white text-center first:rounded-t-lg last:rounded-b-lg"
              >
                {t(l)}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};
export default LanguageToggleButton;
