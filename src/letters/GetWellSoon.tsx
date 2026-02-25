import { Letter, LetterContainer } from "../components";

export function GetWellSoon() {
  return (
    <Letter theme="getwellsoon">
      <LetterContainer theme="getwellsoon">
        <div className="font-short-stack space-y-5 text-sm sm:text-base leading-loose text-[#1A1208]">
          <p className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            I hope these words bring you a little comfort and warmth as you take
            the time you need to rest and heal. Please don't rush. Your health
            comes first.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            Remember that you are strong and resilient, and surrounded by people
            who care about you deeply. We're all cheering you on.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
            Take all the time you need. We'll be here waiting for you, warm
            and ready, when you're feeling better.
          </p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
