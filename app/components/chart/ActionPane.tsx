"use client";
import { useMemo } from "react";
import "react-spring-bottom-sheet/dist/style.css";
import { remove } from "../../assets";
import { fullscreen } from "../../assets";
import BulletIcon from "../../assets/svg/BulletIcon";
import Image from "next/image";
import { FILTERS, SERIE_COLORS } from "./chartUtils";
import { useTranslations } from "next-intl";
import DashedButton from "@/app/assets/svg/DashedButton";

const ActionPane = ({
  onPressCompare,
  onPressRemove,
  activeFilterId,
  onPressFilter,
  mainGameObject,
  compareGameObject,
  setFilterDisabled,
  filterDisabled,
}: ActionPaneProps) => {
  const t = useTranslations("actionPane");

  return (
    <div className="flex items-center justify-between p-[18px]">
      <div className="flex items-center">
        <div className="cursor-default ml-3 flex items-center justify-center rounded-xl bg-dark2 py-3 px-4">
          <BulletIcon color={SERIE_COLORS[0]} size={20} />
          <span className="ml-2 text-sm font-bold leading-4 text-white">
            {mainGameObject?.casinoName} {mainGameObject?.name}
          </span>
        </div>
        <div className="mx-3 cursor-default flex h-11 items-center justify-center rounded-xl bg-dark2 px-4">
          <span className="text-sm font-bold leading-4 text-white">
            {t("vs")}
          </span>
        </div>

        {!compareGameObject ? (
          <div onClick={onPressCompare}>
            <DashedButton text={t("compare")} />
          </div>
        ) : (
          <div className=" ml-3 flex items-center justify-center rounded-xl bg-dark2 py-3 px-4 hover:bg-dark3">
            <BulletIcon color={SERIE_COLORS[1]} size={20} />
            <span className="ml-2 text-sm font-bold leading-4 text-white">
              {compareGameObject.casinoName} {compareGameObject.name}
            </span>
            <button onClick={onPressRemove} className="pointer">
              <Image
                src={remove}
                alt=""
                className="ml-3 h-4 w-4"
                width={16}
                height={16}
              />
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center">
        <button className="ml-3 flex items-center justify-center rounded-[10px] p-3 hover:bg-dark3 lg:hidden">
          <Image
            src={fullscreen}
            alt=""
            className="h-4 w-4"
            width={16}
            height={16}
          />
        </button>
        <div className="hidden items-center space-x-1 rounded-xl bg-dark2 py-1 px-1 lg:flex">
          {Object.keys(FILTERS).map((filterKey, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const background = useMemo(
              () => activeFilterId === filterKey && "bg-dark1",
              // eslint-disable-next-line react-hooks/exhaustive-deps
              [activeFilterId]
            );
            // if (compareGameObject && (index === 3 || index === 4)) {
            //   return null;
            // }
            return (
              <button
                disabled={filterDisabled}
                key={index}
                onClick={() => {
                  onPressFilter(filterKey);
                  setFilterDisabled(true);
                }}
                className={`flex items-center justify-center rounded-[10px] py-2 px-5 hover:bg-dark3 ${background}`}
              >
                <span className="text-sm leading-4 text-grey1">
                  {/*@ts-ignore */}
                  {FILTERS[filterKey].label}
                </span>
              </button>
            );
          })}
        </div>
        {/* <button className="ml-3 hidden items-center justify-center rounded-[10px] p-3 hover:bg-dark3 lg:flex">
          <Image
            src={fullscreen}
            alt=""
            className="h-4 w-4"
            width={16}
            height={16}
          />
        </button> */}
      </div>
    </div>
  );
};

export default ActionPane;
