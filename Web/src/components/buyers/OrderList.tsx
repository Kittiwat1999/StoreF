import type { MouseEvent } from "react";
import type { Product } from "../../types/product";

interface ModifiedProduct extends Product {
  quantity:number
}
export interface OrderItem {
  id: string | number;
  title: string;
  status: "complete" | "pending";
  total: number;
  itemCount: number;
  date: string;
  buyerReaded: boolean;
  orderItems: ModifiedProduct[];
}

const statusStyles = {
  complete: "bg-emerald-100 text-emerald-700",
  pending: "bg-orange-100 text-orange-700",
};

export default function OrderList({
  item,
  onClick,
}: {
  item: OrderItem;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    
    <li className={`border-b border-slate-100 last:border-b-0 ${!item.buyerReaded ? "bg-white" : "border-b border-slate-100 last:border-b-0 bg-slate-50"}`}>
      <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-center gap-4 p-4 text-left transition ${!item.buyerReaded ? "hover:bg-orange-50" : ""}`}
      >
        <div className="flex-1">
          <div className="flex flex-col align-items-center gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Order #{item.id}
              </p>
              <p className="text-xs text-slate-500">{item.title}</p>
              <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
              <span>
                {item.itemCount} item{item.itemCount === 1 ? "" : "s"}
              </span>
              <span>Placed {item.date}</span>
          </div>
            </div>
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
            >
              {item.status === "complete" ? "Complete" : "Pending"}
            </span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div className="text-sm font-semibold text-slate-900">
            ${item.total.toFixed(2)}
          </div>
        </div>
      </button>
    </li>
  );
}
