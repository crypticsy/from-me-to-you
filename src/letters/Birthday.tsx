import { Letter, LetterContainer } from "../components";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { PiConfettiFill, PiBalloonFill, PiGiftFill } from "react-icons/pi";

const ACCENT = "#FF9F43";
const ACCENT_DARK = "#E07B00";

export function Birthday() {
  return (
    <Letter theme="birthday">
      <LetterContainer>
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: ACCENT }}>
          <span className="animate-bounce" style={{ animationDelay: "0s" }}><LiaBirthdayCakeSolid /></span>
          <span className="animate-bounce" style={{ animationDelay: "0.1s" }}><PiConfettiFill /></span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}><PiBalloonFill /></span>
          <span className="animate-bounce" style={{ animationDelay: "0.3s" }}><PiGiftFill /></span>
        </div>

        <h1
          className="font-short-stack text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight"
          style={{ color: ACCENT }}
        >
          Happy Birthday!
        </h1>

        <div className="font-short-stack space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl text-[#555] px-2 sm:px-4 md:px-6 max-w-3xl">
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.3s" }}>
            On this special day, I just wanted to take a moment
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.6s" }}>
            to tell you how grateful I am to have you in my life.
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.9s" }}>
            You bring so much joy, laughter, and happiness
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "1.2s" }}>
            into every moment we share together.
          </p>

          <div
            className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 space-y-1 sm:space-y-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold animate-fadeInUp"
            style={{ animationDelay: "1.5s", color: ACCENT }}
          >
            <p className="leading-snug mb-5">Thank you for being</p>
            <p className="leading-snug flex items-center justify-center gap-2" style={{ color: ACCENT_DARK }}>
              the best friend ever!
            </p>
          </div>
        </div>

        <div
          className="font-short-stack pt-4 sm:pt-5 md:pt-6 text-sm sm:text-base md:text-lg lg:text-xl text-[#AAA] italic animate-fadeInUp leading-relaxed"
          style={{ animationDelay: "1.8s" }}
        >
          <p>~ With all my love ~</p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
