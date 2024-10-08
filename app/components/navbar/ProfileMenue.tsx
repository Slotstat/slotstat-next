import { LogoutIcon, ProfileIcon } from "@/app/assets/svg/SVGComponents";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const ProfileMenu = ({}: {}) => {
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };
  return (
    <div
      className="z-50 absolute font-bold pt-8 transition duration-200 ease-in-out
      right-4 left-4 lg:top-full lg:left-auto lg:right-0"
    >
      <div className="w-full lg:w-[211px] p-4 bg-dark1 border border-grey1 rounded-xl cursor-pointer">
        <Link href={'/en/profile'} className="flex items-center">
          <div className="h-8 w-8 flex rounded-full justify-center items-center bg-grey3 mr-2 ">
            <ProfileIcon active />
          </div>
          <p className="text-white text-sm font-bold">My Profile</p>
        </Link>
        <div className="h-[1px] w-full my-2 bg-grey3"></div>
        <div onClick={handleSignOut} className="flex items-center cursor-pointer ">
          <div className="h-8 w-8 flex rounded-full justify-center items-center bg-grey3 mr-2">
            <LogoutIcon />
          </div>
          <p className="text-grey1 text-sm font-bold">Log Out</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;
