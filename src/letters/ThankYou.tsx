import { Letter, LetterContainer } from "../components";

export function ThankYou() {
  return (
    <Letter theme="thankyou">
      <LetterContainer theme="thankyou">
        <div className="font-short-stack space-y-5 text-sm sm:text-base leading-loose text-[#1A1208]">
          <p className="animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
            Words cannot fully express how grateful I am for everything you've
            done for me. Your kindness and generosity have left a lasting mark
            on my heart.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            Your support, your patience, and your willingness to show up when
            it mattered most. It means more to me than you know.
          </p>
          <p className="animate-fadeInUp" style={{ animationDelay: "0.7s" }}>
            From the bottom of my heart, thank you for being you. I'm so lucky
            to have someone like you in my life.
          </p>
        </div>
      </LetterContainer>
    </Letter>
  );
}
