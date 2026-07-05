import { FiTrash2 } from "react-icons/fi";
import type { Product } from "./ProductsCard";

export interface CartItem extends Product {
  quantity: number;
  isAvailabled: boolean;
}

export default function CartList({
  item,
  onChange,
  onRemove,
}: {
  item: CartItem;
  onChange: (newQty: number) => void;
  onRemove: () => void;
}) {
  const isUnavailable =
    !item.isAvailabled || (item.availableQuantity ?? 0) <= 0;
  const isStockConflict =
    item.quantity > (item.availableQuantity ?? 0) &&
    item.availableQuantity !== 0;

  return (
    <li
      className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center ${isUnavailable ? "opacity-80" : ""}`}
    >
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-medium text-slate-400">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="text-base font-semibold text-slate-900">
          {item.title}
        </div>
        <div className="mt-1 text-sm text-slate-500">
          ${item.price.toFixed(2)} each
        </div>
        {isUnavailable && !isStockConflict && (
          <span className="mt-2 inline-flex w-fit rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
            {item.isAvailabled ? "Out of stock" : "Product no longer available"}
          </span>
        )}
        {isStockConflict && (
          <span>
            <span className="mt-2 inline-flex w-fit rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
              Just {item.availableQuantity} left in stock — you currently have{" "}
              {item.quantity} in your cart.
            </span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 self-start sm:self-auto">
        <button
          onClick={() => onChange(Math.max(1, item.quantity - 1))}
          disabled={isUnavailable}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 transition hover:border-orange-300 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          −
        </button>
        <div className="flex h-8 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
          {!isStockConflict ? item.quantity : item.availableQuantity}
        </div>
        <button
          onClick={() => onChange(item.quantity + 1)}
          disabled={isUnavailable}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-slate-700 transition hover:border-orange-300 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          +
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 sm:ml-4 sm:min-w-[160px] sm:justify-end">
        <span className="text-sm font-semibold text-slate-800">
          ${(item.price * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={onRemove}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-red-50 hover:text-red-500"
          aria-label={`Remove ${item.title}`}
        >
          <FiTrash2 className="text-base" />
        </button>
      </div>
    </li>
  );
}
