"use client";
import { useMemo } from "react";

import { Tooltip } from "@material-tailwind/react";
import { useKeenSlider } from "keen-slider/react";

import { live, tooltip as tooltipSVG } from "../assets";
import { breakpoints } from "../utils";
import Image from "next/image";

const StatCard = ({
  type,
  icon,
  label,
  value,
  badge,
  tooltip,
}: TStatCardProps) => {
  return (
    <div className="flex flex-col rounded-2xl bg-dark2 p-4 lg:p-6">
      <div className="flex items-center justify-between">
        <Image
          src={icon}
          alt=""
          className="h-4 w-4 lg:h-6 lg:w-6 "
          width={24}
          height={24}
        />
        {badge && <Image src={live} alt="" className="ml-3" />}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="whitespace-nowrap text-sm leading-5 text-white lg:text-base">
          {label}: {value}
        </span>
        {tooltip && (
          <Tooltip content={tooltip}>
            <Image
              src={tooltipSVG}
              alt=""
              className="ml-3 h-4 w-4 lg:h-6 lg:w-6"
            />
          </Tooltip>
        )}
      </div>
    </div>
  );
};

const to2d = (arr: TStatCardProps[], size = 2): TStatCardProps[][] => {
  const reshaped = [];
  const copy = [...arr];
  while (copy.length) {
    reshaped.push(copy.splice(0, size));
  }
  return reshaped;
};

const Stats = ({
  data,
  rows = 1,
}: {
  data: TStatCardProps[];
  rows?: number;
}) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: { perView: 1.8, spacing: 16 },
    breakpoints: {
      [breakpoints.sm]: { slides: { perView: 2, spacing: 16 } },
      [breakpoints.md]: { slides: { perView: 3, spacing: 24 } },
      [breakpoints.xl]: { slides: { perView: 4, spacing: 24 } },
    },
  });

  const _data = useMemo(() => to2d(data, rows), [data, rows]);

  return (
    <div className="my-4 px-4 lg:my-6 lg:px-18">
      <div ref={sliderRef} className="keen-slider zoom-out">
        {_data.map((stats, i) => (
          <div
            key={i}
            className="keen-slider__slide zoom-out__slide space-y-4 md:space-y-6"
          >
            <>
              {stats.map((stat, j) => (
                <StatCard key={j} {...stat} />
              ))}
            </>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
