import { Letter, LetterContainer } from "../components";
import { PiHeartFill, PiChampagneFill, PiCakeFill, PiSparkle } from "react-icons/pi";

export function Anniversary() {
  return (
    <Letter theme="anniversary">
      <LetterContainer bgGradient="from-amber-50 via-yellow-50 to-orange-50">
        {/* Icon Decoration */}
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-amber-600">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              <PiHeartFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
              <PiChampagneFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              <PiCakeFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>
              <PiSparkle />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-amber-600 leading-tight"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Happy Anniversary!
          </h1>

          {/* Message */}
          <div
            className="space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 px-2 sm:px-4 md:px-6 max-w-3xl"
            style={{ fontFamily: "'Indie Flower', cursive" }}
          >
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.3s" }}>
              Today we celebrate another beautiful year together,
            </p>
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.6s" }}>
              filled with precious moments, laughter, and love.
            </p>
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.9s" }}>
              Every day with you is a gift I treasure,
            </p>
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "1.2s" }}>
              and I look forward to many more years by your side.
            </p>

            {/* Special Message */}
            <div
              className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 space-y-1 sm:space-y-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-amber-700 animate-fadeInUp"
              style={{ animationDelay: "1.5s" }}
            >
              <p className="leading-snug mb-5">Here's to our journey together,</p>
              <p className="text-amber-800 leading-snug flex items-center justify-center gap-2">
                and to all the adventures yet to come!
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
            <p>~ Forever yours ~</p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
