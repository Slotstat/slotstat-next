import React from "react";
import {
  DeleteIcon,
  GeneralIcon,
  LogoutIcon,
  PasswordIcon,
  ProfileIcon,
} from "@/app/assets/svg/SVGComponents";
import { useSession } from "next-auth/react";

export default function ProfileMenu() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const email = user?.email;
  const name = user?.name;
  const image = user?.image;
  return (
    <div className="w-[306px] bg-dark2 rounded-lg my-11 pt-4 pl-4 pb-2 pr-12">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-grey3 mr-3 flex items-center justify-center rounded-full overflow-hidden">
          {image ? (
            <img src="" alt="User" className="w-full h-full object-cover" />
          ) : (
            <ProfileIcon />
          )}
        </div>
        <div>
          <h2 className="text-base text-white font-semibold">{name}</h2>
          <p className="text-xs text-grey1">{email}</p>
        </div>
      </div>
      <div className="h-[1px] w-full my-4 bg-grey3" />
      <div className="pl-2">
        <nav>
          <MenuItem icon={<GeneralIcon />} label="General" />
          <MenuItem icon={<ProfileIcon active />} label="Profile" active />
          <MenuItem icon={<PasswordIcon />} label="Password" />
        </nav>

        <div className="h-[1px] w-full mb-4 bg-grey3" />

        <MenuItem icon={<LogoutIcon />} label="Log out" />

        <div className="h-[1px] w-full mb-4 bg-grey3" />

        <MenuItem icon={<DeleteIcon />} label="Delete account" />
      </div>
    </div>
  );
}

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function MenuItem({ icon, label, active = false }: MenuItemProps) {
  return (
    <button
      className={`w-full flex items-center  mb-4 rounded-md transition-colors font-bold
        ${active ? "text-white" : "text-grey1 hover:text-white"}`}
    >
      <div className="h-8 w-8 flex rounded-full justify-center items-center bg-grey3 mr-5 ">
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
}
