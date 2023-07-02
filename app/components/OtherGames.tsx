"use client";
import { useTranslations } from "next-intl";
import React from "react";

export default function OtherGames({ casinoName }: { casinoName: string }) {
  const t = useTranslations("gamePage");

  return (
    <h2 className="flex flex-1 items-center justify-between text-[24px] font-bold text-white">
      {t("other")} {casinoName} {t("games")}
    </h2>
  );
}
