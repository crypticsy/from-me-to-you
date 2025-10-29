import { Letter } from "../components";
import { PiTrophyFill, PiMedalFill, PiStarFill, PiConfettiFill } from "react-icons/pi";

export function Congratulations() {
  return (
    <Letter theme="congratulations">
      <div className="h-screen-safe w-screen px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-14 lg:py-16 relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center safe-left safe-right overflow-hidden">
        <div className="max-w-4xl w-full flex flex-col justify-center items-center space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center animate-fadeIn py-4">
          {/* Icon Decoration */}
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-emerald-600">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              <PiTrophyFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
              <PiMedalFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              <PiStarFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>
              <PiConfettiFill />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-emerald-600 leading-tight"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Congratulations!
          </h1>

          {/* Message */}
          <div
            className="space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 px-2 sm:px-4 md:px-6 max-w-3xl"
            style={{ fontFamily: "'Indie Flower', cursive" }}
          >
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

            {/* Special Message */}
            <div
              className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 space-y-1 sm:space-y-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-emerald-700 animate-fadeInUp"
              style={{ animationDelay: "1.5s" }}
            >
              <p className="leading-snug mb-5">You deserve every bit of this success!</p>
              <p className="text-emerald-800 leading-snug flex items-center justify-center gap-2">
                Keep shining bright!
              </p>
            </div>
          </div>

          {/* Signature */}
          <div
            className="pt-4 sm:pt-5 md:pt-6 text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 italic animate-fadeInUp leading-relaxed"
            style={{
              fontFamily: "'Indie Flower', cursive",
              animationDelay: "1.8s",
            }}
          >
            <p>~ So proud of you ~</p>
          </div>
        </div>
      </div>
    </Letter>
  );
}
