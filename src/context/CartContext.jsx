import { createContext, useContext, useEffect, useReducer } from "react";

const CartContext = createContext(null);
const KEY = "tienda-cart";

function reducer(state, a) {
  switch (a.type) {
    case "add": {
      const found = state.find((i) => i.id === a.product.id);
      return found
        ? state.map((i) => (i.id === a.product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state, { ...a.product, qty: 1 }];
    }
    case "qty":
      return state.map((i) => (i.id === a.id ? { ...i, qty: Math.max(1, i.qty + a.delta) } : i));
    case "remove": return state.filter((i) => i.id !== a.id);
    case "clear": return [];
    default: return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
  });
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(items)), [items]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);
  const value = {
    items, count, total,
    add: (product) => dispatch({ type: "add", product }),
    changeQty: (id, delta) => dispatch({ type: "qty", id, delta }),
    remove: (id) => dispatch({ type: "remove", id }),
    clear: () => dispatch({ type: "clear" }),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
