import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useState } from "react";

const menuItems = [
  { icon: "🕹️", label: "Slot", path: "/blog/slots" },
  { icon: "🎰", label: "Casino", path: "/blog/casinos" },
  { icon: "📡", label: "Provider", path: "/blog/providers" },
  { icon: "📰", label: "News", path: "/blog/news" },
  { icon: "🎓", label: "Education", path: "/blog/education" },
];

const NavList = ({}) => {
  const [isVisible, setIsVisible] = useState(false);

  const t = useTranslations("navbar");
  const pathName = usePathname();

  const checkIsActive = (path: string) => {
    if (!pathName) return "text-grey1";
    const segments = pathName.split("/");
    return segments[1] === path ? "text-white" : "text-grey1 hover:text-white";
  };

  return (
    <nav className="hidden md:flex  my-2  flex-row lg:my-0 ml-auto lg:items-center font-bold text-xs md:text-sm ">
      <div className="relative">
        <span
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
          className="mt-4  ml-3 md:ml-8 lg:mt-0 "
        >
          <Link href={"/blog/slots"} className={checkIsActive("howItWorks")}>
            {t("blog")}
          </Link>
        </span>
        {isVisible && (
          <div
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            className="z-50 top-full  left-0 w-[154px] absolute
            font-bold pt-8 -mt-2 transition duration-200 ease-in-out  data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <div className="pt-4 border-grey2 border bg-dark1 rounded-md shadow-lg  pb-1">
              {menuItems.map((item, index) => (
                <div className="mb-3" key={index}>
                  <Link
                    href={item.path}
                    className="mx-4 flex flex-row items-center  cursor-pointer h-8 "
                  >
                    <div className="mr-2 rounded-full h-8 w-8 bg-grey3 flex items-center justify-center ">
                      <span>{item.icon}</span>
                    </div>
                    <p className="text-grey1 h-8 hover:text-white text-center">
                      {item.label}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <span className="mt-4  ml-3 md:ml-8 lg:mt-0 ">
        <Link href={`/how-it-works`} className={checkIsActive("howItWorks")}>
          {t("howItWorks")}
        </Link>
      </span>
      <span className="mt-4 ml-3 md:ml-8 lg:mt-0">
        <Link href={`/faq`} className={checkIsActive("faq")}>
          {t("faq")}
        </Link>
      </span>
    </nav>
  );
};
export default NavList;
