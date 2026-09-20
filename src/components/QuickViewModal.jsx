// import { useState } from "react";
// import { X, ShoppingBag, Heart, ShieldCheck, Leaf, Droplets, Check, Truck, ArrowRight } from "lucide-react";

// export default function QuickViewModal({ product, onClose, onAddToCart, wishlist = [], onToggleWishlist }) {
//   const [selectedSize, setSelectedSize] = useState(product?.size || "");
//   const [isAdded, setIsAdded] = useState(false);

//   if (!product) return null;

//   const isWishlisted = wishlist.includes(product.id);
//   const discountPct = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

//   const handleAdd = () => {
//     onAddToCart({ ...product, size: selectedSize || product.size });
//     setIsAdded(true);
//     setTimeout(() => setIsAdded(false), 2000);
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
//       onClick={onClose}
//     >
//       <div
//         className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-forest-900 text-bone shadow-2xl no-scrollbar"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Close Button */}
//         <button
//           type="button"
//           onClick={onClose}
//           aria-label="Close modal"
//           className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-forest-950/80 text-white/70 backdrop-blur-md transition hover:border-white/30 hover:text-white"
//         >
//           <X size={18} />
//         </button>

//         <div className="grid grid-cols-1 md:grid-cols-2">
//           {/* Left: Product Image */}
//           <div className="relative aspect-[3/4] w-full bg-forest-950 md:min-h-[500px]">
//             <img
//               src={product.image}
//               alt={product.title}
//               className="h-full w-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-black/30" />
            
//             {/* Top Badges */}
//             <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
//               <span className="rounded-full bg-forest-950/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-champagne-300 border border-white/10 backdrop-blur-md">
//                 {product.condition}
//               </span>
//               <span className="rounded-full bg-sage-600/90 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-md">
//                 -{discountPct}% vs Retail
//               </span>
//             </div>

//             {/* Bottom Eco Badges */}
//             <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
//               <div className="flex-1 flex items-center gap-2 rounded-xl bg-forest-950/80 p-2.5 backdrop-blur-md border border-white/10 text-xs">
//                 <Leaf size={16} className="text-sage-400 shrink-0" />
//                 <div>
//                   <p className="font-semibold text-bone">{product.carbonSavedKg} kg CO₂</p>
//                   <p className="text-[10px] text-white/50">Carbon Diverted</p>
//                 </div>
//               </div>

//               <div className="flex-1 flex items-center gap-2 rounded-xl bg-forest-950/80 p-2.5 backdrop-blur-md border border-white/10 text-xs">
//                 <Droplets size={16} className="text-champagne-300 shrink-0" />
//                 <div>
//                   <p className="font-semibold text-bone">{product.waterSavedL?.toLocaleString()} L</p>
//                   <p className="text-[10px] text-white/50">Water Conserved</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Right: Product Details & Purchase Actions */}
//           <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
//             <div>
//               {/* Brand & Seller */}
//               <div className="flex items-center justify-between text-xs">
//                 <span className="font-bold uppercase tracking-widest text-sage-400">
//                   {product.brand}
//                 </span>
//                 <span className="text-white/50 text-[11px]">Consigned by {product.seller}</span>
//               </div>

//               {/* Title */}
//               <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-light leading-tight text-bone">
//                 {product.title}
//               </h2>

//               {/* Price Row */}
//               <div className="mt-4 flex items-baseline gap-3">
//                 <span className="font-serif text-3xl font-bold text-champagne-300">${product.price}</span>
//                 <span className="text-sm text-white/40 line-through">${product.originalPrice}</span>
//                 <span className="text-xs font-semibold text-sage-400">
//                   (Save ${(product.originalPrice - product.price)})
//                 </span>
//               </div>

//               {/* Description */}
//               <p className="mt-4 text-xs sm:text-sm text-bone/70 leading-relaxed">
//                 {product.description}
//               </p>

//               {/* Specifications */}
//               <div className="mt-6 rounded-2xl border border-white/10 bg-forest-850/60 p-4 space-y-2 text-xs">
//                 <div className="flex justify-between">
//                   <span className="text-white/50">Material:</span>
//                   <span className="font-semibold text-bone">{product.material}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-white/50">Color:</span>
//                   <span className="font-semibold text-bone">{product.color}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-white/50">Collection Year:</span>
//                   <span className="font-semibold text-bone">{product.year || "2023"}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-white/50">Measurements:</span>
//                   <span className="font-semibold text-bone">{product.measurements}</span>
//                 </div>
//               </div>

//               {/* Authenticity Guarantee Pill */}
//               <div className="mt-4 flex items-center gap-2 text-xs text-sage-300">
//                 <ShieldCheck size={16} className="text-sage-400" />
//                 <span>Physically authenticated & sanitized by Wearly Archival Lab</span>
//               </div>
//             </div>

//             {/* Bottom Actions */}
//             <div className="space-y-3 pt-4 border-t border-white/10">
//               <div className="flex items-center gap-3">
//                 <button
//                   type="button"
//                   onClick={handleAdd}
//                   className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
//                     isAdded
//                       ? "bg-sage-500 text-forest-950"
//                       : "bg-champagne-300 text-forest-950 hover:bg-champagne-200 shadow-luxury"
//                   }`}
//                 >
//                   {isAdded ? (
//                     <>
//                       <Check size={16} /> Added to Bag
//                     </>
//                   ) : (
//                     <>
//                       <ShoppingBag size={16} /> Add to Bag - ${product.price}
//                     </>
//                   )}
//                 </button>

//                 <button
//                   type="button"
//                   aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
//                   onClick={() => onToggleWishlist(product.id)}
//                   className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl border transition-all ${
//                     isWishlisted
//                       ? "border-rose-500 bg-rose-500/20 text-rose-400"
//                       : "border-white/10 bg-forest-850 text-white/70 hover:border-white/30 hover:text-white"
//                   }`}
//                 >
//                   <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
//                 </button>
//               </div>

//               <div className="flex items-center justify-center gap-2 text-[11px] text-white/50">
//                 <Truck size={14} className="text-sage-400" />
//                 <span>Complimentary Express Shipping on orders over $600</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
