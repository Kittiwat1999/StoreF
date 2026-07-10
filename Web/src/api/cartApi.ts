import axiosClient from "./axiosClient";
import { type CartItem } from "../types/cart";
const cartApi = {
  // getCart: () => axiosClient.get("/cart/"),
  getCart: () => {
    return [
      {
        cartItemId: 1,
        productId: "uuid1",
        quantity: 2,
        product: {
          id: "uuid1",
          title: "Product A",
          unitPrice: 10.99,
          thumbnail: "",
          availableQuantity: 23,
          isAvailabled: true,
        },
      },
      {
        cartItemId: 2,
        productId: "uuid2",
        quantity: 1,
        product: {
          id: "uuid2",
          title: "Product B",
          unitPrice: 15.49,
          thumbnail: "",
          availableQuantity: 0,
          isAvailabled: true,
        },
      },
      {
        cartItemId: 3,
        productId: "uuid3",
        quantity: 6,
        product: {
          id: "uuid3",
          title: "Product C",
          unitPrice: 7.99,
          thumbnail: "",
          availableQuantity: 5,
          isAvailabled: true,
        },
      },
    ] as CartItem[];
  },

  addItem: (data: { product_id: number; quantity: number }) =>
    axiosClient.post("/cart/items/", data),

  updateItem: (id: number, data: { quantity: number }) =>
    axiosClient.patch(`/cart/items/${id}/`, data),

  removeItem: (id: number) => axiosClient.delete(`/cart/items/${id}/`),
};

export default cartApi;
