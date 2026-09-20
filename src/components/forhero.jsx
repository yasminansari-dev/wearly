import { ArrowUpRight, ChevronDown } from "lucide-react";
import clo1 from "../assets/clo1.jpg";
import clo2 from "../assets/clo2.jpg";
import clo3 from "../assets/clo3.jpg";
import clo4 from "../assets/clo4.jpg";

const collection = [
  { image: clo2, label: "No. 02", className: "forhero-side forhero-left" },
  { image: clo1, label: "No. 01", className: "forhero-feature" },
  { image: clo3, label: "No. 03", className: "forhero-side forhero-right" },
  { image: clo4, label: "No. 04", className: "forhero-back" },
];

export default function ForHero() {
  return (
    <main className="forhero">
      <div className="forhero-wash" />
      <header className="forhero-header">
        <a className="forhero-brand" href="#" aria-label="Wearly home">
          <span className="forhero-brand-mark">W</span>
          WEARLY
        </a>
        <nav className="forhero-nav" aria-label="Main navigation">
          <a href="#discover">Discover</a>
          <a href="#sell">Sell</a>
          <a href="#donate">Donate</a>
        </nav>
        <a className="forhero-signin" href="#login">Sign in <ArrowUpRight size={15} /></a>
      </header>

      <section className="forhero-content" aria-labelledby="forhero-title">
        <p className="forhero-eyebrow">THE CIRCULAR EDIT / 001</p>
        <h1 id="forhero-title">REWEAR<br /><em>THE FUTURE</em></h1>
        <p className="forhero-description">
          Premium pre-loved fashion for a more considered wardrobe. Discover pieces with a past and a future.
        </p>
        <div className="forhero-actions">
          <a className="forhero-primary" href="#discover">Explore collection <ArrowUpRight size={17} /></a>
          <a className="forhero-quiet" href="#donate">Donate clothing</a>
        </div>
      </section>

      <div className="forhero-gallery" aria-label="Featured clothing collection">
        {collection.map((item) => (
          <figure className={item.className} key={item.label}>
            <img src={item.image} alt={`Featured clothing ${item.label}`} />
            <figcaption>{item.label}</figcaption>
          </figure>
        ))}
      </div>

      <div className="forhero-footer">
        <span>VOL. 01 <i /> EST. 2024</span>
        <div className="forhero-dots" aria-label="Collection slide 1 of 3"><b /><b /><b /></div>
        <span className="forhero-scroll">Scroll to explore <ChevronDown size={17} /></span>
      </div>
    </main>
  );
}
