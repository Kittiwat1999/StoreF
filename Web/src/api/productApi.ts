import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params?: {
    category?: string;
    min_price?: number;
    max_price?: number;
    search?: string;
  }) => axiosClient.get("/products/", { params }),

  getById: (id: number) => axiosClient.get(`/products/${id}/`),

  create: (data: any) => axiosClient.post("/products/", data),

  update: (id: number, data: any) => axiosClient.put(`/products/${id}/`, data),

  delete: (id: number) => axiosClient.delete(`/products/${id}/`),

  mine: () => axiosClient.get("/products/mine/"),
};

export default productApi;
