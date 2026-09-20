// import { useState } from "react";
// import { HeartHandshake, Droplets, Leaf, Shirt, ShieldCheck, QrCode, Truck, Check, ArrowRight } from "lucide-react";
// import { IMPACT_METRICS } from "../data/mockData";

// export default function DonateSection() {
//   const [activeTab, setActiveTab] = useState("pickup"); // 'pickup' or 'dropoff'
//   const [modalOpen, setModalOpen] = useState(false);
//   const [stepComplete, setStepComplete] = useState(false);
//   const [pickupData, setPickupData] = useState({ name: "", email: "", address: "", date: "2026-09-24", bagCount: "1" });

//   const handleDonateSubmit = (e) => {
//     e.preventDefault();
//     setStepComplete(true);
//   };

//   return (
//     <section id="donate" className="relative py-24 sm:py-32 bg-forest-950 text-bone">
//       <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
//         {/* Section Header */}
//         <div className="text-center max-w-3xl mx-auto">
//           <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sage-400">
//             <HeartHandshake size={14} className="text-champagne-300" />
//             <span>The Circular Impact Loop</span>
//           </div>
//           <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-bone">
//             Give Garments a Meaningful Future.
//           </h2>
//           <p className="mt-4 text-sm sm:text-base text-bone/70 leading-relaxed">
//             Not all clothing belongs in resale—some pieces are meant to support communities or be responsibly upcycled into high-grade insulation. We guarantee zero landfill.
//           </p>
//         </div>

//         {/* Live Impact Counters */}
//         <div className="mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
//           {IMPACT_METRICS.map((metric) => (
//             <div
//               key={metric.label}
//               className="group rounded-2xl border border-white/10 bg-forest-900/60 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-sage-500/40 hover:bg-forest-850"
//             >
//               <div className="flex items-center justify-between text-sage-400">
//                 <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">{metric.label}</span>
//                 {metric.icon === "Shirt" && <Shirt size={16} />}
//                 {metric.icon === "Droplets" && <Droplets size={16} />}
//                 {metric.icon === "Leaf" && <Leaf size={16} />}
//                 {metric.icon === "ShieldCheck" && <ShieldCheck size={16} />}
//               </div>
//               <div className="mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl font-light text-champagne-300">
//                 {metric.value}
//               </div>
//               <p className="mt-1 text-[11px] text-white/60">{metric.unit}</p>
//             </div>
//           ))}
//         </div>

//         {/* Action Cards: Free Pickup vs Drop-Off */}
//         <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
//           {/* Card 1: Courier Pickup */}
//           <div className="rounded-3xl border border-white/10 bg-forest-900/70 p-6 sm:p-8 flex flex-col justify-between">
//             <div>
//               <div className="flex items-center gap-3 text-champagne-300">
//                 <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-800 border border-white/10">
//                   <Truck size={20} />
//                 </span>
//                 <div>
//                   <h3 className="font-serif text-xl font-medium text-bone">Complimentary Home Pickup</h3>
//                   <span className="text-xs text-sage-400">Door-to-door green courier collection</span>
//                 </div>
//               </div>
//               <p className="mt-4 text-xs sm:text-sm text-bone/70 leading-relaxed">
//                 Pack any clean, wearable garments in any box or bag. We send an electric courier to collect them right from your doorstep at zero cost.
//               </p>
//               <ul className="mt-4 space-y-2 text-xs text-white/60">
//                 <li className="flex items-center gap-2">
//                   <Check size={14} className="text-sage-400" /> Free carbon-neutral collection
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <Check size={14} className="text-sage-400" /> Instant tax donation receipt upon sorting
//                 </li>
//               </ul>
//             </div>

//             <button
//               type="button"
//               onClick={() => {
//                 setActiveTab("pickup");
//                 setStepComplete(false);
//                 setModalOpen(true);
//               }}
//               className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-sage-500 py-3.5 text-xs font-bold uppercase tracking-widest text-forest-950 transition hover:bg-sage-400"
//             >
//               <span>Schedule Free Pickup</span>
//               <ArrowRight size={14} />
//             </button>
//           </div>

//           {/* Card 2: Digital Drop-Off Pass */}
//           <div className="rounded-3xl border border-white/10 bg-forest-900/70 p-6 sm:p-8 flex flex-col justify-between">
//             <div>
//               <div className="flex items-center gap-3 text-champagne-300">
//                 <span className="grid h-10 w-10 place-items-center rounded-xl bg-forest-800 border border-white/10">
//                   <QrCode size={20} />
//                 </span>
//                 <div>
//                   <h3 className="font-serif text-xl font-medium text-bone">Digital Drop-Off Pass</h3>
//                   <span className="text-xs text-sage-400">1,200+ partner eco-lockers worldwide</span>
//                 </div>
//               </div>
//               <p className="mt-4 text-xs sm:text-sm text-bone/70 leading-relaxed">
//                 Generate a contactless QR code to drop bags at any partner hub, boutique drop-box, or post partner in your neighborhood anytime.
//               </p>
//               <ul className="mt-4 space-y-2 text-xs text-white/60">
//                 <li className="flex items-center gap-2">
//                   <Check size={14} className="text-sage-400" /> 24/7 Smart locker drop access
//                 </li>
//                 <li className="flex items-center gap-2">
//                   <Check size={14} className="text-sage-400" /> Earn $20 Wearly credit for every 5kg donated
//                 </li>
//               </ul>
//             </div>

