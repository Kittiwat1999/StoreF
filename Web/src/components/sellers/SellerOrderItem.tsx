export interface SellerOrderItem {
  id: string | number;
  itemCount: number;
  status: "pending" | "complete";
  orderItems: {
    id: string | number;
    title: string;
    quantity: number;
  }[];
  date: string;
}

const statusStyles = {
  complete: "bg-emerald-100 text-emerald-700",
  pending: "bg-orange-100 text-orange-700",
};

export default function SellerOrderItem({ item }: { item: SellerOrderItem }) {
  const totalQuantity = item.orderItems.reduce(
    (sum, current) => sum + current.quantity,
    0,
  );

  return (
    <li className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            Order #{item.id}
          </p>
          <p className="mt-2 text-sm text-slate-500">
            {item.orderItems.length} item
            {item.orderItems.length === 1 ? "" : "s"} · {totalQuantity} qty
          </p>
          <p className="mt-1 text-xs text-slate-400">{item.date}</p>
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
        >
          {item.status === "complete" ? "Complete" : "Pending"}
        </span>
      </div>

      <div className="mt-4 space-y-3 rounded-3xl bg-slate-50 p-4">
        {item.orderItems.map((orderItem) => (
          <div
            key={orderItem.id}
            className="flex items-center justify-between text-sm text-slate-700"
          >
            <span>{orderItem.title}</span>
            <span className="font-semibold">x{orderItem.quantity}</span>
          </div>
        ))}
      </div>
    </li>
  );
}
