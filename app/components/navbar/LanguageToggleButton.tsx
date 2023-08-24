"use client";

import { usePathname } from "next-intl/client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next-intl/link";

const LanguageToggleButton = () => {
  const t = useTranslations("lang");
  const locale = useLocale();

  const pathName = usePathname();

  return (
    <div>
      <button className="mt-4 ml-4 hover:bg-grey2 rounded-lg border border-grey1 text-[10px] font-normal text-grey1 lg:mt-0 lg:ml-8 lg:flex">
        <Link className="h-8 w-8 flex items-center justify-center " href={pathName} locale={locale === "en" ? "ka" : "en"}>
          {locale === "en" ? t("ka") : t("en")}
        </Link>
      </button>
    </div>
  );
};
export default LanguageToggleButton;
