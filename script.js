/* RetroStage - script.js */
/* Requiere: index.html (contiene elementos con los mismos IDs) y productos.json */

const productsContainer = document.getElementById("productos");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const btnCart = document.getElementById("btnCart");
const closeCartBtn = document.getElementById("close-cart");
const checkoutBtn = document.getElementById("checkout");
const contactForm = document.getElementById("contactForm");
const reviewsGrid = document.getElementById("reviews-grid");

let cart = JSON.parse(localStorage.getItem("retrostage_cart")) || [];
let productsCache = [];

/* -----------------------
   UTIL: actualizar contador
------------------------*/
function updateCartCountUI() {
  const totalCount = cart.reduce((sum, it) => sum + (it.cantidad || 0), 0);
  cartCount.textContent = totalCount;
  // mantener contador alternativo si existe
  const alt = document.getElementById("contadorCarrito");
  if (alt) alt.textContent = totalCount;
}

/* -----------------------
   GUARDAR / CARGAR carrito
------------------------*/
function saveCart() {
  localStorage.setItem("retrostage_cart", JSON.stringify(cart));
  updateCartCountUI();
}

/* -----------------------
   FETCH productos
------------------------*/
async function loadProducts() {
  try {
    const res = await fetch("productos.json");
    if (!res.ok) throw new Error("Error al obtener productos");
    const products = await res.json();
    productsCache = products;
    renderProducts(products);
  } catch (err) {
    console.error(err);
    productsContainer.innerHTML = `<p style="color:#ff6b9a">No se pudieron cargar los productos. Revisa 'productos.json'.</p>`;
  }
}

/* -----------------------
   RENDER productos
------------------------*/
function renderProducts(products) {
  productsContainer.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("article");
    card.className = "card-retro";
    card.innerHTML = `
      <img src="${p.imagen}" alt="${p.titulo}" loading="lazy">
      <h3>${p.titulo}</h3>
      <p class="desc">${p.desc || ""}</p>
      <div class="price">$${Number(p.precio).toFixed(2)}</div>
      <button class="btn-add" data-id="${p.id}" aria-label="Agregar ${p.titulo} al carrito">Agregar al carrito</button>
    `;
    productsContainer.appendChild(card);
  });

  // attach listeners
  document.querySelectorAll(".btn-add").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      addToCart(id);
    });
  });
}

/* -----------------------
   Añadir al carrito
------------------------*/
function addToCart(id) {
  const prod = productsCache.find(p => String(p.id) === String(id));
  if (!prod) return;

  const existing = cart.find(i => String(i.id) === String(id));
  if (existing) existing.cantidad = (existing.cantidad || 0) + 1;
  else cart.push({ id: prod.id, titulo: prod.titulo, precio: Number(prod.precio), cantidad: 1, imagen: prod.imagen });

  saveCart();
  renderCart();
  // notificación breve accesible
  announce(`${prod.titulo} agregado al carrito`);
}

/* -----------------------
   Render carrito
------------------------*/
function renderCart() {
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = `<p style="color:#aaa">Tu carrito está vacío.</p>`;
    cartTotal.textContent = "0.00";
    updateCartCountUI();
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.precio * item.cantidad;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="item-left">
        <strong style="display:block">${item.titulo}</strong>
        <small>Precio: $${item.precio.toFixed(2)}</small>
      </div>
      <div class="item-right">
        <div class="qty-box" aria-label="Cantidad">
          <button class="qty" data-id="${item.id}" data-action="minus" aria-label="restar">-</button>
          <span aria-live="polite">${item.cantidad}</span>
          <button class="qty" data-id="${item.id}" data-action="plus" aria-label="sumar">+</button>
        </div>
        <div style="margin-top:8px">
          <button class="remove" data-id="${item.id}" aria-label="Eliminar">Eliminar</button>
        </div>
      </div>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = total.toFixed(2);

  // listeners
  document.querySelectorAll(".qty").forEach(btn => btn.addEventListener("click", handleQty));
  document.querySelectorAll(".remove").forEach(btn => btn.addEventListener("click", handleRemove));
  updateCartCountUI();
}

/* -----------------------
   Handlers qty / remove
------------------------*/
function handleQty(e) {
  const id = e.currentTarget.dataset.id;
  const action = e.currentTarget.dataset.action;
  const item = cart.find(i => String(i.id) === String(id));
  if (!item) return;
  if (action === "plus") item.cantidad++;
  if (action === "minus" && item.cantidad > 1) item.cantidad--;
  saveCart();
  renderCart();
}

function handleRemove(e) {
  const id = e.currentTarget.dataset.id;
  cart = cart.filter(i => String(i.id) !== String(id));
  saveCart();
  renderCart();
}

/* -----------------------
   Modal open/close
------------------------*/
btnCart.addEventListener("click", () => {
  cartModal.classList.remove("oculto");
  btnCart.setAttribute("aria-expanded", "true");
  renderCart();
  // focus management
  setTimeout(() => cartItems.focus(), 100);
});
closeCartBtn.addEventListener("click", () => {
  cartModal.classList.add("oculto");
  btnCart.setAttribute("aria-expanded", "false");
  btnCart.focus();
});
// cerrar al presionar ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !cartModal.classList.contains("oculto")) {
    cartModal.classList.add("oculto");
    btnCart.setAttribute("aria-expanded", "false");
    btnCart.focus();
  }
});

/* -----------------------
   Checkout simulado
------------------------*/
checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  // Simular pago
  if (!confirm("Simular compra y vaciar carrito?")) return;
  cart = [];
  saveCart();
  renderCart();
  cartModal.classList.add("oculto");
  announce("Compra simulada realizada. ¡Gracias!");
});

/* -----------------------
   Form validation + Formspree
------------------------*/
contactForm?.addEventListener("submit", (e) => {
  if (!contactForm.checkValidity()) {
    e.preventDefault();
    contactForm.reportValidity();
    announce("Por favor completa correctamente el formulario.");
    return;
  }
  // cuando se envía, permitimos que Formspree procese. opcional: limpiar y notificar
  setTimeout(() => {
    contactForm.reset();
    announce("Mensaje enviado. Gracias.");
  }, 800);
});

/* -----------------------
   Reviews demo (hardcoded)
------------------------*/
function loadReviews() {
  const reviews = [
    { author: "Alex", text: "Excelente colección retro." },
    { author: "María", text: "Me encanta la estética 8-bit." },
    { author: "Juan", text: "Carrito fácil y rápido." }
  ];
  if (!reviewsGrid) return;
  reviewsGrid.innerHTML = "";
  reviews.forEach(r => {
    const el = document.createElement("div");
    el.className = "review";
    el.innerHTML = `<h4>${r.author}</h4><p>${r.text}</p>`;
    reviewsGrid.appendChild(el);
  });
}

/* -----------------------
   Utils: announce (aria-live)
------------------------*/
function announce(message) {
  let live = document.getElementById("aria-live");
  if (!live) {
    live = document.createElement("div");
    live.id = "aria-live";
    live.setAttribute("aria-live", "polite");
    live.style.position = "absolute";
    live.style.left = "-9999px";
    document.body.appendChild(live);
  }
  live.textContent = message;
  setTimeout(() => { live.textContent = ""; }, 2000);
}

/* -----------------------
   INIT
------------------------*/
loadProducts();
loadReviews();
renderCart();
updateCartCountUI();
