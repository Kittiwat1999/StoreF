import axiosClient from "./axiosClient";

const cartApi = {
  getCart: () => axiosClient.get("/cart/"),

  addItem: (data: { product_id: number; quantity: number }) =>
    axiosClient.post("/cart/items/", data),

  updateItem: (id: number, data: { quantity: number }) =>
    axiosClient.patch(`/cart/items/${id}/`, data),

  removeItem: (id: number) => axiosClient.delete(`/cart/items/${id}/`),
};

export default cartApi;
