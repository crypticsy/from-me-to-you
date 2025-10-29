import { useRef, useState } from "react";
import floatingBear from "../assets/gifs/floating-bear.gif";
import { Letter } from "../components";
import { PiHeartFill } from "react-icons/pi";

import "../css/heart.css";

const buttonEffectClass = " shadow shadow-black/10 drop-shadow-lg ";
const buttonBaseClass =
  " px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg md:text-xl rounded-xl text-white font-semibold cursor-pointer hover:transform hover:scale-110 transition-transform prevent-select ";

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

  const [showMessage, setShowMessage] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });

  // Handle the "Yes" button click
  const onYesButtonClick = () => {
    setShowMessage(true);
  };

  // Handle the "No" button click
  const onNoButtonClick = () => {
    // check if no button has absolute in its class, then add absolute to it
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
      <div className="h-screen-safe w-screen px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-14 lg:py-16 relative safe-left safe-right overflow-hidden">
        <div className="h-screen-safe w-full flex flex-col items-center justify-center space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 py-4">
          <img
            src={floatingBear}
            alt="floating bear"
            className="h-[16vh] sm:h-[18vh] md:h-[20vh] lg:h-[22vh] object-contain"
          />
          <div
            className="space-y-3 sm:space-y-4 md:space-y-4 text-center text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl px-3 sm:px-4 md:px-6"
            style={{ fontFamily: "'Indie Flower', cursive" }}
          >
            <p className="leading-relaxed">
              My love for you is like a circle, it has no beginning and will know
              of no end.
            </p>

            <div
              className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl pt-2 sm:pt-3 md:pt-4 text-red-600 leading-tight"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              Will you be my valentine?
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4 md:gap-5 flex-wrap justify-center px-2" style={{ fontFamily: "'Caveat', cursive" }}>
            <div
              className={buttonBaseClass + buttonEffectClass + " bg-pink-400 hover:bg-pink-600 flex items-center gap-2"}
              onClick={onYesButtonClick}
            >
              Yes
            </div>

            <div
              ref={noButtonRef}
              className={buttonBaseClass + buttonEffectClass + " bg-gray-400 hover:bg-gray-500"}
              style={{ top: noButtonPos.y, left: noButtonPos.x }}
              onClick={onNoButtonClick}
              onMouseEnter={onNoButtonClick}      // for desktop users it will trigger on hover
            >
              No
            </div>

            <div
              ref={backupButtonRef}
              className={
                buttonBaseClass + " hidden opacity-0 pointer-events-none"
              }
            >
              No
            </div>
          </div>
        </div>

        {showMessage && (
          <div
            className="fixed inset-0 flex items-center justify-center animate-fadeIn z-50 px-4 safe-inset"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <div
              className="bg-white rounded-2xl shadow-xl shadow-pink-200/50 p-6 sm:p-8 md:p-10 lg:p-12 max-w-sm sm:max-w-md w-full space-y-4 sm:space-y-5 md:space-y-6 text-center border-4 border-pink-200 mx-4"
              style={{ fontFamily: "'Indie Flower', cursive" }}
            >
              <h2
                className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-pink-600 leading-tight"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                Yay!
              </h2>
              <div className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                <p>Thank you for saying yes.</p>
                <p className="flex items-center justify-center gap-2">
                  You made my day! <PiHeartFill className="text-red-500" />
                </p>
              </div>
              <p
                className="text-sm sm:text-base md:text-lg text-gray-500 italic leading-relaxed"
                style={{ fontFamily: "'Indie Flower', cursive" }}
              >
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
