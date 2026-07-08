import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductsCard from "../components/buyers/ProductsCard";
import { sampleProducts } from "../types/product";

// import axiosClient from "./axiosClient";

// async function getProducts(filters: {
//   category?: string;
//   min_price?: number;
//   max_price?: number;
//   search?: string;
// }) {
//   const params = new URLSearchParams(filters as any).toString();
//   const res = await axiosClient.get(`/products?${params}`);
//   return res;
// }

// // ใช้งาน
// getProducts({ category: "electronics", min_price: 100, max_price: 500, search: "phone" });

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState("price-asc");
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const sortOptions = [
    { value: "price-asc", label: "Price: low to high" },
    { value: "price-desc", label: "Price: high to low" },
    { value: "az", label: "A - Z" },
    { value: "za", label: "Z - A" },
  ];

  const handleSortSelect = (value: string) => {
    setSortOrder(value);
    setSortMenuOpen(false);
  };

  const parsedMinPrice = Number(minPrice);
  const parsedMaxPrice = Number(maxPrice);

  const filteredProducts = sampleProducts
    .filter((product) => {
      if (
        searchTerm.trim() !== "" &&
        !product.title.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (
        minPrice !== "" &&
        !Number.isNaN(parsedMinPrice) &&
        product.unitPrice < parsedMinPrice
      ) {
        return false;
      }
      if (
        maxPrice !== "" &&
        !Number.isNaN(parsedMaxPrice) &&
        product.unitPrice > parsedMaxPrice
      ) {
        return false;
      }
      return true;
    })
    .slice()
    .sort((a, b) => {
      if (sortOrder === "price-asc") return a.unitPrice - b.unitPrice;
      if (sortOrder === "price-desc") return b.unitPrice - a.unitPrice;
      if (sortOrder === "az") return a.title.localeCompare(b.title);
      if (sortOrder === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <main className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-slate-950">Products</h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            Browse available items and use the buttons on each card to purchase
            now or add them to your cart.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-white p-3">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Product name"
              className="w-44 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div className="flex items-center gap-2 rounded-3xl border border-slate-200 bg-white p-3">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Price
            </label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              className="w-20 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-orange-200"
            />
            -
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="999"
              className="w-20 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <div className="relative flex items-center gap-2 rounded-3xl border border-slate-200 bg-white p-3">
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Sort
            </label>
            <button
              type="button"
              onClick={() => setSortMenuOpen((open) => !open)}
              className="inline-flex min-w-[170px] items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
              aria-haspopup="true"
              aria-expanded={sortMenuOpen}
            >
              <span>
                {sortOptions.find((option) => option.value === sortOrder)
                  ?.label ?? "Sort"}
              </span>
              <span className="text-slate-500">▾</span>
            </button>

            {sortMenuOpen && (
              <div className="absolute right-0 top-full z-10 mt-2 w-56 overflow-hidden rounded-3xl border border-slate-200 bg-white text-sm shadow-lg">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSortSelect(option.value)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-slate-900 transition hover:bg-slate-100"
                  >
                    <span>{option.label}</span>
                    {sortOrder === option.value && (
                      <span className="text-orange-500">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            No products match your filters
          </h3>
          <p className="mt-2 text-sm text-slate-600">
            Try clearing the price filters or changing the sorting option.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductsCard
              key={product.id}
              product={product}
              onViewDetails={() => navigate(`/products/${product.id}`)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
