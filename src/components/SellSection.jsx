// import { useState } from "react";
// import { DollarSign, Sparkles, Box, ShieldCheck, ArrowRight, CheckCircle2, TrendingUp, HelpCircle } from "lucide-react";
// import { CONSIGNMENT_BRANDS, CONSIGNMENT_CATEGORIES } from "../data/mockData";

// export default function SellSection() {
//   const [selectedCategory, setSelectedCategory] = useState(CONSIGNMENT_CATEGORIES[0].id);
//   const [selectedBrandIndex, setSelectedBrandIndex] = useState(0);
//   const [conditionTier, setConditionTier] = useState(1.0); // 1.0 = Pristine, 0.85 = Excellent, 0.7 = Good
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [kitSubmitted, setKitSubmitted] = useState(false);
//   const [formData, setFormData] = useState({ fullName: "", email: "", address: "", itemsCount: "2" });

//   const activeCategory = CONSIGNMENT_CATEGORIES.find((c) => c.id === selectedCategory) || CONSIGNMENT_CATEGORIES[0];
//   const activeBrand = CONSIGNMENT_BRANDS[selectedBrandIndex] || CONSIGNMENT_BRANDS[0];

//   const estimatedBase = Math.round(activeCategory.basePrice * activeBrand.tierMultiplier * conditionTier);
//   const cashPayout = Math.round(estimatedBase * 0.78);
//   const storeCreditPayout = Math.round(cashPayout * 1.15); // +15% bonus

//   const handleKitSubmit = (e) => {
//     e.preventDefault();
//     setKitSubmitted(true);
//   };

//   return (
//     <section id="sell" className="relative py-24 sm:py-32 bg-forest-900 text-bone overflow-hidden">
//       {/* Background Decorative Rings */}
//       <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full border border-sage-500/10 opacity-40" />
//       <div className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 h-[450px] w-[450px] rounded-full border border-champagne-300/10 opacity-30" />

//       <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
//         {/* Section Header */}
//         <div className="max-w-2xl">
//           <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sage-400">
//             <TrendingUp size={14} className="text-champagne-300" />
//             <span>Circular Consignment</span>
//           </div>
//           <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-bone">
//             Turn Your Wardrobe Into Capital.
//           </h2>
//           <p className="mt-3 text-sm sm:text-base text-bone/70">
//             Effortless white-glove consignment for luxury garments. We photograph, authenticate, insure, and find discerning new owners while returning top market value to you.
//           </p>
//         </div>

//         {/* Main Grid: Calculator on Left / Process on Right */}
//         <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
//           {/* Left: Interactive Valuation Tool (7 cols) */}
//           <div className="rounded-3xl border border-white/10 bg-forest-850/90 p-6 sm:p-8 backdrop-blur-xl shadow-luxury lg:col-span-7">
//             <div className="flex items-center justify-between border-b border-white/10 pb-4">
//               <span className="text-xs font-bold uppercase tracking-wider text-sage-300">
//                 Instant Consignment Valuation
//               </span>
//               <span className="rounded-full bg-sage-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-sage-300">
//                 Live Estimates
//               </span>
//             </div>

