import SellerOrderItem, {
  type SellerOrderItem as SellerOrderItemType,
} from "../components/sellers/SellerOrderItem";

const sampleSellerOrders: SellerOrderItemType[] = [
  {
    id: 8301,
    itemCount: 2,
    status: "pending",
    date: "2 hours ago",
    orderItems: [
      { id: 1, title: "Classic Lamp", quantity: 1 },
      { id: 2, title: "Coffee Mug", quantity: 2 },
    ],
  },
  {
    id: 8302,
    itemCount: 1,
    status: "complete",
    date: "1 day ago",
    orderItems: [{ id: 3, title: "Modern Chair", quantity: 1 }],
  },
  {
    id: 8303,
    itemCount: 3,
    status: "pending",
    date: "5 hours ago",
    orderItems: [
      { id: 4, title: "Notebook", quantity: 1 },
      { id: 5, title: "Desk Lamp", quantity: 1 },
      { id: 6, title: "Pens set", quantity: 1 },
    ],
  },
];

export default function SellerOrdersPage() {
  const pendingOrders = sampleSellerOrders.filter(
    (order) => order.status === "pending",
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Seller orders
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Pending order queue
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Only pending orders are shown to sellers, with item quantity
              details per order.
            </p>
          </div>
        </div>

        {pendingOrders.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 shadow-sm">
            No pending orders were found.
          </div>
        ) : (
          <ul className="grid gap-4">
            {pendingOrders.map((order) => (
              <SellerOrderItem key={order.id} item={order} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
