import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useState } from "react";
import ArrowDown from "@/app/assets/svg/ArrowDown";

const menuItems = [
  { icon: "🕹️", label: "Slot", path: "/blog/slots" },
  { icon: "🎰", label: "Casino", path: "/blog/casinos" },
  { icon: "📡", label: "Provider", path: "/blog/providers" },
  { icon: "📰", label: "News", path: "/blog/news" },
  { icon: "🎓", label: "Education", path: "/blog/education" },
];

const NavList = ({}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGeoVisible, setIsGeoOpen] = useState(false);
  const [showCountries, setShowCountries] = useState(false);

  const t = useTranslations("navbar");
  const pathName = usePathname();

  const checkIsActive = (path: string) => {
    if (!pathName) return "text-grey1";
    const segments = pathName.split("/");
    return segments[1] === path ? "text-white" : "text-grey1 hover:text-white";
  };

  const blog = [
    { icon: "🇨🇦", title: "Canada" },
    { icon: "🇬🇪", title: "Georgia" },
    { icon: "🇧🇷", title: "Brazil" },
    { icon: "🇦🇷", title: "Argentina" },
    { icon: "🇩🇪", title: "Germany" },
    { icon: "🇨🇦", title: "Canada" },
    { icon: "🇬🇪", title: "Georgia" },
    { icon: "🇧🇷", title: "Brazil" },
    { icon: "🇦🇷", title: "Argentina" },
    { icon: "🇩🇪", title: "Germany" },
  ];

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
          <div className="absolute top-0 -right-2 h-1.5 w-1.5 bg-red rounded" />
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
                <div className="group mb-3" key={index}>
                  <Link
                    href={item.path}
                    className="mx-4 flex flex-row items-center  cursor-pointer h-8 "
                  >
                    <div className="mr-2 rounded-full h-8 w-8 bg-grey3 group-hover:bg-dark3 flex items-center justify-center ">
                      <span>{item.icon}</span>
                    </div>
                    <p className="text-grey1 h-8 group-hover:text-white text-center pt-1">
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

      {/* <div className="relative">
        <div
          onClick={() => setIsGeoOpen(!isGeoVisible)}
          className="mt-4 ml-3 md:ml-8 lg:mt-0 cursor-pointer"
        >
          <div className={"text-grey1 hover:text-white "}>lang</div>
        </div>
        {isGeoVisible && (
          <div
            className="z-50 top-full  right-0  absolute
            font-bold pt-8  transition duration-200 ease-in-out  data-[closed]:-translate-y-1 data-[closed]:opacity-0"
          >
            <div className="h-[216px] w-[342px] p-4 bg-dark1 border border-grey1 rounded-xl">
              <p className=" text-base font-bold text-white mb-4">
                Your country of residence
              </p>
              <div
                onClick={() => setShowCountries(!showCountries)}
                className=" relative h-12 w-full bg-grey3 rounded-lg mb-12 flex flex-row justify-between items-center p-3"
              >
                <div>
                  <div
                    className={` font-normal flex flex-row items-center  cursor-pointer  text-white `}
                  >
                    <div className="mr-2 rounded-full h-8 w-8 bg-grey3 flex items-center justify-center ">
                      <span>🎰</span>
                    </div>
                    Canada
                  </div>
                </div>
                <ArrowDown />
                {showCountries && (
                  <div className="z-50 top-full left-0  w-full h-72 mt-1 absolute bg-grey3 rounded-lg p-3 overflow-y-auto">
                    {blog.map(
                      ({ title, icon }: { title: string; icon?: string }) => (
                        <div
                          className={`mb-3 font-bold flex flex-row items-center  cursor-pointer text-grey1  `}
                        >
                          <div className="mr-2 rounded-full h-8 w-8 bg-dark1 flex items-center justify-center ">
                            <span>{icon}</span>
                          </div>
                          {title}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-row justify-between">
                <div
                  className="  text-grey1 bg-grey3 h-12 w-[147px]
                     items-center justify-center flex py-2 rounded-lg  text-xs md:text-base cursor-pointer"
                >
                  <p>Current location</p>
                </div>
                <div
                  className=" hover:text-[#969CB0] hover:bg-blue3 text-white bg-blue1 h-12 w-[147px]
                     items-center justify-center flex py-2 rounded-lg  text-xs md:text-base cursor-pointer"
                >
                  <p>Save</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div> */}
    </nav>
  );
};
export default NavList;
