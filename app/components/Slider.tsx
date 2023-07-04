/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import { arrow } from "../assets";
import { breakpoints } from "../utils";
import Image from "next/image";
import { getLandingOffers } from "@/lib/getLanding";

type TOnClick = (e: React.MouseEvent<HTMLButtonElement>) => void;

type TArrowProps = {
  isLeft: boolean;
  disabled: boolean;
  onClick: TOnClick;
};

const Arrow = ({ isLeft = false, disabled, onClick }: TArrowProps) => {
  const dir = useMemo(() => (isLeft ? "left-4 " : "right-4 "), [isLeft]);
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

const KeenSlider = ({ data }: { data: Offer[] }) => {
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
    <div className="relative my-4 px-4 lg:my-6 ">
      <div ref={sliderRef} className="keen-slider rounded-t-xl">
        {data?.map(({ imageUrl, title, subTitle, redirectUrl }, index) => (
          <div key={index} className="">
            <div
              onClick={() => window.open(redirectUrl, "_blank", "noreferrer")}
              key={index}
              className="keen-slider__slide cursor-pointer   "
            >
              <img
                src={imageUrl}
                className="h-28 w-full rounded-xl object-cover lg:h-38"
                alt=""
              />
              {/* <img
                  src={imageUrl}
                  // blurDataURL={imageUrl}
                  // placeholder="blur"
                  alt=""
                  className="rounded-xl object-fill "
                  // width={152}
                  // height={320}
                  //     fill
                  //     sizes="(max-width: 306px) 100vw,
                  // (max-width: 306px) 50vw,
                  // 33vw"
                /> */}

              <div className="mt-3 text-[10px] leading-3 text-grey1 lg:text-sm lg:leading-4">
                {subTitle}
              </div>
              <div className="mt-3 text-xs font-bold leading-3 text-white lg:text-base lg:leading-5">
                {title}
              </div>
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
              instanceRef.current.track.details?.slides?.length - 1
            }
          />
        </>
      )}
    </div>
  );
};

const Slider = () => {
  const [offersData, setOffersData] = useState<Offer[]>();
  const [loading, setLoading] = useState(true);

  const getOffers = async () => {
    const landingOffersData: Promise<Offer[]> = getLandingOffers();
    const landingOffers: Offer[] = await landingOffersData;
    setOffersData(landingOffers);
    setLoading(false);
  };

  useEffect(() => {
    getOffers();
  }, []);
  return (
    <>
      {!loading && offersData && offersData?.length > 0 ? (
        <KeenSlider data={offersData} />
      ) : !loading && offersData && offersData?.length === 0 ? null : (
        <SkeletonTheme baseColor="#24262C" highlightColor="#444">
          <section className=" my-4 px-4 lg:my-6 ">
            <Skeleton count={1} className=" h-38 rounded-xl " />
          </section>
        </SkeletonTheme>
      )}
    </>
  );
};

export default Slider;
