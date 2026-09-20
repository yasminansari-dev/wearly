import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import AuthPage from "./AuthPage";
import ForHero from "./forhero";

const primaryLinks = ["Discover", "Sell", "Donate", "Order"];

function Navbar({ currentUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isAuthPage = ["#login", "#register", "#forgot-password"].includes(currentHash);

  if (isAuthPage) {
    return <AuthPage initialMode={currentHash === "#register" ? "register" : "login"} />;
  }

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20">
        <nav
          className="mx-auto flex min-h-[82px] w-[calc(100%-32px)] max-w-[1440px] flex-wrap items-center gap-6 px-[5vw] py-[30px] sm:w-[calc(100%-64px)] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-10 lg:px-0"
          aria-label="Main navigation"
        >
          <a
            href="#"
            aria-label="Wearly home"
            className="inline-flex items-center gap-2.5 text-[14px] font-semibold tracking-[0.3em] text-[#f7f3ee] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a7d5f]"
          >
            <span className="grid h-[26px] w-[26px] place-items-center rounded-full border border-white/60 text-[11px] tracking-[0]">W</span>
            WEARLY
          </a>

          <div className={`${menuOpen ? "flex" : "hidden"} order-3 w-full flex-col gap-4 pt-4 lg:order-none lg:col-start-2 lg:row-start-1 lg:flex lg:w-auto lg:flex-row lg:justify-self-center lg:gap-7 lg:pt-0`}>
            {primaryLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/70 transition hover:-translate-y-0.5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a7d5f]"
              >
                {link}
              </a>
            ))}
          </div>

          <div className={`${menuOpen ? "flex" : "hidden"} order-4 w-full pt-4 lg:order-none lg:col-start-3 lg:row-start-1 lg:ml-0 lg:flex lg:w-auto lg:justify-self-end lg:pt-0`}>
            {currentUser ? (
              <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                {currentUser.username || currentUser.email || "Account"}
              </span>
            ) : (
              <a
                href="#login"
                onClick={() => setMenuOpen(false)}
                className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6a7d5f]"
              >
                Sign in <ArrowUpRight size={15} />
              </a>
            )}
          </div>

          <button
            className="ml-auto grid h-10 w-10 shrink-0 place-content-center text-white lg:hidden"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>
      <ForHero />
    </>
  );
}

export default Navbar;
