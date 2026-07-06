export interface Product {
  id: string | number;
  title: string;
  price: number;
  image?: string;
  description?: string;
  availableQuantity: number;
  isAvailabled?: boolean;
}

export default function ProductsCard({
  product,
  onViewDetails,
}: {
  product: Product;
  onViewDetails?: () => void;
  hideActions?: boolean;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {product.image ? (
        <img
          src={product.image}
          alt={product.title}
          className="mb-3 h-40 w-full rounded-lg object-cover"
        />
      ) : (
        <div className="mb-3 flex h-40 items-center justify-center rounded-lg bg-slate-50 text-slate-400">
          No image
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {product.title}
          </h3>
          <div className="text-sm font-medium text-slate-800">
            ${product.price.toFixed(2)}
          </div>
        </div>
        <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-600">
          {product.availableQuantity} In stock
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-3">
        <div className="flex items-center justify-between"></div>
        {onViewDetails && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
            className="inline-flex h-10 w-full items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            View details
          </button>
        )}
      </div>
    </article>
  );
}
