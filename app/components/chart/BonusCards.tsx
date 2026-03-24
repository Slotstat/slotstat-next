import LinkIcon from "@/app/assets/svg/LinkIcon";
import moment from "moment";
import Image from "next/image";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";

function BonusCards({ cardsData }: { cardsData: Array<Bonus> }) {
  const t = useTranslations("chart");
  const isImgUrl = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  };
  return (
    <div className="grid grid-cols-1 mb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cardsData.map((card, index) => (
        <div
          key={card.cardId}
          className={`bg-dark2 border- h-[272px] w-full rounded-xl p-6 lg:mb-6 flex flex-col justify-between ${
            index % 4 === 3 ? "" : "lg:mr-0"
          }`}
        >
          <div className="flex flex-row justify-between">
            <div className=" text-grey1 text-base truncate">
              {card.valueType === "CasinoPromotion" ? t("casinoPromotion") : t("welcomeBonus")}
            </div>
            {!!isImgUrl(card.imageUrl) && (
              <Image
                src={card.imageUrl}
                alt=""
                className="h-4 w-4 lg:h-6 lg:w-6 "
                width={24}
                height={24}
              />
            )}
          </div>
          <div className="text-white font-bold h-12 line-clamp-2 ">{card.name}</div>
          <div className="text-grey1 text-xs font-bold line-clamp-2 h-8">{card.additionalInfo}</div>
          {card.valueType === "WelcomeBonus" ? (
            <button
              onClick={() => window.open(card.redirectUrl, "_blank", "noreferrer")}
              className="w-full h-10 px-6 py-2  rounded-md text-base font-medium text-white bg-green1 hover:bg-green2 focus:outline-none focus:ring-2 focus:ring-green1 focus:ring-offset-2 appearance-none"
            >
              {t("getBonus")}
            </button>
          ) : (
            <button
              onClick={() => window.open(card.redirectUrl, "_blank", "noreferrer ")}
              className="flex justify-center items-center w-full h-10 px-6 py-2 border border-transparent rounded-md text-base font-medium text-white bg-dark1 hover:bg-dark3 focus:outline-none focus:ring-2 focus:ring-dark1 focus:ring-offset-2"
            >
              <span className="flex items-center">{t("readMore")}</span>
              <LinkIcon
                onClick={() => window.open(card.redirectUrl, "_blank", "noreferrer ")}
                className="ml-2 cursor-pointer"
              />
            </button>
          )}
          <div className="flex flex-row justify-between ">
            <span className="text-xs text-grey1">{t("expireDate")}</span>
            <span className="text-xs text-white">
              {card.expireDate ? moment(card.expireDate).format("DD MMM. YYYY") : t("notSpecified")}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BonusCards;
