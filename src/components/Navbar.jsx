import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { MENU, STORE_NAME } from "../data/config.js";

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // 👈 submenú abierto (por título)
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();
    navigate(
      q.trim() ? `/productos?q=${encodeURIComponent(q.trim())}` : "/productos",
    );
    setOpen(false);
  };

  // Cierra tanto el menú móvil como cualquier submenú abierto
  const closeAll = () => {
    setOpen(false);
    setOpenMenu(null);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <button
          className="rounded-lg p-2 lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <Link to="/" className="text-xl font-extrabold tracking-tight">
          <img
            className="h-8 w-auto"
            src="/img/logo/logo.png"
            alt={STORE_NAME}
          />
          {/*  {STORE_NAME}
            <span className="text-brand">.</span> */}
        </Link>
        <form
          onSubmit={search}
          className="ml-auto hidden flex-1 max-w-xl md:flex"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="¿Qué estás buscando?"
            className="w-full rounded-l-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
          <button className="rounded-r-xl bg-ink px-5 text-sm font-semibold text-white">
            Buscar
          </button>
        </form>
        <Link
          to="/carrito"
          className="relative ml-auto rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold hover:border-brand md:ml-0"
        >
          <i className="mr-2 inline-block">🛒</i>
          Carrito
          {count > 0 && (
            <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-xs text-white">
              {count}
            </span>
          )}
        </Link>
      </div>
      <nav
        className={`${open ? "block" : "hidden"} border-t border-slate-100 lg:block`}
      >
        <form onSubmit={search} className="flex p-3 md:hidden">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="¿Qué estás buscando?"
            className="w-full rounded-l-xl border border-slate-300 px-4 py-2.5 text-sm"
          />
          <button className="rounded-r-xl bg-ink px-4 text-sm font-semibold text-white">
            Buscar
          </button>
        </form>
        <ul className="mx-auto grid max-w-6xl gap-x-6 px-4 pb-3 sm:grid-cols-2 lg:flex lg:justify-center lg:pb-0">
          {MENU.map((g) => {
            const isOpen = openMenu === g.title;
            return (
              <li
                key={g.title}
                className="relative py-2"
                onMouseEnter={() => setOpenMenu(g.title)}
                onMouseLeave={() => setOpenMenu(null)}
                onFocus={() => setOpenMenu(g.title)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setOpenMenu(null);
                  }
                }}
              >
                <span className="block cursor-default px-2 text-sm font-bold lg:py-2">
                  {g.title}
                </span>
                <ul
                  className={`flex flex-wrap gap-x-3 px-2 lg:absolute lg:left-0 lg:top-full lg:z-50 lg:min-w-44 lg:flex-col lg:rounded-xl lg:border lg:border-slate-200 lg:bg-white lg:p-2 lg:shadow-xl lg:transition ${
                    isOpen
                      ? "lg:visible lg:opacity-100"
                      : "lg:invisible lg:opacity-0"
                  }`}
                >
                  {g.items.map(([slug, label]) => (
                    <NavLink
                      key={slug}
                      to={`/categoria/${slug}`}
                      onClick={closeAll}
                      className={({ isActive }) =>
                        `block rounded-lg px-2 py-1.5 text-sm hover:bg-brand-soft ${
                          isActive ? "font-bold text-brand" : "text-slate-600"
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
