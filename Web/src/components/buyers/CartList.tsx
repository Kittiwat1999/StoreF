import { FiTrash2 } from "react-icons/fi";
import type { CartItem } from "../../types/cart";

export default function CartList({
  item,
  checked,
  onChange,
  onRemove,
  onItemChecked,
}: {
  item: CartItem;
  checked: boolean;
  onChange: (newQty: number) => void;
  onRemove: () => void;
  onItemChecked: (cartItemId: number, checked: boolean) => void;
}) {
  const isUnavailable =
    !item.product.isAvailabled || (item.product.availableQuantity ?? 0) <= 0;
  const isStockConflict =
    item.quantity > (item.product.availableQuantity ?? 0) &&
    item.product.availableQuantity !== 0;

  return (
    <li
      className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center ${isUnavailable ? "opacity-80" : ""}`}
    >
      <label className="flex items-center cursor-pointer relative">
        <input 
        type="checkbox" 
        checked={checked} 
        onChange={(e) => onItemChecked(item.cartItemId, e.target.checked)}className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-sky-500 checked:border-sky-500" id="check5" />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
        </svg>
        </span>
      </label>
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-200">
        {item.product.thumbnail ? (
          <img
            src={item.product.thumbnail}
            alt={item.product.title}
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
          {item.product.title}
        </div>
        <div className="mt-1 text-sm text-slate-500">
          ${item.product.unitPrice.toFixed(2)} each
        </div>
        {isUnavailable && !isStockConflict && (
          <span className="mt-2 inline-flex w-fit rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
            {item.product.isAvailabled ? "Out of stock" : "Product no longer available"}
          </span>
        )}
        {isStockConflict && (
          <span>
            <span className="mt-2 inline-flex w-fit rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
              Just {item.product.availableQuantity} left in stock — you currently have{" "}
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
          {!isStockConflict ? item.quantity : item.product.availableQuantity}
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
          ${(item.product.unitPrice * item.quantity).toFixed(2)}
        </span>
        <button
          onClick={onRemove}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-red-50 hover:text-red-500"
          aria-label={`Remove ${item.product.title}`}
        >
          <FiTrash2 className="text-base" />
        </button>
      </div>
    </li>
  );
}
