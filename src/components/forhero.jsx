import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import clo1 from "../assets/clo1.jpg";
import clo2 from "../assets/clo2.jpg";
import clo3 from "../assets/clo3.jpg";
import clo4 from "../assets/clo4.jpg";

const collection = [
  { image: clo2, label: "No. 02", position: "left" },
  { image: clo1, label: "No. 01", position: "center" },
  { image: clo3, label: "No. 03", position: "right" },
  { image: clo4, label: "No. 04", position: "back" },
];

export default function ForHero() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 1.1), 1);
      setScrollProgress(progress);
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const galleryShift = scrollProgress * 28;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#1d2d25] text-[#f5f5f2]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 55% 43%, rgba(143, 158, 108, 0.3), transparent 27%), #1d2d25",
        }}
      />

      <section
        aria-labelledby="hero-title"
        className="absolute left-[7.5vw] top-1/2 z-10 w-[min(410px,36vw)] -translate-y-[43%] transition-transform duration-300"
        style={{ transform: `translateY(calc(-43% + ${galleryShift * 0.6}px))` }}
      >
        <p className="mb-6 text-[10px] font-medium uppercase tracking-[0.25em] text-[#6a7d5f]">THE CIRCULAR EDIT / 001</p>
        <h1 id="hero-title" className="m-0 text-[clamp(44px,5vw,82px)] font-medium leading-[0.87] tracking-[-0.07em] text-white">
          REWEAR
          <br />
          <span className="text-[#6a7d5f]">THE FUTURE</span>
        </h1>
        <p className="mt-7 max-w-[335px] text-[14px] leading-7 text-white/65">
          Premium pre-loved fashion for a more considered wardrobe. Discover pieces with a past and a future.
        </p>
        <div className="mt-8 flex items-center gap-5">
          <a href="#discover" className="inline-flex items-center gap-3 bg-[#6a7d5f] px-[18px] py-[14px] text-[10px] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_18px_28px_rgba(106,125,95,0.25)] transition hover:-translate-y-1">
            Explore collection <ArrowUpRight size={17} />
          </a>
          <a href="#donate" className="border-b border-white/40 pb-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/80 transition hover:-translate-y-1 hover:text-white">
            Donate clothing
          </a>
        </div>
      </section>

      <div
        className="absolute inset-0 z-0 transition-transform duration-300"
        aria-label="Featured clothing collection"
        style={{ transform: `translateY(${galleryShift * 0.7}px)` }}
      >
        {collection.map((item, index) => {
          const placement = {
            left: { className: "left-[29%] top-[24%] h-[43vh] w-[16vw] rotate-[-7deg]", x: -18, y: 18 },
            center: { className: "left-[48%] top-[13%] h-[69vh] w-[31vw] rotate-[2deg]", x: 0, y: -18 },
            right: { className: "right-[1%] top-[24%] h-[43vh] w-[16vw] rotate-[7deg]", x: 20, y: 12 },
            back: { className: "right-[19%] top-[7%] h-[27vh] w-[12vw] rotate-[12deg] opacity-20 blur-[1px]", x: 0, y: -8 },
          }[item.position];

          return (
            <figure
              key={item.label}
              className={`absolute overflow-hidden bg-[#172638] shadow-[0_25px_70px_rgba(0,0,0,0.28)] transition-all duration-400 hover:shadow-[0_35px_85px_rgba(0,0,0,0.42)] hover:brightness-105 ${placement.className}`}
              style={{
                transform: `translate3d(${placement.x + scrollProgress * 14}px, ${placement.y + scrollProgress * 18}px, 0) rotate(${placement.className.includes("rotate-") ? placement.className.match(/rotate-\[([\-\d]+deg)\]/)?.[1] || "0deg" : "0deg"})`,
              }}
            >
              <img src={item.image} alt={`Featured clothing ${item.label}`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.04]" style={{ filter: "saturate(0.78) contrast(1.04)" }} />
              <figcaption className="absolute bottom-3 right-3 text-[9px] font-medium uppercase tracking-[0.17em] text-white/70">{item.label}</figcaption>
            </figure>
          );
        })}
      </div>

      <div className="absolute inset-x-[5vw] bottom-[32px] z-20 flex items-center justify-between text-[9px] font-medium uppercase tracking-[0.2em] text-white/45">
        <span className="inline-flex items-center gap-2">
          VOL. 01 <span className="h-px w-6 bg-[#7c5a5b]" /> EST. 2024
        </span>

        <div className="flex items-center gap-3" aria-label="Collection slide 1 of 3">
          <span className="block h-[7px] w-[7px] rotate-45 border border-white/50 bg-[#6a7d5f]" />
          <span className="block h-[7px] w-[7px] rotate-45 border border-white/50" />
          <span className="block h-[7px] w-[7px] rotate-45 border border-white/50" />
        </div>

        <span className="inline-flex items-center gap-2 text-white/65">
          Scroll to explore <ChevronDown size={17} />
        </span>
      </div>
    </main>
  );
}
