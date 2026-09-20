// import { useState, useMemo } from "react";
// import { Search, SlidersHorizontal, Eye, ShoppingBag, Heart, Sparkles, Check, Leaf } from "lucide-react";
// import { CATEGORIES, CATALOG_PRODUCTS } from "../data/mockData";

// export default function DiscoverSection({ onQuickView, onAddToCart, wishlist = [], onToggleWishlist }) {
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("featured");
//   const [addedItemMap, setAddedItemMap] = useState({});

//   const filteredProducts = useMemo(() => {
//     return CATALOG_PRODUCTS.filter((item) => {
//       const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
//       const matchesSearch =
//         item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.color.toLowerCase().includes(searchQuery.toLowerCase());
//       return matchesCategory && matchesSearch;
//     }).sort((a, b) => {
//       if (sortBy === "price-low") return a.price - b.price;
//       if (sortBy === "price-high") return b.price - a.price;
//       if (sortBy === "savings") return (b.originalPrice - b.price) - (a.originalPrice - a.price);
//       return 0; // featured default
//     });
//   }, [selectedCategory, searchQuery, sortBy]);

//   const handleAddClick = (product, e) => {
//     e.stopPropagation();
//     onAddToCart(product);
//     setAddedItemMap((prev) => ({ ...prev, [product.id]: true }));
//     setTimeout(() => {
//       setAddedItemMap((prev) => ({ ...prev, [product.id]: false }));
//     }, 1800);
//   };

//   return (
//     <section id="discover" className="relative py-24 sm:py-32 bg-forest-950 text-bone">
//       {/* Subtle Background Glow */}
//       <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-full max-w-7xl opacity-30 bg-[radial-gradient(ellipse_at_top,rgba(125,147,113,0.2),transparent_70%)]" />

//       <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
//         {/* Section Header */}
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-white/10">
//           <div>
//             <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sage-400">
//               <Sparkles size={14} className="text-champagne-300" />
//               <span>The Curated Edit</span>
//             </div>
//             <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-bone">
//               Discover Pre-Loved Luxury
//             </h2>
//             <p className="mt-2 max-w-xl text-sm text-bone/70">
//               Hand-selected garments from iconic design houses. Verified for authenticity, meticulously documented, and ready for a new chapter.
//             </p>
//           </div>

//           <div className="flex items-center gap-3">
//             <span className="text-xs text-white/50">{filteredProducts.length} pieces available</span>
//             <div className="h-4 w-px bg-white/15" />
//             <span className="text-xs text-sage-400 font-medium">100% Guaranteed Authentic</span>
//           </div>
//         </div>

//         {/* Filter Controls Bar */}
//         <div className="mt-8 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
//           {/* Categories Tab Scroll */}
//           <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
//             {CATEGORIES.map((cat) => (
//               <button
//                 key={cat.id}
//                 type="button"
//                 onClick={() => setSelectedCategory(cat.id)}
//                 className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
//                   selectedCategory === cat.id
//                     ? "bg-sage-500 text-forest-950 font-bold shadow-md shadow-sage-500/20"
//                     : "border border-white/10 bg-forest-900/60 text-bone/70 hover:border-white/30 hover:text-white"
//                 }`}
//               >
//                 {cat.label}
//               </button>
//             ))}
//           </div>

//           {/* Search & Sort Controls */}
//           <div className="flex items-center gap-3">
//             {/* Search Input */}
//             <div className="relative flex-1 sm:w-64">
//               <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
//               <input
//                 type="text"
//                 placeholder="Search designer, coat..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full rounded-full border border-white/10 bg-forest-900/80 py-2 pl-9 pr-4 text-xs text-bone placeholder-white/40 focus:border-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-400"
//               />
//               {searchQuery && (
//                 <button
//                   type="button"
//                   onClick={() => setSearchQuery("")}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/50 hover:text-white"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>

//             {/* Sort Dropdown */}
//             <div className="relative">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="appearance-none rounded-full border border-white/10 bg-forest-900/80 px-4 py-2 pr-8 text-xs font-medium uppercase tracking-wider text-bone focus:border-sage-400 focus:outline-none cursor-pointer"
//               >
//                 <option value="featured" className="bg-forest-900">Featured</option>
//                 <option value="price-low" className="bg-forest-900">Price: Low to High</option>
//                 <option value="price-high" className="bg-forest-900">Price: High to Low</option>
//                 <option value="savings" className="bg-forest-900">Highest Savings</option>
//               </select>
//               <SlidersHorizontal size={12} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40" />
//             </div>
//           </div>
//         </div>

