import { Routes, Route, Navigate } from "react-router-dom";
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

// import { useAuth } from "./contexts/AuthContext";

// function RoleRoute({ role, children }: any) {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" replace />;
//   if (user.role !== role) return <Navigate to="/403" replace />;

//   return children;
// }

export default function RoutesConfig() {
  function handleBuyerPages(pages: any) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-950">
        <BuyerNav userName="Kittiwat" />
        {pages}
      </div>
    );
  }

  function handleSellerPages(pages: any) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-950">
        <SellerNav userName="John Doe" />
        {pages}
      </div>
    );
  }

  return (
    <Routes>
        {/* <RoleRoute role="buyer">{handleBuyerPages(<ProductsPage />)}</RoleRoute> */}
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/signup" element={<SignUpBuyerPage />} />
      <Route path="seller/signup" element={<SignUpSellerPage />} />
      <Route path="/products" element={handleBuyerPages(<ProductsPage />)} />
      <Route
        path="/products/:id"
        element={handleBuyerPages(<ProductDetailPage />)}
      />
      <Route path="/cart" element={handleBuyerPages(<CartPage />)} />
      <Route path="/orders" element={handleBuyerPages(<OrdersPage />)} />
      <Route
        path="/seller/products"
        element={handleSellerPages(<SellerProductsPage />)}
      />
      <Route
        path="/seller/orders"
        element={handleSellerPages(<SellerOrdersPage />)}
      />
    </Routes>
  );
}
