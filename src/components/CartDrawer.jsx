// import { useState } from "react";
// import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Check, Sparkles, Leaf } from "lucide-react";

// export default function CartDrawer({ isOpen, onClose, cart = [], onUpdateQuantity, onRemoveItem, onClearCart }) {
//   const [promoCode, setPromoCode] = useState("");
//   const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal e.g. 0.10
//   const [promoMsg, setPromoMsg] = useState("");
//   const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
//   const [orderCompleteData, setOrderCompleteData] = useState(null);

//   const [checkoutForm, setCheckoutForm] = useState({
//     name: "",
//     email: "",
//     address: "",
//     city: "",
//     country: "United States",
//     paymentMethod: "card",
//   });

//   if (!isOpen) return null;

//   const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   const discountAmount = subtotal * appliedDiscount;
//   const freeShippingThreshold = 600;
//   const isFreeShipping = subtotal >= freeShippingThreshold;
//   const shippingFee = subtotal > 0 && !isFreeShipping ? 25 : 0;
//   const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

//   const totalCarbonSaved = cart.reduce((sum, item) => sum + (item.carbonSavedKg || 15) * item.quantity, 0).toFixed(1);
//   const totalWaterSaved = cart.reduce((sum, item) => sum + (item.waterSavedL || 1800) * item.quantity, 0);

//   const handleApplyPromo = (e) => {
//     e.preventDefault();
//     if (promoCode.trim().toUpperCase() === "CIRCULAR10" || promoCode.trim().toUpperCase() === "WEARLY10") {
//       setAppliedDiscount(0.1);
//       setPromoMsg("10% Circular Archival Discount Applied!");
//     } else if (promoCode.trim().toUpperCase() === "VIP20") {
//       setAppliedDiscount(0.2);
//       setPromoMsg("20% VIP Consignor Discount Applied!");
//     } else {
//       setPromoMsg("Invalid code. Try CIRCULAR10");
//     }
//   };

//   const handleCompleteOrder = (e) => {
//     e.preventDefault();
//     const newOrderId = `WR-${Math.floor(1000 + Math.random() * 9000)}`;
//     setOrderCompleteData({
//       id: newOrderId,
//       itemsCount: cart.reduce((sum, i) => sum + i.quantity, 0),
//       total: finalTotal.toFixed(2),
//       email: checkoutForm.email || "customer@wearly.com",
//     });
//     onClearCart();
//   };

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md transition-opacity duration-300"
//         onClick={onClose}
//       />

//       {/* Slide-over Drawer */}
//       <aside className="fixed right-0 top-0 bottom-0 z-50 flex w-full max-w-md flex-col justify-between border-l border-white/10 bg-forest-900 text-bone shadow-2xl backdrop-blur-2xl transition-transform duration-300">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-white/10">
//           <div className="flex items-center gap-2.5">
//             <ShoppingBag size={20} className="text-champagne-300" />
//             <h2 className="font-serif text-xl font-medium text-bone">Your Circular Bag</h2>
//             <span className="rounded-full bg-forest-800 px-2.5 py-0.5 text-xs text-sage-400 font-semibold">
//               {cart.reduce((sum, item) => sum + item.quantity, 0)}
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

//         {/* Free Shipping Bar */}
//         {subtotal > 0 && (
//           <div className="bg-forest-850 px-6 py-3 border-b border-white/10 text-xs">
//             {isFreeShipping ? (
//               <div className="flex items-center gap-2 text-sage-300 font-semibold">
//                 <Check size={14} className="text-sage-400" />
//                 <span>Unlocked Complimentary Express Shipping!</span>
//               </div>
//             ) : (
//               <div>
//                 <div className="flex justify-between text-white/70 mb-1">
//                   <span>Add ${(freeShippingThreshold - subtotal).toFixed(0)} for Free Express Delivery</span>
//                   <span>{Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))}%</span>
//                 </div>
//                 <div className="h-1.5 w-full rounded-full bg-forest-950 overflow-hidden">
//                   <div
//                     className="h-full bg-champagne-300 transition-all duration-300"
//                     style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
//                   />
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Cart Item List */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
//           {cart.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-20 text-center">
//               <div className="grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-forest-850 text-white/30">
//                 <ShoppingBag size={28} />
//               </div>
//               <h3 className="mt-4 font-serif text-lg font-medium text-bone">Your bag is empty</h3>
//               <p className="mt-1 text-xs text-white/50 max-w-xs">
//                 Explore our curated archives and add authenticated luxury garments to your collection.
//               </p>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="mt-6 rounded-full bg-champagne-300/10 border border-champagne-300/30 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-champagne-300 hover:bg-champagne-300 hover:text-forest-950 transition"
//               >
//                 Browse Collection
//               </button>
//             </div>
//           ) : (
//             cart.map((item) => (
//               <div
//                 key={`${item.id}-${item.size}`}
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
//                         onClick={() => onRemoveItem(item.id)}
//                         className="text-white/40 hover:text-rose-400 transition"
//                       >
//                         <Trash2 size={14} />
//                       </button>
//                     </div>

