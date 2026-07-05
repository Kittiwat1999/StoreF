import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface BuyerStateValue {
  cartItems: Record<string, number>;
  cartCount: number;
  orderCount: number;
  addToCartItem: (productId: string | number, quantity?: number) => void;
  removeFromCartItem: (productId: string | number, quantity?: number) => void;
  setCartItems: (items: Record<string, number>) => void;
  addOrder: () => void;
  resetCart: () => void;
}

const BuyerStateContext = createContext<BuyerStateValue | undefined>(undefined);

export function BuyerStateProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const [orderCount, setOrderCount] = useState(0);

  const cartCount = useMemo(() => Object.keys(cartItems).length, [cartItems]);

  const addToCartItem = (productId: string | number, quantity = 1) => {
    const key = String(productId);
    setCartItems((current) => {
      const currentQuantity = current[key] ?? 0;
      return { ...current, [key]: currentQuantity + quantity };
    });
  };

  const removeFromCartItem = (productId: string | number, quantity = 1) => {
    const key = String(productId);
    setCartItems((current) => {
      const currentQuantity = current[key] ?? 0;
      const nextQuantity = currentQuantity - quantity;
      if (nextQuantity <= 0) {
        const { [key]: removed, ...rest } = current;
        return rest;
      }
      return { ...current, [key]: nextQuantity };
    });
  };

  const addOrder = () => {
    setOrderCount((current) => current + 1);
  };

  const resetCart = () => {
    setCartItems({});
  };

  return (
    <BuyerStateContext.Provider
      value={{
        cartItems,
        cartCount,
        orderCount,
        addToCartItem,
        removeFromCartItem,
        setCartItems,
        addOrder,
        resetCart,
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
