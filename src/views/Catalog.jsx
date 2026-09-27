import { useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard.jsx";
import { CATEGORY_NAMES } from "../data/config.js";

export default function Catalog() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();
  const [sort, setSort] = useState("default");

  const list = useMemo(() => {
    let l = products.filter((p) => (!slug || p.category === slug) && (!q || `${p.name} ${p.brand}`.toLowerCase().includes(q)));
    if (sort === "asc") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "desc") l = [...l].sort((a, b) => b.price - a.price);
    return l;
  }, [slug, q, sort]);

  const title = slug ? CATEGORY_NAMES[slug] || "Categoría" : q ? `Resultados para "${params.get("q")}"` : "Todos los productos";
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1><p className="text-sm text-slate-500">{list.length} productos</p></div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Ordenar" className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm">
          <option value="default">Relevancia</option><option value="asc">Menor precio</option><option value="desc">Mayor precio</option>
        </select>
      </div>
      {list.length ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">{list.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="font-bold">No encontramos productos</p>
          <p className="mt-1 text-sm text-slate-500">Probá con otra búsqueda o mirá todo el catálogo.</p>
          <Link to="/productos" className="mt-4 inline-block font-semibold text-brand">Ver todos los productos</Link>
        </div>)}
    </div>
  );
}