//                     <p className="mt-0.5 text-[11px] text-white/50">
//                       Size: {item.size} • {item.condition}
//                     </p>
//                   </div>

//                   <div className="flex items-center justify-between pt-2">
//                     {/* Quantity Selector */}
//                     <div className="flex items-center rounded-lg border border-white/10 bg-forest-900">
//                       <button
//                         type="button"
//                         onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
//                         className="p-1.5 text-white/60 hover:text-white"
//                       >
//                         <Minus size={12} />
//                       </button>
//                       <span className="px-2 text-xs font-bold text-bone">{item.quantity}</span>
//                       <button
//                         type="button"
//                         onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
//                         className="p-1.5 text-white/60 hover:text-white"
//                       >
//                         <Plus size={12} />
//                       </button>
//                     </div>

//                     <span className="font-serif text-base font-bold text-champagne-300">
//                       ${(item.price * item.quantity).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Footer Summary & Checkout */}
//         {cart.length > 0 && (
//           <div className="p-6 border-t border-white/10 bg-forest-950/80 space-y-4">
//             {/* Promo Code Input */}
//             <form onSubmit={handleApplyPromo} className="flex gap-2">
//               <div className="relative flex-1">
//                 <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
//                 <input
//                   type="text"
//                   placeholder="Promo code (e.g. CIRCULAR10)"
//                   value={promoCode}
//                   onChange={(e) => setPromoCode(e.target.value)}
//                   className="w-full rounded-xl border border-white/10 bg-forest-900 py-2 pl-9 pr-3 text-xs text-bone placeholder-white/40 focus:border-sage-400 focus:outline-none"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="rounded-xl border border-champagne-300/30 bg-champagne-300/10 px-4 py-2 text-xs font-bold text-champagne-300 hover:bg-champagne-300 hover:text-forest-950 transition"
//               >
//                 Apply
//               </button>
//             </form>

//             {promoMsg && (
//               <p
//                 className={`text-[11px] font-medium ${
//                   appliedDiscount > 0 ? "text-sage-400" : "text-rose-400"
//                 }`}
//               >
//                 {promoMsg}
//               </p>
//             )}

//             {/* Impact Metric Summary */}
//             <div className="rounded-xl border border-sage-500/20 bg-forest-900 p-3 text-xs flex items-center justify-between">
//               <span className="flex items-center gap-1.5 text-sage-300 font-medium">
//                 <Leaf size={14} /> Total Environmental Offset:
//               </span>
//               <span className="font-semibold text-bone">
//                 {totalCarbonSaved}kg CO₂ • {totalWaterSaved.toLocaleString()}L H₂O
//               </span>
//             </div>

//             {/* Price Calculations */}
//             <div className="space-y-1.5 text-xs">
//               <div className="flex justify-between text-white/60">
//                 <span>Subtotal</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               {appliedDiscount > 0 && (
//                 <div className="flex justify-between text-sage-400 font-semibold">
//                   <span>Promo Discount ({(appliedDiscount * 100)}%)</span>
//                   <span>-${discountAmount.toFixed(2)}</span>
//                 </div>
//               )}
//               <div className="flex justify-between text-white/60">
//                 <span>Shipping</span>
//                 <span>{isFreeShipping ? "FREE (Express)" : `$${shippingFee}`}</span>
//               </div>
//               <div className="flex justify-between pt-2 border-t border-white/10 text-base font-bold text-bone font-serif">
//                 <span>Total</span>
//                 <span className="text-champagne-300">${finalTotal.toFixed(2)}</span>
//               </div>
//             </div>

//             {/* Checkout Button */}
//             <button
//               type="button"
//               onClick={() => setIsCheckoutOpen(true)}
//               className="flex w-full items-center justify-center gap-2 rounded-xl bg-champagne-300 py-3.5 text-xs font-bold uppercase tracking-widest text-forest-950 shadow-luxury transition hover:bg-champagne-200"
//             >
//               <span>Proceed to Checkout</span>
//               <ArrowRight size={14} />
//             </button>
//           </div>
//         )}
//       </aside>

//       {/* Checkout Modal */}
//       {isCheckoutOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
//           onClick={() => setIsCheckoutOpen(false)}
//         >
//           <div
//             className="w-full max-w-lg rounded-3xl border border-white/10 bg-forest-900 p-6 sm:p-8 text-bone shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {orderCompleteData ? (
//               <div className="text-center py-6 space-y-4">
//                 <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-500/20 text-sage-400">
//                   <Sparkles size={32} />
//                 </div>
//                 <h3 className="font-serif text-3xl font-light text-bone">Order Confirmed!</h3>
//                 <p className="text-xs text-sage-300 font-mono">ORDER ID: {orderCompleteData.id}</p>
//                 <p className="text-xs text-bone/70 leading-relaxed max-w-sm mx-auto">
//                   Thank you for investing in circular fashion. A confirmation receipt has been sent to{" "}
//                   <strong>{orderCompleteData.email}</strong>.
//                 </p>

