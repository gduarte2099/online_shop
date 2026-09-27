import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import ProductImage from "../components/ProductImage.jsx";
import { money, STORE_NAME, WHATSAPP_NUMBER } from "../data/config.js";

export default function Cart() {
  const { items, total, changeQty, remove, clear } = useCart();

  const checkout = () => {
    const lines = items.map((i) => `• ${i.qty} x ${i.name} — ${money(i.price * i.qty)}`).join("\n");
    const msg = `Hola ${STORE_NAME}, quiero hacer este pedido:\n\n${lines}\n\nTotal: ${money(total)}\n\n¿Me confirman disponibilidad y forma de entrega?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  };

  if (!items.length)
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-2xl font-extrabold">Tu carrito está vacío</h1>
        <p className="mt-2 text-slate-500">Agregá productos y armá tu pedido.</p>
        <Link to="/productos" className="mt-6 inline-block rounded-xl bg-brand px-6 py-3 font-semibold text-white">Ver productos</Link>
      </div>
    );

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_340px]">
      <section>
        <div className="mb-4 flex items-center justify-between"><h1 className="text-2xl font-extrabold">Tu carrito</h1>
          <button onClick={clear} className="text-sm text-slate-500 hover:text-red-600">Vaciar carrito</button></div>
        <ul className="space-y-3">
          {items.map((i) => (
            <li key={i.id} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 sm:gap-4 sm:p-4">
              <ProductImage src={i.image} alt={i.name} className="h-20 w-20 shrink-0 object-contain sm:h-24 sm:w-24" />
              <div className="flex flex-1 flex-col gap-2">
                <Link to={`/producto/${i.id}`} className="text-sm font-bold leading-snug hover:text-brand">{i.name}</Link>
                <p className="text-sm text-slate-500">{money(i.price)} c/u</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center rounded-xl border border-slate-300">
                    <button onClick={() => changeQty(i.id, -1)} className="px-3 py-1" aria-label="Restar uno">−</button>
                    <span className="min-w-6 text-center text-sm font-semibold">{i.qty}</span>
                    <button onClick={() => changeQty(i.id, 1)} className="px-3 py-1" aria-label="Sumar uno">+</button>
                  </div>
                  <p className="font-extrabold">{money(i.price * i.qty)}</p>
                </div>
              </div>
              <button onClick={() => remove(i.id)} aria-label={`Quitar ${i.name}`} className="self-start text-slate-400 hover:text-red-600">✕</button>
            </li>))}
        </ul>
      </section>
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 lg:sticky lg:top-28">
        <h2 className="font-extrabold">Resumen</h2>
        <div className="mt-4 flex justify-between text-lg font-extrabold"><span>Total</span><span>{money(total)}</span></div>
        <button onClick={checkout} className="mt-5 w-full rounded-xl bg-[#16a34a] py-3.5 font-bold text-white hover:bg-[#15803d]">Comprar por WhatsApp</button>
        <p className="mt-3 text-xs text-slate-500">Se abrirá WhatsApp con tu pedido listo para enviar. Coordinamos pago y entrega por ahí.</p>
        <Link to="/productos" className="mt-4 block text-center text-sm font-semibold text-brand">Seguir comprando</Link>
      </aside>
    </div>
  );
}
