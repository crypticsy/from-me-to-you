import { Letter } from "../components";
import { PiHandsClappingFill, PiSmileyFill, PiStarFill, PiHeartFill } from "react-icons/pi";

export function Friendship() {
  return (
    <Letter theme="friendship">
      <div className="h-screen-safe w-screen px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-14 lg:py-16 relative bg-gradient-to-br from-indigo-50 via-violet-50 to-purple-50 flex items-center justify-center safe-left safe-right overflow-hidden">
        <div className="max-w-4xl w-full flex flex-col justify-center items-center space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center animate-fadeIn py-4">
          {/* Icon Decoration */}
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-indigo-600">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              <PiHandsClappingFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
              <PiSmileyFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              <PiStarFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>
              <PiHeartFill />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-indigo-600 leading-tight"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            To My Amazing Friend!
          </h1>

          {/* Message */}
          <div
            className="space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 px-2 sm:px-4 md:px-6 max-w-3xl"
            style={{ fontFamily: "'Indie Flower', cursive" }}
          >
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.3s" }}>
              Having you in my life is one of the greatest blessings.
            </p>
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.6s" }}>
              Through every up and down, every laugh and tear,
            </p>
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "0.9s" }}>
              you've been there with unwavering support,
            </p>
            <p className="animate-fadeInUp leading-relaxed" style={{ animationDelay: "1.2s" }}>
              making every moment brighter just by being you.
            </p>

            {/* Special Message */}
            <div
              className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 space-y-1 sm:space-y-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-indigo-700 animate-fadeInUp"
              style={{ animationDelay: "1.5s" }}
            >
              <p className="leading-snug mb-5">Thank you for being</p>
              <p className="text-indigo-800 leading-snug flex items-center justify-center gap-2">
                the incredible friend that you are!
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
            <p>~ Friends forever ~</p>
          </div>
        </div>
      </div>
    </Letter>
  );
}
