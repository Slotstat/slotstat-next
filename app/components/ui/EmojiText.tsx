import twemoji from "twemoji";
import { useEffect, ReactNode } from "react";

export default function EmojiText({ emoji }: { emoji: string }) {
  useEffect(() => {
    twemoji.parse(document.body);
  }, []);

  return <span>{emoji}</span>;
}
