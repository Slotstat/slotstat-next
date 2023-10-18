import Image from "next/image";
import React from "react";
import { slot } from "../../assets";

export default function ChartComponentHeader({
  gameObj,
}: {
  gameObj: GameData;
}) {
  const { casinoName, name, imageUrl } = gameObj;
  return (
    <>
      <Image
        src={slot}
        alt=""
        className="absolute top-0 right-0 left-0 h-[352px] "
      />

      <div className="absolute top-0 right-0 left-0 h-[352px] flex justify-center backdrop-blur-sm bg-dark2/90  ">
        <div className="w-[100%] max-w-screen-xl mt-[87px] px-4 py-12 lg:px-0">
          <h1 className="text-white text-3xl font-bold mb-4">
            {casinoName} - {name}
          </h1>
          <p className="text-grey1 mb-8">
            We publish information about slot games, payout percentage, number
            of winning spins and jackpots... Read more
          </p>

          <div className=" flex items-center text-white text-sm font-bold">
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
              <Image
                src={imageUrl}
                alt={casinoName}
                fill
                className="h-12 w-12"
                sizes="(max-width: 24px) 100vw,
                (max-width: 24px) 50vw,
                33vw"
              />
            </div>
            <p>{casinoName}</p>
            <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3 ml-6">
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="(max-width: 24px) 100vw,
                (max-width: 24px) 50vw,
                33vw"
              />
            </div>
            <p>{name}</p>
          </div>
        </div>
      </div>
    </>
  );
}
