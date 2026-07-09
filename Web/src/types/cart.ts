import {type Product} from "./product";
interface ModifiedProduct extends Product {
  availableQuantity: number;
}
export interface CartItem {
  id: number;        
  productId: number;
  quantity: number;
  product: ModifiedProduct;
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
      image: "",
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
      image: "",
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
      image: "",
      availableQuantity: 5,
      isAvailabled: true
    }
  },
];