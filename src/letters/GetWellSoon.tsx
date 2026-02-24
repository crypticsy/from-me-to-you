import { Letter, LetterContainer } from "../components";
import { PiHeartbeatFill, PiFlowerTulipFill, PiSunHorizonFill, PiHeartFill } from "react-icons/pi";

const ACCENT = "#0FB9B1";
const ACCENT_DARK = "#078B85";

export function GetWellSoon() {
  return (
    <Letter theme="getwellsoon">
      <LetterContainer>
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: ACCENT }}>
          <span className="animate-bounce" style={{ animationDelay: "0s" }}><PiHeartbeatFill /></span>
          <span className="animate-bounce" style={{ animationDelay: "0.1s" }}><PiFlowerTulipFill /></span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}><PiSunHorizonFill /></span>
          <span className="animate-bounce" style={{ animationDelay: "0.3s" }}><PiHeartFill /></span>
        </div>

        <h1
          className="font-short-stack text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight"
          style={{ color: ACCENT }}
        >
          Get Well Soon!
        </h1>

        <div className="font-short-stack space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl text-[#555] px-2 sm:px-4 md:px-6 max-w-3xl">
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.3s" }}>
            I hope these words bring you comfort and warmth
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.6s" }}>
            as you take the time you need to rest and heal.
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.9s" }}>
            Remember that you are strong, resilient,
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "1.2s" }}>
            and surrounded by people who care about you deeply.
          </p>

          <div
            className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 space-y-1 sm:space-y-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold animate-fadeInUp"
            style={{ animationDelay: "1.5s", color: ACCENT }}
          >
            <p className="leading-snug mb-5">Take all the time you need,</p>
            <p className="leading-snug flex items-center justify-center gap-2" style={{ color: ACCENT_DARK }}>
              we'll be here when you're ready!
            </p>
          </div>
        </div>

        <div
          className="font-short-stack pt-4 sm:pt-5 md:pt-6 text-sm sm:text-base md:text-lg lg:text-xl text-[#AAA] italic animate-fadeInUp leading-relaxed"
          style={{ animationDelay: "1.8s" }}
        >
          <p>~ Wishing you a speedy recovery ~</p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
