import { useState, useEffect } from "react";
import productApi from "../api/productApi";

export function useProducts(filters?: {
  category?: string;
  min_price?: number;
  max_price?: number;
  search?: string;
}) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    productApi.getAll(filters)
      .then(response => setProducts(response.data))
      .catch((err) => setError(err.response?.data?.error || err.message))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]); // re-fetch เมื่อ filter เปลี่ยน

  return { products, loading, error };
}
