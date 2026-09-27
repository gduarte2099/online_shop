// Número ficticio (formato internacional, sin + ni espacios). Cambialo por el real.
export const WHATSAPP_NUMBER = "595981123456";
export const STORE_NAME = "TechMarket";
export const money = (n) => "Gs. " + n.toLocaleString("es-PY");
export const MENU = [
  { title: "Computación", items: [["notebooks", "Notebooks"], ["tablets", "Tablets"], ["pcs", "PCs"]] },
  { title: "Telefonía", items: [["smartphones", "Smartphones"], ["smartwatch", "Smartwatch"]] },
  { title: "TV, Audio y Video", items: [["tvs", "Televisores"], ["parlantes", "Parlantes"], ["camaras", "Cámaras"]] },
  { title: "Accesorios", items: [["mouse", "Mouse"], ["teclados", "Teclados"], ["cargadores", "Cargadores"]] },
];
export const CATEGORY_NAMES = Object.fromEntries(MENU.flatMap((m) => m.items));
