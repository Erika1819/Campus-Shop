// Función para formatear el precio en COP (Pesos Colombianos)
function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
  }).format(precio);
}

 //Carrito de compras
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
  const ProductoExistente = carrito.find (producto => producto.nombre === nombre);

  if (ProductoExistente){
    ProductoExistente.cantidad++;
  } else {
    carrito.push({nombre, precio, cantidad: 1});
  }
  actualizarCarrito();

}

// Función para actualizar el contenido del carrito
function actualizarCarrito() {
  const carritoItems = document.getElementById('carrito-items');

  carritoItems.innerHTML = '';

  let total = 0;

  // Carrito vacio
  if (carrito.length === 0) {
    carritoItems.innerHTML = '<p>Aún no has agregado productos al carrito.</p>';
  } else {
//Carrito con productos
    carrito.forEach((producto, index) => {
        total += producto.precio * producto.cantidad;
        carritoItems.innerHTML += `
            <div class="cart-item d-flex justify-content-between align-items-center">
                <span>${producto.nombre}</span>
                <span>$${producto.precio}</span>
                <span>
                <button class="btn btn-secondary btn-sm" onclick="modificarCantidad(${index}, -1)">-</button>
                ${producto.cantidad}
                <button class="btn btn-secondary btn-sm" onclick="modificarCantidad(${index}, 1)">+</button>
                </span>
                <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button>
            </div>
            `;
        });
    }
    document.getElementById('total').textContent = total.toFixed(2);
}

// Función para la cantidad de un producto
function modificarCantidad(index, cantidad) {
  const producto = carrito[index];

  // Si la cantidad es negativa, solo decrementamos si es mayor que 1
  if (cantidad < 0 && producto.cantidad > 1) {
    producto.cantidad += cantidad;
  } else if (cantidad > 0) {
    producto.cantidad += cantidad;
  }

  actualizarCarrito();
}

// Función para eliminar producto
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// Función para alternar el menú de navegación en dispositivos móviles
$(document).ready(function() {
  // Detectamos el clic en el botón hamburguesa
  $('.navbar-toggler').click(function() {
    // Alternamos la visibilidad del menú
    $('#navbarSupportedContent').toggleClass('collapse');
  });
});

//variable para mantener el orden
let productosOrdenados = [producto]

//Funcion ordenar productos
function OrdenarProductos(criterio){
  if (criterio ==='nombre'){
    productosOrdenados.sort((a,b) => a.nombre.localeCompare(b.nombre));
    } else if (criterio === 'precio'){
      productosOrdenados.sort((a,b) => a.precio - b.precio);
    }
    agregarAlCarrito();
}

function ordenarPorPrecio() {
  const cards = Array.from(document.querySelectorAll('.col'));
  cards.sort((a, b) => {
    const precioA = parseInt(a.querySelector('.card-text small').textContent.replace('$', '').replace(',', ''));
    const precioB = parseInt(b.querySelector('.card-text small').textContent.replace('$', '').replace(',', ''));
    return precioA - precioB;
  });
  const contenedor = document.querySelector('.row');
  cards.forEach(card => contenedor.appendChild(card));
}
function ordenarPorNombre() {
  const cards = Array.from(document.querySelectorAll('.col'));
  cards.sort((a, b) => {
    const nombreA = a.querySelector('.card-title').textContent.toLowerCase();
    const nombreB = b.querySelector('.card-title').textContent.toLowerCase();
    return nombreA.localeCompare(nombreB);
  });
  const contenedor = document.querySelector('.row');
  cards.forEach(card => contenedor.appendChild(card));
}


