import { Outlet } from "react-router-dom";
import BuyerNav from "../components/buyers/BuyerNav";
import { BuyerStateProvider } from "../contexts/BuyerStateContext";

export default function SellerMainLayout() {
  return (
    <BuyerStateProvider>
      <main className="min-h-screen bg-slate-50 text-slate-950">
      <BuyerNav userName="user" />
        <Outlet />
      </main>
    </BuyerStateProvider>
  );
}
