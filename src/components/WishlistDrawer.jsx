// import { X, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
// import { CATALOG_PRODUCTS } from "../data/mockData";

// export default function WishlistDrawer({ isOpen, onClose, wishlist = [], onToggleWishlist, onAddToCart }) {
//   if (!isOpen) return null;

//   const wishlistedProducts = CATALOG_PRODUCTS.filter((p) => wishlist.includes(p.id));

//   return (
//     <>
//       <div
//         className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md transition-opacity duration-300"
//         onClick={onClose}
//       />

//       <aside className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-md flex-col justify-between border-l border-white/10 bg-forest-900 text-bone shadow-2xl backdrop-blur-2xl transition-transform duration-300">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-white/10">
//           <div className="flex items-center gap-2.5">
//             <Heart size={20} className="text-rose-400 fill-rose-400" />
//             <h2 className="font-serif text-xl font-medium text-bone">Saved Archives</h2>
//             <span className="rounded-full bg-forest-800 px-2.5 py-0.5 text-xs text-sage-400 font-semibold">
//               {wishlistedProducts.length}
//             </span>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30"
//           >
//             <X size={16} />
//           </button>
//         </div>

//         {/* List */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
//           {wishlistedProducts.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-20 text-center">
//               <div className="grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-forest-850 text-white/30">
//                 <Heart size={28} />
//               </div>
//               <h3 className="mt-4 font-serif text-lg font-medium text-bone">No saved garments yet</h3>
//               <p className="mt-1 text-xs text-white/50 max-w-xs">
//                 Click the heart icon on any archival piece in the collection to save it to your wishlist.
//               </p>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="mt-6 rounded-full bg-champagne-300/10 border border-champagne-300/30 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-champagne-300 hover:bg-champagne-300 hover:text-forest-950 transition"
//               >
//                 Explore Archives
//               </button>
//             </div>
//           ) : (
//             wishlistedProducts.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex gap-4 rounded-2xl border border-white/10 bg-forest-850/60 p-3.5 backdrop-blur-sm"
//               >
//                 <img
//                   src={item.image}
//                   alt={item.title}
//                   className="h-24 w-20 rounded-xl object-cover bg-forest-950 shrink-0"
//                 />

//                 <div className="flex flex-1 flex-col justify-between">
//                   <div>
//                     <div className="flex items-start justify-between gap-2">
//                       <div>
//                         <span className="text-[10px] font-bold uppercase tracking-widest text-sage-400">
//                           {item.brand}
//                         </span>
//                         <h4 className="font-serif text-sm font-medium text-bone line-clamp-1">{item.title}</h4>
//                       </div>
//                       <button
//                         type="button"
//                         onClick={() => onToggleWishlist(item.id)}
//                         className="text-white/40 hover:text-rose-400 transition"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>

//                     <p className="mt-0.5 text-[11px] text-white/50">
//                       {item.size} • {item.condition}
//                     </p>
//                   </div>

//                   <div className="flex items-center justify-between pt-2">
//                     <span className="font-serif text-base font-bold text-champagne-300">${item.price}</span>
//                     <button
//                       type="button"
//                       onClick={() => {
//                         onAddToCart(item);
//                         onToggleWishlist(item.id);
//                       }}
//                       className="flex items-center gap-1.5 rounded-xl border border-champagne-300/30 bg-champagne-300/10 px-3 py-1.5 text-xs font-bold uppercase text-champagne-300 hover:bg-champagne-300 hover:text-forest-950 transition"
//                     >
//                       <ShoppingBag size={12} /> Move to Bag
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t border-white/10 bg-forest-950/80">
//           <button
//             type="button"
//             onClick={onClose}
//             className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest-800 py-3 text-xs font-bold uppercase tracking-widest text-bone hover:bg-forest-700 transition"
//           >
//             <span>Continue Browsing</span>
//             <ArrowRight size={14} />
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }
