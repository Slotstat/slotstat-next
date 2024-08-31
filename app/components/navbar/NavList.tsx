import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";
import { useState, useRef, useEffect } from "react";
import Geo from "./Geo";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { countries } from "@/app/utils/countries";

const menuItems = [
  { icon: "🕹️", label: "Slot", path: "/blog/slots" },
  { icon: "🎰", label: "Casino", path: "/blog/casinos" },
  { icon: "📡", label: "Provider", path: "/blog/providers" },
  { icon: "📰", label: "News", path: "/blog/news" },
  { icon: "🎓", label: "Education", path: "/blog/education" },
];

const NavList = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGeoVisible, setIsGeoOpen] = useState(false);
  const [chosenCountry, setChosenCountry] = useState<country>();
  const [chosenState, setChosenState] = useState<countryOrState>();

  const t = useTranslations("navbar");
  const pathName = usePathname();

  const geoRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const checkIsActive = (path: string) => {
    if (!pathName) return "text-grey1";
    const segments = pathName.split("/");
    return segments[1] === path
      ? "text-white"
      : "text-grey1 hover:text-white";
  };

  useEffect(() => {
    const countryCode = getCookie("country");
    const region = getCookie("region");
    if (countryCode) {
      const countryByCookie = countries.filter((countryObject) =>
        countryObject.code.includes(countryCode)
      );
      if (countryByCookie[0].states && region) {
        const regionByCookie = countryByCookie[0].states.filter(
          (regionObject) => regionObject.code.includes(region)
        );
        setChosenState(regionByCookie[0]);
      }
      setChosenCountry(countryByCookie[0]);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        geoRef.current &&
        triggerRef.current &&
        !geoRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsGeoOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className=" flex flex-row  font-bold text-xs md:text-sm">
      <div className="hidden lg:flex my-2 flex-row lg:my-0 ml-auto lg:items-center ">
        <div className="relative">
          <span
            // onMouseEnter={() => setIsVisible(true)}
            // onMouseLeave={() => setIsVisible(false)}
            className="mt-4 ml-3 md:ml-8 lg:mt-0"
          >
            <Link
              href={"/blog/slots"}
              className={checkIsActive("howItWorks")}
            >
              {t("blog")}
            </Link>
            <div className="absolute top-0 -right-2 h-1.5 w-1.5 bg-red rounded" />
          </span>
          {isVisible && (
            <div
              onMouseEnter={() => setIsVisible(true)}
              onMouseLeave={() => setIsVisible(false)}
              className="z-50 top-full left-0 w-[154px] absolute font-bold pt-8 -mt-2 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <div className="pt-4 border-grey2 border bg-dark1 rounded-md shadow-lg pb-1">
                {menuItems.map((item, index) => (
                  <div className="group mb-3" key={index}>
                    <Link
                      href={item.path}
                      className="mx-4 flex flex-row items-center cursor-pointer h-8"
                    >
                      <div className="mr-2 rounded-full h-8 w-8 bg-grey3 group-hover:bg-dark3 flex items-center justify-center">
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
        <span className="mt-4 ml-3 md:ml-8 lg:mt-0">
          <Link
            href={`/how-it-works`}
            className={checkIsActive("howItWorks")}
          >
            {t("howItWorks")}
          </Link>
        </span>
        <span className="mt-4 ml-3 md:ml-8 lg:mt-0">
          <Link href={`/faq`} className={checkIsActive("faq")}>
            {t("faq")}
          </Link>
        </span>
      </div>
      <div className="lg:relative" ref={triggerRef}>
        <div
          onClick={() => setIsGeoOpen(!isGeoVisible)}
          className={`ml-8 text-lg rounded-full h-[36px] w-[36px] flex items-center justify-center cursor-pointer hover:bg-grey1 
            ${isGeoVisible ? "bg-grey1" : "bg-grey3"}
            `}
        >
          <span>{chosenCountry?.emoji}</span>
        </div>
        {isGeoVisible && (
          <div ref={geoRef}>
            <Geo
              chosenCountry={chosenCountry}
              setChosenCountry={setChosenCountry}
              chosenState={chosenState}
              setChosenState={setChosenState}
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavList;
