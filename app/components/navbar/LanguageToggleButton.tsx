"use client";

import { usePathname } from "next-intl/client";
import { useLocale, useTranslations } from "next-intl";
import Link from "next-intl/link";

const LanguageToggleButton = ({ css }: { css: string }) => {
  const t = useTranslations("lang");
  const locale = useLocale();

  const pathName = usePathname();

  return (
    <div>
      <button className={css}>
        <Link href={pathName} locale={locale === "en" ? "ka" : "en"}>
          {locale === "en" ? t("ka") : t("en")}
        </Link>
      </button>
    </div>
  );
};
export default LanguageToggleButton;
