import { FiEdit2, FiTrash2 } from "react-icons/fi";

export interface SellerProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  availableQuantity: number;
  imageUrl: string;
}

interface SellerProductsCardProps {
  product: SellerProduct;
  onEdit: (product: SellerProduct) => void;
  onDelete: (product: SellerProduct) => void;
}

export default function SellerProductsCard({
  product,
  onEdit,
  onDelete,
}: SellerProductsCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 h-36 overflow-hidden rounded-2xl bg-slate-100">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
            No image
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {product.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">{product.description}</p>
          </div>
          <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600">
            {product.availableQuantity} left
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Price</span>
          <span className="font-semibold text-slate-900">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <FiEdit2 className="text-sm" />
          Edit
        </button>
        <button
          onClick={() => onDelete(product)}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          <FiTrash2 className="text-sm" />
          Delete
        </button>
      </div>
    </article>
  );
}
