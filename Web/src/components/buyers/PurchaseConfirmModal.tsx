import { FiX } from "react-icons/fi";
import type { CartItem } from "./CartList";

export interface PurchaseConfirmModalProps {
  open: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PurchaseConfirmModal({
  open,
  items,
  total,
  onClose,
  onConfirm,
}: PurchaseConfirmModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
              Confirm Purchase
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              Review your cart
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Verify all items and total price before completing the order.
            </p>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div className="divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-white">
                  {item.product.image ? (
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.product.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-sm font-semibold text-slate-900">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
              <span>Order total</span>
              <span className="text-base font-semibold text-slate-950">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onClose}
            className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="inline-flex h-12 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
