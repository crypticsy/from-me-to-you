import { ReactNode } from "react";

interface LetterContainerProps {
  children: ReactNode;
  bgGradient?: string;
}

export function LetterContainer({
  children,
  bgGradient = "from-purple-50 via-pink-100 to-blue-50",
}: LetterContainerProps) {
  return (
    <div
      className={`h-screen-safe w-screen px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-14 lg:py-16 relative bg-gradient-to-br ${bgGradient} flex items-center justify-center safe-left safe-right overflow-hidden`}
    >
      <div className="max-w-4xl w-full flex flex-col justify-center items-center space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center animate-fadeIn py-4">
        {children}
      </div>
    </div>
  );
}
