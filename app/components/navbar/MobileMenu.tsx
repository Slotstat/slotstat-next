import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { close } from "@/app/assets";
import Image from "next/image";
import ReusableHeaderLogo from "./ReusableHeaderLogo";
import AccordionMenu from "../AccordionMenu";
import SocialIcons from "../SocialIcons";

const MobileMenu = ({
  closeMenu,
}: {
  closeMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed h-screen max-h-screen top-0 bottom-0 left-0 right-0 bg-dark2 z-50 p-4 ">
      <div className="flex flex-row justify-between pb-2 mb-3">
        <ReusableHeaderLogo closeMenu={closeMenu} />
        <button
          className="ml-8 h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-[10px] font-normal lg:hidden"
          onClick={() => closeMenu(false)}
        >
          <Image src={close} alt="" width={32} height={32} />
        </button>
      </div>
      <div className="h-full flex flex-col justify-between pb-36">
        <AccordionMenu isMobileMenu={true} closeMenu={closeMenu} />
        <SocialIcons />
      </div>
    </div>
  );
};
export default MobileMenu;
