import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import floatingBear from "../assets/gifs/floating-bear.gif";
import { Letter } from "../components";
import { PiHeartFill } from "react-icons/pi";

import "../css/heart.css";

const ACCENT = "#FF4757";

const buttonBaseClass =
  " px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg md:text-xl rounded-xl text-white font-bold cursor-pointer transition-all prevent-select font-game ";

const spacingFromOuter = 100;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const screenCenter = { x: screenWidth / 2, y: screenHeight / 2 };
const allowedScreenCenter = {
  x: screenWidth / 2 - spacingFromOuter,
  y: screenHeight / 2 - spacingFromOuter,
};

export function Valentine() {
  const noButtonRef = useRef<HTMLDivElement>(null);
  const backupButtonRef = useRef<HTMLDivElement>(null);
  const [searchParams] = useSearchParams();
  const receiverName = searchParams.get("to");

  const [showMessage, setShowMessage] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  const onYesButtonClick = () => {
    setShowMessage(true);
  };

  const onNoButtonClick = () => {
    if (!noButtonRef.current?.className.includes("absolute")) {
      noButtonRef.current?.classList.add("absolute");
      backupButtonRef.current?.classList.remove("hidden");
    }

    const x =
      screenCenter.x -
      spacingFromOuter +
      Math.floor(Math.random() * (allowedScreenCenter.x * 2 + 1)) -
      allowedScreenCenter.x;

    const y =
      screenCenter.y -
      spacingFromOuter +
      Math.floor(Math.random() * (allowedScreenCenter.y * 2 + 1)) -
      allowedScreenCenter.y;

    setNoButtonPos({ x, y });
  };

  return (
    <Letter theme="valentine">
      <div className="h-screen-safe w-screen px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-14 lg:py-16 relative safe-left safe-right overflow-hidden bg-[#FFF8F0]">
        <div className="h-screen-safe w-full flex flex-col items-center justify-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 py-4">
          {receiverName && (
            <p className="font-short-stack text-base sm:text-lg text-[#9E8E7C]">
              Dear {receiverName},
            </p>
          )}
          <img
            src={floatingBear}
            alt="floating bear"
            className="h-[16vh] sm:h-[18vh] md:h-[20vh] lg:h-[22vh] object-contain"
          />
          <div className="font-short-stack space-y-3 sm:space-y-4 md:space-y-4 text-center text-sm sm:text-base md:text-lg lg:text-xl text-[#555] max-w-3xl px-3 sm:px-4 md:px-6">
            <p className="leading-relaxed">
              My love for you is like a circle, it has no beginning and will know
              of no end.
            </p>

            <div
              className="font-game font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl pt-2 sm:pt-3 md:pt-4 leading-tight"
              style={{ color: ACCENT }}
            >
              Will you be my valentine?
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4 md:gap-5 flex-wrap justify-center px-2">
            <div
              className={buttonBaseClass}
              style={{
                backgroundColor: ACCENT,
                border: "2.5px solid #1A1A1A",
                boxShadow: "3px 3px 0 #1A1A1A",
              }}
              onClick={onYesButtonClick}
            >
              YES! ❤️
            </div>

            <div
              ref={noButtonRef}
              className={buttonBaseClass}
              style={{
                top: noButtonPos.y,
                left: noButtonPos.x,
                backgroundColor: "#CCC",
                border: "2.5px solid #1A1A1A",
                boxShadow: "3px 3px 0 #1A1A1A",
              }}
              onClick={onNoButtonClick}
              onMouseEnter={onNoButtonClick}
            >
              No
            </div>

            <div
              ref={backupButtonRef}
              className={buttonBaseClass + " hidden opacity-0 pointer-events-none"}
            >
              No
            </div>
          </div>
        </div>

        {showMessage && (
          <div className="fixed inset-0 flex items-center justify-center animate-fadeIn z-50 px-4 safe-inset bg-[#FFF5E6]/[.95]">
            <div
              className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 max-w-sm sm:max-w-md w-full space-y-4 sm:space-y-5 md:space-y-6 text-center mx-4"
              style={{
                border: "3px solid #1A1A1A",
                boxShadow: `6px 6px 0 ${ACCENT}`,
              }}
            >
              <h2
                className="font-game text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{ color: ACCENT }}
              >
                Yay! 🎉
              </h2>
              <div className="font-short-stack space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl text-[#555] leading-relaxed">
                <p>Thank you for saying yes.</p>
                <p className="flex items-center justify-center gap-2">
                  You made my day! <PiHeartFill style={{ color: ACCENT }} />
                </p>
              </div>
              <p className="font-short-stack text-sm sm:text-base md:text-lg text-[#AAA] italic leading-relaxed">
                ~ From your secret admirer ~
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
