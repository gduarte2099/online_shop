import { STORE_NAME } from "../data/config.js";
export default function Footer() {
  return (
    <footer className="mt-16 bg-ink text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div><p className="text-lg font-extrabold text-white">{STORE_NAME}<span className="text-brand">.</span></p>
          <p className="mt-2 text-sm">Tecnología con compra segura y atención directa por WhatsApp.</p></div>
        <div className="text-sm"><p className="font-bold text-white">La tienda</p>
          <p className="mt-2">Quiénes somos</p><p>Trabajá con nosotros</p></div>
        <div className="text-sm"><p className="font-bold text-white">Formas de pago</p>
          <p className="mt-2">Visa, Mastercard, American Express, Credicard y efectivo.</p></div>
      </div>
      <p className="bg-black/30 py-3 text-center text-xs">© {new Date().getFullYear()} {STORE_NAME}. Los colores y aspecto pueden variar respecto de las imágenes.</p>
    </footer>
  );
}
