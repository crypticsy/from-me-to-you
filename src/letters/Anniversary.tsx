import { Letter, LetterContainer } from "../components";

export function Anniversary() {
  return (
    <Letter theme="anniversary">
      <LetterContainer theme="anniversary">
        <div className="font-short-stack space-y-5 text-sm sm:text-base leading-loose text-[#1A1208]">
          <p className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            Today we celebrate another beautiful year together, filled with
            precious moments, laughter, and so much love.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            Every day with you is a gift I treasure deeply. You've made ordinary
            moments feel extraordinary just by being in them with me.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
            Here's to our journey together, to all the memories we've made and
            all the adventures that are still to come.
          </p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
