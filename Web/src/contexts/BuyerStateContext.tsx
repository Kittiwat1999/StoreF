import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {type CartItem} from '../types/cart'
import cartApi from "../api/cartApi";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/localStorageHelper";

interface BuyerStateValue {
  // poroductonCart: Array<string>;
  cartCount: number;
  orderCount: number;
  cartItems: CartItem[];
  addToCartItem: (item: CartItem) => void;
  removeFromCartItem: (productId: string) => void;
  setCartItems: (items: CartItem[]) => void;
  addOrder: () => void;
  resetCart: () => void;
  makeOrderReaded: () => void;
}

const BuyerStateContext = createContext<BuyerStateValue | undefined>(undefined);

export function BuyerStateProvider({ children }: { children: ReactNode }) {
  // const [poroductonCart, setCartItems] = useState<Array<string>>(["uuid2", "uuid1", "uuid3"]);
  const [orderCount, setOrderCount] = useState(3);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartCount = useMemo(() => cartItems.length, [cartItems]);

  useEffect(() => {
    const items = loadFromLocalStorage<CartItem[]>("cartItems");
    if (items && items.length) {
      setCartItems(items);
    } else {
      const response = cartApi.getCart();
      saveToLocalStorage<CartItem[]>("cartItems", response);
      setCartItems(response);
    }
  }, []);

  const addToCartItem = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((it) => it.productId === item.productId);
      const newArr = !existing
        ? [...prev, item]
        : prev.map((it) =>
            it.cartItemId === existing.cartItemId
              ? { ...item }
              : it
          );
      saveToLocalStorage<CartItem[]>("cartItems", newArr);
      return newArr;
    });
  };

  const removeFromCartItem = (productId: string) => {
    setCartItems((current) => {
      const newArr = current.filter((it) => it.productId !== productId);
      saveToLocalStorage<CartItem[]>("cartItems", newArr);
      return newArr;
    });

  };

  const addOrder = () => {
    setOrderCount((current) => current + 1);
  };

  const resetCart = () => {
    setCartItems([]);
    saveToLocalStorage<CartItem[]>("cartItems", []);
  };

  const makeOrderReaded = () => {
    if (orderCount > 0) {
      setOrderCount(orderCount - 1);
    }
  };


  return (
    <BuyerStateContext.Provider
      value={{
        // poroductonCart,
        cartCount,
        orderCount,
        cartItems,
        addToCartItem,
        removeFromCartItem,
        setCartItems,
        addOrder,
        resetCart,
        makeOrderReaded,
      }}
    >
      {children}
    </BuyerStateContext.Provider>
  );
}

export function useBuyerState() {
  const context = useContext(BuyerStateContext);
  if (!context) {
    throw new Error("useBuyerState must be used within a BuyerStateProvider");
  }
  return context;
}
