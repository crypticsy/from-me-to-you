import { Letter, LetterContainer } from "../components";
import { PiTrophyFill, PiMedalFill, PiStarFill, PiConfettiFill } from "react-icons/pi";

const ACCENT = "#20BF6B";
const ACCENT_DARK = "#0A8044";

export function Congratulations() {
  return (
    <Letter theme="congratulations">
      <LetterContainer>
        <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: ACCENT }}>
          <span className="animate-bounce" style={{ animationDelay: "0s" }}><PiTrophyFill /></span>
          <span className="animate-bounce" style={{ animationDelay: "0.1s" }}><PiMedalFill /></span>
          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}><PiStarFill /></span>
          <span className="animate-bounce" style={{ animationDelay: "0.3s" }}><PiConfettiFill /></span>
        </div>

        <h1
          className="font-short-stack text-4xl sm:text-5xl md:text-5xl lg:text-6xl leading-tight"
          style={{ color: ACCENT }}
        >
          Congratulations!
        </h1>

        <div className="font-short-stack space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl text-[#555] px-2 sm:px-4 md:px-6 max-w-3xl">
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.3s" }}>
            Your hard work and dedication have truly paid off!
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.6s" }}>
            This achievement is a testament to your perseverance,
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.9s" }}>
            your passion, and your unwavering commitment
          </p>
          <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "1.2s" }}>
            to excellence in everything you do.
          </p>

          <div
            className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 space-y-1 sm:space-y-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold animate-fadeInUp"
            style={{ animationDelay: "1.5s", color: ACCENT }}
          >
            <p className="leading-snug mb-5">You deserve every bit of this success!</p>
            <p className="leading-snug flex items-center justify-center gap-2" style={{ color: ACCENT_DARK }}>
              Keep shining bright!
            </p>
          </div>
        </div>

        <div
          className="font-short-stack pt-4 sm:pt-5 md:pt-6 text-sm sm:text-base md:text-lg lg:text-xl text-[#AAA] italic animate-fadeInUp leading-relaxed"
          style={{ animationDelay: "1.8s" }}
        >
          <p>~ So proud of you ~</p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
