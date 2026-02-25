import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useSearchParams } from "react-router-dom";
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
  valentine: { accent: "#FF4757" },
  birthday: { accent: "#FF9F43" },
  thankyou: { accent: "#A55EEA" },
  congratulations: { accent: "#20BF6B" },
  getwellsoon: { accent: "#0FB9B1" },
  anniversary: { accent: "#F7B731" },
  friendship: { accent: "#5352ED" },
  sweater: { accent: "#FC5C65" },
};

export function Letter({ children, theme = "valentine" }: LetterProps) {
  const [searchParams] = useSearchParams();
  const receiverName = searchParams.get("to");
  const senderName = searchParams.get("from");

  const [flipped, setFlipped] = useState(false);
  const [waxMelting, setWaxMelting] = useState(false);
  const [waxGone, setWaxGone] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const [letterRising, setLetterRising] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const waxControls = useAnimation();
  const { accent } = themeData[theme];

  const getThemeIcon = () => {
    switch (theme) {
      case "valentine": return <PiHeartBold />;
      case "birthday": return <LiaBirthdayCakeSolid />;
      case "thankyou": return <PiHandHeartFill />;
      case "congratulations": return <PiTrophyFill />;
      case "getwellsoon": return <PiHeartbeatFill />;
      case "anniversary": return <PiChampagneFill />;
      case "friendship": return <PiHandsClappingFill />;
      case "sweater": return <IoShirt />;
      default: return <PiHeartBold />;
    }
  };

  // Wax seal: idle pulse only (fade-out handled by AnimatePresence exit)
  useEffect(() => {
    if (!flipped || waxGone || waxMelting) {
      waxControls.stop();
      return;
    }
    // Idle pulse — starts after the flip settles
    const timer = setTimeout(() => {
      void waxControls.start({
        scale: [1, 1.09, 1, 1.05, 1],
        transition: { duration: 1.3, repeat: Infinity, repeatDelay: 2 },
      });
    }, 700);
    return () => {
      clearTimeout(timer);
      waxControls.stop();
    };
  }, [flipped, waxMelting, waxGone, waxControls]);

  const handleFrontClick = () => {
    if (flipped || waxMelting || flapOpen) return;
    setFlipped(true);
  };

  const handleWaxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (waxMelting || waxGone) return;
    setWaxMelting(true);
    // Seal fades out over ~600ms via AnimatePresence exit
    setTimeout(() => setWaxGone(true), 150);
    setTimeout(() => setFlapOpen(true), 800); // flap opens after seal gone
    setTimeout(() => setLetterRising(true), 1500); // letter rises
    setTimeout(() => setShowContent(true), 3000); // transition to content
  };

  if (showContent) {
    return (
      <motion.div
        initial={{ clipPath: "circle(0% at 50% 50%)" }}
        animate={{ clipPath: "circle(150% at 50% 50%)" }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden bg-[#FFF8F0] gap-[clamp(16px,4vh,36px)]">

      {/* ── 3-D flip perspective wrapper ── */}
      <div style={{ perspective: "1200px" }}>
        <motion.div
          className="relative w-[clamp(280px,80vw,460px)] h-[clamp(175px,34vh,300px)]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
        >

          {/* ══════════ FRONT FACE ══════════ */}
          <div
            className="absolute inset-0 cursor-pointer"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            onClick={handleFrontClick}
          >
            {/* Envelope body */}
            <div className="absolute inset-0 rounded-2xl bg-white border-[1.5px] border-black/[.07] shadow-[0_10px_32px_rgba(30,20,10,0.13)] overflow-hidden">

              {/* Left airmail stripe */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[22px] rounded-l-2xl"
                style={{
                  background: `repeating-linear-gradient(
                    135deg,
                    ${accent}2A, ${accent}2A 4px,
                    transparent 4px, transparent 9px
                  )`,
                  borderRight: `1px solid ${accent}1A`,
                }}
              />
              {/* Right airmail stripe */}
              <div
                className="absolute right-0 top-0 bottom-0 w-[22px] rounded-r-2xl"
                style={{
                  background: `repeating-linear-gradient(
                    135deg,
                    ${accent}2A, ${accent}2A 4px,
                    transparent 4px, transparent 9px
                  )`,
                  borderLeft: `1px solid ${accent}1A`,
                }}
              />

              {/* ─ Stamp (top-right, perforated edges via radial-gradient) ─ */}
              <div
                className="absolute top-[14px] right-[28px]"
                style={{
                  width: "clamp(40px,7vw,52px)",
                  height: "clamp(48px,9vh,60px)",
                  background: `
                    radial-gradient(circle at 50% 0%,   white 3px, ${accent}1C 3px) 0    0    / 9px 6px repeat-x,
                    radial-gradient(circle at 50% 100%, white 3px, ${accent}1C 3px) 0    100% / 9px 6px repeat-x,
                    radial-gradient(circle at 0%   50%, white 3px, ${accent}1C 3px) 0    0    / 6px 9px repeat-y,
                    radial-gradient(circle at 100% 50%, white 3px, ${accent}1C 3px) 100% 0    / 6px 9px repeat-y,
                    ${accent}1C
                  `,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "2px",
                }}
              >
                <div className="text-[clamp(13px,2.5vw,17px)]" style={{ color: accent }}>
                  {getThemeIcon()}
                </div>
                <span
                  className="font-game text-[5px] sm:text-[6px] tracking-[0.12em] uppercase"
                  style={{ color: accent }}
                >
                  LOVE
                </span>
              </div>

              {/* ─ Postmark circle over stamp ─ */}
              <div
                className="absolute top-[10px] right-[20px] pointer-events-none"
                style={{
                  width: "clamp(34px,6vw,44px)",
                  height: "clamp(34px,6vw,44px)",
                  opacity: 0.22,
                }}
              >
                <svg viewBox="0 0 48 48" className="w-full h-full" style={{ color: accent }}>
                  <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="24" cy="24" r="13" fill="none" stroke="currentColor" strokeWidth="0.8" />
                  <line x1="4" y1="20" x2="44" y2="20" stroke="currentColor" strokeWidth="1" />
                  <line x1="4" y1="24" x2="44" y2="24" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="4" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>

              {/* ─ Address area (TO / FROM) ─ */}
              <div
                className="absolute flex flex-col justify-center"
                style={{
                  left: "clamp(30px,5.5vw,40px)",
                  top: "50%",
                  transform: "translateY(-50%)",
                  gap: "clamp(8px,1.8vh,13px)",
                  maxWidth: "52%",
                }}
              >
                {/* TO */}
                <div>
                  <p
                    className="font-game text-[7px] sm:text-[8px] tracking-[0.22em] uppercase mb-[5px]"
                    style={{ color: `${accent}99` }}
                  >
                    TO
                  </p>
                  {receiverName ? (
                    <p className="font-short-stack text-[10px] sm:text-xs text-[#1A1208] leading-none">
                      {receiverName}
                    </p>
                  ) : (
                  <div className="mt-[6px] flex flex-col gap-[5px]">
                    <div className="h-px w-16 sm:w-20" style={{ backgroundColor: "#1A120818" }} />
                    <div className="h-px w-11 sm:w-14" style={{ backgroundColor: "#1A120812" }} />
                  </div>
                  )}
                </div>
                {/* FROM */}
                <div className="pt-3">
                  <p
                    className="font-game text-[7px] sm:text-[8px] tracking-[0.22em] uppercase mb-[5px]"
                    style={{ color: `${accent}99` }}
                  >
                    FROM
                  </p>
                  {senderName ? (
                    <p className="font-short-stack text-[10px] sm:text-xs text-[#1A1208] leading-none">
                      {senderName}
                    </p>
                  ) : (
                    <div className="flex flex-col gap-[5px]">
                      <div className="h-px w-16 sm:w-20" style={{ backgroundColor: "#1A120828" }} />
                      <div className="h-px w-11 sm:w-14" style={{ backgroundColor: "#1A120818" }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* ══════════ BACK FACE ══════════ */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="absolute inset-0 rounded-2xl bg-white border-[1.5px] border-black/[.07] shadow-[0_10px_32px_rgba(30,20,10,0.13)] overflow-hidden">

              {/* Envelope fold seam lines (X from corners to center) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 460 300"
                preserveAspectRatio="none"
              >
                <line x1="0" y1="0" x2="230" y2="150" stroke="#8B7355" strokeWidth="0.9" opacity="0.11" />
                <line x1="460" y1="0" x2="230" y2="150" stroke="#8B7355" strokeWidth="0.9" opacity="0.11" />
                <line x1="0" y1="300" x2="230" y2="150" stroke="#8B7355" strokeWidth="0.9" opacity="0.11" />
                <line x1="460" y1="300" x2="230" y2="150" stroke="#8B7355" strokeWidth="0.9" opacity="0.11" />
              </svg>

              {/* Triangular flap — at the top of the back face, opens upward */}
              <motion.div
                className="absolute inset-x-0 top-0 rounded-t-2xl border-[1.5px] border-black/[.06] origin-top"
                style={{
                  height: "50%",
                  background: "linear-gradient(to bottom, #f0f0f0, #f8f8f8)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  zIndex: 3,
                }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: flapOpen ? -148 : 0 }}
                transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
              />

              {/* ─ Wax seal (centered) — fades out on click ─ */}
              <AnimatePresence>
                {!waxGone && (
                  <motion.div
                    key="wax-seal"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ zIndex: 4 }}
                    exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeOut" } }}
                  >
                    {/* Seal circle — idle pulse via waxControls */}
                    <motion.div
                      animate={waxControls}
                      style={{ cursor: waxMelting ? "default" : "pointer" }}
                      onClick={!waxMelting ? handleWaxClick : undefined}
                      whileHover={!waxMelting ? { scale: 1.07 } : {}}
                      whileTap={!waxMelting ? { scale: 0.92 } : {}}
                    >
                      <div
                        className="rounded-full flex items-center justify-center text-white"
                        style={{
                          backgroundColor: accent,
                          width: "clamp(52px,10vw,68px)",
                          height: "clamp(52px,10vw,68px)",
                          fontSize: "clamp(20px,4vw,26px)",
                          boxShadow: `0 6px 20px ${accent}66, 0 0 0 3px white, 0 0 0 5px ${accent}`,
                        }}
                      >
                        {getThemeIcon()}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Letter paper — pulled out from the envelope opening at the top */}
            <AnimatePresence>
              {letterRising && (
                <motion.div
                  initial={{ scaleY: 0, y: 0, opacity: 1 }}
                  animate={{ scaleY: 1, y: "-35%", opacity: 1 }}
                  transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 top-0 mx-auto rounded-2xl bg-white border-[1.5px] border-black/[.07] shadow-[0_8px_24px_rgba(30,20,10,0.10)]"
                  style={{ width: "88%", height: "112%", zIndex: 10, transformOrigin: "top center" }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                    className="flex items-center justify-center h-full flex-col gap-2"
                  >
                    <p className="font-short-stack text-xs sm:text-sm italic text-[#C4B4A4]">
                      Opening your letter...
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* ── Contextual hint text ── */}
      <AnimatePresence mode="wait">
        {!flipped && !flapOpen && !waxMelting && !waxGone && (
          <motion.div
            key="hint-front"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="text-[#C4B4A4] text-[1.1rem]"
            >
              <FaRegHandPointer />
            </motion.div>
            <p className="font-game text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-3 text-[#C4B4A4]">
              Tap to Flip
            </p>
          </motion.div>
        )}
        {flipped && !waxMelting && !waxGone && (
          <motion.div
            key="hint-back"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.65 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              className="text-[#C4B4A4] text-[1.1rem]"
            >
              <FaRegHandPointer />
            </motion.div>
            <p className="font-game text-[10px] sm:text-xs tracking-[0.2em] uppercase mt-3 text-[#C4B4A4]">
              Break the Seal
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
