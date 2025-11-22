import { useNavigate } from "react-router-dom";
import { PiHeartBold, PiHandHeartFill, PiTrophyFill, PiFlowerTulipFill, PiChampagneFill, PiHandsClappingFill, PiEyeBold, PiShareNetworkBold } from "react-icons/pi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import CircularGallery from "../components/CircularGallery";
import { renderToStaticMarkup } from 'react-dom/server';
import { useState, useEffect, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";

export function Home() {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<{ title: string; path: string; color: string } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Wait for Caveat font to load
    if (document.fonts) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    } else {
      // Fallback for browsers without Font Loading API
      setFontsLoaded(true);
    }
  }, []);

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
    {
      title: "Congratulations",
      subtitle: "A celebration note",
      path: "/congratulations",
      icon: PiTrophyFill,
      color: "from-emerald-100 to-green-100",
      borderColor: "border-emerald-500",
      shadowColor: "shadow-emerald-300/50",
      iconColor: "text-emerald-500",
      iconHoverColor: "group-hover:text-emerald-600",
    },
    {
      title: "Get Well Soon",
      subtitle: "A healing wish",
      path: "/getwellsoon",
      icon: PiFlowerTulipFill,
      color: "from-teal-100 to-cyan-100",
      borderColor: "border-teal-500",
      shadowColor: "shadow-teal-300/50",
      iconColor: "text-teal-500",
      iconHoverColor: "group-hover:text-teal-600",
    },
    {
      title: "Anniversary",
      subtitle: "A milestone celebration",
      path: "/anniversary",
      icon: PiChampagneFill,
      color: "from-amber-100 to-yellow-100",
      borderColor: "border-amber-500",
      shadowColor: "shadow-amber-300/50",
      iconColor: "text-amber-500",
      iconHoverColor: "group-hover:text-amber-600",
    },
    {
      title: "Friendship",
      subtitle: "A note to a friend",
      path: "/friendship",
      icon: PiHandsClappingFill,
      color: "from-indigo-100 to-violet-100",
      borderColor: "border-indigo-500",
      shadowColor: "shadow-indigo-300/50",
      iconColor: "text-indigo-500",
      iconHoverColor: "group-hover:text-indigo-600",
    },
  ];

  // Generate SVG data URLs for card images with icons
  const createCardImageUrl = (colorFrom: string, colorTo: string, iconColor: string, icon: any) => {
    // Render icon to SVG string
    const iconSvg = renderToStaticMarkup(icon);

    // Extract viewBox and path from the icon SVG
    const viewBoxMatch = iconSvg.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1].split(' ').map(Number) : [0, 0, 256, 256];
    const [, , vbWidth, vbHeight] = viewBox;

    const iconMatch = iconSvg.match(/<svg[^>]*>(.*?)<\/svg>/s);
    const iconPath = iconMatch ? iconMatch[1] : '';

    // Calculate icon size (40% of card height to ensure it fits)
    const cardWidth = 800;
    const cardHeight = 600;
    const iconSize = cardHeight * 0.4;
    const scale = iconSize / Math.max(vbWidth, vbHeight);

    const svg = `
      <svg width="${cardWidth}" height="${cardHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colorFrom};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colorTo};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${cardWidth}" height="${cardHeight}" fill="url(#grad)" rx="40"/>
        <g transform="translate(${cardWidth / 2}, ${cardHeight / 2})">
          <g transform="scale(${scale}) translate(-${vbWidth / 2}, -${vbHeight / 2})" fill="${iconColor}">
            ${iconPath}
          </g>
        </g>
      </svg>
    `;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  // Color mapping for gradients
  const colorMap: Record<string, { from: string; to: string }> = {
    "from-red-100 to-pink-100": { from: "#fee2e2", to: "#fce7f3" },
    "from-yellow-100 to-orange-100": { from: "#fef3c7", to: "#ffedd5" },
    "from-purple-100 to-blue-100": { from: "#f3e8ff", to: "#dbeafe" },
    "from-emerald-100 to-green-100": { from: "#d1fae5", to: "#dcfce7" },
    "from-teal-100 to-cyan-100": { from: "#ccfbf1", to: "#cffafe" },
    "from-amber-100 to-yellow-100": { from: "#fef3c7", to: "#fef9c3" },
    "from-indigo-100 to-violet-100": { from: "#e0e7ff", to: "#ede9fe" },
  };

  const iconColorMap: Record<string, string> = {
    "text-red-500": "#ef4444",
    "text-orange-500": "#f97316",
    "text-purple-500": "#a855f7",
    "text-emerald-500": "#10b981",
    "text-teal-500": "#14b8a6",
    "text-amber-500": "#f59e0b",
    "text-indigo-500": "#6366f1",
  };

  const galleryItems = letters.map(letter => {
    const colors = colorMap[letter.color] || { from: "#ffffff", to: "#f0f0f0" };
    const iconColor = iconColorMap[letter.iconColor] || "#000000";
    const Icon = letter.icon;

    return {
      image: createCardImageUrl(colors.from, colors.to, iconColor, <Icon />),
      text: letter.title,
      path: letter.path,
    };
  });

  return (
    <div className="h-screen-safe flex items-center justify-center bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50 py-8 sm:py-12 md:py-14 lg:py-16 safe-left safe-right overflow-hidden relative">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10 md:mb-12 space-y-2 sm:space-y-3 md:space-y-4 absolute top-20 z-10 px-3 sm:px-6 md:px-8">
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

      {/* Circular Gallery */}
      <div className="w-full absolute left-0 right-0 top-1/2 -translate-y-1/2" style={{ height: '600px', touchAction: 'none' }}>
        {fontsLoaded ? (
          <CircularGallery
            items={galleryItems}
            bend={0}
            textColor="#374151"
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.05}
            font={isMobile ? 'bold 24px Caveat' : 'bold 32px Caveat'}
            onItemClick={(index: number) => {
              const actualIndex = index % letters.length;
              const letter = letters[actualIndex];
              if (letter.path) {
                setSelectedLetter(letter);
                setShowModal(true);
              }
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-700"></div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center max-w-lg absolute bottom-8 md:bottom-12">
        <p
          className="text-xs sm:text-sm md:text-base text-gray-700 italic leading-relaxed flex flex-wrap items-center justify-center gap-1"
          style={{ fontFamily: "'Indie Flower', cursive" }}
        >
          <span>Made with love and a little bit of magic by</span>
          <a
            href="https://www.animeshbasnet.com.np/"
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

      {/* Toast Notification */}
      <Toast ref={toast} position="top-right" />

      {/* Modal */}
      <Dialog
        visible={showModal}
        onHide={() => setShowModal(false)}
        dismissableMask
        className="w-11/12 max-w-md"
        pt={{
          root: { className: 'rounded-3xl shadow-2xl bg-gradient-to-br from-amber-50 via-rose-50 to-purple-50' },
          header: { className: 'hidden' },
          content: { className: 'rounded-3xl p-6 sm:p-8' }
        }}
      >
        <div className="text-center space-y-8 py-2">
          <div className="space-y-3">
            <h2
              className="text-4xl sm:text-5xl text-gray-700 leading-wide"
              style={{ fontFamily: "'Caveat', cursive", lineHeight:"1.2" }}
            >You picked the &nbsp;<br/>
              {selectedLetter?.title} Letter
            </h2>
            <p
              className="text-base sm:text-lg text-gray-600 leading-relaxed"
              style={{ fontFamily: "'Indie Flower', cursive" }}
            >
              What would you like to do?
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Preview Button */}
            <button
              onClick={() => {
                setShowModal(false);
                if (selectedLetter?.path) {
                  navigate(selectedLetter.path);
                }
              }}
              className="group relative w-full py-5 px-6 bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 border-2 border-purple-300 text-purple-700 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <PiEyeBold className="text-2xl sm:text-3xl relative z-10" />
              <span
                className="text-xl sm:text-2xl relative z-10"
                style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
              >
                Preview Letter
              </span>
            </button>

            {/* Share Button */}
            <button
              onClick={() => {
                if (selectedLetter?.path) {
                  const url = `${window.location.origin}${window.location.pathname}#${selectedLetter.path}`;
                  navigator.clipboard.writeText(url).then(() => {
                    toast.current?.show({
                      severity: 'success',
                      summary: 'Link copied to clipboard ✨',
                      life: 1000
                    });
                  });
                }
              }}
              className="group relative w-full py-5 px-6 bg-gradient-to-br from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200 border-2 border-blue-300 text-blue-700 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <PiShareNetworkBold className="text-2xl sm:text-3xl relative z-10" />
              <span
                className="text-xl sm:text-2xl relative z-10"
                style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}
              >
                Share Link
              </span>
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
