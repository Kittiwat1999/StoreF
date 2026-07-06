import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { BuyerStateProvider } from "./contexts/BuyerStateContext";

import BuyerNav from "./components/buyers/BuyerNav";
import SellerNav from "./components/sellers/SellerNav";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import SigninPage from "./pages/SigninPage";
import SignUpBuyerPage from "./pages/SignUpBuyerPage";
import SignUpSellerPage from "./pages/SignUpSellerPage";
import SellerProductsPage from "./pages/SellerProductsPage";
import SellerOrdersPage from "./pages/SellerOrdersPage";

function BuyerLayout() {
  return (
    <BuyerStateProvider>
      <div className="min-h-screen bg-slate-50 text-slate-950">
        <BuyerNav userName="Kittiwat" />
        <Outlet />
      </div>
    </BuyerStateProvider>
  );
}

function SellerLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <SellerNav userName="Kittiwat" />
      <Outlet />
    </div>
  );
}

export default function RoutesConfig() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignUpBuyerPage />} />
      <Route path="/seller/signup" element={<SignUpSellerPage />} />

      <Route element={<BuyerLayout />}>
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>

      <Route element={<SellerLayout />}>
        <Route
          path="/seller/products"
          element={<SellerProductsPage />}
          />
        <Route
          path="/seller/orders"
          element={<SellerOrdersPage />}
          />
      </Route>
    </Routes>
  );
}