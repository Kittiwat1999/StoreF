import { Routes, Route, Navigate } from "react-router-dom";

import ProductsPage from "./pages/buyer/ProductsPage";
import ProductDetailPage from "./pages/buyer/ProductDetailPage";
import CartPage from "./pages/buyer/CartPage";
import OrdersPage from "./pages/buyer/OrdersPage";
import SigninPage from "./pages/SigninPage";
import SignUpBuyerPage from "./pages/SignUpBuyerPage";
import SignUpSellerPage from "./pages/SignUpSellerPage";
import SellerProductsPage from "./pages/seller/SellerProductsPage";
import SellerOrdersPage from "./pages/seller/SellerOrdersPage";
import ConfirmPurchaseProductPage from "./pages/buyer/ConfirmPurchaseProductPage";
import CartConfirmPurchasePage from "./pages/buyer/CartConfirmPurchasePage";
import BuyerLayout from "./layouts/BuyerLayout";
import SellerLayout from "./layouts/SellerLayout";

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
        <Route path="/confirm" element={<ConfirmPurchaseProductPage />} />
        <Route
          path="/cart/confirm-purchase"
          element={<CartConfirmPurchasePage />}
        />
      </Route>
      <Route element={<SellerLayout />}>
        <Route path="/seller/products" element={<SellerProductsPage />} />
        <Route path="/seller/orders" element={<SellerOrdersPage />} />
      </Route>
    </Routes>
  );
}
