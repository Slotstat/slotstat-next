// @ts-nocheck

"use client";

import { usePathname, useRouter } from "next-intl/client";
import { useLocale, useTranslations } from "next-intl";

const LanguageToggleButton = () => {
  const t = useTranslations("lang");
  const locale = useLocale();

  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = () => {
    router.replace(pathname, { locale: locale === "en" ? "ka" : "en" });
  };

  return (
    <div>
      <div className="mt-4 ml-4 hover:bg-grey2 rounded-lg border border-grey1 text-[10px] font-normal text-grey1 lg:mt-0 lg:ml-8 lg:flex">
        <div
          onClick={changeLocale}
          className="h-8 w-8 flex items-center justify-center "
        >
          {locale === "en" ? t("ka") : t("en")}
        </div>
      </div>
    </div>
  );
};
export default LanguageToggleButton;
