import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { FaRegHandPointer } from "react-icons/fa";

interface LetterProps {
  children: React.ReactNode;
  theme?:
    | "valentine"
    | "birthday"
    | "thankyou"
    | "congratulations"
    | "getwellsoon"
    | "anniversary"
    | "friendship"
    | "sweater";
}

const themeData = {
  valentine: {
    accent: "#FF4757",
    lightBg: "#FFE8EA",
    envelope: "#FFD0D5",
    label: "Valentine",
  },
  birthday: {
    accent: "#FF9F43",
    lightBg: "#FFF0D9",
    envelope: "#FFE0B5",
    label: "Birthday",
  },
  thankyou: {
    accent: "#A55EEA",
    lightBg: "#EFE0FF",
    envelope: "#DEC8FF",
    label: "Thank You",
  },
  congratulations: {
    accent: "#20BF6B",
    lightBg: "#D8F9E8",
    envelope: "#B0F0CE",
    label: "Congrats",
  },
  getwellsoon: {
    accent: "#0FB9B1",
    lightBg: "#CCF5F2",
    envelope: "#A0EDE8",
    label: "Get Well",
  },
  anniversary: {
    accent: "#F7B731",
    lightBg: "#FFF3CE",
    envelope: "#FFE499",
    label: "Anniversary",
  },
  friendship: {
    accent: "#5352ED",
    lightBg: "#E2E1FF",
    envelope: "#C8C7FF",
    label: "Friendship",
  },
  sweater: {
    accent: "#FC5C65",
    lightBg: "#FFE0E2",
    envelope: "#FFC0C5",
    label: "Sweater",
  },
};

export function Letter({ children, theme = "valentine" }: LetterProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const data = themeData[theme];

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
      case "sweater":
        return <IoShirt />;
      default:
        return <PiHeartBold />;
    }
  };

  const handleLetterClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      setTimeout(() => setShowLetter(true), 800);
      setTimeout(() => setShowContent(true), 1800);
    }
  };

  if (showContent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#FFF8F0] gap-[clamp(20px,5vh,40px)]">
      {/* Envelope */}
      <motion.div
        className="relative cursor-pointer"
        onClick={handleLetterClick}
        whileHover={!isOpened ? { scale: 1.025 } : {}}
        whileTap={!isOpened ? { scale: 0.975 } : {}}
      >
        <div className="relative w-[clamp(280px,80vw,460px)] h-[clamp(175px,34vh,300px)]">
          {/* Soft glow */}
          {!isOpened && (
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none translate-y-2 opacity-[.15] blur-[14px]"
              style={{ backgroundColor: data.accent }}
            />
          )}

          {/* Envelope body */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden border-[1.5px] border-black/[.08]"
            style={{ backgroundColor: data.envelope }}
          >
            {/* Seam lines */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.07]">
              <div
                className="absolute top-0 left-0 h-[200%] border-l border-[#1A1208] origin-top-left"
                style={{ transform: "rotate(-55deg)" }}
              />
              <div
                className="absolute top-0 right-0 h-[200%] border-r border-[#1A1208] origin-top-right"
                style={{ transform: "rotate(55deg)" }}
              />
            </div>
          </div>

          {/* Letter paper — slides up */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                initial={{ y: 0, scale: 0.9 }}
                animate={{ y: "-36%", scale: 1 }}
                transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-0 top-0 mx-auto rounded-2xl w-[88%] h-[112%] bg-[#FFFDF9] border-[1.5px] border-black/[.07] shadow-[0_8px_24px_rgba(30,20,10,0.10)]"
                style={{ zIndex: 100 }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="flex items-center justify-center h-full flex-col gap-2"
                >
                  <div
                    className="text-[clamp(28px,6vw,40px)]"
                    style={{ color: data.accent }}
                  >
                    {getThemeIcon()}
                  </div>
                  <p className="font-short-stack text-xs sm:text-sm italic text-[#C4B4A4]">
                    Opening your letter...
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Flap */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl border-[1.5px] border-black/[.08] origin-top backface-hidden"
            style={{
              backgroundColor: data.envelope,
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              zIndex: 3,
            }}
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpened ? -120 : 0 }}
            transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          />

          {/* Wax seal — above flap */}
          <AnimatePresence>
            {!isOpened && (
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  x: "-50%",
                  y: "-30%",
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  delay: 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 14,
                }}
                className="absolute left-1/2 top-1/2"
                style={{ zIndex: 4 }}
              >
                <div
                  className="rounded-full flex items-center justify-center text-white w-[clamp(52px,10vw,68px)] h-[clamp(52px,10vw,68px)] text-[clamp(20px,4vw,26px)]"
                  style={{
                    backgroundColor: data.accent,
                    boxShadow: `0 4px 16px ${data.accent}55, 0 0 0 3px #FFF8F0, 0 0 0 4.5px ${data.accent}`,
                  }}
                >
                  {getThemeIcon()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Tap hint */}
      {!isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
            className="text-[#C4B4A4] text-[1.1rem]"
          >
            <FaRegHandPointer />
          </motion.div>
          <p className="font-game text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-4 text-[#C4B4A4]">
            Tap to Open
          </p>
        </motion.div>
      )}
    </div>
  );
}