//                 <div className="rounded-2xl border border-white/10 bg-forest-850 p-4 text-left text-xs space-y-2">
//                   <div className="flex justify-between">
//                     <span className="text-white/50">Items count:</span>
//                     <span className="font-semibold text-bone">{orderCompleteData.itemsCount} pieces</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-white/50">Total Paid:</span>
//                     <span className="font-bold text-champagne-300">${orderCompleteData.total}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span className="text-white/50">Packaging:</span>
//                     <span className="text-sage-400">100% Biodegradable Unbleached Cotton</span>
//                   </div>
//                 </div>

//                 <div className="pt-2 flex flex-col sm:flex-row gap-3">
//                   <a
//                     href="#order"
//                     onClick={() => {
//                       setIsCheckoutOpen(false);
//                       onClose();
//                       window.location.hash = "#order";
//                     }}
//                     className="flex-1 rounded-xl bg-sage-500 py-3 text-xs font-bold uppercase tracking-widest text-forest-950 text-center hover:bg-sage-400"
//                   >
//                     Track Order ({orderCompleteData.id})
//                   </a>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setOrderCompleteData(null);
//                       setIsCheckoutOpen(false);
//                       onClose();
//                     }}
//                     className="rounded-xl border border-white/10 bg-forest-850 px-5 py-3 text-xs font-semibold uppercase text-bone hover:border-white/30"
//                   >
//                     Close
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div>
//                 <div className="flex items-center justify-between border-b border-white/10 pb-4">
//                   <div>
//                     <h3 className="font-serif text-xl font-medium text-bone">Express Checkout</h3>
//                     <p className="text-xs text-white/50">Total: ${finalTotal.toFixed(2)}</p>
//                   </div>
//                   <button
//                     onClick={() => setIsCheckoutOpen(false)}
//                     className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/60 hover:text-white"
//                   >
//                     ✕
//                   </button>
//                 </div>

//                 <form onSubmit={handleCompleteOrder} className="mt-5 space-y-3.5">
//                   <div>
//                     <label className="block text-[11px] font-semibold uppercase text-white/70">Full Name</label>
//                     <input
//                       type="text"
//                       required
//                       value={checkoutForm.name}
//                       onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
//                       placeholder="Camille Dupont"
//                       className="mt-1 w-full rounded-xl border border-white/10 bg-forest-850 px-3.5 py-2 text-xs text-bone focus:border-sage-400 focus:outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[11px] font-semibold uppercase text-white/70">Email Address</label>
//                     <input
//                       type="email"
//                       required
//                       value={checkoutForm.email}
//                       onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
//                       placeholder="camille@dupont.com"
//                       className="mt-1 w-full rounded-xl border border-white/10 bg-forest-850 px-3.5 py-2 text-xs text-bone focus:border-sage-400 focus:outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-[11px] font-semibold uppercase text-white/70">Shipping Address</label>
//                     <input
//                       type="text"
//                       required
//                       value={checkoutForm.address}
//                       onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
//                       placeholder="145 Fifth Avenue, Apt 12B"
//                       className="mt-1 w-full rounded-xl border border-white/10 bg-forest-850 px-3.5 py-2 text-xs text-bone focus:border-sage-400 focus:outline-none"
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-3">
//                     <div>
//                       <label className="block text-[11px] font-semibold uppercase text-white/70">City</label>
//                       <input
//                         type="text"
//                         required
//                         value={checkoutForm.city}
//                         onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
//                         placeholder="New York"
//                         className="mt-1 w-full rounded-xl border border-white/10 bg-forest-850 px-3.5 py-2 text-xs text-bone focus:border-sage-400 focus:outline-none"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-[11px] font-semibold uppercase text-white/70">Payment Method</label>
//                       <select
//                         value={checkoutForm.paymentMethod}
//                         onChange={(e) => setCheckoutForm({ ...checkoutForm, paymentMethod: e.target.value })}
//                         className="mt-1 w-full rounded-xl border border-white/10 bg-forest-850 px-3 py-2 text-xs text-bone focus:border-sage-400 focus:outline-none cursor-pointer"
//                       >
//                         <option value="card" className="bg-forest-900">Credit / Debit Card</option>
//                         <option value="apple" className="bg-forest-900">Apple Pay</option>
//                         <option value="klarna" className="bg-forest-900">Klarna 4x Interest-Free</option>
//                       </select>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-champagne-300 py-3.5 text-xs font-bold uppercase tracking-widest text-forest-950 shadow-luxury transition hover:bg-champagne-200"
//                   >
//                     <ShieldCheck size={16} />
//                     <span>Pay ${finalTotal.toFixed(2)} & Place Order</span>
//                   </button>
//                 </form>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
