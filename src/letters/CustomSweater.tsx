import { Letter } from "../components";
import { IoShirt } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ACCENT = "#FC5C65";

interface SweaterConfig {
  color: string;
  pattern: string;
  stickers: string[];
  lang: "en" | "np";
}

const colorMap: Record<string, string> = {
  rose: "#fda4af",
  lavender: "#c4b5fd",
  mint: "#a7f3d0",
  peach: "#fecaca",
  sky: "#bae6fd",
  lilac: "#e9d5ff",
  cream: "#fef3c7",
  coral: "#fecdd3",
};

const stickerIconPaths: Record<string, string> = {
  heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  smiley: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z",
  sparkle: "M12 2l2.4 7.2L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.8L12 2z",
};

const SweaterDisplay = ({ color, pattern, stickers }: Omit<SweaterConfig, "lang">) => {
  const sweaterColor = colorMap[color] || colorMap.rose;
  const fill = pattern === "solid" ? sweaterColor : "url(#sw-pattern)";

  const getPatternDef = () => {
    switch (pattern) {
      case "stripes":
        return (
          <pattern id="sw-pattern" x="0" y="0" width="20" height="100" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="20" height="100" fill={sweaterColor} />
            <rect x="0" y="0" width="10" height="100" fill="white" fillOpacity="0.3" />
          </pattern>
        );
      case "dots":
        return (
          <pattern id="sw-pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="30" height="30" fill={sweaterColor} />
            <circle cx="15" cy="15" r="4" fill="white" fillOpacity="0.3" />
          </pattern>
        );
      case "zigzag":
        return (
          <pattern id="sw-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="20" height="20" fill={sweaterColor} />
            <path d="M0 10 L5 5 L10 10 L15 5 L20 10 L20 20 L0 20 Z" fill="white" fillOpacity="0.3" />
          </pattern>
        );
      default: return null;
    }
  };

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>{pattern !== "solid" && getPatternDef()}</defs>
      <path d="M 120 120 L 120 320 Q 120 340 140 340 L 260 340 Q 280 340 280 320 L 280 120" fill={fill} stroke="#33333318" strokeWidth="2" />
      <ellipse cx="200" cy="120" rx="40" ry="20" fill={fill} stroke="#33333318" strokeWidth="2" />
      <path d="M 120 120 Q 80 140 60 200 L 60 240 Q 60 250 70 250 L 100 250 Q 110 250 110 240 L 110 160" fill={fill} stroke="#33333318" strokeWidth="2" />
      <path d="M 280 120 Q 320 140 340 200 L 340 240 Q 340 250 330 250 L 300 250 Q 290 250 290 240 L 290 160" fill={fill} stroke="#33333318" strokeWidth="2" />
      <rect x="120" y="330" width="160" height="10" fill="#333" fillOpacity="0.10" />
      <rect x="60" y="240" width="40" height="10" fill="#333" fillOpacity="0.10" />
      <rect x="300" y="240" width="40" height="10" fill="#333" fillOpacity="0.10" />
      {stickers.slice(0, 1).map((sticker, i) => {
        const path = stickerIconPaths[sticker];
        if (!path) return null;
        return (
          <g key={i} transform="translate(218, 168)">
            <svg x="0" y="0" width="32" height="32" viewBox="0 0 24 24">
              <path d={path} fill="#2E2828" />
            </svg>
          </g>
        );
      })}
    </svg>
  );
};

const nepaliLines = [
  "ना, ना",
  "ना ना ना, ना",
  "तिमीबिना तिमी हुनू",
  "नछोएरै हरदम छुनू",
  "भेटिरहनू नपर्खेर",
  "रुझाइरहनू नबर्सेर",
  "ए, आ हा, हा, बुकीफूल",
  "तिमीजस्तै न्यानो, हो",
  "तिमीजस्तै शीतल",
  "ऊनको स्विटर",
];

