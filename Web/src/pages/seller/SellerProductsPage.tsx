import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import SellerProductsCard, {
  type SellerProduct,
} from "../../components/sellers/SellerProductsCard";
import AddProductModal, {
  type ProductFormState,
} from "../../components/sellers/AddProductModal";

const initialProducts: SellerProduct[] = [
  {
    id: 1,
    title: "Classic Mug",
    description: "A simple ceramic mug for everyday coffee.",
    unitPrice: 12.5,
    availableQuantity: 25,
    imageUrl: "",
  },
  {
    id: 2,
    title: "Notebook Set",
    description: "Premium notebooks for planning and journaling.",
    unitPrice: 18,
    availableQuantity: 10,
    imageUrl: "",
  },
];

const emptyForm = (): ProductFormState => ({
  title: "",
  description: "",
  unitPrice: "",
  availableQuantity: "",
  file: null,
  imageURL: "",
});

export default function SellerProductsPage() {
  const [products, setProducts] = useState<SellerProduct[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SellerProduct | null>(
    null,
  );
  const [deletingProduct, setDeletingProduct] = useState<SellerProduct | null>(
    null,
  );
  const [form, setForm] = useState<ProductFormState>(emptyForm());

  const openAddModal = () => {
    setEditingProduct(null);
    setForm(emptyForm());
    setIsModalOpen(true);
  };

  const openEditModal = (product: SellerProduct) => {
    setEditingProduct(product);
    setForm({
      title: product.title,
      description: product.description,
      unitPrice: product.unitPrice.toString(),
      availableQuantity: product.availableQuantity.toString(),
      file: null,
      imageURL: product.imageUrl,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setForm(emptyForm());
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const price = Number(form.unitPrice);
    const availableQuantity = Number(form.availableQuantity);

    if (
      !form.title.trim() ||
      Number.isNaN(price) ||
      Number.isNaN(availableQuantity)
    ) {
      return;
    }

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? {
                ...product,
                title: form.title.trim(),
                description: form.description.trim(),
                unitPrice: price,
                availableQuantity,
                imageUrl: form.imageURL,
              }
            : product,
        ),
      );
    } else {
      setProducts((prev) => [
        {
          id: Date.now(),
          title: form.title.trim(),
          description: form.description.trim(),
          unitPrice: price,
          availableQuantity,
          imageUrl: form.imageURL,
        },
        ...prev,
      ]);
    }

    closeModal();
  };

  const confirmDelete = () => {
    if (!deletingProduct) {
      return;
    }

    setProducts((prev) =>
      prev.filter((product) => product.id !== deletingProduct.id),
    );
    setDeletingProduct(null);
    setIsDeleteOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Seller panel
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Product management
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Create, update, and remove products that buyers can see.
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
          >
            <FiPlus className="text-base" />
            Add product
          </button>
        </div>

        {products.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl font-semibold text-orange-500">
              +
            </div>
            <h2 className="mt-4 text-xl font-semibold text-slate-900">
              No products yet
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Add your first product to start selling in the marketplace.
            </p>
            <button
              onClick={openAddModal}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Add your first product
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <SellerProductsCard
                key={product.id}
                product={product}
                onEdit={openEditModal}
                onDelete={(selectedProduct) => {
                  setDeletingProduct(selectedProduct);
                  setIsDeleteOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <AddProductModal
        open={isModalOpen}
        editingProduct={editingProduct}
        form={form}
        onClose={closeModal}
        onChange={(field, value) =>
          setForm((prev) => ({ ...prev, [field]: value }))
        }
        onSubmit={handleSubmit}
      />

      {isDeleteOpen && deletingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-600">
              Confirm delete
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Delete this product?
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-slate-900">
                {deletingProduct.title}
              </span>{" "}
              from your store? This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => {
                  setDeletingProduct(null);
                  setIsDeleteOpen(false);
                }}
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
