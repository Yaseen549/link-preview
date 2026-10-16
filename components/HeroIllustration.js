"use client";

import { useState, useRef } from "react";
import { FacebookIcon, XIcon, LinkedinIcon } from "@/components/SocialIcons";
import { RotateCcw, Move } from "lucide-react";

const DEFAULT_MOUNTAIN_IMG =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";

const INITIAL_CARDS = {
  fb: { id: "fb", x: 0, y: 0, rotation: 0, zIndex: 30 },
  tw: { id: "tw", x: 80, y: -40, rotation: 4, zIndex: 20 },
  li: { id: "li", x: 70, y: 70, rotation: -3, zIndex: 10 },
};

export default function HeroIllustration({ data }) {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [topZ, setTopZ] = useState(35);
  const [activeDragId, setActiveDragId] = useState(null);

  const dragRef = useRef({
    activeId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
  });

  const title = data?.og?.title || data?.title || "Your Website Title";
  const desc =
    data?.og?.description ||
    data?.description ||
    "This is how your link will appear on Facebook. A short description of your page.";
  const domain = data?.domain || "yourwebsite.com";
  const image = data?.og?.image || data?.image || DEFAULT_MOUNTAIN_IMG;

  const handlePointerDown = (e, cardId) => {
    e.preventDefault();
    const newZ = topZ + 1;
    setTopZ(newZ);
    setActiveDragId(cardId);

    setCards((prev) => ({
      ...prev,
      [cardId]: {
        ...prev[cardId],
        zIndex: newZ,
      },
    }));

    dragRef.current = {
      activeId: cardId,
      startX: e.clientX,
      startY: e.clientY,
      originX: cards[cardId].x,
      originY: cards[cardId].y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    const { activeId, startX, startY, originX, originY } = dragRef.current;
    if (!activeId) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    setCards((prev) => ({
      ...prev,
      [activeId]: {
        ...prev[activeId],
        x: originX + deltaX,
        y: originY + deltaY,
      },
    }));
  };

  const handlePointerUp = (e) => {
    if (dragRef.current.activeId) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      dragRef.current.activeId = null;
      setActiveDragId(null);
    }
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setCards(INITIAL_CARDS);
    setTopZ(35);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto py-4 select-none touch-none">
      {/* Soft Ambient Glow in Background */}
      <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-tr from-sky-200/50 via-emerald-100/50 to-indigo-100/40 dark:from-sky-950/30 dark:via-emerald-950/30 dark:to-indigo-950/30 rounded-3xl blur-2xl pointer-events-none -z-10" />

      {/* Floating Spark Accents */}
      <div className="absolute -top-4 right-8 text-sky-400 font-bold text-xl pointer-events-none opacity-80 animate-pulse">
        ✦
      </div>
      <div className="absolute top-1/2 -left-6 text-emerald-400 font-bold text-lg pointer-events-none opacity-70">
        ✦
      </div>
      <div className="absolute -bottom-2 right-1/4 text-indigo-400 text-sm pointer-events-none opacity-60">
        ✦
      </div>

      {/* Tabletop Interaction Hint & Reset Button */}
      <div className="flex items-center justify-between px-2 mb-3">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 backdrop-blur px-2.5 py-1 rounded-full border border-gray-200/70 dark:border-slate-700/70 shadow-sm">
          <Move size={12} className="text-emerald-500" />
          <span>Tabletop mode: Click & drag any card</span>
        </span>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 bg-white/80 dark:bg-slate-800/80 backdrop-blur px-2.5 py-1 rounded-full border border-gray-200/70 dark:border-slate-700/70 shadow-sm transition-colors"
          title="Reset card positions"
        >
          <RotateCcw size={11} />
          <span>Reset</span>
        </button>
      </div>

      {/* Interactive Tabletop Cards Stage */}
      <div className="relative w-full h-[320px] sm:h-[350px] flex items-center justify-center">
        {/* CARD 2: X (Twitter) */}
        <div
          onPointerDown={(e) => handlePointerDown(e, "tw")}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            transform: `translate3d(${cards.tw.x}px, ${cards.tw.y}px, 0) rotate(${cards.tw.rotation}deg) ${
              activeDragId === "tw" ? "scale(1.05)" : "scale(1)"
            }`,
            zIndex: cards.tw.zIndex,
            touchAction: "none",
          }}
          className={`absolute w-[68%] sm:w-[62%] bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing transition-shadow duration-150 ${
            activeDragId === "tw"
              ? "shadow-2xl ring-2 ring-emerald-500/40"
              : "shadow-md hover:shadow-lg"
          }`}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-gray-100 dark:border-neutral-800/80 bg-gray-50/60 dark:bg-[#141416]/60">
            <div className="w-4 h-4 rounded bg-black flex items-center justify-center text-white">
              <XIcon size={10} color="#ffffff" />
            </div>
            <span className="text-[11px] font-bold text-gray-800 dark:text-neutral-200">
              X (Twitter)
            </span>
          </div>
          <div className="w-full aspect-[2/1] bg-slate-100 dark:bg-neutral-900 overflow-hidden pointer-events-none">
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="p-2 sm:p-2.5 pointer-events-none">
            <p className="text-[11px] font-bold text-gray-900 dark:text-white truncate">
              {title}
            </p>
            <p className="text-[9px] text-gray-500 dark:text-neutral-400 truncate">
              A short description...
            </p>
            <p className="text-[9px] text-gray-400 dark:text-neutral-500 mt-0.5">
              {domain}
            </p>
          </div>
        </div>

        {/* CARD 3: LinkedIn */}
        <div
          onPointerDown={(e) => handlePointerDown(e, "li")}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            transform: `translate3d(${cards.li.x}px, ${cards.li.y}px, 0) rotate(${cards.li.rotation}deg) ${
              activeDragId === "li" ? "scale(1.05)" : "scale(1)"
            }`,
            zIndex: cards.li.zIndex,
            touchAction: "none",
          }}
          className={`absolute w-[66%] sm:w-[60%] bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing transition-shadow duration-150 ${
            activeDragId === "li"
              ? "shadow-2xl ring-2 ring-emerald-500/40"
              : "shadow-md hover:shadow-lg"
          }`}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-gray-100 dark:border-neutral-800/80 bg-gray-50/60 dark:bg-[#141416]/60">
            <div className="w-4 h-4 rounded bg-[#0a66c2] flex items-center justify-center text-white">
              <LinkedinIcon size={10} color="#ffffff" />
            </div>
            <span className="text-[11px] font-bold text-gray-800 dark:text-neutral-200">
              LinkedIn
            </span>
          </div>
          <div className="w-full aspect-[2/1] bg-slate-100 dark:bg-neutral-900 overflow-hidden pointer-events-none">
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="p-2 sm:p-2.5 pointer-events-none">
            <p className="text-[11px] font-bold text-gray-900 dark:text-white truncate">
              {title}
            </p>
            <p className="text-[9px] text-gray-500 dark:text-neutral-400 truncate">
              A short description...
            </p>
            <p className="text-[9px] text-gray-400 dark:text-neutral-500 mt-0.5">
              {domain}
            </p>
          </div>
        </div>

        {/* CARD 1: Facebook (Main Card) */}
        <div
          onPointerDown={(e) => handlePointerDown(e, "fb")}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            transform: `translate3d(${cards.fb.x}px, ${cards.fb.y}px, 0) rotate(${cards.fb.rotation}deg) ${
              activeDragId === "fb" ? "scale(1.04)" : "scale(1)"
            }`,
            zIndex: cards.fb.zIndex,
            touchAction: "none",
          }}
          className={`absolute w-[86%] sm:w-[78%] bg-white dark:bg-[#0c0c0e] border border-gray-200 dark:border-neutral-800/80 rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing transition-shadow duration-150 ${
            activeDragId === "fb"
              ? "shadow-2xl ring-2 ring-emerald-500/40"
              : "shadow-float hover:shadow-xl"
          }`}
        >
          <div className="flex items-center gap-2 px-3.5 py-2 border-b border-gray-100 dark:border-neutral-800/80 bg-gray-50/60 dark:bg-[#141416]/60">
            <div className="w-5 h-5 rounded-full bg-[#1877f2] flex items-center justify-center text-white">
              <FacebookIcon size={12} color="#ffffff" />
            </div>
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              Facebook
            </span>
          </div>

          <div className="w-full aspect-[1.91/1] bg-slate-100 dark:bg-neutral-900 overflow-hidden pointer-events-none">
            <img
              src={image}
              alt="Facebook preview"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-3 sm:p-3.5 pointer-events-none">
            <h4 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white line-clamp-1 mb-0.5">
              {title}
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-2 leading-relaxed mb-1.5">
              {desc}
            </p>
            <p className="text-[10px] font-medium text-slate-400 dark:text-neutral-500 truncate">
              {domain}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
