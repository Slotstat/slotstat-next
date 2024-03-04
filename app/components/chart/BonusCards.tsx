import LinkIcon from "@/app/assets/svg/LinkIcon";
import Image from "next/image";
import React, { useEffect } from "react";

function BonusCards({ cardsData }: { cardsData: Array<Card> }) {
  //   useEffect(() => {
  //     cardsData
  //   }, []);
  const isImgUrl = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/.test(url);
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {cardsData.map((card, index) => (
        <div
          key={card.cardId}
          className={`bg-dark2 border- h-[272px] w-[306px] rounded-xl p-6 mb-6 flex flex-col justify-between ${
            index % 4 === 3 ? "" : "mr-6 lg:mr-0"
          }`}
        >
          <div className="flex flex-row justify-between ">
            <div className=" text-grey1 text-base">Welcome bonus</div>
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
          <div className="text-white font-bold">
            100% up to 600 Euro and more and more
          </div>
          <div className="text-grey1 text-xs font-bold">
            information about bonus information about bonus
          </div>
          {index === 0 ? (
            <button className="w-full h-10 px-6 py-2  rounded-md text-base font-medium text-white bg-green1 hover:bg-green1 focus:outline-none focus:ring-2 focus:ring-green1 focus:ring-offset-2 appearance-none">
              Get Bonus
            </button>
          ) : (
            <button className="flex justify-center items-center w-full h-10 px-6 py-2 border border-transparent rounded-md text-base font-medium text-white bg-dark1 hover:bg-dark3 focus:outline-none focus:ring-2 focus:ring-dark1 focus:ring-offset-2">
              <span className="flex items-center">Read more</span>
              <LinkIcon
                onClick={() =>
                  window.open(card.redirectUrl, "_blank", "noreferrer")
                }
                className="ml-2 cursor-pointer"
              />
            </button>
          )}
          <div className="flex flex-row justify-between ">
            <span className="text-xs text-grey1">Expire date:</span>
            <span className="text-xs text-white">12 Dec. 2024</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BonusCards;
