import { useEffect, useState } from "react";
import { Shirt } from "lucide-react";
import AuthPage from "./AuthPage";

const primaryLinks = ["Discover", "Sell", "Donate", "Order"];

function HangerIcon() {
  return <Shirt className="h-7 w-7 shrink-0" strokeWidth={2.1} />;
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isAuthPage = currentHash === "#login" || currentHash === "#register" || currentHash === "#forgot-password";

  if (isAuthPage) {
    return <AuthPage initialMode={currentHash === "#register" ? "register" : "login"} />;
  }

  return (
    <header className="border-b border-olive/15 bg-ivory">
      <nav
        className="mx-auto flex min-h-[82px] w-[calc(100%-32px)] max-w-[1440px] flex-wrap items-center gap-6 pt-4 sm:w-[calc(100%-64px)] lg:flex-nowrap lg:gap-10 lg:pt-0"
        aria-label="Main navigation"
      >
        <a
          className="group inline-flex shrink-0 items-center gap-2.5 font-display text-[23px] font-bold tracking-[-0.04em] text-olive transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-4 focus-visible:ring-offset-ivory"
          href="#"
          aria-label="Wearly home"
        >
          <span className="grid place-items-center text-olive">
            <HangerIcon />
          </span>
          <span>Wearly</span>
        </a>

        <div
          className={`${menuOpen ? "flex" : "hidden"} order-3 w-full flex-col gap-1 border-t border-olive/15 pb-2 pt-4 lg:order-none lg:flex lg:w-auto lg:flex-row lg:gap-1 lg:border-0 lg:pb-0 lg:pt-0`}
        >
          {primaryLinks.map((link) => (
            <a
              className="w-full rounded-full px-3 py-2 text-sm font-semibold text-brown transition-all duration-200 hover:-translate-y-0.5 hover:bg-peach hover:text-olive hover:shadow-[0_4px_0_#8F9E6C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-ivory lg:w-auto lg:px-3.5"
              href={`#${link.toLowerCase()}`}
              key={link}
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>

        <div
          className={`${menuOpen ? "flex" : "hidden"} order-4 w-full flex-col items-start gap-3 border-t border-olive/15 pb-5 pt-4 lg:order-none lg:ml-auto lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-5 lg:border-0 lg:pb-0 lg:pt-0`}
        >
          <a className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brown transition-all duration-200 hover:-translate-y-0.5 hover:text-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-ivory" href="#wallet" onClick={() => setMenuOpen(false)}>
            <span className="text-[17px] leading-none text-moss transition-transform duration-200 group-hover:scale-125" aria-hidden="true">◈</span>
            <span>Wallet</span>
          </a>
          <a className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brown transition-all duration-200 hover:-translate-y-0.5 hover:text-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-ivory" href="#favorite" onClick={() => setMenuOpen(false)}>
            <span className="text-[21px] leading-none text-moss transition-transform duration-200 group-hover:scale-125" aria-hidden="true">♡</span>
            <span>Favorite</span>
          </a>
          <a className="inline-flex min-h-11 items-center gap-3 rounded-full border border-brown bg-peach px-5 text-sm font-bold text-brown shadow-[3px_3px_0_#5B4439] transition-all duration-200 hover:-translate-y-1 hover:bg-moss hover:text-ivory hover:shadow-[5px_5px_0_#5B4439] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-ivory" href="#login" onClick={() => setMenuOpen(false)}>
            <span>Login</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <button
          className="group ml-auto grid h-10 w-10 shrink-0 place-content-center rounded-full border border-olive/20 bg-peach transition-all duration-200 hover:-translate-y-0.5 hover:bg-moss hover:shadow-[3px_3px_0_#5B4439] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moss focus-visible:ring-offset-2 focus-visible:ring-offset-ivory lg:hidden"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="my-0.5 block h-0.5 w-5 bg-olive transition-transform duration-200 group-aria-expanded:translate-y-1 group-aria-expanded:rotate-45" />
          <span className="my-0.5 block h-0.5 w-5 bg-olive transition-opacity duration-200 group-aria-expanded:opacity-0" />
          <span className="my-0.5 block h-0.5 w-5 bg-olive transition-transform duration-200 group-aria-expanded:-translate-y-1 group-aria-expanded:-rotate-45" />
        </button>
      </nav>
    </header>
  );
}

export default Navbar;