//             <div className="mt-6 space-y-6">
//               {/* Step 1: Category */}
//               <div>
//                 <label className="text-xs font-bold uppercase tracking-wider text-white/60">
//                   1. Garment Category
//                 </label>
//                 <div className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3">
//                   {CONSIGNMENT_CATEGORIES.map((cat) => (
//                     <button
//                       key={cat.id}
//                       type="button"
//                       onClick={() => setSelectedCategory(cat.id)}
//                       className={`rounded-xl border p-2.5 text-left text-xs font-medium transition-all ${
//                         selectedCategory === cat.id
//                           ? "border-champagne-300 bg-champagne-300/15 text-bone font-bold"
//                           : "border-white/10 bg-forest-900/60 text-white/70 hover:border-white/30"
//                       }`}
//                     >
//                       {cat.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Step 2: Designer Brand */}
//               <div>
//                 <label className="text-xs font-bold uppercase tracking-wider text-white/60">
//                   2. Designer House / Brand
//                 </label>
//                 <div className="mt-2.5 flex flex-wrap gap-2">
//                   {CONSIGNMENT_BRANDS.map((brand, idx) => (
//                     <button
//                       key={brand.name}
//                       type="button"
//                       onClick={() => setSelectedBrandIndex(idx)}
//                       className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
//                         selectedBrandIndex === idx
//                           ? "bg-sage-500 text-forest-950 font-bold"
//                           : "border border-white/10 bg-forest-900/60 text-white/70 hover:border-white/30"
//                       }`}
//                     >
//                       {brand.name}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Step 3: Condition */}
//               <div>
//                 <label className="text-xs font-bold uppercase tracking-wider text-white/60">
//                   3. Garment Condition
//                 </label>
//                 <div className="mt-2.5 grid grid-cols-3 gap-2">
//                   {[
//                     { label: "Pristine / NWT (10/10)", val: 1.0 },
//                     { label: "Excellent (9/10)", val: 0.85 },
//                     { label: "Very Good (8/10)", val: 0.7 },
//                   ].map((c) => (
//                     <button
//                       key={c.label}
//                       type="button"
//                       onClick={() => setConditionTier(c.val)}
//                       className={`rounded-xl border p-2 text-center text-xs font-medium transition-all ${
//                         conditionTier === c.val
//                           ? "border-sage-400 bg-sage-500/20 text-bone font-bold"
//                           : "border-white/10 bg-forest-900/60 text-white/70 hover:border-white/30"
//                       }`}
//                     >
//                       {c.label}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Valuation Result Box */}
//               <div className="mt-8 rounded-2xl border border-champagne-300/30 bg-forest-950/80 p-5 sm:p-6">
//                 <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                   <div>
//                     <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
//                       Estimated Direct Payout
//                     </span>
//                     <div className="flex items-baseline gap-2 mt-0.5">
//                       <span className="font-serif text-3xl sm:text-4xl font-semibold text-champagne-300">
//                         ${cashPayout}
//                       </span>
//                       <span className="text-xs text-white/40">cash via Direct Deposit</span>
//                     </div>
//                   </div>

//                   <div className="rounded-xl border border-sage-500/30 bg-sage-500/10 p-3 text-right sm:text-left">
//                     <span className="text-[10px] font-bold uppercase tracking-wider text-sage-300">
//                       Or Wearly Store Credit
//                     </span>
//                     <p className="font-serif text-xl font-bold text-sage-300">${storeCreditPayout}</p>
//                     <span className="text-[9px] text-white/60">+15% Circular Bonus</span>
//                   </div>
//                 </div>

//                 <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/10">
//                   <p className="text-[11px] text-white/50">
//                     * Final appraisal occurs upon physical inspection by our certified authenticator.
//                   </p>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setKitSubmitted(false);
//                       setIsModalOpen(true);
//                     }}
//                     className="inline-flex items-center justify-center gap-2 rounded-xl bg-champagne-300 px-5 py-3 text-xs font-bold uppercase tracking-widest text-forest-950 transition hover:bg-champagne-200 shadow-md whitespace-nowrap"
//                   >
//                     <span>Request Free Kit</span>
//                     <ArrowRight size={14} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right: 3-Step Process & Trust (5 cols) */}
//           <div className="space-y-6 lg:col-span-5">
//             <div className="rounded-3xl border border-white/10 bg-forest-850/60 p-6 sm:p-8">
//               <h3 className="font-serif text-xl font-medium text-bone">The 3-Step White-Glove Flow</h3>

