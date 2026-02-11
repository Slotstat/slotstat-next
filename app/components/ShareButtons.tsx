"use client";

import React, { useEffect, useState } from "react";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { FacebookIcon, TelegramIcon, WhatsappIcon, XIcon } from "../assets/svg/ShareIcons";
import { usePathname } from "next/navigation";

interface ShareButtonsProps {
  title: string;
  stats?: {
    rtp?: number;
    maxWin?: number;
  };
}

export default function ShareButtons({ title, stats }: ShareButtonsProps) {
  const pathname = usePathname();
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    setShareUrl(`${window.location.origin}${pathname}`);
  }, [pathname]);

  const shareText = `Check out the statistics for ${title} on SlotStat! ${
    stats?.rtp ? `RTP: ${stats.rtp}%` : ""
  } ${stats?.maxWin ? `Max Win: ${stats.maxWin}x` : ""}`;

  return (
    <div className="flex items-center space-x-4 ml-2 md:ml-4">
      <WhatsappShareButton url={shareUrl} title={shareText} separator=" - ">
        <div className="hover:opacity-80 transition-opacity">
          <WhatsappIcon className="w-6 h-6 md:w-7 md:h-7 text-gray-400 hover:text-white transition-colors" />
        </div>
      </WhatsappShareButton>

      <TelegramShareButton url={shareUrl} title={shareText}>
        <div className="hover:opacity-80 transition-opacity">
          <TelegramIcon className="w-6 h-6 md:w-7 md:h-7 text-gray-400 hover:text-white transition-colors" />
        </div>
      </TelegramShareButton>

      <TwitterShareButton url={shareUrl} title={shareText}>
        <div className="hover:opacity-80 transition-opacity">
          <XIcon className="w-6 h-6 md:w-7 md:h-7 text-gray-400 hover:text-white transition-colors" />
        </div>
      </TwitterShareButton>

      <FacebookShareButton
        url={shareUrl}
        hashtag="#slotstat"
        className="hover:opacity-80 transition-opacity flex items-center justify-center pointer-events-auto"
      >
        <FacebookIcon className="w-6 h-6 md:w-7 md:h-7 text-gray-400 hover:text-white transition-colors" />
      </FacebookShareButton>
    </div>
  );
}
