import { useEffect, useState } from "react";
import { FiMinus, FiPlus, FiX } from "react-icons/fi";

export interface ProductInfo {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  description?: string;
}

export interface PurchaseOrderModalProps {
  open: boolean;
  product: ProductInfo;
  initialQuantity?: number;
  availableQuantity: number;
  onClose: () => void;
  onConfirm: (quantity: number) => void;
}

export default function PurchaseOrderModal({
  open,
  product,
  initialQuantity = 1,
  availableQuantity,
  onClose,
  onConfirm,
}: PurchaseOrderModalProps) {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    if (open) {
      setQuantity(Math.max(1, initialQuantity));
    }
  }, [open, initialQuantity]);

  if (!open) {
    return null;
  }

  const handleQuantityChange = (current: number) => {
    if (current < 1) {
      setQuantity(1);
    } else if (current > availableQuantity) {
      setQuantity(availableQuantity);
    } else {
      setQuantity(current);
    }
  };

  const total = product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-xl ring-1 ring-slate-200">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
              Confirm Order
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-slate-950">
              {product.title}
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

        <div className="mt-6 grid gap-6 md:grid-cols-[120px_auto]">
          <div className="h-32 w-full overflow-hidden rounded-3xl bg-slate-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                No image
              </div>
            )}
          </div>
          <div className="space-y-4">
            <p className="text-sm leading-6 text-slate-500">
              {product.description ??
                "Review your product quantity before purchase."}
            </p>
            <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3">
              <p className="text-sm font-semibold text-sky-700">
                Available quantity
              </p>
              <p className="mt-1 text-sm text-sky-600">
                {availableQuantity} in stock
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-3xl bg-slate-100 px-3 py-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-800 shadow-sm transition hover:bg-slate-200"
                aria-label="Decrease quantity"
              >
                <FiMinus className="text-lg" />
              </button>
              <div className="min-w-[58px] text-center text-lg font-semibold text-slate-950">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-800 shadow-sm transition hover:bg-slate-200"
                aria-label="Increase quantity"
              >
                <FiPlus className="text-lg" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-3xl bg-slate-100 px-4 py-3">
              <span className="text-sm text-slate-500">Total price</span>
              <span className="text-lg font-semibold text-slate-950">
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
            onClick={() => onConfirm(quantity)}
            className="inline-flex h-12 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
