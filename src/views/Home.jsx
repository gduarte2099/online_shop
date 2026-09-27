import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import ProductCard from "../components/ProductCard.jsx";
import { MENU } from "../data/config.js";

const SLIDES = [
  { img: "/img/banners/banner1.jpg", to: "/categoria/smartphones" },
  { img: "/img/banners/banner2.jpg", to: "/categoria/notebooks" },
  { img: "/img/banners/banner3.jpg", to: "/categoria/tvs" },
];

function Banner() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 10000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink to-brand-dark text-white">
      <img
        src={SLIDES[i].img}
        alt=""
        onError={(e) => (e.currentTarget.style.display = "none")}
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div className="relative px-6 py-14 sm:px-12 sm:py-20">
        <h1 className="max-w-xl text-2xl font-extrabold leading-tight sm:text-5xl">
          Lo último en tecnología, al mejor precio.
        </h1>
        <p className="mt-3 max-w-md text-slate-200">
          Elegí tus productos y cerrá la compra por WhatsApp en un minuto.
        </p>
        <Link
          to={SLIDES[i].to}
          className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-bold text-ink hover:bg-brand-soft"
        >
          Ver ofertas
        </Link>
        <div className="mt-8 flex gap-2">
          {SLIDES.map((_, n) => (
            <button
              key={n}
              onClick={() => setI(n)}
              aria-label={`Banner ${n + 1}`}
              className={`h-2 rounded-full transition-all ${n === i ? "w-8 bg-white" : "w-2 bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const Section = ({ title, list }) => (
  <section className="mt-12">
    <h2 className="mb-5 text-2xl font-extrabold">{title}</h2>
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {list.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Banner />
      <div className="mt-6 flex flex-wrap gap-2">
        {MENU.flatMap((g) => g.items).map(([slug, label]) => (
          <Link
            key={slug}
            to={`/categoria/${slug}`}
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold hover:border-brand hover:text-brand"
          >
            {label}
          </Link>
        ))}
      </div>
      <Section
        title="Productos destacados"
        list={products.filter((p) => p.featured)}
      />
      <Section
        title="Lo más vendido"
        list={products.filter((p) => p.bestseller)}
      />
    </div>
  );
}
