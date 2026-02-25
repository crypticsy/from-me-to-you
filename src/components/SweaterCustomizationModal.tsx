import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import { PiEyeBold, PiShareNetworkBold, PiHeart, PiStar, PiSmiley, PiFlower, PiSparkle, PiXBold } from "react-icons/pi";
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

const SweaterPreview = ({ color, pattern, stickers }: SweaterConfig) => {
  const colorMap: Record<string, string> = {
    rose:     "#fda4af",
    lavender: "#c4b5fd",
    mint:     "#a7f3d0",
    peach:    "#fecaca",
    sky:      "#bae6fd",
    lilac:    "#e9d5ff",
    cream:    "#fef3c7",
    coral:    "#fecdd3",
  };
  const sweaterColor = colorMap[color] || colorMap.rose;

  const getPatternDef = (p: string) => {
    switch (p) {
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

  const stickerIconPaths: Record<string, string> = {
    heart:   "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    smiley:  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z",
    flower:  "M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zM5.6 10.25c0 1.38 1.12 2.5 2.5 2.5.53 0 1.01-.16 1.42-.44l-.02.19c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5l-.02-.19c.4.28.89.44 1.42.44 1.38 0 2.5-1.12 2.5-2.5 0-1-.59-1.85-1.43-2.25.84-.4 1.43-1.25 1.43-2.25 0-1.38-1.12-2.5-2.5-2.5-.53 0-1.01.16-1.42.44l.02-.19C14.5 2.12 13.38 1 12 1S9.5 2.12 9.5 3.5l.02.19c-.4-.28-.89-.44-1.42-.44-1.38 0-2.5 1.12-2.5 2.5 0 1 .59 1.85 1.43 2.25-.84.4-1.43 1.25-1.43 2.25zM12 5.5c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8s1.12-2.5 2.5-2.5zM3 13c0 4.97 4.03 9 9 9 0-4.97-4.03-9-9-9z",
    sparkle: "M12 2l2.4 7.2L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.8L12 2z",
  };

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>{pattern !== "solid" && getPatternDef(pattern)}</defs>
      <path d="M 120 120 L 120 320 Q 120 340 140 340 L 260 340 Q 280 340 280 320 L 280 120"
        fill={pattern === "solid" ? sweaterColor : "url(#pattern)"} stroke="#333" strokeWidth="3" />
      <ellipse cx="200" cy="120" rx="40" ry="20"
        fill={pattern === "solid" ? sweaterColor : "url(#pattern)"} stroke="#333" strokeWidth="3" />
      <path d="M 120 120 Q 80 140 60 200 L 60 240 Q 60 250 70 250 L 100 250 Q 110 250 110 240 L 110 160"
        fill={pattern === "solid" ? sweaterColor : "url(#pattern)"} stroke="#333" strokeWidth="3" />
      <path d="M 280 120 Q 320 140 340 200 L 340 240 Q 340 250 330 250 L 300 250 Q 290 250 290 240 L 290 160"
        fill={pattern === "solid" ? sweaterColor : "url(#pattern)"} stroke="#333" strokeWidth="3" />
      <rect x="120" y="330" width="160" height="10" fill="#333" fillOpacity="0.2" />
      <rect x="60" y="240" width="40" height="10" fill="#333" fillOpacity="0.2" />
      <rect x="300" y="240" width="40" height="10" fill="#333" fillOpacity="0.2" />
      {stickers.slice(0, 1).map((sticker, idx) => {
        const path = stickerIconPaths[sticker];
        if (!path) return null;
        return (
          <g key={idx} transform="translate(218, 168)">
            <svg x="0" y="0" width="32" height="32" viewBox="0 0 24 24">
              <path d={path} fill="#2E2828" />
            </svg>
          </g>
        );
      })}
    </svg>
  );
};

const SWEATER_ACCENT = "#FC5C65";

export function SweaterCustomizationModal({ visible, onHide }: SweaterCustomizationModalProps) {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [config, setConfig] = useState<SweaterConfig>({ color: "rose", pattern: "solid", stickers: [] });
  const [lang, setLang] = useState<"en" | "np">("en");

  const colors = [
    { name: "Rose",     value: "rose",     hex: "#fda4af" },
    { name: "Lavender", value: "lavender", hex: "#c4b5fd" },
    { name: "Mint",     value: "mint",     hex: "#a7f3d0" },
    { name: "Peach",    value: "peach",    hex: "#fecaca" },
    { name: "Sky",      value: "sky",      hex: "#bae6fd" },
    { name: "Lilac",    value: "lilac",    hex: "#e9d5ff" },
    { name: "Cream",    value: "cream",    hex: "#fef3c7" },
    { name: "Coral",    value: "coral",    hex: "#fecdd3" },
  ];

  const patterns = [
    { name: "Solid",   value: "solid" },
    { name: "Stripes", value: "stripes" },
    { name: "Dots",    value: "dots" },
    { name: "Zigzag",  value: "zigzag" },
  ];

  const stickers = [
    { name: "Heart",   value: "heart",   icon: <PiHeart /> },
    { name: "Star",    value: "star",    icon: <PiStar /> },
    { name: "Smiley",  value: "smiley",  icon: <PiSmiley /> },
    { name: "Flower",  value: "flower",  icon: <PiFlower /> },
    { name: "Sparkle", value: "sparkle", icon: <PiSparkle /> },
  ];

  const buildUrl = () => {
    const params = new URLSearchParams();
    params.set("color", config.color);
    params.set("pattern", config.pattern);
    params.set("lang", lang);
    if (config.stickers.length > 0) params.set("stickers", config.stickers.join(","));
    return `/customsweater?${params.toString()}`;
  };

  const handlePreview = () => { onHide(); navigate(buildUrl()); };
  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}#${buildUrl()}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.current?.show({ severity: "success", summary: "Link copied! ✨", life: 1000 });
    });
  };

  if (!visible) return null;

  return (
    <>
      <Toast ref={toast} position="top-right" />
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#1A1208]/[.45] backdrop-blur-sm"
        onClick={onHide}
      >
        <div
          className="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[92vh] flex flex-col shadow-[0_24px_60px_rgba(30,20,10,0.22)]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Accent band */}
          <div className="h-1 flex-shrink-0" style={{ backgroundColor: SWEATER_ACCENT }} />

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#F0E8DE] flex-shrink-0">
            <div>
              <h2 className="font-game text-lg text-[#1A1208]">Customize Your Sweater</h2>
              <p className="font-short-stack text-xs text-[#B5A090] mt-0.5">Make it special!</p>
            </div>
            <button
              onClick={onHide}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#B5A090] hover:text-[#1A1208] hover:bg-[#F5EDE2] transition-colors"
            >
              <PiXBold />
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

              {/* Left — Options */}
              <div className="space-y-4 order-2 sm:order-1">

                {/* Color */}
                <div>
                  <label className="font-game block text-xs font-bold text-[#1A1208] mb-2 tracking-wide uppercase">
                    Color
                  </label>
                  <div className="grid grid-cols-8 sm:grid-cols-4 gap-1.5">
                    {colors.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setConfig({ ...config, color: c.value })}
                        className="aspect-square rounded-lg transition-all"
                        title={c.name}
                        style={{
                          backgroundColor: c.hex,
                          border: config.color === c.value ? "2.5px solid #1A1208" : "2px solid transparent",
                          transform: config.color === c.value ? "scale(1.1)" : "scale(1)",
                          boxShadow: config.color === c.value ? "0 2px 8px rgba(0,0,0,0.15)" : "none",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Pattern */}
                <div>
                  <label className="font-game block text-xs font-bold text-[#1A1208] mb-2 tracking-wide uppercase">
                    Pattern
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-2 gap-1.5">
                    {patterns.map((p) => (
                      <button
                        key={p.value}
                        onClick={() => setConfig({ ...config, pattern: p.value })}
                        className="font-short-stack py-2 px-2 rounded-xl text-xs font-bold transition-all"
                        style={{
                          backgroundColor: config.pattern === p.value ? SWEATER_ACCENT : "#FFF8F0",
                          color: config.pattern === p.value ? "white" : "#6B5B4E",
                          border: `1px solid ${config.pattern === p.value ? SWEATER_ACCENT : "#E8DDD2"}`,
                        }}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sticker */}
                <div>
                  <label className="font-game block text-xs font-bold text-[#1A1208] mb-2 tracking-wide uppercase">
                    Sticker
                  </label>
                  <div className="flex gap-1.5">
                    {stickers.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => {
                          const next = config.stickers.includes(s.value)
                            ? config.stickers.filter((x) => x !== s.value)
                            : [s.value];
                          setConfig({ ...config, stickers: next });
                        }}
                        className="flex-1 aspect-square flex items-center justify-center rounded-xl text-base transition-all"
                        title={s.name}
                        style={{
                          backgroundColor: config.stickers.includes(s.value) ? SWEATER_ACCENT : "#FFF8F0",
                          color: config.stickers.includes(s.value) ? "white" : "#9E8E7C",
                          border: `1px solid ${config.stickers.includes(s.value) ? SWEATER_ACCENT : "#E8DDD2"}`,
                        }}
                      >
                        {s.icon}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Language */}
                <div>
                  <label className="font-game block text-xs font-bold text-[#1A1208] mb-2 tracking-wide uppercase">
                    Letter Language
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(["en", "np"] as const).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLang(l)}
                        className="font-short-stack py-2 px-2 rounded-xl text-xs font-bold transition-all"
                        style={{
                          backgroundColor: lang === l ? SWEATER_ACCENT : "#FFF8F0",
                          color: lang === l ? "white" : "#6B5B4E",
                          border: `1px solid ${lang === l ? SWEATER_ACCENT : "#E8DDD2"}`,
                        }}
                      >
                        {l === "en" ? "English" : "नेपाली"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 pt-1">
                  <button
                    onClick={handlePreview}
                    className="font-game w-full py-3 flex items-center justify-center gap-2 rounded-xl font-bold text-white text-sm transition-opacity duration-150 hover:opacity-90"
                    style={{ backgroundColor: SWEATER_ACCENT }}
                  >
                    <PiEyeBold /> Preview
                  </button>
                  <button
                    onClick={handleShare}
                    className="font-game w-full py-3 flex items-center justify-center gap-2 rounded-xl font-bold text-[#1A1208] text-sm bg-[#FFF8F0] border border-[#E8DDD2] transition-colors duration-150 hover:bg-[#F5EDE2]"
                  >
                    <PiShareNetworkBold /> Share
                  </button>
                </div>
              </div>

              {/* Right — Preview */}
              <div className="order-1 sm:order-2 flex items-center justify-center">
                <div className="w-full max-w-[200px] sm:max-w-xs aspect-square rounded-2xl p-3 bg-[#FFF8F0] border border-[#EAE0D5]">
                  <SweaterPreview {...config} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
