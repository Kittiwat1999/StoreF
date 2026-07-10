import {type ProductBase} from "./product";
interface CartItemProduct extends ProductBase {
  availableQuantity: number;
  isAvailabled: boolean;
}

export interface CartItem {
  id: number;        
  productId: number;
  quantity: number;
  product: CartItemProduct;
}

export const cartSample: CartItem[] = [
  {
    id: 1,
    productId: 1,
    quantity: 2,
    product: {
      id: 1,
      title: "Product A",
      unitPrice: 10.99,
      thumbnail: "",
      availableQuantity: 23,
      isAvailabled: true,
    }
  },
  {
    id: 2,
    productId: 2,
    quantity: 1,
    product: {
      id: 2,
      title: "Product B",
      unitPrice: 15.49,
      thumbnail: "",
      availableQuantity: 0,
      isAvailabled: true,
    }
  },
  {
    id: 3,
    productId: 3,
    quantity: 6,
    product: {
      id: 3,
      title: "Product C",
      unitPrice: 7.99,
      thumbnail: "",
      availableQuantity: 5,
      isAvailabled: true
    }
  },
];