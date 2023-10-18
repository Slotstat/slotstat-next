"use client";
import { useTranslations } from "next-intl";
import React from "react";

export default function OtherGames({ casinoName }: { casinoName: string }) {
  const t = useTranslations("gamePage");

  return (
    <h2 className="flex flex-1 items-center justify-between font-bold text-base text-white lg:text-2xl">
      {t("findYourGame")}
    </h2>
  );
}
