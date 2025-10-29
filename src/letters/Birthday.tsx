import { Letter, LetterContainer } from "../components";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { PiConfettiFill, PiBalloonFill, PiGiftFill } from "react-icons/pi";

export function Birthday() {
  return (
    <Letter theme="birthday">
      <LetterContainer bgGradient="from-yellow-50 via-orange-50 to-pink-50">
        {/* Icon Decoration */}
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-orange-600">
            <span className="animate-bounce" style={{ animationDelay: "0s" }}>
              <LiaBirthdayCakeSolid />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
              <PiConfettiFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              <PiBalloonFill />
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>
              <PiGiftFill />
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl text-orange-600 leading-tight"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Happy Birthday!
          </h1>

          {/* Message */}
          <div
            className="space-y-2 sm:space-y-3 md:space-y-3 lg:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 px-2 sm:px-4 md:px-6 max-w-3xl"
            style={{ fontFamily: "'Indie Flower', cursive" }}
          >
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

            {/* Special Thank You Message */}
            <div
              className="pt-3 sm:pt-4 md:pt-5 lg:pt-6 space-y-1 sm:space-y-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-orange-700 animate-fadeInUp"
              style={{ animationDelay: "1.5s" }}
            >
              <p className="leading-snug mb-5">Thank you for being</p>
              <p className="text-orange-800 leading-snug flex items-center justify-center gap-2">
                the best friend ever!
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
            <p>~ With all my love ~</p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
