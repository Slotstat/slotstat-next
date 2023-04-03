"use client";
import React, { useMemo, useState } from "react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { arrow } from "../assets";
import { breakpoints } from "../utils";
import Image from "next/image";

type TOnClick = (e: React.MouseEvent<HTMLButtonElement>) => void;

type TArrowProps = {
  isLeft: boolean;
  disabled: boolean;
  onClick: TOnClick;
};

type TSliderData = {
  img: string;
  title: string;
  subtitle: string;
}[];

const Arrow = ({ isLeft = false, disabled, onClick }: TArrowProps) => {
  const dir = useMemo(
    () => (isLeft ? "left-4 lg:left-18" : "right-4 lg:right-18"),
    [isLeft]
  );
  const iconStyle = useMemo(() => (isLeft ? "rotate-180" : ""), [isLeft]);

  if (disabled) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`absolute top-0 ${dir} flex h-28 w-12 items-center justify-center rounded-xl bg-white/5 backdrop-blur-md lg:h-38`}
    >
      <Image src={arrow} className={iconStyle} alt="" />
    </button>
  );
};

const Slider = ({ data }: { data: TSliderData }) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
    slides: { perView: 1.8, spacing: 16 },
    breakpoints: {
      [breakpoints.sm]: { slides: { perView: 2, spacing: 16 } },
      [breakpoints.md]: { slides: { perView: 3, spacing: 24 } },
      [breakpoints.xl]: { slides: { perView: 4, spacing: 24 } },
    },
  });

  const onBack: TOnClick = (e) => {
    e.stopPropagation();
    instanceRef.current?.prev();
  };

  const onNext: TOnClick = (e) => {
    e.stopPropagation();
    instanceRef.current?.next();
  };

  return (
    <div className="relative my-4 px-4 lg:my-6 lg:px-18">
      <div ref={sliderRef} className="keen-slider rounded-t-xl">
        {data.map(({ img, title, subtitle }, index) => (
          <div key={index} className="keen-slider__slide cursor-pointer">
            <Image
              src={img}
              blurDataURL={img}
              placeholder="blur"
              className="h-28 rounded-xl object-fill lg:h-38"
              alt=""
              loading="lazy"
              width={378}
              height={152}
            />
            <div className="mt-3 text-[10px] leading-3 text-grey1 lg:text-sm lg:leading-4">
              {subtitle}
            </div>
            <div className="mt-3 text-xs font-bold leading-3 text-white lg:text-base lg:leading-5">
              {title}
            </div>
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <Arrow isLeft={true} onClick={onBack} disabled={currentSlide === 0} />
          <Arrow
            isLeft={false}
            onClick={onNext}
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
          />
        </>
      )}
    </div>
  );
};

export default Slider;
