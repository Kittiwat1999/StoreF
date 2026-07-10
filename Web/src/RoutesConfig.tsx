import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { BuyerStateProvider } from "./contexts/BuyerStateContext";

import BuyerNav from "./components/buyers/BuyerNav";
import SellerNav from "./components/sellers/SellerNav";
import ProductsPage from "./pages/buyer/ProductsPage";
import ProductDetailPage from "./pages/buyer/ProductDetailPage";
import CartPage from "./pages/buyer/CartPage";
import OrdersPage from "./pages/buyer/OrdersPage";
import SigninPage from "./pages/SigninPage";
import SignUpBuyerPage from "./pages/SignUpBuyerPage";
import SignUpSellerPage from "./pages/SignUpSellerPage";
import SellerProductsPage from "./pages/seller/SellerProductsPage";
import SellerOrdersPage from "./pages/seller/SellerOrdersPage";
import ConfirmPurchaseProduct from "./pages/buyer/ConfirmPurchaseProduct";

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
        <Route path="/confirm" element={<ConfirmPurchaseProduct />} />
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