import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import { CgBox } from "react-icons/cg";
import { BiStoreAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useBuyerState } from "../../contexts/BuyerStateContext";

interface BuyerNavProps {
  onLogout?: () => void;
  userName?: string;
}

export function BuyerNav({ onLogout, userName = "Kittiwat" }: BuyerNavProps) {
  const { cartCount, orderCount } = useBuyerState();

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log("Logging out...");
      alert("Logging out...");
    }
  };

  return (
    <nav className="sticky top-0 z-20 w-full bg-orange-400 text-black shadow-md">
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        {/* Left: Logo (white color) */}

        <div className="flex items-center gap-3">
          <Link to="/products">
            <span className="text-2xl font-extrabold tracking-tight text-white select-none">
              StoreF
            </span>
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/products"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg transition-all duration-200 hover:bg-slate-50 active:scale-95 cursor-pointer text-black"
            type="button"
            aria-label="Cart"
          >
            <BiStoreAlt className="text-xl text-slate-500" />
          </Link>

          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg transition-all duration-200 hover:bg-slate-50 active:scale-95 cursor-pointer text-black"
            type="button"
            aria-label="Cart"
          >
            <FiShoppingCart className="text-xl text-slate-500" />
            <span className="sr-only">Notifications</span>
            {cartCount > 0 && (
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-500 border-2 border-white rounded-full -top-2 -end-2">
                {cartCount}
              </div>
            )}
          </Link>

          <Link
            to="/orders"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg transition-all duration-200 hover:bg-slate-50 active:scale-95 cursor-pointer text-black"
            aria-label="Orders"
          >
            <CgBox className="text-xl text-slate-500" />
            {orderCount > 0 && (
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-orange-500 border-2 border-white rounded-full -top-2 -end-2">
                {orderCount}
              </div>
            )}
          </Link>

          {/* User Greeting (no border) */}
          <div className="hidden items-center gap-2 md:flex pl-1">
            <span className="text-sm font-medium text-black">
              Hi, <span className="font-semibold">{userName}</span>
            </span>
          </div>

          {/* Logout button: styled same as "Hi, User" (text-only, black, no border, no background) */}
          <button
            onClick={handleLogoutClick}
            className="inline-flex h-10 items-center justify-center gap-1.5 text-sm font-medium text-black transition-all duration-200 hover:text-slate-800 active:scale-95 cursor-pointer"
            type="button"
          >
            <span>Sign Out</span>
            <FiLogOut className="text-lg" />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default BuyerNav;
