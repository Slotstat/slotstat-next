import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";
import { useState, useRef, useEffect } from "react";
import Geo from "./Geo";
import { getCookie } from "cookies-next";
import { countries } from "@/app/utils/countries";
import EmojiText from "../ui/EmojiText";
import { useSession } from "next-auth/react";
import ProfileMenu from "./ProfileMenue";
import { ProfileIcon } from "@/app/assets/svg/SVGComponents";
import ButtonComp from "../Authentication/ButtonComp";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const menuItems = [
  { icon: "🕹️", label: "Slot", path: "/blog/slots" },
  { icon: "🎰", label: "Casino", path: "/blog/casinos" },
  { icon: "📡", label: "Provider", path: "/blog/providers" },
  { icon: "📰", label: "News", path: "/blog/news" },
  { icon: "🎓", label: "Education", path: "/blog/education" },
];

const NavList = () => {
  const { data: session, status } = useSession();

  const [isVisible, setIsVisible] = useState(false);
  const [isGeoVisible, setIsGeoOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const [initialCountry, setInitialCountry] = useState<country>();
  const [initialState, setInitialState] = useState<countryOrState>();

  const t = useTranslations("navbar");
  const pathName = usePathname();

  const geoRef = useRef<HTMLDivElement | null>(null);
  const triggerGeoRef = useRef<HTMLDivElement | null>(null);
  const triggerProfileRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const checkIsActive = (path: string) => {
    if (!pathName) return "text-grey1";
    const segments = pathName.split("/");
    return segments[1] === path ? "text-white" : "text-grey1 hover:text-white";
  };

  useEffect(() => {
    const countryCode = getCookie("country");
    const region = getCookie("region");
    if (countryCode) {
      const countryByCookie = countries.filter((countryObject) =>
        countryObject.code.includes(countryCode)
      );
      if (countryByCookie[0].states && region) {
        const regionByCookie = countryByCookie[0].states.filter((regionObject) =>
          regionObject.code.includes(region)
        );
        setInitialState(regionByCookie[0]);
      }
      setInitialCountry(countryByCookie[0]);
    }

    const handleClickOutsideGeo = (event: MouseEvent) => {
      if (
        geoRef.current &&
        triggerGeoRef.current &&
        !geoRef.current.contains(event.target as Node) &&
        !triggerGeoRef.current.contains(event.target as Node)
      ) {
        setIsGeoOpen(false);
      }
      if (
        profileRef.current &&
        triggerProfileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        !triggerProfileRef.current.contains(event.target as Node)
      ) {
        setIsProfileVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideGeo);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideGeo);
    };
  }, []);

  return (
    <nav className="flex flex-row font-bold text-xs md:text-sm">
      <div className="hidden lg:flex my-2 flex-row lg:my-0 ml-auto lg:items-center ">
        <div className="relative">
          <span
            // onMouseEnter={() => setIsVisible(true)}
            // onMouseLeave={() => setIsVisible(false)}
            className="mt-4 ml-3 md:ml-8 lg:mt-0"
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
          <Link href={`/how-it-works`} className={checkIsActive("howItWorks")}>
            {t("howItWorks")}
          </Link>
        </span>
        <span className="mt-4 ml-3 md:ml-8 lg:mt-0">
          <Link href={`/faq`} className={checkIsActive("faq")}>
            {t("faq")}
          </Link>
        </span>
        {status === "loading" ? (
          <span className="mt-4 ml-3 md:ml-8 lg:mt-0  ">
            <SkeletonTheme baseColor="#24262C" highlightColor="#444">
              <section className="flex w-44 ">
                <Skeleton count={1} className="h-12 min-w-20 " />
                <Skeleton count={1} className="h-12 min-w-20 ml-3" />
              </section>
            </SkeletonTheme>
          </span>
        ) : (
          !session && (
            <>
              <span className="mt-4 ml-3 md:ml-8 lg:mt-0 ">
                <Link href={`/auth/login`}>
                  <ButtonComp
                    type="button"
                    extraButtonClasses="w-full text-grey1 !text-sm !font-bold py-2 px-5  hover:bg-grey2 bg-dark1 border border-grey1 "
                    title="Log in"
                  />
                </Link>
              </span>

              <span className="mt-4 ml-2 md:ml-3 lg:mt-0">
                <Link href={`/auth/sign-up`}>
                  <ButtonComp
                    type="button"
                    extraButtonClasses="w-full text-white !text-sm py-2 px-5 !font-bold "
                    title="Sign up"
                  />
                </Link>
              </span>
            </>
          )
        )}
      </div>
      <div className="lg:relative" ref={triggerGeoRef}>
        <div
          onClick={() => setIsGeoOpen(!isGeoVisible)}
          className={`ml-8 text-lg rounded-full h-[36px] w-[36px] flex items-center justify-center cursor-pointer hover:bg-grey1 
            ${isGeoVisible ? "bg-grey1" : "bg-grey3"}
            `}
        >
          {initialCountry?.emoji && <EmojiText item={initialCountry} />}
        </div>
        {isGeoVisible && (
          <div ref={geoRef}>
            <Geo initialCountry={initialCountry} initialState={initialState} />
          </div>
        )}
      </div>

      {session && (
        <div className="lg:relative" ref={triggerProfileRef}>
          <div
            onClick={() => setIsProfileVisible(!isProfileVisible)}
            className={`ml-4 text-lg rounded-full h-[36px] w-[36px] flex items-center justify-center cursor-pointer hover:bg-grey1 
            ${isProfileVisible ? "bg-grey1" : "bg-grey3"}
            `}
          >
            {session?.user?.image ? (
              <img src={session?.user?.image} alt={session?.user?.name} className="h-4 w-4" />
            ) : (
              <ProfileIcon />
            )}
          </div>
          {isProfileVisible && (
            <div ref={profileRef}>
              <ProfileMenu />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavList;
