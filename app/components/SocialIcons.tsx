import React from "react";
import {
  InstagramSmall,
  RedditSmall,
  XSmall,
  YoutubeSmall,
} from "../assets/svg/FooterIcons";

export default function SocialIcons() {
  return (
    <div className="order-3 flex flex-row justify-between mt-2 md:hidden  ">
      <a href="https://x.com/slotstat_net" target="_blank" className="">
        <XSmall />
      </a>
      <a
        href="https://www.instagram.com/slotstat_net"
        target="_blank"
        className=""
      >
        <InstagramSmall />
      </a>
      <a
        href="https://www.reddit.com/r/SlotStrategy/"
        target="_blank"
        className=""
      >
        <RedditSmall />
      </a>
      <a href="https://x.com/slotstat_net" target="_blank" className="">
        <YoutubeSmall />
      </a>
    </div>
  );
}