const englishLines = [
  "I've been carrying this warmth",
  "for longer than I can explain.",
  "So I stitched it into something",
  "you could actually hold onto,",
  "every loop, every thread,",
  "a word I couldn't say out loud.",
  "Wear it when the cold gets in.",
  "Know that someone out there",
  "is thinking of you,",
  "wishing they could wrap you",
  "in everything they feel.",
];

export function CustomSweater() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const receiverName = searchParams.get("to");
  const senderName = searchParams.get("from");

  const [config, setConfig] = useState<SweaterConfig>({
    color: "rose",
    pattern: "solid",
    stickers: [],
    lang: "en",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setConfig({
      color: params.get("color") || "rose",
      pattern: params.get("pattern") || "solid",
      stickers: params.get("stickers")?.split(",").filter(Boolean) ?? [],
      lang: (params.get("lang") as "en" | "np") || "en",
    });
  }, [location.search]);

  const lines = config.lang === "np" ? nepaliLines : englishLines;

  return (
    <Letter theme="sweater">
      <div className="h-screen-safe w-screen flex flex-col sm:flex-row items-center justify-center bg-[#FFF8F0] safe-left safe-right overflow-hidden gap-6 sm:gap-10 px-4 sm:px-10 py-6">

        {/* ── Sweater (outside the letter) ── */}
        <div className="flex-shrink-0 w-64 sm:w-80 md:w-[26rem]">
          <SweaterDisplay {...config} />
        </div>

        {/* ── Inline letter card ── */}
        <div
          className="relative flex flex-col overflow-hidden animate-fadeIn w-full max-w-xs sm:max-w-sm"
          style={{
            background: "#FAFAFA",
            border: "1.5px solid #E4DDD6",
            borderRadius: "3px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.06), 0 10px 28px rgba(0,0,0,0.09), 4px 5px 0px #D8CFC6",
            minHeight: "min(75vh, 520px)",
            maxHeight: "88vh",
          }}
        >
          {/* Accent top bar */}
          <div className="h-[3px] w-full flex-shrink-0" style={{ background: ACCENT }} />

          {/* Ruled lines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `repeating-linear-gradient(to bottom, transparent, transparent 31px, #E8E2DA 31px, #E8E2DA 32px)`,
              backgroundPositionY: "72px",
              opacity: 0.5,
            }}
          />

          {/* Watermark */}
          <div
            className="absolute bottom-4 right-4 pointer-events-none select-none text-[80px]"
            style={{ color: ACCENT, opacity: 0.06, lineHeight: 1 }}
          >
            <IoShirt />
          </div>

          {/* Left margin rule */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none"
            style={{ left: "46px", width: "1px", background: "#E4B4B4", opacity: 0.45 }}
          />

          {/* Letter body */}
          <div
            className="relative flex flex-col flex-1 overflow-y-auto scrollbar-hide"
            style={{ paddingLeft: "58px", paddingRight: "24px", paddingTop: "22px", paddingBottom: "36px" }}
          >
            {receiverName && (
              <p className="font-short-stack text-sm sm:text-base text-[#1A1208] mb-4 flex-shrink-0">
                Dear <span className="font-semibold">{receiverName}</span>,
              </p>
            )}

            <div
              key={config.lang}
              className="flex-1 text-[#1A1208] text-base font-short-stack space-y-1"
              style={{ lineHeight: "2.2" }}
            >
              {lines.map((line, i) => (
                <p
                  key={i}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${0.05 * i}s` }}
                >
                  {line}
                </p>
              ))}
            </div>

            <div className="flex-shrink-0 pt-6 font-short-stack text-sm sm:text-base text-[#1A1208] space-y-0.5">
              <p className="italic text-[#6B5A4E]">With love,</p>
              <p className="font-semibold">
                {senderName || <span className="italic font-normal text-[#B5A092]">Your secret admirer</span>}
              </p>
            </div>
          </div>
        </div>

      </div>
    </Letter>
  );
}
