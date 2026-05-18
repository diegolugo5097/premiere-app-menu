# 🎬 Premiere Café — Menú Digital

App React con estética de cómic para el menú de Premiere Café Circasia.

## 🚀 Instalación

```bash
cd premiere-cafe
npm install
npm start
# Abre en http://localhost:3000
```

Para producción:
```bash
npm run build
```

---

## 📁 Estructura

```
src/
├── App.jsx / App.css           # Raíz + header amarillo estilo cómic
├── index.js / index.css        # Entrada + 8 temas CSS + halftone
├── data/
│   ├── menu.js                 # Todos los productos (36 items, 6 categorías)
│   ├── images.js               # URLs de imágenes y galerías
│   └── themes.js               # 8 temas cómic + asignación por producto
└── components/
    ├── HomePage.jsx/css         # Grid + buscador + categorías
    ├── DetailPage.jsx/css       # Detalle con burbuja, ingredientes, galería
    └── Lightbox.jsx/css         # Visor de imágenes ampliadas
```

---

## 🎨 Los 8 temas cómic

| Tema     | Color       | Ejemplos                                    |
|----------|-------------|---------------------------------------------|
| marvel   | Rojo        | Iron Man, Avengers, Thor, Deadpool          |
| dc       | Azul        | Superman, Wonder Woman, Batman, Kryptonite  |
| noir     | Negro/dorado | Dark Knight, Pulp Fiction, El Padrino      |
| scifi    | Cian        | Matrix, Inception, E.T., Star Wars         |
| action   | Naranja     | Jurassic Park, IMAX Experience              |
| horror   | Púrpura     | Joker, Loki, Poison Ivy, Villain's Feast   |
| comedy   | Amarillo    | Hulk, Willy Wonka                           |
| retro    | Rosa        | Margarita Scarlett                          |

---

## ✏️ Cómo editar

**Agregar producto** → `src/data/menu.js`:
```js
{ id: 99, name: "Nombre", price: 15000, tag: "BADGE",
  desc: "Descripción...", ingredients: ["Ing1", "Ing2"],
  lore: "Historia curiosa..." }
```

**Cambiar tema** → `src/data/themes.js`:
```js
export const ITEM_THEMES = {
  "Nombre del producto": "marvel", // marvel|dc|noir|scifi|action|horror|comedy|retro
};
```

**Agregar imagen** → `src/data/images.js`:
```js
export const IMAGES = {
  "Nombre del producto": "https://url-de-imagen.jpg",
};
```