//               <div className="mt-6 space-y-6">
//                 <div className="flex items-start gap-4">
//                   <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-champagne-300/40 bg-forest-900 font-serif text-xs font-bold text-champagne-300">
//                     1
//                   </span>
//                   <div>
//                     <h4 className="text-sm font-bold text-bone">We Send a Prepaid Luxury Mailer</h4>
//                     <p className="mt-1 text-xs text-bone/60 leading-relaxed">
//                       Receive an insulated, fully insured shipping box with prepaid labels directly at your doorstep.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-champagne-300/40 bg-forest-900 font-serif text-xs font-bold text-champagne-300">
//                     2
//                   </span>
//                   <div>
//                     <h4 className="text-sm font-bold text-bone">Physical Authentication & Studio Shoot</h4>
//                     <p className="mt-1 text-xs text-bone/60 leading-relaxed">
//                       Our in-house master tailors authenticate, eco-steam, and photograph your piece under editorial studio lighting.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-4">
//                   <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-champagne-300/40 bg-forest-900 font-serif text-xs font-bold text-champagne-300">
//                     3
//                   </span>
//                   <div>
//                     <h4 className="text-sm font-bold text-bone">Instant Payout Upon Sale</h4>
//                     <p className="mt-1 text-xs text-bone/60 leading-relaxed">
//                       Get paid directly into your bank or enjoy +15% credit to refresh your collection with circular archives.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Consignor Guarantee Card */}
//             <div className="rounded-2xl border border-sage-500/20 bg-forest-950/60 p-5">
//               <div className="flex items-center gap-2.5 text-xs font-bold text-sage-300 uppercase tracking-wider">
//                 <ShieldCheck size={16} className="text-sage-400" />
//                 <span>Zero Risk Guarantee</span>
//               </div>
//               <p className="mt-1.5 text-xs text-white/60 leading-relaxed">
//                 If your item doesn't sell within 60 days, we will return it insured to your door free of charge or purchase it directly.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Consignment Kit Modal */}
//       {isModalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
//           onClick={() => setIsModalOpen(false)}
//         >
//           <div
//             className="w-full max-w-lg rounded-3xl border border-white/10 bg-forest-900 p-6 sm:p-8 text-bone shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {kitSubmitted ? (
//               <div className="text-center py-6">
//                 <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-500/20 text-sage-400">
//                   <CheckCircle2 size={36} />
//                 </div>
//                 <h3 className="mt-4 font-serif text-2xl font-light text-bone">Consignment Kit En Route</h3>
//                 <p className="mt-2 text-sm text-bone/70">
//                   We've dispatched your prepaid insured packaging to <strong>{formData.address || "your address"}</strong>. Expected arrival within 48 hours.
//                 </p>
//                 <button
//                   type="button"
//                   onClick={() => setIsModalOpen(false)}
//                   className="mt-6 rounded-xl bg-champagne-300 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-forest-950 hover:bg-champagne-200"
//                 >
//                   Close & View Archives
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <div className="flex items-center justify-between border-b border-white/10 pb-4">
//                   <div>
//                     <h3 className="font-serif text-xl font-medium text-bone">Request Free Consignment Kit</h3>
//                     <p className="text-xs text-white/60">Includes insured box, security seal & prepaid DHL label</p>
//                   </div>
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/60 hover:text-white"
//                   >
//                     ✕
//                   </button>
//                 </div>

//                 <form onSubmit={handleKitSubmit} className="mt-5 space-y-4">
//                   <div>
//                     <label className="block text-xs font-semibold uppercase text-white/70">Full Name</label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.fullName}
//                       onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
//                       placeholder="Elena Vance"
//                       className="mt-1.5 w-full rounded-xl border border-white/10 bg-forest-850 px-3.5 py-2.5 text-xs text-bone focus:border-sage-400 focus:outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-semibold uppercase text-white/70">Email Address</label>
//                     <input
//                       type="email"
//                       required
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       placeholder="elena@vance.com"
//                       className="mt-1.5 w-full rounded-xl border border-white/10 bg-forest-850 px-3.5 py-2.5 text-xs text-bone focus:border-sage-400 focus:outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-semibold uppercase text-white/70">Shipping Address (for Kit)</label>
//                     <input
//                       type="text"
//                       required
//                       value={formData.address}
//                       onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                       placeholder="742 Evergreen Terrace, Suite 4B"
//                       className="mt-1.5 w-full rounded-xl border border-white/10 bg-forest-850 px-3.5 py-2.5 text-xs text-bone focus:border-sage-400 focus:outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-semibold uppercase text-white/70">Number of Items to Consign</label>
//                     <select
//                       value={formData.itemsCount}
//                       onChange={(e) => setFormData({ ...formData, itemsCount: e.target.value })}
//                       className="mt-1.5 w-full rounded-xl border border-white/10 bg-forest-850 px-3.5 py-2.5 text-xs text-bone focus:border-sage-400 focus:outline-none cursor-pointer"
//                     >
//                       <option value="1" className="bg-forest-900">1 Luxury Item</option>
//                       <option value="2-3" className="bg-forest-900">2 - 3 Luxury Items</option>
//                       <option value="4-10" className="bg-forest-900">4 - 10 Items (Full Closet Refresh)</option>
//                     </select>
//                   </div>

//                   <button
//                     type="submit"
//                     className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-champagne-300 py-3.5 text-xs font-bold uppercase tracking-widest text-forest-950 shadow-luxury transition hover:bg-champagne-200"
//                   >
//                     <span>Ship My Free Kit</span>
//                     <ArrowRight size={14} />
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }
