import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import floatingBear from "../assets/gifs/floating-bear.gif";
import { Letter } from "../components";
import { PiHeartFill } from "react-icons/pi";

import "../css/heart.css";

const ACCENT = "#FF4757";

export function Valentine() {
  const noButtonRef = useRef<HTMLDivElement>(null);
  const backupButtonRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const receiverName = searchParams.get("to");
  const senderName = searchParams.get("from");

  const [showMessage, setShowMessage] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noEscaped, setNoEscaped] = useState(false);

  const onYesButtonClick = () => setShowMessage(true);

  const onNoButtonClick = () => {
    const x = 40 + Math.floor(Math.random() * (window.innerWidth - 160));
    const y = 40 + Math.floor(Math.random() * (window.innerHeight - 100));
    setNoEscaped(true);
    setNoButtonPos({ x, y });
  };

  return (
    <Letter theme="valentine">
      <div className="h-screen-safe w-screen px-4 sm:px-6 md:px-8 py-10 relative safe-left safe-right overflow-hidden bg-[#FFF8F0]">
        <div className="h-full w-full flex flex-col items-center justify-center gap-5 sm:gap-6 text-center">

          {/* Dear line */}
          {receiverName && (
            <p className="font-short-stack text-base sm:text-lg text-[#9E8E7C]">
              Dear <span className="font-semibold text-[#1A1208]">{receiverName}</span>,
            </p>
          )}

          {/* Bear */}
          <img
            src={floatingBear}
            alt="floating bear"
            className="h-[16vh] sm:h-[18vh] md:h-[20vh] object-contain"
          />

          {/* Letter body */}
          <div className="font-short-stack space-y-3 text-center text-sm sm:text-base md:text-lg text-[#1A1208] max-w-md px-3">
            <p className="leading-relaxed">
              My love for you is like a circle. It has no beginning and will know of no end.
            </p>
            <p className="font-game font-semibold text-xl sm:text-2xl md:text-3xl pt-2" style={{ color: ACCENT }}>
              Will you be my valentine?
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 sm:gap-4 flex-wrap justify-center px-2">
            {/* YES */}
            <div
              className="px-6 py-2.5 sm:px-8 sm:py-3 text-base sm:text-lg rounded-xl text-white font-bold cursor-pointer transition-all font-game select-none hover:opacity-90 active:scale-95"
              style={{ backgroundColor: ACCENT, boxShadow: `0 4px 16px ${ACCENT}55` }}
              onClick={onYesButtonClick}
            >
              YES! ❤️
            </div>

            {/* No — starts inline, escapes to fixed position on first hover */}
            <div
              className="px-6 py-2.5 sm:px-8 sm:py-3 text-base sm:text-lg rounded-xl font-bold font-game select-none bg-white border border-[#E4DDD6] text-[#1A1208]"
              style={noEscaped ? {
                position: "fixed",
                top: noButtonPos.y,
                left: noButtonPos.x,
                zIndex: 50,
                cursor: "pointer",
              } : { cursor: "pointer" }}
              onClick={onNoButtonClick}
              onMouseEnter={onNoButtonClick}
            >
              No
            </div>

            {/* Invisible same-size placeholder — keeps row stable once No escapes */}
            {noEscaped && (
              <div className="px-6 py-2.5 sm:px-8 sm:py-3 text-base sm:text-lg opacity-0 pointer-events-none font-game select-none">
                No
              </div>
            )}
          </div>

        </div>

        {/* Success overlay */}
        {showMessage && (
          <div className="fixed inset-0 flex items-center justify-center animate-fadeIn z-50 px-4 safe-inset bg-[#FFF5E6]/95">
            <div className="bg-white rounded-2xl p-8 sm:p-10 max-w-sm w-full space-y-4 text-center border border-[#E4DDD6] shadow-[0_8px_32px_rgba(255,71,87,0.12),4px_5px_0px_#D8CFC6]">
              <h2 className="font-game text-4xl sm:text-5xl font-bold" style={{ color: ACCENT }}>
                Yay!
              </h2>
              <div className="font-short-stack space-y-2 text-base sm:text-lg text-[#1A1208]">
                <p>Thank you for saying yes.</p>
                <p className="flex items-center justify-center gap-2">
                  You made my day! <PiHeartFill style={{ color: ACCENT }} />
                </p>
              </div>
              <p className="font-short-stack text-sm text-[#B5A092] italic">
                ~ {senderName ? `From ${senderName}` : "From your secret admirer"} ~
              </p>
            </div>

            <div className="heart x1"></div>
            <div className="heart x2"></div>
            <div className="heart x3"></div>
            <div className="heart x4"></div>
            <div className="heart x5"> </div>
            <div className="altheart x6"></div>
            <div className="heart x7"></div>
            <div className="heart x8"></div>
            <div className="heart x9"></div>
            <div className="heart x10"></div>
          </div>
        )}
      </div>
    </Letter>
  );
}
