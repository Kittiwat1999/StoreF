import { useState } from "react";
import { FiX } from "react-icons/fi";
import { validateFileSize } from "../../utils/validations";
export interface ProductFormState {
  title: string;
  description: string;
  price: string;
  availableQuantity: string;
  file: File | null;
  imageURL: string;
}
interface AddProductModalProps {
  open: boolean;
  editingProduct: {
    id: number;
    title: string;
    description: string;
    price: number;
    availableQuantity: number;
  } | null;
  form: ProductFormState;
  onClose: () => void;
  onChange: (field: keyof ProductFormState, value: string | File) => void;
  onSubmit: (event: React.FormEvent) => void;
}

export default function AddProductModal({
  open,
  editingProduct,
  form,
  onClose,
  onChange,
  onSubmit,
}: AddProductModalProps) {
  if (!open) {
    return null;
  }
  const maxSizeInMB = 5;
  const [fileError, setFileError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!validateFileSize(file, maxSizeInMB)) {
      setFileError(`File size must be less than ${maxSizeInMB}MB`);
    } else {
      setFileError("");
    }

    onChange("file", file);

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      onChange("imageURL", result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
              {editingProduct ? "Edit product" : "Add product"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              {editingProduct
                ? "Update product details"
                : "Create a new product"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-100"
            aria-label="Close"
          >
            <FiX className="text-lg" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Title
              <input
                value={form.title}
                onChange={(event) => onChange("title", event.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 focus:border-orange-400"
                placeholder="Product title"
                required
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Price
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) => onChange("price", event.target.value)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 focus:border-orange-400"
                placeholder="0.00"
                required
              />
            </label>
          </div>

          <label className="text-sm font-medium text-slate-700">
            Description
            <textarea
              value={form.description}
              onChange={(event) => onChange("description", event.target.value)}
              className="mt-1 min-h-24 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 focus:border-orange-400"
              placeholder="Describe the product"
              required
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-medium text-slate-700">
              Quantity available
              <input
                type="number"
                min="0"
                step="1"
                value={form.availableQuantity}
                onChange={(event) =>
                  onChange("availableQuantity", event.target.value)
                }
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 focus:border-orange-400"
                placeholder="0"
                required
              />
            </label>
            <label className="text-sm font-medium text-slate-700">
              Product image
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleFileChange(event)}
                className="mt-1 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 focus:border-orange-400"
              />
              {fileError && (
                <p className="mt-2 text-xs font-medium text-red-600">
                  {fileError}
                </p>
              )}
            </label>
          </div>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={fileError !== ""}
              className="inline-flex h-12 items-center justify-center rounded-full bg-orange-500 px-6 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {editingProduct ? "Save changes" : "Create product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
