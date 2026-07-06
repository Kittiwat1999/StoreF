import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface BuyerStateValue {
  poroductonCart: Array<number>;
  cartCount: number;
  orderCount: number;
  addToCartItem: (productId: number) => void;
  removeFromCartItem: (productId: number) => void;
  setCartItems: (items: Array<number>) => void;
  addOrder: () => void;
  resetCart: () => void;
  makeOrderReaded: () => void;
}

const BuyerStateContext = createContext<BuyerStateValue | undefined>(undefined);

export function BuyerStateProvider({ children }: { children: ReactNode }) {
  const [poroductonCart, setCartItems] = useState<Array<number>>([3, 2, 6]);
  const [orderCount, setOrderCount] = useState(3);

  const cartCount = useMemo(() => poroductonCart.length, [poroductonCart]);

  const addToCartItem = (productId: number) => {
    setCartItems([...poroductonCart, productId]);
  };

  const removeFromCartItem = (productId: number) => {
    setCartItems((current) => current.filter((id) => id !== productId));
  };

  const addOrder = () => {
    setOrderCount((current) => current + 1);
  };

  const resetCart = () => {
    setCartItems([]);
  };

  const makeOrderReaded = () => {
    if (orderCount > 0) {
      setOrderCount(orderCount - 1);
    }
  };

  return (
    <BuyerStateContext.Provider
      value={{
        poroductonCart,
        cartCount,
        orderCount,
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
