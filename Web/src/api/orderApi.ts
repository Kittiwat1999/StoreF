import axiosClient from "./axiosClient";

const orderApi = {
  checkout: () => axiosClient.post("/orders/checkout/"),

  getOrders: () => axiosClient.get("/orders/"),

  getById: (id: number) => axiosClient.get(`/orders/${id}/`),

  sellerOrders: () => axiosClient.get("/orders/seller/"),
};

export default orderApi;