//         {/* Product Cards Grid */}
//         {filteredProducts.length === 0 ? (
//           <div className="mt-16 text-center py-16 rounded-3xl border border-white/10 bg-forest-900/30">
//             <p className="font-serif text-xl text-bone/80">No archive pieces match your current criteria.</p>
//             <button
//               onClick={() => {
//                 setSelectedCategory("all");
//                 setSearchQuery("");
//               }}
//               className="mt-4 text-xs uppercase tracking-widest text-champagne-300 underline underline-offset-4"
//             >
//               Reset Filters
//             </button>
//           </div>
//         ) : (
//           <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
//             {filteredProducts.map((product) => {
//               const isWishlisted = wishlist.includes(product.id);
//               const isAdded = addedItemMap[product.id];
//               const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

//               return (
//                 <div
//                   key={product.id}
//                   onClick={() => onQuickView(product)}
//                   className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-forest-900/70 p-4 transition-all duration-300 hover:border-sage-500/40 hover:bg-forest-850 hover:shadow-luxury cursor-pointer"
//                 >
//                   {/* Image & Badges Container */}
//                   <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-forest-950">
//                     <img
//                       src={product.image}
//                       alt={product.title}
//                       className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                       loading="lazy"
//                     />

//                     <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-black/20" />

//                     {/* Top Badges */}
//                     <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
//                       <span className="rounded-full bg-forest-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-champagne-300 backdrop-blur-md border border-white/10">
//                         {product.condition}
//                       </span>
//                       <button
//                         type="button"
//                         aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           onToggleWishlist(product.id);
//                         }}
//                         className={`grid h-8 w-8 place-items-center rounded-full backdrop-blur-md transition-all ${
//                           isWishlisted
//                             ? "bg-rose-500 text-white"
//                             : "bg-forest-950/60 text-white/70 hover:bg-forest-950 hover:text-white"
//                         }`}
//                       >
//                         <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
//                       </button>
//                     </div>

//                     {/* Savings Tag */}
//                     <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-sage-600/90 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm">
//                       <Leaf size={11} />
//                       <span>-{discountPct}% vs Retail</span>
//                     </div>

//                     {/* Quick View Overlay on Hover */}
//                     <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
//                       <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-2 text-xs font-bold text-forest-950 shadow-lg">
//                         <Eye size={14} /> Quick View
//                       </span>
//                     </div>
//                   </div>

//                   {/* Item Details */}
//                   <div className="mt-4 flex flex-1 flex-col justify-between">
//                     <div>
//                       <div className="flex items-center justify-between text-xs">
//                         <span className="font-semibold uppercase tracking-wider text-sage-400 font-sans">
//                           {product.brand}
//                         </span>
//                         <span className="text-white/50 text-[11px]">{product.size}</span>
//                       </div>

//                       <h3 className="mt-1 font-serif text-base font-medium text-bone group-hover:text-champagne-300 transition-colors line-clamp-1">
//                         {product.title}
//                       </h3>

//                       <p className="mt-1 text-[11px] text-white/50 line-clamp-2">
//                         {product.material} • {product.color}
//                       </p>
//                     </div>

//                     {/* Price & Action */}
//                     <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
//                       <div>
//                         <div className="flex items-baseline gap-2">
//                           <span className="text-lg font-bold text-bone">${product.price}</span>
//                           <span className="text-xs text-white/40 line-through">${product.originalPrice}</span>
//                         </div>
//                         <span className="text-[9px] text-sage-400 font-medium tracking-wide">
//                           🌱 Saved {product.carbonSavedKg}kg CO₂
//                         </span>
//                       </div>

//                       <button
//                         type="button"
//                         onClick={(e) => handleAddClick(product, e)}
//                         className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
//                           isAdded
//                             ? "bg-sage-500 text-forest-950"
//                             : "border border-champagne-300/30 bg-champagne-300/10 text-champagne-300 hover:bg-champagne-300 hover:text-forest-950"
//                         }`}
//                       >
//                         {isAdded ? (
//                           <>
//                             <Check size={14} /> Added
//                           </>
//                         ) : (
//                           <>
//                             <ShoppingBag size={13} /> Add
//                           </>
//                         )}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
