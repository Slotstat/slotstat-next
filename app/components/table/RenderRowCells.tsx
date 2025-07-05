import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Cell, Row } from "@tanstack/react-table";
import CountUp from "react-countup";
import { useTranslations } from "next-intl";
import useStore from "@/app/(store)/store";
import RTPListing from "./RTPListing";
import { Verified } from "@/app/assets/svg/Verified";
import SPS from "./SPS";
import LinkIconSmall from "@/app/assets/svg/LinkiconSmall";
import UpIconGreen from "@/app/assets/svg/UpIconBlue";
import DownIconRed from "@/app/assets/svg/DownIconBlue";
import MinusWhite from "@/app/assets/svg/MinusBlue";

// const CountUpForJackpots = ({ jackpot, jackpotCurrency, casinoCurrency, casinoId }: any) => {
//   const { newJackpot } = useStore();
//   const [start, setStart] = useState(0);
//   const [end, setEnd] = useState(Number(jackpot));

//   const increaseJackpot = () => {
//     setStart(Number(end));

//     if (jackpot !== 0) {
//       if (
//         newJackpot?.casinoId &&
//         newJackpot?.ccy &&
//         newJackpot?.casinoId + newJackpot?.ccy === casinoId &&
//         end !== Number(newJackpot.amount)
//       ) {
//         setEnd(Number(newJackpot.amount));
//       } else {
//         setEnd(end + 0.2);
//       }
//     }
//   };

//   useEffect(() => {
//     setEnd(Number(jackpot));

//     return () => {
//       setStart(0);
//       setEnd(0);
//     };
//   }, [jackpot]);

//   return (
//     <div className=" text-green1 text-xs md:text-base ">
//       {end === 0 ? (
//         <div>
//           {jackpotCurrency ? jackpotCurrency + " " : casinoCurrency ? casinoCurrency + " " : ""}
//           {end}
//         </div>
//       ) : (
//         <CountUp
//           start={start}
//           end={end}
//           duration={2}
//           separator=" "
//           decimals={2}
//           decimal="."
//           prefix={
//             jackpotCurrency ? jackpotCurrency + " " : casinoCurrency ? casinoCurrency + " " : ""
//           }
//           onEnd={() => {
//             jackpot !== 0 && increaseJackpot();
//           }}
//           delay={0}
//         >
//           {({ countUpRef }) => (
//             <div>
//               <span ref={countUpRef} />
//             </div>
//           )}
//         </CountUp>
//       )}
//     </div>
//   );
// };

