import { NavLink } from "react-router-dom";
import { FiBox, FiLogOut } from "react-icons/fi";
import { FiInbox } from "react-icons/fi";

export default function SellerNav({ userName }: { userName: string }) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-orange-500 text-white"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  const handleLogoutClick = () => {
    console.log("Logging out...");
    alert("Logging out...");
  };

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Seller
          </p>
          <h1 className="text-xl font-semibold text-slate-900">Storefront</h1>
        </div>

        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-2">
            <NavLink to="/seller/products" className={linkClass}>
              <FiBox className="text-base" />
              Products
            </NavLink>
          </nav>
          <nav className="flex items-center gap-3 ">
            <NavLink to="/seller/orders" className={linkClass}>
              <FiInbox className="text-base" />
              Orders
            </NavLink>
          </nav>

          <div className="hidden items-center gap-2 pl-1 md:flex">
            <span className="text-sm font-medium text-slate-700">
              Hi,{" "}
              <span className="font-semibold text-slate-900">{userName}</span>
            </span>
          </div>

          <button
            onClick={handleLogoutClick}
            className="inline-flex h-10 items-center justify-center gap-1.5 text-sm font-medium text-slate-700 transition hover:text-slate-900"
            type="button"
          >
            <span>Sign Out</span>
            <FiLogOut className="text-lg" />
          </button>
        </div>
      </div>
    </header>
  );
}
