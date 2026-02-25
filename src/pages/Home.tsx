import { useNavigate } from "react-router-dom";
import {
  PiHeartBold,
  PiHandHeartFill,
  PiTrophyFill,
  PiFlowerTulipFill,
  PiChampagneFill,
  PiHandsClappingFill,
  PiEyeBold,
  PiShareNetworkBold,
  PiArrowRightBold,
} from "react-icons/pi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { IoShirt } from "react-icons/io5";
import { SweaterCustomizationModal } from "../components";
import { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";

const letters = [
  {
    title: "Valentine",
    subtitle: "A love note",
    path: "/valentine",
    icon: PiHeartBold,
    accent: "#FF4757",
    lightBg: "#FFE8EA",
  },
  {
    title: "Birthday",
    subtitle: "A special wish",
    path: "/birthday",
    icon: LiaBirthdayCakeSolid,
    accent: "#FF9F43",
    lightBg: "#FFF0D9",
  },
  {
    title: "Thank You",
    subtitle: "Heartfelt gratitude",
    path: "/thankyou",
    icon: PiHandHeartFill,
    accent: "#A55EEA",
    lightBg: "#EFE0FF",
  },
  {
    title: "Congrats",
    subtitle: "A celebration note",
    path: "/congratulations",
    icon: PiTrophyFill,
    accent: "#20BF6B",
    lightBg: "#D8F9E8",
  },
  {
    title: "Get Well",
    subtitle: "A healing wish",
    path: "/getwellsoon",
    icon: PiFlowerTulipFill,
    accent: "#0FB9B1",
    lightBg: "#CCF5F2",
  },
  {
    title: "Anniversary",
    subtitle: "A milestone",
    path: "/anniversary",
    icon: PiChampagneFill,
    accent: "#F7B731",
    lightBg: "#FFF3CE",
  },
  {
    title: "Friendship",
    subtitle: "A note to a friend",
    path: "/friendship",
    icon: PiHandsClappingFill,
    accent: "#5352ED",
    lightBg: "#E2E1FF",
  },
  {
    title: "Sweater",
    subtitle: "A warm gift",
    path: "/customsweater",
    icon: IoShirt,
    accent: "#FC5C65",
    lightBg: "#FFE0E2",
  },
];

type Letter = (typeof letters)[0];
const loopedLetters = [...letters, ...letters, ...letters];

export function Home() {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSweaterModal, setShowSweaterModal] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);
  const [receiverName, setReceiverName] = useState("");
  const [senderName, setSenderName] = useState("");

  const trackRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  useEffect(() => {
    let animFrameId: number;

    const measure = () => {
      if (!trackRef.current) return;
      const newSetWidth = trackRef.current.scrollWidth / 3;
      if (setWidthRef.current === 0) {
        offsetRef.current = -newSetWidth;
      } else {
        const ratio = offsetRef.current / setWidthRef.current;
        offsetRef.current = ratio * newSetWidth;
      }
      setWidthRef.current = newSetWidth;
    };

    const tick = () => {
      if (trackRef.current && setWidthRef.current > 0) {
        if (!isDraggingRef.current) offsetRef.current -= 0.5;
        const sw = setWidthRef.current;
        if (offsetRef.current < -2 * sw) offsetRef.current += sw;
        if (offsetRef.current > -sw) offsetRef.current -= sw;
        trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
      }
      animFrameId = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientX - dragStartXRef.current;
      if (Math.abs(delta) > 4) hasDraggedRef.current = true;
      offsetRef.current = dragStartOffsetRef.current + delta;
      if (carouselRef.current) carouselRef.current.style.cursor = "grabbing";
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      if (carouselRef.current) carouselRef.current.style.cursor = "grab";
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current) return;
      const delta = e.touches[0].clientX - dragStartXRef.current;
      if (Math.abs(delta) > 4) hasDraggedRef.current = true;
      offsetRef.current = dragStartOffsetRef.current + delta;
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
    };

    measure();
    window.addEventListener("resize", measure);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd);
    animFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", measure);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const handleCarouselMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handleCarouselTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.touches[0].clientX;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const handleCardClick = (letter: Letter) => {
    if (hasDraggedRef.current) return;
    setSelectedLetter(letter);
    if (letter.path === "/customsweater") {
      setShowSweaterModal(true);
    } else {
      setShowModal(true);
    }
  };

  const buildParams = () => {
    const to = receiverName.trim();
    const from = senderName.trim();
    const params = new URLSearchParams();
    if (to) params.set("to", to);
    if (from) params.set("from", from);
    const qs = params.toString();
    return qs ? `?${qs}` : "";
  };

  const handleShare = () => {
    if (!selectedLetter) return;
    const url = `${window.location.origin}${window.location.pathname}#${selectedLetter.path}${buildParams()}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.current?.show({
        severity: "success",
        summary: "Link copied! ✨",
        life: 1500,
      });
      setShowModal(false);
    });
  };

  return (
    <div className="h-screen-safe bg-[#FFF8F0] overflow-hidden safe-left safe-right flex flex-col">
      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="flex-shrink-0 px-6 pt-8 sm:pt-12 text-center">
        <span className="font-short-stack block text-[10px] sm:text-xs tracking-[0.22em] uppercase text-[#C4A882] mb-2">
          Digital Letters
        </span>
        <h1 className="font-game text-4xl sm:text-5xl md:text-6xl text-[#1A1208] leading-none tracking-tight">
          From Me
          <br />
          to You
        </h1>
        <p className="font-short-stack text-xs sm:text-sm text-[#9E8E7C] mt-2">
          Pick a letter & send with love
        </p>

        {/* To / From name inputs */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-8">
          <div className="flex items-center gap-3">
            <label
              htmlFor="sender-name"
              className="font-game text-xs sm:text-sm text-[#9E8E7C] w-10 text-right flex-shrink-0"
            >
              From:
            </label>
            <input
              id="sender-name"
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="your name..."
              maxLength={40}
              className="font-short-stack bg-transparent outline-none text-sm sm:text-base text-[#1A1208] placeholder:text-[#D4C4B4] border-b border-[#E8DDD2] pb-0.5 w-36 sm:w-48"
            />
          </div>
          <div className="flex items-center gap-3">
            <label
              htmlFor="receiver-name"
              className="font-game text-xs sm:text-sm text-[#9E8E7C] w-10 text-right flex-shrink-0"
            >
              To:
            </label>
            <input
              id="receiver-name"
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              placeholder="their name..."
              maxLength={40}
              className="font-short-stack bg-transparent outline-none text-sm sm:text-base text-[#1A1208] placeholder:text-[#D4C4B4] border-b border-[#E8DDD2] pb-0.5 w-36 sm:w-48"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 flex flex-col">
        {/* ── Infinite Draggable Carousel ────────────────────────── */}
        <div className="flex-1 min-h-0 flex items-center">
          <div
            ref={carouselRef}
            className="relative overflow-hidden w-full py-4 sm:py-5 select-none cursor-grab"
            onMouseDown={handleCarouselMouseDown}
            onTouchStart={handleCarouselTouchStart}
          >
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-20 z-10 pointer-events-none bg-gradient-to-r from-[#FFF8F0] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-20 z-10 pointer-events-none bg-gradient-to-l from-[#FFF8F0] to-transparent" />

            {/* Track */}
            <div
              ref={trackRef}
              className="flex gap-3 sm:gap-4 pl-3 sm:pl-4 will-change-transform"
              style={{ width: "max-content" }}
            >
              {loopedLetters.map((letter, i) => {
                const Icon = letter.icon;
                return (
                  <button
                    key={`${letter.path}-${i}`}
                    draggable={false}
                    onClick={() => handleCardClick(letter)}
                    className="group relative flex flex-col bg-white rounded-3xl flex-shrink-0 overflow-hidden
                             w-[52vw] sm:w-[34vw] md:w-[24vw] lg:w-[20vw]
                             h-[40vh] sm:h-[42vh]
                             shadow-[0_4px_12px_rgba(30,20,10,0.10)]
                             transition-all duration-200 cursor-[inherit]"
                    onMouseEnter={(e) => {
                      if (isDraggingRef.current) return;
                      e.currentTarget.style.transform = "translateY(-7px)";
                      e.currentTarget.style.boxShadow =
                        "0 22px 52px rgba(30,20,10,0.16)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "";
                      e.currentTarget.style.boxShadow = "";
                    }}
                  >
                    {/* ── Top: coloured section ── */}
                    <div
                      className="flex-[3] flex items-center justify-center relative"
                      style={{ backgroundColor: letter.lightBg }}
                    >
                      {/* Index */}
                      <span className="absolute top-3 right-3 font-game text-[10px] text-[#1A1208]/30">
                        {String((i % letters.length) + 1).padStart(2, "0")}
                      </span>
                      {/* Icon */}
                      <div
                        className="w-full h-full rounded-2xl flex items-center justify-center text-3xl sm:text-4xl"
                        style={{
                          color: letter.accent,
                        }}
                      >
                        <Icon />
                      </div>
                    </div>

                    {/* ── Bottom: white section ── */}
                    <div
                      className="flex-[2] flex flex-col justify-center px-4 border-t-[3px]"
                      style={{ borderTopColor: letter.accent }}
                    >
                      <span className="font-game text-sm sm:text-base text-[#1A1208] leading-tight">
                        {letter.title}
                      </span>
                      <div className="flex items-center justify-center mt-1.5">
                        <span className="font-short-stack text-[10px] sm:text-xs text-[#B5A090]">
                          {letter.subtitle}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center gap-3 mx-auto w-full max-w-xs px-6 pb-3 sm:pb-4">
          <div className="flex-1 h-px bg-[#EAE0D5]" />
          <span className="font-short-stack text-[9px] tracking-[0.25em] uppercase text-[#C8B9AA]">
            drag to browse
          </span>
          <div className="flex-1 h-px bg-[#EAE0D5]" />
        </div>
      </div>

      {/* ── Footer ────────────────────────────────────────────── */}
      <div className="flex-shrink-0 text-center pb-5 px-4 pt-2">
        <p className="font-short-stack text-xs text-[#C8B9AA]">
          Made with love by{" "}
          <a
            href="https://www.animeshbasnet.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-[#8B7355] transition-colors"
          >
            Crypticsy
          </a>
        </p>
      </div>

      <Toast ref={toast} position="top-right" />

      <SweaterCustomizationModal
        visible={showSweaterModal}
        onHide={() => setShowSweaterModal(false)}
      />

      {/* ── Action Modal ──────────────────────────────────────── */}
      {showModal && selectedLetter && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#1A1208]/[.45] backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full sm:max-w-xs bg-white rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-[0_24px_60px_rgba(30,20,10,0.22)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="h-1"
              style={{ backgroundColor: selectedLetter.accent }}
            />

            <div className="p-5 pb-8 sm:pb-5 space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    backgroundColor: selectedLetter.lightBg,
                    color: selectedLetter.accent,
                  }}
                >
                  <selectedLetter.icon />
                </div>
                <div>
                  <h2 className="font-game text-lg text-[#1A1208] leading-tight">
                    {selectedLetter.title} Letter
                  </h2>
                  <p className="font-short-stack text-xs text-[#B5A090]">
                    {receiverName.trim() && senderName.trim()
                      ? `${senderName.trim()} → ${receiverName.trim()}`
                      : receiverName.trim()
                        ? `To: ${receiverName.trim()}`
                        : senderName.trim()
                          ? `From: ${senderName.trim()}`
                          : selectedLetter.subtitle}
                  </p>
                </div>
              </div>

              <div className="h-px bg-[#F0E8DE]" />

              <button
                onClick={() => {
                  setShowModal(false);
                  navigate(`${selectedLetter.path}${buildParams()}`);
                }}
                className="font-game w-full py-3 flex items-center justify-center gap-2 rounded-xl font-bold text-white text-sm tracking-wide transition-opacity duration-150 hover:opacity-90"
                style={{ backgroundColor: selectedLetter.accent }}
              >
                <PiEyeBold /> Preview Letter
              </button>

              <button
                onClick={handleShare}
                className="font-game w-full py-3 flex items-center justify-center gap-2 rounded-xl font-bold text-[#1A1208] text-sm tracking-wide bg-[#FFF8F0] border border-[#E8DDD2] transition-colors duration-150 hover:bg-[#F5EDE2]"
              >
                <PiShareNetworkBold /> Share Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
