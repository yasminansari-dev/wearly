import { useEffect, useState } from "react";
import { ArrowUpRight, Sparkles, ShieldCheck, RefreshCw } from "lucide-react";
import clo1 from "../assets/clo1.jpg";
import clo2 from "../assets/clo2.jpg";
import clo3 from "../assets/clo3.jpg";
import clo4 from "../assets/clo4.jpg";

export default function ForHero({ onQuickView }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFrontIndex, setActiveFrontIndex] = useState(1); 
  const [isPaused, setIsPaused] = useState(false);


  const collection = [
  { id: 1, image: clo1 },
  { id: 2, image: clo2 },
  { id: 3, image: clo3 },
  { id: 4, image: clo4 },
];

  // Scroll Parallax Handler
  useEffect(() => {
    const updateScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 1.2), 1);
      setScrollProgress(progress);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Automatic 3D Stack Rotation Effect (Every 3.5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActiveFrontIndex((prev) => (prev + 1) % collection.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, collection.length]);

  const galleryShift = scrollProgress * 25;

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-black text-bone pt-16 lg:pt-6">
      {/* Subtle Luxury Ambient Background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-60"/>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(125,147,113,0.15),rgba(255,255,255,0))]" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-[1440px] flex-col justify-between px-5 sm:px-8 lg:min-h-screen lg:flex-row lg:items-center lg:px-12">
        {/* Left Editorial Copy */}
        <div
          className="flex w-full flex-col justify-center py-6 sm:py-10 lg:w-[42%] lg:py-0 transition-transform duration-300"
          style={{ transform: `translateY(${galleryShift * 0.4}px)` }}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-sage-500/30 bg-forest-850/60 px-3.5 py-1.5 backdrop-blur-md self-start">
            <Sparkles size={13} className="text-champagne-300 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-sage-300">
              The Circular Edit / 001
            </span>
          </div>

          {/* Headline */}
          <h1 className="mt-5 font-serif text-[clamp(2.75rem,5.5vw,5.5rem)] font-light leading-[0.92] tracking-tight text-bone">
            WEARLY<br />
            <span className="italic font-normal text-sage-400">THE FUTURE.</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 max-w-md text-sm sm:text-base leading-relaxed text-bone/70 font-sans">
            Curated pre-loved luxury and archival garments authenticated with obsessive precision.
            Wear less, choose better, and join the circular fashion movement.
          </p>

          {/* CTAs */}
          <div className="mt-7 flex flex-wrap items-center gap-4 sm:gap-5">
            <a
              href="#discover"
              className="group inline-flex items-center gap-2.5 rounded-full bg-champagne-300 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-forest-950 shadow-luxury transition-all duration-300 hover:bg-champagne-200 hover:shadow-champagne-glow hover:-translate-y-0.5"
            >
              <span>Explore Collection</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#sell"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-forest-850/40 px-5 py-3.5 text-xs font-semibold uppercase tracking-widest text-bone backdrop-blur-sm transition-all duration-300 hover:border-sage-400 hover:bg-forest-800 hover:-translate-y-0.5"
            >
              <span>Consign Item</span>
            </a>
          </div>

          {/* Micro trust indicators */}
          <div className="mt-8 flex items-center gap-6 pt-6 border-t border-white/10 text-xs text-bone/60">
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-sage-400" />
              <span>100% Authenticity Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw size={14} className="text-champagne-300" />
              <span>Zero Textile Waste Pledge</span>
            </div>
          </div>
        </div>

        {/* Right Gallery Showcase with Top Margin */}

        {/* 1. Desktop Automatic & Interactive 3D Stack (>= 1024px) */}
        <div
          className="relative hidden h-[680px] w-[55%] items-center justify-center lg:flex mt-12 lg:mt-16 pt-8"
          aria-label="Automatic 3D clothing showcase"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {collection.map((item, index) => {
            // Determine relative position based on activeFrontIndex
            const positionOffset = (index - activeFrontIndex + collection.length) % collection.length;

            // Define 3D styling states
            let positionStyles = "";
            let transformOffset = { x: 0, y: 0, rotate: 0, scale: 1 };

            if (positionOffset === 0) {
              // Active Front Card (Centered, Large, Full Focus)
              positionStyles = "z-40 border-champagne-300/80 shadow-luxury-glow opacity-100 cursor-pointer";
              transformOffset = { x: 0, y: galleryShift * -0.5, rotate: 0, scale: 1.05 };
            } else if (positionOffset === 1) {
              // Right Card
              positionStyles = "z-30 border-white/15 opacity-85 hover:opacity-100 cursor-pointer hover:border-champagne-300/50";
              transformOffset = { x: 180, y: 35 + galleryShift * 0.3, rotate: 7, scale: 0.92 };
            } else if (positionOffset === 2) {
              // Back Card (Deep Perspective)
              positionStyles = "z-10 border-white/10 opacity-45 hover:opacity-75 cursor-pointer blur-[0.4px]";
              transformOffset = { x: 0, y: -65 + galleryShift * 0.2, rotate: -4, scale: 0.82 };
            } else {
              // Left Card (positionOffset === 3)
              positionStyles = "z-20 border-white/15 opacity-85 hover:opacity-100 cursor-pointer hover:border-champagne-300/50";
              transformOffset = { x: -180, y: 40 + galleryShift * 0.3, rotate: -7, scale: 0.92 };
            }

            const isFront = positionOffset === 0;

            return (
              <figure
                key={item.id}
                onClick={() => {
                  if (isFront) {
                    onQuickView(item);
                  } else {
                    setActiveFrontIndex(index);
                  }
                }}
                className={`absolute h-[470px] w-[310px] overflow-hidden rounded-2xl border bg-forest-850 p-2.5 shadow-2xl transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${positionStyles}`}
                style={{
                  transform: `translate3d(${transformOffset.x}px, ${transformOffset.y}px, 0) rotate(${transformOffset.rotate}deg) scale(${transformOffset.scale})`,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl bg-forest-950">
                 <img 
                   src={item.image}
                    alt={`Clothing ${item.id}`}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />  
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />

                
                 

                  {/* Card Caption details */}
                  <figcaption className="absolute inset-x-0 bottom-0 p-4">
                    <div className="mt-1 flex items-baseline gap-2">
                    </div>
                  </figcaption>
                </div>
              </figure>
            );
          })}
        </div>

        {/* 2. Mobile & Tablet (< 1024px): Automatic & Interactive Showcase with Top Margin */}
        <div className="w-full pb-10 pt-8 lg:hidden mt-6">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold uppercase tracking-wider text-sage-400">Featured Archival Piece</span>
            <span className="text-white/50">{activeFrontIndex + 1} / {collection.length}</span>
          </div>

          <div
            onClick={() => onQuickView(collection[activeFrontIndex])}
            className="relative overflow-hidden rounded-2xl border border-champagne-300/40 bg-forest-850 shadow-2xl cursor-pointer"
          >
            <div className="aspect-[4/5] w-full relative sm:aspect-[16/10]">
              <img
                src={collection[activeFrontIndex].image}
                className="h-full w-full object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/30 to-transparent" />

            </div>
          </div>

          {/* Mobile Card Selectors */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {collection.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveFrontIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeFrontIndex === idx ? "w-8 bg-champagne-300" : "w-2.5 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

       </section>
  );
}
