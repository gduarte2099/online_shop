import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

export default function AddButton({ product, big = false }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  const click = () => { add(product); setDone(true); setTimeout(() => setDone(false), 1400); };
  return (
    <button onClick={click} aria-live="polite"
      className={`rounded-xl font-semibold transition ${big ? "w-full py-3.5 text-base" : "w-full py-2.5 text-sm"} ${done ? "bg-emerald-600 text-white" : "bg-brand text-white hover:bg-brand-dark"}`}>
      {done ? "Agregado al carrito" : "Agregar al carrito"}
    </button>
  );
}
