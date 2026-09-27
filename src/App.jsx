import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./views/Home.jsx";
import Catalog from "./views/Catalog.jsx";
import ProductDetail from "./views/ProductDetail.jsx";
import Cart from "./views/Cart.jsx";
import NotFound from "./views/NotFound.jsx";

export default function App() {
  const { pathname } = useLocation();
useEffect(() => {
  window.scrollTo(0, 0);
}, [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Catalog />} />
          <Route path="/categoria/:slug" element={<Catalog />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
