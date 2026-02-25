import { Letter, LetterContainer } from "../components";

export function Friendship() {
  return (
    <Letter theme="friendship">
      <LetterContainer theme="friendship">
        <div className="font-short-stack space-y-5 text-sm sm:text-base leading-loose text-[#1A1208]">
          <p className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            Having you in my life is one of the greatest blessings I could ever
            ask for. Through every up and down, every laugh and tear, you've
            been there without fail.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            Your unwavering support and your ability to make every moment
            brighter just by being you — it means the world to me.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
            Thank you for being the incredible friend that you are. I'm so
            lucky to call you mine.
          </p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
