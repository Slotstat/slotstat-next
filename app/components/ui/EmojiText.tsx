"use client";
import twemoji from "twemoji";
import { useEffect, ReactNode, useRef } from "react";

export default function EmojiText({ emoji }: { emoji: string }) {
  const emojiContainerRef = useRef(null);

  useEffect(() => {
    if (emojiContainerRef.current) {
      twemoji.parse(emojiContainerRef.current);
    }
  }, []);

  return <span ref={emojiContainerRef}>{emoji}</span>;
}
