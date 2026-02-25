import { Letter, LetterContainer } from "../components";

export function Birthday() {
  return (
    <Letter theme="birthday">
      <LetterContainer theme="birthday">
        <div className="font-short-stack space-y-5 text-sm sm:text-base leading-loose text-[#1A1208]">
          <p className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            Happy Birthday! On this special day, I just wanted to take a moment
            to tell you how grateful I am to have you in my life.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            You bring so much joy, laughter, and happiness into every moment
            we share together. Your smile lights up any room you walk into.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
            Thank you for being the best friend anyone could ask for. I hope
            this birthday is as wonderful as you make every day feel.
          </p>
          <p className="animate-fadeInUp font-semibold" style={{ animationDelay: "1.0s" }}>
            Here's to you — happy birthday! 🎂
          </p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
