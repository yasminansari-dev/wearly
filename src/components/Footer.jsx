// import { useState } from "react";
// import { ArrowUpRight, Sparkles, Heart, ShieldCheck, RefreshCw, Send, Check } from "lucide-react";

// export default function Footer() {
//   const [email, setEmail] = useState("");
//   const [subscribed, setSubscribed] = useState(false);

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (email) {
//       setSubscribed(true);
//       setEmail("");
//     }
//   };

//   return (
//     <footer className="relative bg-forest-950 text-bone pt-20 pb-12 border-t border-white/10 overflow-hidden">
//       <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
//         {/* Top Newsletter Card */}
//         <div className="rounded-3xl border border-white/10 bg-forest-900/80 p-8 sm:p-12 mb-16 relative overflow-hidden backdrop-blur-xl">
//           <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-1/3 opacity-20 bg-gradient-to-l from-sage-500 to-transparent" />
          
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
//             <div className="lg:col-span-7 space-y-2">
//               <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sage-400">
//                 <Sparkles size={14} className="text-champagne-300" />
//                 <span>The Wearly Private Dispatch</span>
//               </div>
//               <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-bone">
//                 Receive Archival Drops First.
//               </h3>
//               <p className="text-xs sm:text-sm text-bone/70 max-w-xl">
//                 Get priority early access to rare runway pieces, weekly circular impact reports, and member-only consignment multipliers.
//               </p>
//             </div>

//             <div className="lg:col-span-5">
//               {subscribed ? (
//                 <div className="flex items-center gap-3 rounded-2xl bg-sage-500/20 border border-sage-500/40 p-4 text-sage-300 text-xs font-medium">
//                   <Check size={18} className="text-sage-400 shrink-0" />
//                   <span>Welcome to Wearly Private Dispatch. Check your inbox for your 10% welcome pass!</span>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
//                   <input
//                     type="email"
//                     required
//                     placeholder="Enter your email address"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="flex-1 rounded-full border border-white/15 bg-forest-950 px-5 py-3.5 text-xs text-bone placeholder-white/40 focus:border-sage-400 focus:outline-none"
//                   />
//                   <button
//                     type="submit"
//                     className="inline-flex items-center justify-center gap-2 rounded-full bg-champagne-300 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-forest-950 hover:bg-champagne-200 transition shadow-luxury shrink-0"
//                   >
//                     <span>Subscribe</span>
//                     <Send size={14} />
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Main Footer Links */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10 text-xs">
//           {/* Brand Info */}
//           <div className="lg:col-span-4 space-y-4">
//             <div className="flex items-center gap-3">
//               <span className="grid h-8 w-8 place-items-center rounded-full border border-champagne-300/40 bg-forest-850 font-serif text-xs font-bold text-champagne-300">
//                 W
//               </span>
//               <span className="font-display tracking-[0.25em] text-sm text-bone font-bold">WEARLY</span>
//             </div>
//             <p className="text-white/60 leading-relaxed max-w-sm">
//               The premier circular fashion platform dedicated to extending the lifecycle of authenticated luxury garments. Designed for a waste-free future.
//             </p>
//             <div className="flex items-center gap-4 text-white/50 pt-2">
//               <a href="#" className="hover:text-champagne-300 transition">Instagram</a>
//               <a href="#" className="hover:text-champagne-300 transition">Vogue Archive</a>
//               <a href="#" className="hover:text-champagne-300 transition">Sustainability Report</a>
//             </div>
//           </div>

//           {/* Nav Links Column 1 */}
//           <div className="lg:col-span-3 space-y-3">
//             <h4 className="font-semibold uppercase tracking-widest text-sage-400">Navigation</h4>
//             <ul className="space-y-2 text-white/70">
//               <li><a href="#discover" className="hover:text-champagne-300 transition">Curated Archives</a></li>
//               <li><a href="#sell" className="hover:text-champagne-300 transition">Consign & Valuation</a></li>
//               <li><a href="#donate" className="hover:text-champagne-300 transition">Donate Loop & Pickup</a></li>
//               <li><a href="#order" className="hover:text-champagne-300 transition">Track Package Logistics</a></li>
//             </ul>
//           </div>

//           {/* Nav Links Column 2 */}
//           <div className="lg:col-span-3 space-y-3">
//             <h4 className="font-semibold uppercase tracking-widest text-sage-400">Authenticity & Eco</h4>
//             <ul className="space-y-2 text-white/70">
//               <li className="flex items-center gap-2"><ShieldCheck size={14} className="text-sage-400" /> 18-Point Physical Lab Audit</li>
//               <li className="flex items-center gap-2"><RefreshCw size={14} className="text-champagne-300" /> Zero Textile Landfill Policy</li>
//               <li className="flex items-center gap-2"><Heart size={14} className="text-rose-400" /> Certified Circular Partner</li>
//             </ul>
//           </div>

//           {/* Column 3 */}
//           <div className="lg:col-span-2 space-y-3">
//             <h4 className="font-semibold uppercase tracking-widest text-sage-400">Account</h4>
//             <ul className="space-y-2 text-white/70">
//               <li><a href="#login" className="hover:text-champagne-300 transition">Member Sign In</a></li>
//               <li><a href="#register" className="hover:text-champagne-300 transition">Consignor Registration</a></li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Rights */}
//         <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-4">
//           <p>© {new Date().getFullYear()} WEARLY Circular Luxury Inc. All rights reserved.</p>
//           <div className="flex items-center gap-6">
//             <a href="#" className="hover:text-white/70">Privacy Policy</a>
//             <a href="#" className="hover:text-white/70">Terms of Consignment</a>
//             <a href="#" className="hover:text-white/70">Authenticity Guarantee</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }
