import {type ProductBase} from "./product";
interface CartItemProduct extends ProductBase {
  availableQuantity: number;
  isAvailabled: boolean;
}

export interface CartItem {
  cartItemId: number;        
  productId: string;
  quantity: number;
  product: CartItemProduct;
}

export const cartSample: CartItem[] = [
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
    }
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
    }
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
      isAvailabled: true
    }
  },
];