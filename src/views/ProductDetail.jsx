import { Link, useParams } from "react-router-dom";
import products from "../data/products.json";
import ProductImage from "../components/ProductImage.jsx";
import AddButton from "../components/AddButton.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { money, CATEGORY_NAMES } from "../data/config.js";

export default function ProductDetail() {
  const { id } = useParams();
  const p = products.find((x) => x.id === Number(id));
  if (!p)
    return (
      <div className="p-16 text-center">
        Producto no encontrado.{" "}
        <Link className="text-brand" to="/productos">
          Volver al catálogo
        </Link>
      </div>
    );
  const related = products
    .filter((x) => x.category === p.category && x.id !== p.id)
    .slice(0, 4);
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <p className="mb-4 text-sm text-slate-500">
        <Link to="/" className="hover:text-brand">
          Inicio
        </Link>{" "}
        /{" "}
        <Link to={`/categoria/${p.category}`} className="hover:text-brand">
          {CATEGORY_NAMES[p.category]}
        </Link>
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6">
          <ProductImage
            src={p.image}
            alt={p.name}
            className="h-72 w-full object-contain sm:h-96"
          />
        </div>
        <div>
          <p className="text-sm font-bold">COD: {p.code}</p>
          <p className="text-sm font-bold text-brand">{p.brand}</p>
          <h1 className="mt-1 text-2xl font-extrabold leading-tight sm:text-3xl">
            {p.name}
          </h1>
          <p className="mt-4 text-3xl font-extrabold">{money(p.price)}</p>
          <div className="mt-6 max-w-sm">
            <AddButton product={p} big />
          </div>
          <Link
            to="/carrito"
            className="mt-3 inline-block text-sm font-semibold text-brand"
          >
            Ir al carrito
          </Link>
          <h2 className="mt-8 font-bold">Características</h2>
          <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-slate-600">
            {p.specs.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-extrabold">
            Productos relacionados
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
