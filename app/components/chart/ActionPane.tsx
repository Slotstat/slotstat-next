"use client";
import { useMemo } from "react";
import "react-spring-bottom-sheet/dist/style.css";
import { remove } from "../../assets";
import { forward, fullscreen } from "../../assets";
import BulletIcon from "../BulletIcon";
import Image from "next/image";
import { FILTERS, SERIE_COLORS } from "./chartUtils";

const ActionPane = ({
  dictionary,
  onPressCompare,
  onPressRemove,
  activeFilterId,
  onPressFilter,
  mainGameObject,
  compareGameObject,
}: ActionPaneProps) => {
  const { compare, vs } = dictionary;
  return (
    <div className="flex items-center justify-between p-[18px]">
      <div className="flex items-center">
        <button
          onClick={onPressCompare}
          className="pointer flex items-center justify-center rounded-xl bg-dark2 py-3 px-4 hover:bg-dark3"
        >
          <span className="text-sm font-bold leading-4 text-white">
            {compare}
          </span>
          <Image
            src={forward}
            alt=""
            className="ml-2 h-[18px] w-[18px]"
            width={18}
            height={18}
          />
        </button>
        {compareGameObject && (
          <>
            <div className="pointer ml-3 flex items-center justify-center rounded-xl bg-dark2 py-3 px-4">
              <BulletIcon color={SERIE_COLORS[0]} size={20} />
              <span className="ml-2 text-sm font-bold leading-4 text-white">
                {mainGameObject?.name}
              </span>
            </div>
            <div className="ml-3 flex h-11 items-center justify-center rounded-xl bg-dark2 px-4">
              <span className="text-sm font-bold leading-4 text-white">
                {vs}
              </span>
            </div>
            <div className=" ml-3 flex items-center justify-center rounded-xl bg-dark2 py-3 px-4 hover:bg-dark3">
              <BulletIcon color={SERIE_COLORS[1]} size={20} />
              <span className="ml-2 text-sm font-bold leading-4 text-white">
                {compareGameObject.name}
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
          </>
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
              [activeFilterId]
            );
            return (
              <button
                key={index}
                onClick={() => onPressFilter(filterKey)}
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
        <button className="ml-3 hidden items-center justify-center rounded-[10px] p-3 hover:bg-dark3 lg:flex">
          <Image
            src={fullscreen}
            alt=""
            className="h-4 w-4"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
};

export default ActionPane;
