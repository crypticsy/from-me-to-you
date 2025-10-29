import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiHeartBold, PiHandHeartFill, PiTrophyFill, PiHeartbeatFill, PiChampagneFill, PiHandsClappingFill } from "react-icons/pi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaRegHandPointer } from "react-icons/fa";

interface LetterProps {
  children: React.ReactNode;
  theme?: "valentine" | "birthday" | "thankyou" | "congratulations" | "getwellsoon" | "anniversary" | "friendship";
}

export function Letter({ children, theme = "valentine" }: LetterProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const themeColors = {
    valentine: {
      envelope: "bg-red-100",
      flap: "bg-red-200",
      paper: "bg-pink-50",
      accent: "border-red-300",
      stamp: "bg-red-700",
      stampBorder: "border-amber-900",
    },
    birthday: {
      envelope: "bg-orange-100",
      flap: "bg-orange-200",
      paper: "bg-yellow-50",
      accent: "border-orange-300",
      stamp: "bg-orange-700",
      stampBorder: "border-yellow-900",
    },
    thankyou: {
      envelope: "bg-purple-100",
      flap: "bg-purple-200",
      paper: "bg-blue-50",
      accent: "border-purple-300",
      stamp: "bg-purple-700",
      stampBorder: "border-blue-900",
    },
    congratulations: {
      envelope: "bg-emerald-100",
      flap: "bg-emerald-200",
      paper: "bg-green-50",
      accent: "border-emerald-300",
      stamp: "bg-emerald-700",
      stampBorder: "border-teal-900",
    },
    getwellsoon: {
      envelope: "bg-teal-100",
      flap: "bg-teal-200",
      paper: "bg-cyan-50",
      accent: "border-teal-300",
      stamp: "bg-teal-700",
      stampBorder: "border-blue-900",
    },
    anniversary: {
      envelope: "bg-amber-100",
      flap: "bg-amber-200",
      paper: "bg-yellow-50",
      accent: "border-amber-300",
      stamp: "bg-amber-700",
      stampBorder: "border-orange-900",
    },
    friendship: {
      envelope: "bg-indigo-100",
      flap: "bg-indigo-200",
      paper: "bg-violet-50",
      accent: "border-indigo-300",
      stamp: "bg-indigo-700",
      stampBorder: "border-purple-900",
    },
  };

  const colors = themeColors[theme];

  const getThemeIcon = () => {
    switch (theme) {
      case "valentine":
        return <PiHeartBold />;
      case "birthday":
        return <LiaBirthdayCakeSolid />;
      case "thankyou":
        return <PiHandHeartFill />;
      case "congratulations":
        return <PiTrophyFill />;
      case "getwellsoon":
        return <PiHeartbeatFill />;
      case "anniversary":
        return <PiChampagneFill />;
      case "friendship":
        return <PiHandsClappingFill />;
      default:
        return <PiHeartBold />;
    }
  };

  const handleLetterClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      // Show letter after flap opens
      setTimeout(() => setShowLetter(true), 800);
      // Show content after animation completes (flap: 0.8s + letter: 1s = 1.8s)
      setTimeout(() => setShowContent(true), 1800);
    }
  };

  if (showContent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col gap-6 sm:gap-10 md:gap-16 items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 overflow-hidden py-6 sm:py-8 md:py-12">
      <motion.div
        className="relative cursor-pointer"
        onClick={handleLetterClick}
        whileHover={!isOpened ? { scale: 1.05 } : {}}
        whileTap={!isOpened ? { scale: 0.95 } : {}}
      >
        {/* Envelope Container */}
        <div className="relative w-[90vw] sm:w-[75vw] md:w-[70vw] max-w-[500px] h-[35vh] sm:h-[45vh] md:h-[50vh] max-h-[350px] mx-4">
          {/* Envelope Body */}
          <motion.div
            className={`absolute inset-0 ${colors.envelope} ${colors.accent} rounded-lg shadow-2xl border-4`}
            initial={{ y: 0 }}
            animate={{ y: isOpened ? 0 : 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          >
            {/* Envelope seam lines - diagonal lines from corners to center */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
              {/* Left diagonal line */}
              <div className={`absolute top-0 left-0 h-[200%] w-0 border-l-2 ${colors.accent} opacity-30 origin-top-left -rotate-[55deg]`} />
              {/* Right diagonal line */}
              <div className={`absolute top-0 right-0 h-[200%] w-0 border-r-2 ${colors.accent} opacity-30 origin-top-right rotate-[55deg]`} />
            </div>

            {/* Decorative Seal/Stamp */}
            {!isOpened && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="z-20 absolute top-1/3 bottom-1/2 left-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3 sm:gap-4"
              >
                <div className={`w-14 h-14 sm:w-20 sm:h-20 z-20 rounded-full ${colors.stamp} ${colors.stampBorder} flex items-center justify-center aspect-square border-4`}>
                  <span className="text-xl sm:text-4xl md:text-5xl text-white">
                    {getThemeIcon()}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Letter Paper inside envelope */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                initial={{ y: 0, scale: 0.8 }}
                animate={{ y: -100, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`absolute inset-x-0 top-0 mx-auto w-[90%] h-[110%] ${colors.paper} ${colors.accent} rounded-lg shadow-lg z-10 border-4`}
              >
                <div className="flex items-center justify-center h-full text-gray-700 text-sm sm:text-base md:text-lg px-4 sm:px-8">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center space-y-2 sm:space-y-3 md:space-y-4 flex flex-col justify-center items-center"
                    style={{ fontFamily: "'Indie Flower', cursive" }}
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2 md:mb-4">
                      {getThemeIcon()}
                    </div>
                    <p className="italic leading-relaxed text-xs sm:text-sm md:text-base">
                      Opening your special message...
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope Flap */}
          <motion.div
            className={`absolute inset-x-0 top-0 h-1/2 ${colors.flap} ${colors.accent} rounded-t-lg shadow-lg border-4`}
            style={{
              transformOrigin: "top center", // rotate from the top edge
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backfaceVisibility: "hidden",
            }}
            initial={{ rotateX: 0 }}
            animate={{
              rotateX: isOpened ? -120 : 0
            }}
            transition={{
              duration: 0.8,
              ease: [0.65, 0, 0.35, 1], // smoother easing
            }}
          >
            {/* Flap seam lines - diagonal lines from top corners to bottom center */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {/* Left diagonal line */}
              <div className={`absolute top-0 left-0 h-full w-1/2 border-l-2 ${colors.accent} opacity-30 origin-top-left rotate-[27deg]`} />
              {/* Right diagonal line */}
              <div className={`absolute top-0 right-0 h-full w-1/2 border-r-2 ${colors.accent} opacity-30 origin-top-right -rotate-[27deg]`} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tap to Open Text - centered with stamp */}
      {!isOpened && (
        <div className="text-gray-600 text-center gap-3 sm:gap-6 flex flex-col">
          <motion.p
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-lg sm:text-xl md:text-2xl flex items-center text-center justify-center"
          >
            <FaRegHandPointer />
          </motion.p>
          <p
            className="text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap"
            style={{ fontFamily: "'Indie Flower', cursive" }}
          >
            Tap to open
          </p>
        </div>
      )}
    </div>
  );
}
