import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, ShoppingBag, X, Shield, Sparkles, User, Heart } from "lucide-react";

const primaryLinks = [
  { name: "Discover", href: "#discover" },
  { name: "Sell & Consign", href: "#sell" },
  { name: "Donate Loop", href: "#donate" },
  { name: "Track Order", href: "#order" },
];

function Navbar({ currentUser, cartCount = 0, wishlistCount = 0, onOpenCart, onOpenWishlist, onOpenAuth }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["discover", "sell", "donate", "order"];
      const current = sections.find((sec) => {
        const el = document.getElementById(sec);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.hash = href;
      }
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass-nav py-3.5 shadow-lg shadow-black/30" : "bg-gradient-to-b from-forest-950/90 via-forest-900/40 to-transparent py-5"
        }`}
      >
        <nav
          className="mx-auto flex w-[calc(100%-32px)] max-w-[1440px] items-center justify-between px-2 sm:w-[calc(100%-48px)] lg:grid lg:grid-cols-[auto_1fr_auto] lg:gap-8 lg:px-6"
          aria-label="Main navigation"
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setMenuOpen(false);
            }}
            aria-label="Wearly Home"
            className="group flex items-center gap-3 text-sm font-semibold tracking-ultra text-[#f5f2eb] transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full border border-champagne-300/40 bg-forest-850/80 font-serif text-xs font-bold text-champagne-300 shadow-luxury transition-transform duration-300 group-hover:scale-105 group-hover:border-champagne-300">
              W
            </span>
            <span className="font-display tracking-[0.25em] text-sm text-bone">WEARLY</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden items-center justify-center gap-8 lg:flex">
            {primaryLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative text-[11px] font-medium uppercase tracking-widest transition-all duration-200 hover:text-white ${
                    isActive ? "text-champagne-300 font-semibold" : "text-white/70"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-champagne-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Actions (Wishlist, Cart, Auth, Mobile Toggle) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Wishlist Button */}
            <button
              type="button"
              onClick={onOpenWishlist}
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative flex h-9 items-center gap-2 rounded-full border border-white/10 bg-forest-850/70 px-3 text-xs font-medium text-bone backdrop-blur-md transition-all duration-200 hover:border-rose-400/50 hover:bg-forest-800"
            >
              <Heart size={15} className={wishlistCount > 0 ? "text-rose-400 fill-rose-400" : "text-white/70"} />
              {wishlistCount > 0 && (
                <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Bag Button */}
            <button
              type="button"
              onClick={onOpenCart}
              aria-label={`Shopping Bag, ${cartCount} items`}
              className="relative flex h-9 items-center gap-2 rounded-full border border-white/10 bg-forest-850/70 px-3.5 text-xs font-medium text-bone backdrop-blur-md transition-all duration-200 hover:border-sage-500/50 hover:bg-forest-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
            >
              <ShoppingBag size={15} className="text-champagne-300" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Bag</span>
              {cartCount > 0 && (
                <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-sage-500 px-1 text-[10px] font-bold text-forest-950 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Desktop Auth */}
            <div className="hidden sm:flex items-center">
              {currentUser ? (
                <button
                  onClick={() => (window.location.hash = "#login")}
                  className="inline-flex items-center gap-2 rounded-full border border-sage-500/30 bg-forest-800/80 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider text-bone transition hover:bg-forest-700"
                >
                  <User size={13} className="text-sage-400" />
                  <span className="max-w-[120px] truncate">{currentUser.username || currentUser.email || "Account"}</span>
                </button>
              ) : (
                <button
                  onClick={() => (window.location.hash = "#login")}
                  className="inline-flex items-center gap-1.5 rounded-full border border-champagne-300/30 bg-forest-900/60 px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider text-bone transition-all duration-200 hover:border-champagne-300 hover:bg-forest-800 hover:text-champagne-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
                >
                  <span>Sign In</span>
                  <ArrowUpRight size={13} />
                </button>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              className="grid h-9 w-9 place-content-center rounded-full border border-white/10 bg-forest-850/80 text-bone backdrop-blur-md transition hover:border-white/30 lg:hidden"
              type="button"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity duration-300 lg:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 bottom-0 z-50 flex w-[min(340px,85vw)] flex-col justify-between border-l border-white/10 bg-forest-900/95 p-6 shadow-2xl backdrop-blur-2xl transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-full border border-champagne-300/40 bg-forest-800 font-serif text-xs font-bold text-champagne-300">
                W
              </span>
              <span className="font-display text-xs font-bold tracking-widest text-bone">WEARLY</span>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/70 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <div className="mt-8 flex flex-col gap-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-sage-400">Navigation</p>
            {primaryLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="flex items-center justify-between text-left text-base font-serif font-medium text-bone transition hover:text-champagne-300"
              >
                <span>{link.name}</span>
                <ArrowUpRight size={15} className="text-white/30" />
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-forest-850/60 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-champagne-300">
              <Shield size={14} className="text-sage-400" />
              <span>Certified Circular Archive</span>
            </div>
            <p className="mt-1 text-xs text-white/60">
              Every garment physically authenticated & condition-graded.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
          {currentUser ? (
            <div className="flex items-center justify-between rounded-xl bg-forest-800 p-3 text-xs text-bone">
              <div className="flex items-center gap-2">
                <User size={14} className="text-sage-400" />
                <span className="truncate max-w-[150px]">{currentUser.username || currentUser.email}</span>
              </div>
              <a href="#login" onClick={() => setMenuOpen(false)} className="text-[10px] uppercase text-champagne-300">
                Profile
              </a>
            </div>
          ) : (
            <a
              href="#login"
              onClick={() => setMenuOpen(false)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-champagne-300 px-4 py-3 text-xs font-bold uppercase tracking-widest text-forest-950 transition hover:bg-champagne-200"
            >
              <span>Sign In / Register</span>
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </aside>
    </>
  );
}

export default Navbar;
