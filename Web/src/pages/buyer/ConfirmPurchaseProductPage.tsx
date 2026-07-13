import {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrderConfirmList, {
  type ConfirmPurchaseItemType,
} from "../../components/buyers/ConfirmPurchaseItem";
import { loadFromLocalStorage } from "../../utils/localStorageHelper";
export interface ConfirmPurchaseType {
  items: ConfirmPurchaseItemType;
}

export default function ConfirmPurchaseProduct() {
  const [item, setItem] = useState<ConfirmPurchaseItemType | null>(
    loadFromLocalStorage<ConfirmPurchaseItemType>("prePurchaseItem")
  );

  useEffect(() => {
    setItem(loadFromLocalStorage<ConfirmPurchaseItemType>("prePurchaseItem"));
  }, []);

  const navigate = useNavigate();
  const [shipping] = useState(20);
  const subTotal = item ? item.unitPrice * item.quantity : undefined;
  const total = item && subTotal ? subTotal + shipping : undefined;

  const onConfirm = () => {
    console.log("Purchase confirmed!");
    alert("Purchase confirmed!");
    navigate("/orders");
  };


  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Confirm Your Order
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Review Your Items
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Please check the products in your order and verify the quantities, prices, and total amount before placing your purchase.
            </p>
          </div>
        </div>
        <div className="rounded-4xl border border-slate-200 bg-white p-2 shadow-sm sm:p-3">
          <div className="2 space-y-4 p-2">
            <div className="divide-y divide-slate-200 overflow-hidden rounded-3xl border-slate-400 bg-slate-50 shadow-sm">
              {item && <OrderConfirmList key={item.id} item={item} />}
            </div>

            <div className="p-2">
              <h2 className="text-lg font-semibold text-slate-900">
                Order summary
              </h2>
              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{subTotal && subTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                  <span>Total</span>
                  <span>{total && total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={() => navigate(-1)}
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
    </div>
  );
}
