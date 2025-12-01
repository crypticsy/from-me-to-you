import { Letter, LetterContainer } from "../components";
import { IoShirt } from "react-icons/io5";
import { PiSparkle, PiHeart, PiStar, PiSmiley, PiFlower } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface SweaterConfig {
  color: string;
  pattern: string;
  stickers: string[];
}

// Sweater SVG Component
const SweaterDisplay = ({ color, pattern, stickers }: SweaterConfig) => {
  const colorMap: Record<string, string> = {
    rose: "#fda4af",      // Soft rose pink
    lavender: "#c4b5fd",  // Soft lavender
    mint: "#a7f3d0",      // Soft mint green
    peach: "#fecaca",     // Soft peach
    sky: "#bae6fd",       // Soft sky blue
    lilac: "#e9d5ff",     // Soft lilac
    cream: "#fef3c7",     // Soft cream
    coral: "#fecdd3"      // Soft coral
  };

  const sweaterColor = colorMap[color] || colorMap.rose;

  const getPatternDef = (pattern: string) => {
    switch (pattern) {
      case "stripes":
        return (
          <pattern id="pattern" x="0" y="0" width="20" height="100" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="20" height="100" fill={sweaterColor} />
            <rect x="0" y="0" width="10" height="100" fill="white" fillOpacity="0.3" />
          </pattern>
        );
      case "dots":
        return (
          <pattern id="pattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="30" height="30" fill={sweaterColor} />
            <circle cx="15" cy="15" r="4" fill="white" fillOpacity="0.3" />
          </pattern>
        );
      case "zigzag":
        return (
          <pattern id="pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="20" height="20" fill={sweaterColor} />
            <path d="M0 10 L5 5 L10 10 L15 5 L20 10 L20 20 L0 20 Z" fill="white" fillOpacity="0.3" />
          </pattern>
        );
      default:
        return null;
    }
  };

  // Center position for 1 sticker inside the sweater body
  const stickerPositions = [
    { x: 230, y: 180 }   // Center
  ];

  const stickerIconPaths: Record<string, string> = {
    heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    smiley: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z",
    flower: "M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z",
    sparkle: "M12 2l2.4 7.2L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.8L12 2z"
  };

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full max-w-md mx-auto">
      <defs>
        {pattern !== "solid" && getPatternDef(pattern)}
      </defs>

      {/* Sweater body */}
      <g>
        {/* Main body */}
        <path
          d="M 120 120 L 120 320 Q 120 340 140 340 L 260 340 Q 280 340 280 320 L 280 120"
          fill={pattern === "solid" ? sweaterColor : "url(#pattern)"}
          stroke="#333"
          strokeWidth="3"
        />

        {/* Neckline */}
        <ellipse
          cx="200"
          cy="120"
          rx="40"
          ry="20"
          fill={pattern === "solid" ? sweaterColor : "url(#pattern)"}
          stroke="#333"
          strokeWidth="3"
        />

        {/* Left sleeve */}
        <path
          d="M 120 120 Q 80 140 60 200 L 60 240 Q 60 250 70 250 L 100 250 Q 110 250 110 240 L 110 160"
          fill={pattern === "solid" ? sweaterColor : "url(#pattern)"}
          stroke="#333"
          strokeWidth="3"
        />

        {/* Right sleeve */}
        <path
          d="M 280 120 Q 320 140 340 200 L 340 240 Q 340 250 330 250 L 300 250 Q 290 250 290 240 L 290 160"
          fill={pattern === "solid" ? sweaterColor : "url(#pattern)"}
          stroke="#333"
          strokeWidth="3"
        />

        {/* Ribbing at bottom */}
        <rect
          x="120"
          y="330"
          width="160"
          height="10"
          fill="#333"
          fillOpacity="0.2"
        />

        {/* Ribbing at cuffs */}
        <rect x="60" y="240" width="40" height="10" fill="#333" fillOpacity="0.2" />
        <rect x="300" y="240" width="40" height="10" fill="#333" fillOpacity="0.2" />

        {/* Stickers */}
        {stickers.map((sticker, index) => {
          const pos = stickerPositions[index] || stickerPositions[0];
          const iconPath = stickerIconPaths[sticker];
          if (!iconPath) return null;

          return (
            <g key={index} transform={`translate(${pos.x - 12}, ${pos.y - 12})`}>
              <svg x="0" y="0" width="32" height="32" viewBox="0 0 24 24">
                <path d={iconPath} fill="#2E2828" />
              </svg>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export function CustomSweater() {
  const location = useLocation();
  const [config, setConfig] = useState<SweaterConfig>({
    color: "rose",
    pattern: "solid",
    stickers: []
  });

  useEffect(() => {
    // Parse URL parameters
    const params = new URLSearchParams(location.search);
    const color = params.get("color") || "rose";
    const pattern = params.get("pattern") || "solid";
    const stickersParam = params.get("stickers") || "";
    const stickers = stickersParam ? stickersParam.split(",") : [];

    setConfig({ color, pattern, stickers });
  }, [location.search]);

  return (
    <Letter theme="sweater">
      <LetterContainer bgGradient="from-purple-50 via-pink-50 to-blue-50">
        {/* Title */}
        <h1
          className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-purple-600 leading-tight"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          A Sweater Just for You
        </h1>

        {/* Sweater Display */}
        <div className="w-full max-w-lg mx-auto my-2">
          <SweaterDisplay {...config} />
        </div>

        {/* Message */}
        <div
          className="space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 px-2 sm:px-4 md:px-6 max-w-3xl"
          style={{ fontFamily: "'Indie Flower', cursive" }}
        >
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.3s" }}>
            I made this for you,
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.6s" }}>
            with everything I never said out loud.
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.9s" }}>
            I hope it keeps you warm
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "1.2s" }}>
            in the ways I wish I could.
          </p>
        </div>

        {/* Signature */}
        <div
          className="pt-4 sm:pt-5 md:pt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 italic animate-fadeInUp leading-relaxed"
          style={{
            fontFamily: "'Indie Flower', cursive",
            animationDelay: "1.2s",
          }}
        >
          <p>~ Made with love ~</p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
