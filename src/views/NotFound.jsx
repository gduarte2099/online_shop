import { Link } from "react-router-dom";
export default function NotFound() {
  return (<div className="px-4 py-24 text-center"><h1 className="text-3xl font-extrabold">Página no encontrada</h1>
    <p className="mt-2 text-slate-500">El enlace no existe o cambió de lugar.</p>
    <Link to="/" className="mt-6 inline-block rounded-xl bg-brand px-6 py-3 font-semibold text-white">Volver al inicio</Link></div>);
}