//             <button
//               type="button"
//               onClick={() => {
//                 setActiveTab("dropoff");
//                 setStepComplete(false);
//                 setModalOpen(true);
//               }}
//               className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-champagne-300/40 bg-champagne-300/10 py-3.5 text-xs font-bold uppercase tracking-widest text-champagne-300 transition hover:bg-champagne-300 hover:text-forest-950"
//             >
//               <span>Generate Drop-Off QR</span>
//               <QrCode size={14} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Donation Modal */}
//       {modalOpen && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
//           onClick={() => setModalOpen(false)}
//         >
//           <div
//             className="w-full max-w-lg rounded-3xl border border-white/10 bg-forest-900 p-6 sm:p-8 text-bone shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {stepComplete ? (
//               <div className="text-center py-6">
//                 <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-500/20 text-sage-400">
//                   {activeTab === "pickup" ? <Truck size={32} /> : <QrCode size={32} />}
//                 </div>
//                 <h3 className="mt-4 font-serif text-2xl font-light text-bone">
//                   {activeTab === "pickup" ? "Pickup Confirmed!" : "Your Drop-Off Pass is Ready!"}
//                 </h3>
//                 <p className="mt-2 text-sm text-bone/70">
//                   {activeTab === "pickup"
//                     ? `Our courier will arrive at ${pickupData.address || "your address"} on ${pickupData.date}.`
//                     : "Scan this pass at any participating Wearly drop kiosk."}
//                 </p>
//                 {activeTab === "dropoff" && (
//                   <div className="my-5 mx-auto max-w-[180px] rounded-2xl bg-white p-4 text-forest-950 text-center font-mono text-xs">
//                     <div className="h-32 w-full bg-forest-950 rounded-lg flex items-center justify-center text-white text-[10px]">
//                       [QR-WEARLY-DONATE-PASS]
//                     </div>
//                     <p className="mt-2 text-[10px] text-gray-600 uppercase font-bold">PASS #WR-DON-9921</p>
//                   </div>
//                 )}
//                 <button
//                   type="button"
//                   onClick={() => setModalOpen(false)}
//                   className="mt-4 rounded-xl bg-champagne-300 px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-forest-950 hover:bg-champagne-200"
//                 >
//                   Done
//                 </button>
//               </div>
//             ) : (
//               <div>
//                 <div className="flex items-center justify-between border-b border-white/10 pb-4">
//                   <h3 className="font-serif text-xl font-medium text-bone">
//                     {activeTab === "pickup" ? "Schedule Doorstep Pickup" : "Get Drop-Off Pass"}
//                   </h3>
//                   <button
//                     onClick={() => setModalOpen(false)}
//                     className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/60 hover:text-white"
//                   >
//                     ✕
//                   </button>
//                 </div>

//                 <form onSubmit={handleDonateSubmit} className="mt-5 space-y-4">
//                   <div>
//                     <label className="block text-xs font-semibold uppercase text-white/70">Full Name</label>
//                     <input
//                       type="text"
//                       required
//                       value={pickupData.name}
//                       onChange={(e) => setPickupData({ ...pickupData, name: e.target.value })}
//                       placeholder="Jane Doe"
//                       className="mt-1 w-full rounded-xl border border-white/10 bg-forest-850 px-3.5 py-2.5 text-xs text-bone focus:border-sage-400 focus:outline-none"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-xs font-semibold uppercase text-white/70">Email Address (for receipt)</label>
//                     <input
//                       type="email"
//                       required
//                       value={pickupData.email}
//                       onChange={(e) => setPickupData({ ...pickupData, email: e.target.value })}
//                       placeholder="jane@example.com"
//                       className="mt-1 w-full rounded-xl border border-white/10 bg-forest-850 px-3.5 py-2.5 text-xs text-bone focus:border-sage-400 focus:outline-none"
//                     />
//                   </div>

//                   {activeTab === "pickup" && (
//                     <>
//                       <div>
//                         <label className="block text-xs font-semibold uppercase text-white/70">Pickup Address</label>
//                         <input
//                           type="text"
//                           required
//                           value={pickupData.address}
//                           onChange={(e) => setPickupData({ ...pickupData, address: e.target.value })}
//                           placeholder="123 Orchard Road, Apt 4"
//                           className="mt-1 w-full rounded-xl border border-white/10 bg-forest-850 px-3.5 py-2.5 text-xs text-bone focus:border-sage-400 focus:outline-none"
//                         />
//                       </div>

//                       <div className="grid grid-cols-2 gap-3">
//                         <div>
//                           <label className="block text-xs font-semibold uppercase text-white/70">Preferred Date</label>
//                           <input
//                             type="date"
//                             required
//                             value={pickupData.date}
//                             onChange={(e) => setPickupData({ ...pickupData, date: e.target.value })}
//                             className="mt-1 w-full rounded-xl border border-white/10 bg-forest-850 px-3 py-2 text-xs text-bone focus:border-sage-400 focus:outline-none"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-xs font-semibold uppercase text-white/70">Est. Bag Count</label>
//                           <select
//                             value={pickupData.bagCount}
//                             onChange={(e) => setPickupData({ ...pickupData, bagCount: e.target.value })}
//                             className="mt-1 w-full rounded-xl border border-white/10 bg-forest-850 px-3 py-2 text-xs text-bone focus:border-sage-400 focus:outline-none cursor-pointer"
//                           >
//                             <option value="1" className="bg-forest-900">1 Bag (approx 5-10 items)</option>
//                             <option value="2-3" className="bg-forest-900">2-3 Bags</option>
//                             <option value="4+" className="bg-forest-900">4+ Large Bags</option>
//                           </select>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                   <button
//                     type="submit"
//                     className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-sage-500 py-3 text-xs font-bold uppercase tracking-widest text-forest-950 shadow-md transition hover:bg-sage-400"
//                   >
//                     <span>{activeTab === "pickup" ? "Confirm Pickup Schedule" : "Generate Pass"}</span>
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
