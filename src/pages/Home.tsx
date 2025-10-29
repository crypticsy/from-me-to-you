import { Link } from "react-router-dom";
import { PiHeartBold, PiHandHeartFill } from "react-icons/pi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";

export function Home() {
  const letters = [
    {
      title: "Valentine",
      subtitle: "A love note",
      path: "/valentine",
      icon: PiHeartBold,
      color: "from-red-100 to-pink-100",
      borderColor: "border-red-500",
      shadowColor: "shadow-red-300/50",
      iconColor: "text-red-500",
      iconHoverColor: "group-hover:text-red-600",
    },
    {
      title: "Birthday",
      subtitle: "A special wish",
      path: "/birthday",
      icon: LiaBirthdayCakeSolid,
      color: "from-yellow-100 to-orange-100",
      borderColor: "border-orange-500",
      shadowColor: "shadow-orange-300/50",
      iconColor: "text-orange-500",
      iconHoverColor: "group-hover:text-orange-600",
    },
    {
      title: "Thank You",
      subtitle: "A note of gratitude",
      path: "/thankyou",
      icon: PiHandHeartFill,
      color: "from-purple-100 to-blue-100",
      borderColor: "border-purple-500",
      shadowColor: "shadow-purple-300/50",
      iconColor: "text-purple-500",
      iconHoverColor: "group-hover:text-purple-600",
    },
  ];

  return (
    <div className="h-screen-safe flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 px-3 sm:px-6 md:px-8 py-8 sm:py-12 md:py-14 lg:py-16 safe-left safe-right overflow-hidden">
              {/* Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12 space-y-2 sm:space-y-3 md:space-y-4 absolute top-12 md:top-24">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-gray-700 leading-tight px-2"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Pick a letter to send
          </h1>

          <div className="inline-block">
            <p
              className="text-sm sm:text-base md:text-lg lg:text-lg text-gray-500 pb-1 px-2 leading-relaxed"
              style={{ fontFamily: "'Indie Flower', cursive" }}
            >
              ~ From me, to you ~
            </p>
          </div>
        </div>

      <div className="w-full max-w-3xl mx-auto flex flex-col justify-center items-center py-2 sm:py-4">
        {/* Letter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8 place-items-center w-full px-4 max-w-5xl">
          {letters.map((letter) => (
            <Link
              key={letter.path}
              to={letter.path}
              className={`
                group
                w-full max-w-xs
                bg-gradient-to-br ${letter.color}
                border-2
                ${letter.borderColor}
                rounded-2xl sm:rounded-3xl
                p-5 sm:p-6 md:p-7 lg:p-8
                transition-all duration-500
                hover:scale-110
                hover:-rotate-2
                shadow-xl ${letter.shadowColor}
                hover:shadow-2xl
                active:scale-95
                transform
                flex flex-col items-center justify-center
                min-h-[160px] sm:min-h-[200px] md:min-h-[220px]
                relative
                overflow-hidden
                backdrop-blur-sm
                shadow-xl
              `}
            >
              <div className="text-center space-y-2 sm:space-y-3 md:space-y-4 relative z-10">
                <div
                  className={`text-4xl sm:text-5xl md:text-5xl lg:text-6xl mb-2 sm:mb-3 flex items-center justify-center ${letter.iconColor} ${letter.iconHoverColor} transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 drop-shadow-lg`}
                >
                  <letter.icon />
                </div>
                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-gray-800 leading-tight font-bold transition-colors duration-300 group-hover:text-gray-900"
                  style={{ fontFamily: "Caveat" }}
                >
                  {letter.title}
                </h2>
                <p
                  className="text-xs sm:text-sm md:text-base lg:text-base text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700"
                  style={{ fontFamily: "Indie Flower" }}
                >
                  {letter.subtitle}
                </p>
              </div>

              {/* Shine effect on hover */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"
                style={{ transform: "skewX(-20deg)" }}
              ></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center max-w-lg absolute bottom-8 md:bottom-12">
        <p
          className="text-xs sm:text-sm md:text-base text-gray-700 italic leading-relaxed flex flex-wrap items-center justify-center gap-1"
          style={{ fontFamily: "'Indie Flower', cursive" }}
        >
          <span>Made with love and a little bit of magic by</span>
          <a
            href="https://github.com/crypticsy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 dark:text-blue-400 inline-flex items-center gap-2 hover:underline"
          >
            Crypticsy
            <img
              src="https://github.com/crypticsy.png"
              alt="Crypticsy GitHub Profile"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-gray-300 dark:border-gray-700"
            />
          </a>
        </p>
      </div>
    </div>
  );
}
