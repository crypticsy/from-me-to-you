import { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { PiEyeBold, PiShareNetworkBold, PiHeart, PiStar, PiSmiley, PiFlower, PiSparkle } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

interface SweaterCustomizationModalProps {
  visible: boolean;
  onHide: () => void;
}

interface SweaterConfig {
  color: string;
  pattern: string;
  stickers: string[];
}

// Sweater SVG Component
const SweaterPreview = ({ color, pattern, stickers }: SweaterConfig) => {
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
    <svg viewBox="0 0 400 400" className="w-full h-full">
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
                <path d={iconPath} fill="#ffffff" />
              </svg>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export function SweaterCustomizationModal({ visible, onHide }: SweaterCustomizationModalProps) {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [config, setConfig] = useState<SweaterConfig>({
    color: "rose",
    pattern: "solid",
    stickers: []
  });

  const colors = [
    { name: "Rose", value: "rose", bg: "bg-rose-300" },
    { name: "Lavender", value: "lavender", bg: "bg-purple-300" },
    { name: "Mint", value: "mint", bg: "bg-emerald-300" },
    { name: "Peach", value: "peach", bg: "bg-red-200" },
    { name: "Sky", value: "sky", bg: "bg-sky-300" },
    { name: "Lilac", value: "lilac", bg: "bg-violet-300" },
    { name: "Cream", value: "cream", bg: "bg-yellow-200" },
    { name: "Coral", value: "coral", bg: "bg-pink-300" }
  ];

  const patterns = [
    { name: "Solid", value: "solid" },
    { name: "Stripes", value: "stripes" },
    { name: "Dots", value: "dots" },
    { name: "Zigzag", value: "zigzag" }
  ];

  const stickers = [
    { name: "Heart", value: "heart", icon: <PiHeart className="text-lg" /> },
    { name: "Star", value: "star", icon: <PiStar className="text-lg" /> },
    { name: "Smiley", value: "smiley", icon: <PiSmiley className="text-lg" /> },
    { name: "Flower", value: "flower", icon: <PiFlower className="text-lg" /> },
    { name: "Sparkle", value: "sparkle", icon: <PiSparkle className="text-lg" /> }
  ];

  const handleColorSelect = (color: string) => {
    setConfig({ ...config, color });
  };

  const handlePatternSelect = (pattern: string) => {
    setConfig({ ...config, pattern });
  };

  const handleStickerToggle = (sticker: string) => {
    const newStickers = config.stickers.includes(sticker)
      ? config.stickers.filter(s => s !== sticker)
      : config.stickers.length < 1
      ? [...config.stickers, sticker]
      : [sticker]; // Replace existing sticker with new one
    setConfig({ ...config, stickers: newStickers });
  };

  const buildUrl = () => {
    const params = new URLSearchParams();
    params.set("color", config.color);
    params.set("pattern", config.pattern);
    if (config.stickers.length > 0) {
      params.set("stickers", config.stickers.join(","));
    }
    return `/customsweater?${params.toString()}`;
  };

  const handlePreview = () => {
    onHide();
    navigate(buildUrl());
  };

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#${buildUrl()}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.current?.show({
        severity: 'success',
        summary: 'Link copied to clipboard ✨',
        life: 1000
      });
    });
  };

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <Dialog
        visible={visible}
        onHide={onHide}
        dismissableMask
        className="w-11/12 max-w-3xl"
        pt={{
          root: { className: 'rounded-3xl shadow-2xl bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50' },
          header: { className: 'hidden' },
          content: { className: 'rounded-3xl p-4 sm:p-5' }
        }}
      >
        <div className="space-y-3">
          {/* Title */}
          <div className="text-center">
            <h2
              className="text-2xl sm:text-3xl text-purple-600"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Customize Your Sweater
            </h2>
            <p
              className="text-xs sm:text-sm text-gray-600 mt-1"
              style={{ fontFamily: "'Indie Flower', cursive" }}
            >
              Make it special!
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column - Options */}
            <div className="space-y-3 order-2 md:order-1">
              {/* Color Selection */}
              <div>
                <label
                  className="block text-base text-gray-700 mb-1.5"
                  style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
                >
                  Choose Color:
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {colors.map(color => (
                    <button
                      key={color.value}
                      onClick={() => handleColorSelect(color.value)}
                      className={`w-full aspect-square ${color.bg} rounded-lg transition-all ${
                        config.color === color.value
                          ? "ring-3 ring-offset-1 ring-gray-700 scale-105"
                          : "hover:scale-105"
                      }`}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Pattern Selection */}
              <div>
                <label
                  className="block text-base text-gray-700 mb-1.5"
                  style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
                >
                  Choose Pattern:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {patterns.map(pattern => (
                    <button
                      key={pattern.value}
                      onClick={() => handlePatternSelect(pattern.value)}
                      className={`px-2 py-1.5 rounded-lg border-2 transition-all text-xs ${
                        config.pattern === pattern.value
                          ? "bg-purple-500 text-white border-purple-600 scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:scale-105"
                      }`}
                      style={{ fontFamily: "'Indie Flower', cursive" }}
                    >
                      {pattern.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sticker Selection */}
              <div>
                <label
                  className="block text-base text-gray-700 mb-1.5"
                  style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
                >
                  Add Sticker (optional):
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {stickers.map(sticker => (
                    <button
                      key={sticker.value}
                      onClick={() => handleStickerToggle(sticker.value)}
                      className={`aspect-square flex flex-col items-center justify-center gap-0.5 rounded-lg border-2 transition-all ${
                        config.stickers.includes(sticker.value)
                          ? "bg-purple-500 text-white border-purple-600 scale-105"
                          : "bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:scale-105"
                      }`}
                      title={sticker.name}
                    >
                      {sticker.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handlePreview}
                  className="w-full py-2 px-3 bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 border-2 border-purple-300 text-purple-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <PiEyeBold className="text-lg" />
                  <span
                    className="text-base"
                    style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
                  >
                    Preview
                  </span>
                </button>

                <button
                  onClick={handleShare}
                  className="w-full py-2 px-3 bg-gradient-to-br from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 border-2 border-blue-300 text-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <PiShareNetworkBold className="text-lg" />
                  <span
                    className="text-base"
                    style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
                  >
                    Share
                  </span>
                </button>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="order-1 md:order-2">
              <div className="bg-white/50 rounded-2xl p-3 h-full flex items-center justify-center">
                <div className="w-full max-w-xs aspect-square">
                  <SweaterPreview {...config} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
