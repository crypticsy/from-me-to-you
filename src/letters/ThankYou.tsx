import { Letter, LetterContainer } from "../components";
import { PiFlowerTulipFill, PiStarFill, PiSparkle, PiHandHeartFill } from "react-icons/pi";

export function ThankYou() {
  return (
    <Letter theme="thankyou">
      <LetterContainer bgGradient="from-purple-50 via-blue-50 to-pink-50">
        {/* Icon Decoration */}
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-purple-600">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              <PiFlowerTulipFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
              <PiStarFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              <PiSparkle />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>
              <PiHandHeartFill />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-purple-600 leading-tight"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Thank You!
          </h1>

          {/* Message */}
          <div
            className="space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 px-2 sm:px-4 md:px-6 max-w-3xl"
            style={{ fontFamily: "'Indie Flower', cursive" }}
          >
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.3s" }}>
              Words cannot express how grateful I am
            </p>
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.6s" }}>
              for everything you've done for me.
            </p>
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.9s" }}>
              Your kindness, support, and generosity
            </p>
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "1.2s" }}>
              have made such a difference in my life.
            </p>

            {/* Special Thank You Message */}
            <div
              className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 space-y-1 sm:space-y-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-purple-700 animate-fadeInUp"
              style={{ animationDelay: "1.5s" }}
            >
              <p className="leading-snug mb-5">From the bottom of my heart,</p>
              <p className="text-purple-800 leading-snug flex items-center justify-center gap-2">
                thank you for being you!
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
            <p>~ With sincere gratitude ~</p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
