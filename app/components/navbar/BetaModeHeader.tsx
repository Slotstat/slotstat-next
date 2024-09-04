import { ArrowLinkBig, ArrowLinkSmall } from "@/app/assets/svg/SVGComponents";

const BetaModeHeader = ({ blueNav }: { blueNav: string }) => (
  <div
    className={`${blueNav}  overflow-hidden transition-all duration-300  flex justify-center items-center text-white bg-blue-500 fixed  top-0 left-0 right-0 z-10`}
  >
    <div className="w-[100%] md:max-w-screen-xl text-xs mx-2 md:mx-0 md:text-base flex justify-between">
      <div className="flex">The site is in beta mode</div>

      <div className="hidden relative group md:flex pr-7 pt-1 ">
        <a className="font-bold" href={`mailto:info@slotstat.net`}>
          Report any issues
        </a>
        <div className="absolute right-1 top-1 transition-all duration-100 ease-in-out group-hover:top-0 group-hover:right-0">
          <ArrowLinkBig />
        </div>
      </div>

      <div className="flex md:hidden">
        <a className="font-bold" href={`mailto:info@slotstat.net`}>
          Report issues
        </a>
        <ArrowLinkSmall />
      </div>
    </div>
  </div>
);

export default BetaModeHeader;