const RenderRowCells = ({
  row,
  cell,
  index,
}: {
  cell: Cell<GameData, any>;
  row: Row<GameData>;
  index: number;
}) => {
  const t = useTranslations("table");

  const {
    redirectUrl,
    imageUrl,
    name,
    provider,
    currencRtp,
    totalRtp,
    fixedRtp,
    wsrChange,
    statType,
    // t1H,
    // t24h,
    // jackpot,
    // jackpotCurrency,
    // casinoCurrency,
    // casinoId,
    // rtp,
    // casinoName,
    // bounties,
    // jackpotInfo,
    // rtpChange,
    // rtpState,
    // maxX,
    // currencyCode,
    // isCrypto,
    // dataSource,
    // gameId,
    // p1h,
    // p24h,
    // s24h,
    // type,
    // verificationStatus,
    // sps,
  } = row.original;

  const onGoToWebSiteClick = (event: { defaultPrevented: any; preventDefault: () => void }) => {
    if (event.defaultPrevented) return;
    event.preventDefault();
    window.open(redirectUrl, "_blank", "noreferrer");
  };

  const isImgUrl = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(url);
  };

  const GameNameProvider = () => {
    return (
      <div className="flex flex-row items-center">
        <div className="h-8 w-8 md:w-12 md:h-12 bg-dark2 flex justify-center items-center rounded-full mr-3 overflow-hidden">
          <div className="relative h-8 w-8 md:w-12 md:h-12 ">
            {!!isImgUrl(imageUrl) && (
              <Image
                // unoptimized
                src={imageUrl}
                alt={name}
                fill
                sizes="(max-width: 32px) 100vw,
                (max-width: 32px) 50vw,
              33vw"
              />
            )}
          </div>
        </div>
        <div>
          <h3
            title={name}
            className=" text-white font-bold truncate max-w-[124px]  text-xs md:max-w-[160px] md:text-base"
          >
            {/* {cell.render("Cell")} */}
            {cell.renderValue()}
          </h3>
          <h3 className="text-grey1   truncate max-w-[124px] text-xs md:text-base md:max-w-[160px]">
            {provider}
          </h3>
        </div>
      </div>
    );
  };

  // const CasinoBonus = () => {
  //   return (
  //     <div className="text-xs truncate md:text-base max-w-[124px] md:max-w-[206px]">
  //       <div className=" flex flex-row">
  //         <h3 className="mr-1" title={bounties}>
  //           {casinoName}
  //         </h3>
  //         {verificationStatus == 1 && <Verified />}
  //       </div>
  //       <p
  //         title={bounties}
  //         className="text-grey1 truncate  text-xs max-w-[124px] md:max-w-[206px] md:text-base"
  //       >
  //         {bounties}
  //       </p>
  //     </div>
  //   );
  // };

  const Play = () => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };
    return (
      <div
        onClick={onGoToWebSiteClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className=" hover:text-white hover:bg-blue1 text-grey1  bg-grey3
        w-20 items-center justify-center flex py-1.5 rounded-3xl  text-xs md:text-base"
      >
        <p className="mr-1">{t("play")}</p>
        <LinkIconSmall fill={isHovered ? "#fff" : "#969CB0"} />
      </div>
    );
  };

  const renderEmptyValue = () => (cell.renderValue() ? <>{cell.renderValue()}</> : <>--</>);

  const showUpOrDownIcon = (
    Cell:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | any
      | null
      | undefined
  ) => {
    if (wsrChange === 1) {
      return (
        <div className="flex flex-row items-center text-xs md:text-base text-white ">
          {Cell}%
          <UpIconGreen className="" />
        </div>
      );
    } else if (wsrChange === -1) {
      return (
        <div className="flex flex-row items-center text-xs md:text-base text-rwhiteed">
          {Cell}%
          <DownIconRed className="" />
        </div>
      );
    } else {
      return (
        <div className="flex flex-row items-center text-xs md:text-base ">
          {Cell}%
          <MinusWhite className="" />
        </div>
      );
    }
  };

  const LiveRTP = ({ number }: { number: number }) => {
    return (
      <div>
        <AddPercentSign number={number} />
        <div>
          {number > fixedRtp ? (
            <p className="text-red">Hungry</p>
          ) : (
            <p className="text-green3">Well-fed</p>
          )}
        </div>
      </div>
    );
  };

  const AddPercentSign = ({ number }: { number: number }) => {
    return <div className="text-base font-bold">{number} %</div>;
  };

  const StatType = () => {
    if (statType == "ApiDriven") {
      return (
        <div>
          <p className=" text-yellow1 text-base font-bold">API-Driven</p>
          <p className=" text-grey1 text-base font-bold">Accuracy 100 % </p>
        </div>
      );
    } else {
      return (
        <div>
          <p className=" text-white text-base font-bold">Algorithm-Driven</p>
          <p className=" text-grey1 text-base font-bold">Accuracy 100 % </p>
        </div>
      );
    }
  };

  switch (index) {
    case 0:
      return <GameNameProvider />;
    case 1:
      return <Play />;
    case 2:
      return <LiveRTP number={totalRtp} />;

    case 3:
      return <AddPercentSign number={currencRtp} />;
    //   if (jackpotInfo) {
    //     return (
    //       <div
    //         className={`text-xs text-grey1  md:text-base ${
    //           // @ts-ignore
    //           jackpotInfo != "No jackpot" && "text-white"
    //         }`}
    //       >
    //         {jackpotInfo}
    //       </div>
    //     );
    //   } else {
    //     return jackpot === 0 ? (
    //       renderEmptyValue()
    //     ) : (
    //       <CountUpForJackpots
    //         jackpot={jackpot}
    //         jackpotCurrency={jackpotCurrency}
    //         casinoCurrency={casinoCurrency}
    //         casinoId={casinoId}
    //       />
    //     );
    //   }

    case 4:
      return <>{showUpOrDownIcon(cell.renderValue())}</>;

    case 5:
      return <AddPercentSign number={fixedRtp} />;
    //  <div>{rtp.preferredValue.toFixed(2)} %</div>;
    // return name !== "All Games" && rtp ? <RTPListing rtp={rtp} /> : <>--</>;
    // case 6:
    //   return rtp ? <SPS rtp={rtp} rtpChange={rtpChange} rtpState={rtpState} sps={sps} /> : <>--</>;
    case 7:
      return <StatType />;
    default:
      return renderEmptyValue();
  }
};

export default RenderRowCells;
