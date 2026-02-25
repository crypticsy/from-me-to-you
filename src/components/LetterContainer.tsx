import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import {
  PiHeartBold,
  PiHandHeartFill,
  PiTrophyFill,
  PiHeartbeatFill,
  PiChampagneFill,
  PiHandsClappingFill,
} from "react-icons/pi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoShirt } from "react-icons/io5";

type Theme =
  | "valentine"
  | "birthday"
  | "thankyou"
  | "congratulations"
  | "getwellsoon"
  | "anniversary"
  | "friendship"
  | "sweater";

interface LetterContainerProps {
  children: ReactNode;
  theme?: Theme;
  accent?: string;
  bgGradient?: string;
}

const themeAccents: Record<Theme, string> = {
  valentine: "#FF4757",
  birthday: "#FF9F43",
  thankyou: "#A55EEA",
  congratulations: "#20BF6B",
  getwellsoon: "#0FB9B1",
  anniversary: "#F7B731",
  friendship: "#5352ED",
  sweater: "#FC5C65",
};

function ThemeIcon({ theme }: { theme: Theme }) {
  switch (theme) {
    case "valentine": return <PiHeartBold />;
    case "birthday": return <LiaBirthdayCakeSolid />;
    case "thankyou": return <PiHandHeartFill />;
    case "congratulations": return <PiTrophyFill />;
    case "getwellsoon": return <PiHeartbeatFill />;
    case "anniversary": return <PiChampagneFill />;
    case "friendship": return <PiHandsClappingFill />;
    case "sweater": return <IoShirt />;
    default: return <PiHeartBold />;
  }
}

export function LetterContainer({
  children,
  theme = "valentine",
  accent: accentProp,
}: LetterContainerProps) {
  const [searchParams] = useSearchParams();
  const receiverName = searchParams.get("to");
  const senderName = searchParams.get("from");

  const accent = accentProp ?? themeAccents[theme];

  return (
    <div className="h-screen-safe w-screen flex items-center justify-center bg-[#FFF8F0] safe-left safe-right overflow-hidden px-4 py-6 sm:py-8">

      {/* ── Paper sheet ── */}
      <div
        className="relative w-full max-w-lg sm:max-w-xl flex flex-col overflow-hidden animate-fadeIn"
        style={{
          background: "#FAFAFA",
          border: "1.5px solid #E4DDD6",
          borderRadius: "3px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.06), 0 10px 28px rgba(0,0,0,0.09), 4px 5px 0px #D8CFC6",
          minHeight: "min(80vh, 560px)",
          maxHeight: "90vh",
        }}
      >
        {/* Thin accent top bar */}
        <div
          className="h-[3px] w-full flex-shrink-0"
          style={{ background: accent }}
        />

        {/* Faint ruled lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              transparent,
              transparent 31px,
              #E8E2DA 31px,
              #E8E2DA 32px
            )`,
            backgroundPositionY: "72px",
            opacity: 0.5,
          }}
        />

        {/* Watermark icon */}
        <div
          className="absolute bottom-4 right-4 pointer-events-none select-none"
          style={{
            fontSize: "clamp(68px, 16vw, 100px)",
            color: accent,
            opacity: 0.06,
            lineHeight: 1,
          }}
        >
          <ThemeIcon theme={theme} />
        </div>

        {/* Left margin rule */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{
            left: "clamp(38px, 8vw, 54px)",
            width: "1px",
            background: "#E4B4B4",
            opacity: 0.45,
          }}
        />

        {/* ── Letter body ── */}
        <div
          className="relative flex flex-col flex-1 overflow-y-auto scrollbar-hide"
          style={{
            paddingLeft: "clamp(50px, 9.5vw, 68px)",
            paddingRight: "clamp(20px, 5vw, 40px)",
            paddingTop: "clamp(18px, 3.5vh, 28px)",
            paddingBottom: "clamp(28px, 5vh, 44px)",
          }}
        >
          {/* Dear line */}
          {receiverName && (
            <p className="font-short-stack text-sm sm:text-base text-[#1A1208] leading-snug mb-4 flex-shrink-0">
              Dear <span className="font-semibold">{receiverName}</span>,
            </p>
          )}

          {/* Letter content */}
          <div
            className="flex-1 text-[#1A1208] space-y-5 text-base sm:text-lg"
            style={{ lineHeight: "2.4" }}
          >
            {children}
          </div>

          {/* Closing signature */}
          <div className="flex-shrink-0 pt-6 font-short-stack text-sm sm:text-base text-[#1A1208] space-y-0.5">
            <p className="italic text-[#6B5A4E]">With love,</p>
            <p className="font-semibold">
              {senderName || (
                <span className="italic font-normal text-[#B5A092]">
                  Your secret admirer
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
