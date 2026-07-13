import { Outlet } from "react-router-dom";
import SellerNav from "../components/sellers/SellerNav";

export default function SellerMainLayout() {
    return (
        <>
        <SellerNav userName="user"/>
        <main className="min-h-screen bg-slate-50 text-slate-950">
            <Outlet/>
        </main>
        </>
    )
}