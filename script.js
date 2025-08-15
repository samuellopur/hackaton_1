// Activar carrusel automático con intervalo de 3 segundos
const carrusel = document.querySelector("#carruselMTB");
const bootstrapCarrusel = new bootstrap.Carousel(carrusel, {
  interval: 3000, // tiempo en milisegundos
  ride: "carousel",
});

// Datos de productos por categoría
const productos = {
  bicicletas: [
    {
      titulo: "MTB Pro",
      precio: "$1.200.000",
      imagen: "imagenes/bicicletamtb1.jpg",
    },
    {
      titulo: "MTB Trail",
      precio: "$980.000",
      imagen: "imagenes/bicicletamtb2.jpg",
    },
    {
      titulo: "MTB Enduro",
      precio: "$1.500.000",
      imagen: "imagenes/bicicletamtb3.jpg",
    },
    {
      titulo: "MTB XC",
      precio: "$1.100.000",
      imagen: "imagenes/bicicletamtb4.jpg",
    },
  ],
  badanas: [
    {
      titulo: "Badana Elite",
      precio: "$95.000",
      imagen: "imagenes/badana1.jpg",
    },
    {
      titulo: "Badana Básica",
      precio: "$70.000",
      imagen: "imagenes/badana2.jpg",
    },
    {
      titulo: "Badana Pro",
      precio: "$110.000",
      imagen: "imagenes/badana3.jpg",
    },
    {
      titulo: "Badana Comfort",
      precio: "$85.000",
      imagen: "imagenes/badana4.jpg",
    },
  ],
  jerseys: [
    {
      titulo: "Jersey Pro",
      precio: "$120.000",
      imagen: "imagenes/jersey1.jpg",
    },
    {
      titulo: "Jersey Clásico",
      precio: "$85.000",
      imagen: "imagenes/jersey2.jpg",
    },
    {
      titulo: "Jersey Aero",
      precio: "$140.000",
      imagen: "imagenes/jersey3.jpg",
    },
    {
      titulo: "Jersey MTB",
      precio: "$100.000",
      imagen: "imagenes/jersey4.jpg",
    },
  ],
  accesorios: [
    { titulo: "Casco Trail", precio: "$180.000", imagen: "imagenes/casco.jpg" },
    { titulo: "Gafas Pro", precio: "$60.000", imagen: "imagenes/gafas.jpg" },
    {
      titulo: "Guantes MTB",
      precio: "$45.000",
      imagen: "imagenes/guantes.jpg",
    },
    {
      titulo: "Calcetines MTB",
      precio: "$25.000",
      imagen: "imagenes/calcetines.jpg",
    },
  ],
};

// Función para crear una tarjeta
function crearCard(producto) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.titulo}">
    <div class="card-body">
      <h3 class="card-title">${producto.titulo}</h3>
      <p class="card-price">${producto.precio}</p>
      <button class="btn btn-success btn-sm add-to-cart">Agregar al carrito</button>
    </div>
  `;

  // Evento para agregar al carrito
  card.querySelector(".add-to-cart").addEventListener("click", () => {
    agregarAlCarrito(producto);
  });

  return card;
}

// Función para renderizar tarjetas en cada sección
function renderizarSeccion(id, productosArray) {
  const contenedor = document.querySelector(`#${id} .card-container`);
  productosArray.forEach((producto) => {
    const card = crearCard(producto);
    contenedor.appendChild(card);
  });
}

// Renderizar todas las secciones
renderizarSeccion("bicicletas", productos.bicicletas);
renderizarSeccion("badanas", productos.badanas);
renderizarSeccion("jerseys", productos.jerseys);
renderizarSeccion("accesorios", productos.accesorios);

//Lógica del carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

function calcularTotal() {
  return carrito.reduce((total, item) => {
    const precio = parseInt(item.precio.replace(/\D/g, ""));
    return total + precio;
  }, 0);
}

function actualizarCarrito() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");

  cartCount.textContent = carrito.length;
  cartItems.innerHTML = "";

  if (carrito.length === 0) {
    cartItems.innerHTML =
      '<li><span class="dropdown-item-text">Carrito vacío</span></li>';
    return;
  }

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span class="dropdown-item-text">${item.titulo} - ${item.precio}</span>
    `;
    cartItems.appendChild(li);
  });

  const total = calcularTotal();
  const totalItem = document.createElement("li");
  totalItem.innerHTML = `<span class="dropdown-item-text fw-bold">Total: $${total.toLocaleString()}</span>`;
  cartItems.appendChild(totalItem);
}



// Inicializar carrito al cargar
actualizarCarrito();
