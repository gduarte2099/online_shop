import { Link } from "react-router-dom";
import ProductImage from "./ProductImage.jsx";
import AddButton from "./AddButton.jsx";
import { money, CATEGORY_NAMES } from "../data/config.js";

export default function ProductCard({ product: p }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-brand/40 hover:shadow-lg">
      <Link to={`/producto/${p.id}`} className="block bg-white p-4">
        <ProductImage
          src={p.image}
          alt={p.name}
          className="h-44 w-full object-contain sm:h-52"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4 pt-0">
        <p className="text-xs font-semibold text-brand">
          {p.brand} · {CATEGORY_NAMES[p.category]}
        </p>
        <Link
          to={`/producto/${p.id}`}
          className="line-clamp-2 text-sm font-bold leading-snug hover:text-brand"
        >
          {p.name}
        </Link>
        <p className="mt-auto pt-2 text-lg font-extrabold">{money(p.price)}</p>
        <AddButton product={p} />
      </div>
    </article>
  );
}
