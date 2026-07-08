import type { CartItem } from "../../types/cart";
import { FiX } from "react-icons/fi";

export interface RemoveConfirmModalProps {
  open: boolean;
  item: CartItem | null;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RemoveConfirmModal({
  open,
  item,
  onClose,
  onConfirm,
}: RemoveConfirmModalProps) {
  if (!open || !item) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
              Remove item
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              Remove from cart
            </h2>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <div className="mt-6 rounded-3xl bg-slate-50 p-4">
          <p className="text-sm text-slate-700">
            Are you sure you want to remove this item from your cart?
          </p>
          <p className="mt-3 text-base font-semibold text-slate-900">
            {item.product.title}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Quantity: {item.quantity}
          </p>
          <p className="mt-1 text-sm font-semibold text-slate-900">
            Total: ${(item.quantity * item.product.unitPrice).toFixed(2)}
          </p>
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
            Remove Item
          </button>
        </div>
      </div>
    </div>
  );
}
