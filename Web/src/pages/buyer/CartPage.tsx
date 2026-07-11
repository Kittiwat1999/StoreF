import { FiShoppingBag } from "react-icons/fi";
import { useState } from "react";
import CartList from "../../components/buyers/CartList";
import RemoveConfirmModal from "../../components/buyers/RemoveConfirmModal";
import { useBuyerState } from "../../contexts/BuyerStateContext";
import { type CartItem } from "../../types/cart";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [pendingRemove, setPendingRemove] = useState<CartItem | null>(null);
  const {
    addToCartItem,
    removeFromCartItem,
    cartItems,
    handleCartItemSelect,
    selectedCartItems,
  } = useBuyerState();
  const navigate = useNavigate();

  const handleQtyChange = (id: number, qty: number) => {
    const currentItem = cartItems.find((item) => item.cartItemId === id);
    if (!currentItem) return;
    if (qty > currentItem.product.availableQuantity) {
      alert("Quantity exceeds available stock.");
      return;
    }
    currentItem.quantity = qty;

    if (currentItem) {
      addToCartItem(currentItem);
    }
  };

  const handleRemove = (id: number) => {
    removeFromCartItem(id);
    handleCartItemSelect(id, false);
    setPendingRemove(null);
  };

  const handlePurchase = () => {
    navigate("/cart/confirm-purchase");
  };

  const total = cartItems
    .filter((cartItems) => selectedCartItems.includes(cartItems.cartItemId))
    .reduce((sum, item) => sum + item.product.unitPrice * item.quantity, 0);
  const isEmpty = cartItems.length === 0;
  const hasOutOfStockItems = cartItems.some(
    (item) => (item.product.availableQuantity ?? 0) <= 0,
  );

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Shopping bag
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
            <p className="mt-1 text-sm text-slate-600">
              Review your items and complete your order in a few clicks.
            </p>
          </div>
          {!isEmpty && (
            <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.7fr_0.8fr]">
          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-3">
            {isEmpty ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                  <FiShoppingBag className="text-2xl" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Your cart is empty
                </h2>
                <p className="mt-2 max-w-sm text-sm text-slate-600">
                  Add a few favorites to get started and come back here to
                  checkout.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {cartItems.map((it) => (
                  <CartList
                    key={it.cartItemId}
                    checked={selectedCartItems.includes(it.cartItemId)}
                    onItemChecked={handleCartItemSelect}
                    item={it}
                    onChange={(qty) => handleQtyChange(it.cartItemId, qty)}
                    onRemove={() => setPendingRemove(it)}
                  />
                ))}
              </ul>
            )}
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Order summary
            </h2>
            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Selected</span>
                <span>{selectedCartItems.length}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handlePurchase}
              disabled={
                isEmpty || hasOutOfStockItems || selectedCartItems.length == 0
              }
              className="mt-6 w-full rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {hasOutOfStockItems || selectedCartItems.length == 0
                ? "Unavailable for purchase"
                : "Purchase"}
            </button>
            <p
              className={`mt-3 text-xs ${hasOutOfStockItems ? "text-red-500" : "text-slate-500"}`}
            >
              {hasOutOfStockItems ??
                "Some items in your cart are out of stock and cannot be purchased yet."}
              {selectedCartItems.length == 0 ? "Please select items" : ""}
              {!hasOutOfStockItems && selectedCartItems.length != 0
                ? "Secure checkout with your preferred payment method."
                : ""}
            </p>
          </aside>
        </div>
      </div>

      <RemoveConfirmModal
        open={Boolean(pendingRemove)}
        item={pendingRemove}
        onClose={() => setPendingRemove(null)}
        onConfirm={() =>
          pendingRemove && handleRemove(pendingRemove.cartItemId)
        }
      />
    </main>
  );
}
