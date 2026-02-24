import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

interface LetterContainerProps {
  children: ReactNode;
  bgGradient?: string;
}

export function LetterContainer({ children }: LetterContainerProps) {
  const [searchParams] = useSearchParams();
  const receiverName = searchParams.get("to");

  return (
    <div className="h-screen-safe w-screen px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-12 md:py-14 lg:py-16 relative flex items-center justify-center safe-left safe-right overflow-hidden bg-[#FFF8F0]">
      <div className="max-w-4xl w-full flex flex-col justify-center items-center space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 text-center animate-fadeIn py-4">
        {receiverName && (
          <p className="font-short-stack text-base sm:text-lg text-[#9E8E7C] -mb-1">
            Dear {receiverName},
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
