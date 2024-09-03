"use client";
import Image from "next/image";
import { useEffect, ReactNode, useRef, useState } from "react";

// function checkEmojiSupport() {
//   if (typeof window !== "undefined") {
//     if (localStorage.getItem("isEmojiSupported") !== null) {
//       return JSON.parse(localStorage.getItem("isEmojiSupported"));
//     }

//     const context = document.createElement("canvas").getContext("2d");
//     context.font = "32px Arial";
//     const text = "😂"; // Test with a common emoji
//     const width = context.measureText(text).width;
//     const fallbackWidth = context.measureText("😂").width;

//     const supported = width !== fallbackWidth;
//     localStorage.setItem("isEmojiSupported", JSON.stringify(supported));
//     return supported;
//   }
//   return true; // Assume supported in SSR environments
// }

export default function EmojiText({ item }: { item: country }) {
  //   const [isEmojiSupported, setIsEmojiSupported] = useState(true);

  //   useEffect(() => {
  //     setIsEmojiSupported(checkEmojiSupport());
  //   }, []);

  return (
    <img src={item.image} className="h-4 w-4" />
    // <>
    //   {false ? (
    //     <span>{item.emoji}</span>
    //   ) : (
    // <img src={item.image} className="h-5 w-5" />
    //   )}
    // </>
  );
}
