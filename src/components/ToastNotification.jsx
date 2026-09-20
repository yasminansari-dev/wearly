// import { CheckCircle2, Heart, ShoppingBag, Info, X } from "lucide-react";

// export default function ToastNotification({ toast, onClose }) {
//   if (!toast) return null;

//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-white/15 bg-forest-900/95 px-5 py-4 text-xs font-semibold text-bone shadow-2xl backdrop-blur-xl animate-bounce-short">
//       {toast.type === "cart" && <ShoppingBag size={18} className="text-sage-400 shrink-0" />}
//       {toast.type === "wishlist" && <Heart size={18} className="text-rose-400 fill-rose-400 shrink-0" />}
//       {toast.type === "success" && <CheckCircle2 size={18} className="text-champagne-300 shrink-0" />}
//       {toast.type === "info" && <Info size={18} className="text-sage-300 shrink-0" />}

//       <span className="flex-1 text-bone">{toast.message}</span>

//       <button
//         type="button"
//         onClick={onClose}
//         className="ml-2 text-white/50 hover:text-white"
//       >
//         <X size={14} />
//       </button>
//     </div>
//   );
// }
