Proyecto-Final-Front-End-RetroStage
Proyecto final para mi cursada de front end trabajado desde cero usando de base mi proyecto de preentrega

# 🎮 RetroStage – Tienda Retro de Videojuegos

RetroStage es un sitio web desarrollado como proyecto final del curso, cuyo objetivo es simular una tienda retro de videojuegos y productos clásicos.  
Incluye catálogo dinámico, carrito de compras persistente, formulario funcional con Formspree y un diseño completamente responsive.

---

## 🚀 Tecnologías utilizadas

- **HTML5 Semántico**
- **CSS3 + Flexbox + Grid**
- **Bootstrap (CDN)**
- **JavaScript Vanilla (ES6+)**
- **Fetch API**
- **LocalStorage**
- **Formspree** para envío de formularios

---

## 📌 Características principales del proyecto

### ✔ 1. Estructura HTML semántica  
Se utilizaron etiquetas como `header`, `nav`, `main`, `section`, `article` y `footer` para garantizar accesibilidad, claridad y SEO básico.

---

### ✔ 2. Catálogo de productos dinámico (API REST)
Los productos se cargan desde un archivo externo `products.json` usando **fetch()**.  
Cada elemento contiene:

- Imagen del producto  
- Título  
- Descripción  
- Precio  
- Botón para agregar al carrito  

Los productos se renderizan como *cards* responsivas en el DOM.

---

### ✔ 3. Carrito de compras dinámico
El carrito permite:

- Agregar productos desde las cards  
- Modificar cantidades  
- Eliminar productos  
- Visualizar el total  
- Ver la lista completa en un modal  
- Persistencia total con **LocalStorage**  

Si el usuario cierra o refresca la página, el carrito se mantiene intacto.

---

### ✔ 4. Formulario de contacto funcional
Incluye campos de:

- Nombre  
- Email  
- Mensaje  

El envío se realiza mediante **Formspree**, sin necesidad de backend propio.

El formulario incluye:

- Validaciones con JavaScript  
- Estilos personalizados  
- Accesibilidad y focus visible

---

### ✔ 5. Diseño responsivo
El diseño se adapta a todas las resoluciones gracias a:

- Flexbox  
- Grid Layout  
- Unidades fluidas  
- Media Queries personalizadas

---

### ✔ 6. Accesibilidad y SEO
Se aplicaron buenas prácticas:

- Contraste alto  
- Navegación por teclado  
- Focus visible en enlaces, botones e inputs  
- Atributos `alt` en todas las imágenes  
- Metaetiquetas básicas en `<head>`  
- Etiquetas semánticas bien estructuradas

---

### ✔ 7. Estilos CSS personalizados
Incluye:

- Estética retro tipo 8-bit  
- Fuente **Press Start 2P (Google Fonts)**  
- Botones estilo arcade  
- Efectos de luz neón  
- Cards retro con bordes pixelados  
- Sección holográfica animada para el video (*plus adicional*)  

---

### ✔ 8. Contenido multimedia
El sitio integra:

- Imágenes pixeladas  
- Animaciones retro  
- Un video con efecto holográfico extra adicionado gracias a mi amigo matias beja (el jujeño) diseñador 3d por aportarlo

---

### ✔ 9. Hosting del proyecto
El sitio fue subido a un hosting gratuito (Netlify o GitHub Pages), como requiere la consigna.

(https://eliasmcorio.github.io/Proyecto-Final-Front-End-RetroStage/)







