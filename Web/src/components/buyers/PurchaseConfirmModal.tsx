import { FiX } from "react-icons/fi";
import type { CartItem } from "./CartList";

export interface PurchaseConfirmModalProps {
  open: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PurchaseConfirmModal({
  open,
  items,
  total,
  onClose,
  onConfirm,
}: PurchaseConfirmModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4">
      
    </div>
  );
}
