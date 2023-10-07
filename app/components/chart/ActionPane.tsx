import { useMemo } from "react";
import "react-spring-bottom-sheet/dist/style.css";
import { remove } from "../../assets";
import { fullscreen } from "../../assets";
import BulletIcon from "../../assets/svg/BulletIcon";
import Image from "next/image";
import { FILTERS, SERIE_COLORS } from "./chartUtils";
import { useTranslations } from "next-intl";
import DashedButton from "@/app/assets/svg/DashedButton";

export const CasinoNamesWithCompareButton = ({
  mainGameObject,
  compareGameObject,
  onPressCompare,
  onPressRemove,
}: CasinoNamesWithCompareButtonProps) => {
  const t = useTranslations("actionPane");

  return (
    <div className=" items-center  lg:flex">
      <div className="cursor-default flex items-center rounded-xl bg-dark2 py-3 px-4 my-3 w-full lg:max-w-[224px] lg:ml-3 lg:justify-center lg:my-0">
        <BulletIcon color={SERIE_COLORS[0]} size={20} />
        <span
          title={
            mainGameObject && mainGameObject.casinoName + mainGameObject.name
          }
          className="ml-2 text-sm font-bold leading-4 text-white truncate"
        >
          {mainGameObject?.casinoName} {mainGameObject?.name}
        </span>
      </div>
      <div className="hidden mx-3 cursor-default h-11 items-center justify-center rounded-xl bg-dark2 px-4 lg:flex">
        <span className="text-sm font-bold leading-4 text-white">
          {t("vs")}
        </span>
      </div>

      {!compareGameObject ? (
        <div onClick={onPressCompare}>
          <DashedButton text={t("compare")} />
        </div>
      ) : (
        <div className=" flex items-center justify-between rounded-xl bg-dark2 py-3 px-4 hover:bg-dark3 w-full lg:max-w-[224px]  lg:mr-2">
          <div className="flex items-center lg:max-w-[168px] ">
            <BulletIcon color={SERIE_COLORS[1]} size={20} />
            <span
              title={compareGameObject.casinoName + compareGameObject.name}
              className=" ml-2 text-sm font-bold leading-4 text-white truncate"
            >
              {compareGameObject.casinoName} {compareGameObject.name}
            </span>
          </div>
          <button onClick={onPressRemove} className="pointer w-6 ">
            <Image
              src={remove}
              alt=""
              className="ml-2 h-4 w-4"
              width={16}
              height={16}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export const DateFilterForChart = ({
  activeFilterId,
  filterDisabled,
  onPressFilter,
  setFilterDisabled,
}: DateFilterForChartProps) => {
  return (
    <div className="flex items-center mt-3 lg:mt-0">
      {/* <button className="ml-3 flex items-center justify-center rounded-[10px] p-3 hover:bg-dark3 lg:hidden">
    <Image
      src={fullscreen}
      alt=""
      className="h-4 w-4"
      width={16}
      height={16}
    />
  </button> */}
      <div className=" items-center space-x-1 rounded-xl bg-dark2 py-1 px-1 flex w-full justify-between">
        {Object.keys(FILTERS).map((filterKey, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const background = useMemo(
            () => activeFilterId === filterKey && "bg-dark1",
            // eslint-disable-next-line react-hooks/exhaustive-deps
            [activeFilterId]
          );

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
  );
};

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
  return (
    <div className="hidden items-center justify-between overflow-auto p-3 sm:flex">
      <CasinoNamesWithCompareButton
        mainGameObject={mainGameObject}
        compareGameObject={compareGameObject}
        onPressCompare={onPressCompare}
        onPressRemove={onPressRemove}
      />
      <DateFilterForChart
        activeFilterId={activeFilterId}
        filterDisabled={filterDisabled}
        onPressFilter={onPressFilter}
        setFilterDisabled={setFilterDisabled}
      />
    </div>
  );
};

export default ActionPane;
