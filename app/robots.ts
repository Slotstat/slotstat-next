import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/private/",
          "/api/",
          "/*?*casId=",
          "/*?*isFiat=",
          "/*?*keyWord=",
          "/*?*compareGameId=",
          "/*?*orderBy=",
          "/*?*direction=",
          "/*?*ActiveTab=",
        ],
      },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
    ],
    sitemap: "https://slotstat.net/sitemap.xml",
    host: "https://slotstat.net",
  };
}
