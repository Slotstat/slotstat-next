"use client";

import Image from "next/image";
import { link, x } from "../assets";

const SubscribeButton = ({
  subscribe,
  XChan,
}: {
  subscribe: string;
  XChan: string;
}) => {
  return (
    <>
      {/* <div className="flex items-center">
        <Image src={link} alt="" width={34} height={34} />
        <a
          className="ml-2 text-xs font-normal text-blue1 lg:text-[18px]"
          href="https://t.me/slotstatofficialchat"
          target="_blank"
        >
          https://t.me/slotstatofficialchat
        </a>
      </div> */}
      <button className="mt-2 w-full rounded-xl bg-blue1 p-3 lg:mt-7 lg:rounded-xl lg:px-6 lg:py-4.5">
        <a
          href="https://t.me/slotstatofficialchat"
          target="_blank"
          className="flex items-center justify-between "
        >
          <span className="text-xs font-bold leading-5 text-white lg:text-lg">
            {subscribe}
            <span className="font-normal">{XChan}</span>
          </span>
          <Image
            src={x}
            alt=""
            className="ml-4 h-5 w-5 lg:h-6 lg:w-6 "
            width={24}
            height={24}
          />
        </a>
      </button>
    </>
  );
};

export default SubscribeButton;
