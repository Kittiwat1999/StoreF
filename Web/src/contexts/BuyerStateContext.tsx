import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { type CartItem } from "../types/cart";
import cartApi from "../api/cartApi";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorageHelper";

interface BuyerStateValue {
  cartCount: number;
  orderCount: number;
  cartItems: CartItem[];
  selectedCartItems: number[];
  addToCartItem: (item: CartItem) => void;
  removeFromCartItem: (cartItemID: number) => void;
  setCartItems: (items: CartItem[]) => void;
  setSelectedCartItems: (cartItemId: number[]) => void;
  handleCartItemSelect: (cartItemId: number, checked: boolean) => void;
  addOrder: () => void;
  resetCart: () => void;
  makeOrderReaded: () => void;
}

const BuyerStateContext = createContext<BuyerStateValue | undefined>(undefined);

export function BuyerStateProvider({ children }: { children: ReactNode }) {
  const [orderCount, setOrderCount] = useState(3);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedCartItems, setSelectedCartItems] = useState<number[]>([]);
  const cartCount = useMemo(() => cartItems.length, [cartItems]);
  useEffect(() => {
    const items = loadFromLocalStorage<CartItem[]>("cartItems");
    const selectedItems = loadFromLocalStorage<number[]>(
      "purchaseItemsSelected",
    );
    if (items && items.length) {
      setCartItems(items);
    } else {
      const response = cartApi.getCart();
      saveToLocalStorage<CartItem[]>("cartItems", response);
      setCartItems(response);
    }

    if (selectedItems && selectedItems.length) {
      setSelectedCartItems(selectedItems);
    }
  }, []);

  const addToCartItem = (item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((it) => it.productId === item.productId);
      const newArr = !existing
        ? [...prev, item]
        : prev.map((it) =>
            it.cartItemId === existing.cartItemId ? { ...item } : it,
          );
      saveToLocalStorage<CartItem[]>("cartItems", newArr);
      return newArr;
    });
  };

  const removeFromCartItem = (cartItemId: number) => {
    setCartItems((current) => {
      const newArr = current.filter((it) => it.cartItemId !== cartItemId);
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

  const handleCartItemSelect = (cartItemId: number, checked: boolean) => {
    setSelectedCartItems((prev) => {
      const newArr = checked
        ? prev.includes(cartItemId)
          ? prev
          : [...prev, cartItemId]
        : prev.filter((itemId) => itemId !== cartItemId);
      saveToLocalStorage<number[]>("purchaseItemsSelected", newArr);
      return newArr;
    });
  };

  return (
    <BuyerStateContext.Provider
      value={{
        cartCount,
        orderCount,
        cartItems,
        addToCartItem,
        removeFromCartItem,
        selectedCartItems,
        setSelectedCartItems,
        handleCartItemSelect,
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
