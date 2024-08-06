import { logoSmall, slotLogo } from "@/app/assets";
import Image from "next/image";
import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

export default function ReusableHeaderLogo({
  closeMenu,
}: {
  closeMenu?: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const handleReload = () => {
    closeMenu && closeMenu(false);
    router.refresh();
  };
  return (
    <Link href="/" className="flex items-center" onClick={handleReload}>
      <Image
        className="hidden md:flex"
        src={slotLogo}
        alt="logo of slotstat"
        width={140}
        height={40}
      />
      <Image
        className="flex md:hidden"
        src={logoSmall}
        alt="logo of slotstat"
        width={36}
        height={36}
      />
    </Link>
  );
}
