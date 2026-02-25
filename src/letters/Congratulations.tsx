import { Letter, LetterContainer } from "../components";

export function Congratulations() {
  return (
    <Letter theme="congratulations">
      <LetterContainer theme="congratulations">
        <div className="font-short-stack space-y-5 text-sm sm:text-base leading-loose text-[#1A1208]">
          <p className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            Congratulations! Your hard work and dedication have truly paid off,
            and I couldn't be more proud of everything you've accomplished.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            This achievement is a testament to your perseverance, your passion,
            and your unwavering commitment to excellence in everything you do.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
            You deserve every bit of this success. Keep shining — the best is
            still ahead of you.
          </p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
