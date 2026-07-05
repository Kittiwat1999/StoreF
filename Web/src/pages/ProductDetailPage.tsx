import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { type Product } from "../components/buyers/ProductsCard";
import PurchaseOrderModal from "../components/buyers/PurchaseOrderModal";
import AddToCartModal from "../components/buyers/AddToCartModal";
import { useBuyerState } from "../contexts/BuyerStateContext";
import { sampleProducts } from "../data/sampleProducts";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = sampleProducts.find((item) => String(item.id) === id);
  const { addToCartItem, addOrder } = useBuyerState();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartProduct, setCartProduct] = useState<Product | null>(null);
  const [purchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [addToCartModalOpen, setAddToCartModalOpen] = useState(false);

  if (!product) {
    return (
      <main className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">
            Product not found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            The product you are looking for does not exist.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            Back to products
          </button>
        </div>
      </main>
    );
  }

  const handleAddToCart = () => {
    setCartProduct(product);
    setAddToCartModalOpen(true);
  };

  const handlePurchase = () => {
    setSelectedProduct(product);
    setPurchaseModalOpen(true);
  };

  const handleConfirmPurchase = (quantity: number) => {
    addOrder();
    toast.success(`Purchased ${product.title} x${quantity}`);
    setPurchaseModalOpen(false);
    setSelectedProduct(null);
  };

  const handleConfirmAddToCart = (quantity: number) => {
    addToCartItem(product.id, quantity);
    toast.success(
      `${product.title} x ${quantity} has been added to your cart.`,
    );
    setAddToCartModalOpen(false);
    setCartProduct(null);
  };

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-950">
            {product.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Here are the details for the selected product. Use the buttons to
            purchase now or add this item to your cart.
          </p>
        </div>
        <button
          onClick={() => navigate("/products")}
          className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back to products
        </button>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <div className="overflow-hidden rounded-3xl bg-slate-100">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[320px] w-full items-center justify-center text-sm text-slate-400">
                No image
              </div>
            )}
          </div>

          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                Product details
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-slate-950">
                {product.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                {product.description ||
                  "No description available for this product."}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Product ID
                  </p>
                  <p className="mt-2 font-semibold text-slate-950">
                    {product.id}
                  </p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Stock status
                  </p>
                  <p className="mt-2 font-semibold text-slate-950">
                    {product.availableQuantity > 0
                      ? "In stock"
                      : "Out of stock"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_1fr]">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Price</p>
                <p className="mt-1 text-3xl font-semibold text-slate-950">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Available</p>
                <p className="mt-1 text-lg font-semibold text-slate-950">
                  {product.availableQuantity} in stock
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handlePurchase}
                className="inline-flex h-14 flex-1 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600"
              >
                Purchase
              </button>
              <button
                onClick={handleAddToCart}
                className="inline-flex h-14 flex-1 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <PurchaseOrderModal
          open={purchaseModalOpen}
          product={selectedProduct}
          initialQuantity={1}
          availableQuantity={selectedProduct.availableQuantity}
          onClose={() => setPurchaseModalOpen(false)}
          onConfirm={handleConfirmPurchase}
        />
      )}

      {cartProduct && (
        <AddToCartModal
          open={addToCartModalOpen}
          product={cartProduct}
          initialQuantity={1}
          availableQuantity={cartProduct.availableQuantity}
          onClose={() => setAddToCartModalOpen(false)}
          onConfirm={handleConfirmAddToCart}
        />
      )}
    </main>
  );
}
