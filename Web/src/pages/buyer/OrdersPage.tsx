import { useState } from "react";
import OrderList, { type OrderItem } from "../../components/buyers/OrderList";
import OrderDetailItem, {
  type OrderDetailItemType,
} from "../../components/buyers/OrderDetailItem";

import { useBuyerState } from "../../contexts/BuyerStateContext";

const sampleOrders: OrderItem[] = [
  {
    id: 5421,
    title: "Office supplies bundle",
    status: "complete",
    total: 69.95,
    itemCount: 4,
    date: "2 days ago",
    buyerReaded: false,
    orderItems: [
      { id: 1, title: "Notebook", quantity: 1, unitPrice: 12.99, image: "" },
      { id: 2, title: "Desk Lamp", quantity: 1, unitPrice: 28.99, image: "" },
      { id: 3, title: "Pens set", quantity: 2, unitPrice: 13.49, image: "" },
    ],
  },
  {
    id: 5422,
    title: "Living room decor",
    status: "pending",
    total: 129.49,
    itemCount: 2,
    date: "1 day ago",
    buyerReaded: false,
    orderItems: [
      { id: 4, title: "Cushion cover", quantity: 1, unitPrice: 29.99, image: "" },
      { id: 5, title: "Wall art print", quantity: 1, unitPrice: 99.5, image: "" },
    ],
  },
  {
    id: 5423,
    title: "Kitchen essentials",
    status: "complete",
    total: 45.0,
    itemCount: 3,
    date: "5 days ago",
    buyerReaded: false,
    orderItems: [
      { id: 6, title: "Ceramic mug", quantity: 2, unitPrice: 12.5, image: "" },
      { id: 7, title: "Wooden spoon", quantity: 1, unitPrice: 20.0, image: "" },
    ],
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderItem[]>(sampleOrders);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const { makeOrderReaded } = useBuyerState();

  const handleOrderClick = (order: OrderItem) => {
    const modifiedOrder = { ...order, buyerReaded: true };
    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === order.id ? modifiedOrder : o)),
    );
    setSelectedOrder(modifiedOrder);
    makeOrderReaded();
  };
  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">
              Your Orders
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Tap any order to inspect the order details and total price.
            </p>
          </div>
        </div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
          Order history
        </h2>

        <div className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div>
            {orders.length === 0 ? (
              <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-600 shadow-sm">
                You do not have any orders yet.
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                {orders.map((order) => (
                  <OrderList
                    key={order.id}
                    item={order}
                    onClick={() => handleOrderClick(order)}
                  />
                ))}
              </ul>
            )}
          </div>

          <div>
            {selectedOrder ? (
              <div className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-900">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Order
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      #{selectedOrder.id}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      {selectedOrder.title}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Status
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {selectedOrder.status === "complete"
                        ? "Complete"
                        : "Pending"}
                    </p>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-slate-900">
                    Order items
                  </p>
                  <ul className="mt-4 space-y-3">
                    {(selectedOrder.orderItems ?? []).map(
                      (orderItem: OrderDetailItemType) => (
                        <OrderDetailItem key={orderItem.id} item={orderItem} />
                      ),
                    )}
                  </ul>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Items
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {selectedOrder.itemCount}
                    </p>
                  </div>
                  <div className="rounded-3xl bg-white p-4 shadow-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Total
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      ${selectedOrder.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 text-center text-slate-500 shadow-sm">
                Select an order to view details.
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
