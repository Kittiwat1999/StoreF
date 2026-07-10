import { type ProductBase } from "../../types/product";
export interface OrderDetailItemType extends ProductBase {
  quantity: number;
}

export default function OrderDetailItem({
  item
}: {
  item: OrderDetailItemType;
}) {
  return (
    <li className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-slate-100">
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1">
        <div className="text-sm font-semibold text-slate-900">{item.title}</div>
        <div className="text-xs text-slate-500">Qty: {item.quantity}</div>
      </div>

      <div className="w-24 text-right text-sm font-semibold text-slate-900">
        ${(item.unitPrice * item.quantity).toFixed(2)}
      </div>
    </li>
  );
}
