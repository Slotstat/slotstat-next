"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { close, cookie } from "../assets";
import { useTranslations } from "next-intl";
// import { getCookie, setCookie } from "cookies-next";
// import { generateUniqueId } from "@/lib/uuid";
import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper";

export default function CookieNotification({
  uniqueId,
}: {
  uniqueId?: string;
}) {
  const t = useTranslations("notification");
  const [cookieConsent, setCookieConsent] = useState(false);

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null);

    setCookieConsent(storedCookieConsent);
  }, [setCookieConsent]);

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied";

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    });

    setLocalStorage("cookie_consent", cookieConsent);
  }, [cookieConsent]);

  // uncomment if we need to set user count cookie from here
  // const [showNotification, setShowNotification] = useState(true);

  // const setUserCookie = () => {
  //   const generatedUniqueId = generateUniqueId();

  //   setCookie("uniqueId", generatedUniqueId);

  //   setShowNotification(false);
  // };

  return (
    <div
      className={`${cookieConsent != null ? "hidden" : ""}
      z-10 w-auto md:w-[511px] fixed right-0 ml-6 rounded-xl border border-grey1 p-6 bottom-0 mr-5 mb-5 sm:mr-6 sm:mb-6 shadow-2xl bg-dark2`}
    >
      <div className="flex justify-between mb-3">
        <Image src={cookie} alt="" className="h-9 w-9" width={36} height={36} />
        <button
          className="flex items-center justify-center"
          onClick={() => setCookieConsent(true)}
        >
          <Image
            src={close}
            alt=""
            className="h-6 w-6"
            width={24}
            height={24}
          />
        </button>
      </div>

      <div className="flex flex-col my-3 text-sm">
        <h6 className=" text-grey1 font-black text-xs">{t("cookieText")}</h6>
      </div>

      <div className="flex flex-row justify-between text-sm mt-4">
        {/* <button
          onClick={() => setCookieConsent(false)}
          className="cursor-pointer  flex flex-1 rounded-xl px-8 py-4 bg-grey3 text-xs text-grey1 mr-3 items-center justify-center"
        >
          {t("RejectAll")}
        </button> */}
        <button
          onClick={() => setCookieConsent(true)}
          className="cursor-pointer flex flex-1 rounded-xl px-8 py-4 bg-blue1 text-xs text-white items-center justify-center"
        >
          {t("AcceptAllCookies")}
        </button>
      </div>
    </div>
  );
}
