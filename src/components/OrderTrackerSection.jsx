// import { useState } from "react";
// import { Search, PackageCheck, Truck, ShieldCheck, CheckCircle2, Clock, MapPin, Sparkles, Leaf } from "lucide-react";
// import { SAMPLE_ORDERS } from "../data/mockData";

// export default function OrderTrackerSection() {
//   const [orderQuery, setOrderQuery] = useState("WR-8942");
//   const [activeOrder, setActiveOrder] = useState(SAMPLE_ORDERS["WR-8942"]);
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleSearch = (e) => {
//     e?.preventDefault();
//     const queryClean = orderQuery.trim().toUpperCase();
//     if (SAMPLE_ORDERS[queryClean]) {
//       setActiveOrder(SAMPLE_ORDERS[queryClean]);
//       setErrorMsg("");
//     } else if (queryClean.startsWith("WR-")) {
//       // Dynamic generated mock order if custom ID entered
//       setActiveOrder({
//         id: queryClean,
//         date: "Sep 20, 2026",
//         item: "Curated Archival Garment (Custom Order)",
//         amount: "$580.00",
//         status: "In Authentication",
//         currentStep: 2,
//         estimatedDelivery: "Sep 24, 2026",
//         carrier: "DHL Green Carbon Neutral",
//         destination: "San Francisco, USA",
//         timeline: [
//           { step: "Order Verified", time: "Sep 20, 08:15 AM", done: true, desc: "Payment processed & consignment verified." },
//           { step: "Physical Authentication", time: "Sep 20, 02:00 PM", done: true, desc: "Undergoing 18-point condition & origin audit." },
//           { step: "Eco-Packaging", time: "Est. Sep 21", done: false, desc: "Sealing in certified zero-plastic cotton wrap." },
//           { step: "In Transit", time: "Est. Sep 22", done: false, desc: "Dispatch via green courier express." },
//           { step: "Delivered", time: "Est. Sep 24", done: false, desc: "Recipient signature required." },
//         ],
//       });
//       setErrorMsg("");
//     } else {
//       setErrorMsg("Order not found. Try sample IDs like WR-8942 or WR-6104");
//     }
//   };

//   const loadPreset = (id) => {
//     setOrderQuery(id);
//     setActiveOrder(SAMPLE_ORDERS[id]);
//     setErrorMsg("");
//   };

//   return (
//     <section id="order" className="relative py-24 sm:py-32 bg-forest-900 text-bone overflow-hidden">
//       {/* Background Decor */}
//       <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-sage-500/10 blur-3xl" />

//       <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
//         {/* Header */}
//         <div className="text-center max-w-2xl mx-auto">
//           <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sage-400">
//             <Truck size={14} className="text-champagne-300" />
//             <span>Real-Time Logistics</span>
//           </div>
//           <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-bone">
//             Track Your Archival Delivery
//           </h2>
//           <p className="mt-3 text-sm text-bone/70">
//             Follow every step from physical lab authentication to carbon-neutral doorstep delivery.
//           </p>
//         </div>

//         {/* Search & Presets */}
//         <div className="mt-8 max-w-xl mx-auto">
//           <form onSubmit={handleSearch} className="flex items-center gap-2">
//             <div className="relative flex-1">
//               <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
//               <input
//                 type="text"
//                 placeholder="Enter order ID (e.g. WR-8942)"
//                 value={orderQuery}
//                 onChange={(e) => setOrderQuery(e.target.value)}
//                 className="w-full rounded-full border border-white/10 bg-forest-850 py-3 pl-11 pr-4 text-xs font-mono tracking-wider text-bone placeholder-white/40 focus:border-sage-400 focus:outline-none focus:ring-1 focus:ring-sage-400"
//               />
//             </div>
//             <button
//               type="submit"
//               className="rounded-full bg-champagne-300 px-6 py-3 text-xs font-bold uppercase tracking-widest text-forest-950 hover:bg-champagne-200 transition shadow-luxury"
//             >
//               Track
//             </button>
//           </form>

//           {/* Preset buttons */}
//           <div className="mt-3 flex items-center justify-center gap-2 text-xs text-white/50">
//             <span>Try sample orders:</span>
//             {Object.keys(SAMPLE_ORDERS).map((id) => (
//               <button
//                 key={id}
//                 type="button"
//                 onClick={() => loadPreset(id)}
//                 className={`rounded-md border px-2.5 py-0.5 font-mono text-[11px] transition ${
//                   activeOrder?.id === id
//                     ? "border-champagne-300 text-champagne-300 bg-champagne-300/10 font-bold"
//                     : "border-white/10 hover:border-white/30 text-white/70"
//                 }`}
//               >
//                 {id}
//               </button>
//             ))}
//           </div>

//           {errorMsg && (
//             <p className="mt-2 text-center text-xs font-semibold text-rose-400">{errorMsg}</p>
//           )}
//         </div>

//         {/* Order Details Display Card */}
//         {activeOrder && (
//           <div className="mt-12 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-forest-850/80 p-6 sm:p-10 backdrop-blur-xl shadow-luxury">
//             {/* Top Info Bar */}
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
//               <div>
//                 <div className="flex items-center gap-3">
//                   <span className="font-mono text-xl font-bold text-champagne-300">{activeOrder.id}</span>
//                   <span className="rounded-full bg-sage-500/20 px-3 py-1 text-[11px] font-semibold text-sage-300 border border-sage-500/30">
//                     {activeOrder.status}
//                   </span>
//                 </div>
//                 <h3 className="mt-1 font-serif text-lg font-medium text-bone">{activeOrder.item}</h3>
//                 <p className="text-xs text-white/50">Placed on {activeOrder.date} • Total: {activeOrder.amount}</p>
//               </div>

//               <div className="text-left sm:text-right text-xs">
//                 <span className="text-white/50">Estimated Arrival</span>
//                 <p className="font-serif text-xl font-semibold text-bone">{activeOrder.estimatedDelivery}</p>
//                 <span className="text-[11px] text-sage-400 font-medium">🌱 {activeOrder.carrier}</span>
//               </div>
//             </div>

//             {/* Step Timeline */}
//             <div className="mt-10">
//               <h4 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-6">
//                 Chain of Custody & Delivery Status
//               </h4>

//               <div className="relative space-y-8 before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
//                 {activeOrder.timeline.map((step, idx) => (
//                   <div key={step.step} className="relative flex items-start gap-4">
//                     <span
//                       className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-serif text-xs font-bold transition-all z-10 ${
//                         step.done
//                           ? "bg-sage-500 text-forest-950 ring-4 ring-forest-900"
//                           : "bg-forest-900 border border-white/20 text-white/40 ring-4 ring-forest-900"
//                       }`}
//                     >
//                       {step.done ? <CheckCircle2 size={16} /> : idx + 1}
//                     </span>

//                     <div className="flex-1 rounded-2xl border border-white/5 bg-forest-900/60 p-4">
//                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
//                         <h5 className={`text-sm font-bold ${step.done ? "text-bone" : "text-white/50"}`}>
//                           {step.step}
//                         </h5>
//                         <span className="text-[11px] text-sage-400 font-mono">{step.time}</span>
//                       </div>
//                       <p className="mt-1 text-xs text-bone/60 leading-relaxed">{step.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Authenticity Certificate Box */}
//             <div className="mt-10 rounded-2xl border border-champagne-300/20 bg-forest-950/70 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <div className="flex items-center gap-3">
//                 <ShieldCheck size={28} className="text-champagne-300 shrink-0" />
//                 <div>
//                   <h5 className="text-xs font-bold uppercase tracking-wider text-champagne-300">
//                     Physical Authentication Certificate
//                   </h5>
//                   <p className="text-[11px] text-white/60">
//                     Inspected for stitching accuracy, material integrity, hardware serials, and eco-steam sanitized.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2 text-xs text-sage-400 font-semibold shrink-0">
//                 <Leaf size={14} />
//                 <span>100% Carbon Neutral Transit</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
