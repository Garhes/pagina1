document.addEventListener("DOMContentLoaded", function() {
    const botonAgregar = document.getElementById("agregar-carrito");
    const botonPagar = document.querySelector(".btn-pagar");
	botonPagar.addEventListener("click", function() {
		// Redireccionar a la página de pago
		window.location.href = "zona de compra.html";
	});
    const botonEliminarTodos = document.getElementById("eliminar-todos");
    const carrito = document.getElementById("carrito");
    const contenedorCarrito = document.querySelector(".carrito-items");
    const carritoTotal = document.querySelector(".carrito-precio-total");

    botonAgregar.addEventListener("click", function() {
        const colorSeleccionado = document.getElementById("colour").value;
        const tallaSeleccionada = document.getElementById("size").value;
        const cantidadSeleccionada = document.querySelector(".input-quantity").value;

        const producto = {
            color: colorSeleccionado,
            talla: tallaSeleccionada,
            cantidad: cantidadSeleccionada,
            imagen: "Imagenes/slider 1.jpg" // Ruta de la imagen del producto
        };

        agregarAlCarrito(producto);
    });

    botonPagar.addEventListener("click", function() {
        alert("¡Vamos a pagar!");
        vaciarCarrito();
    });

    botonEliminarTodos.addEventListener("click", function() {
        vaciarCarrito();
    });

    contenedorCarrito.addEventListener("click", function(event) {
        if (event.target.classList.contains("btn-eliminar")) {
            const itemAEliminar = event.target.closest(".carrito-item");
            eliminarDelCarrito(itemAEliminar);
        }
    });

    function agregarAlCarrito(producto) {
        const nuevoItemCarrito = document.createElement("div");
        nuevoItemCarrito.classList.add("carrito-item");
        nuevoItemCarrito.innerHTML = `
            <img src="${producto.imagen}" width="80px" alt="producto">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">Producto</span>
                <div class="selector-cantidad">
                    <input type="text" value="${producto.cantidad}" class="carrito-item-cantidad" disabled>
                </div>
                <span class="carrito-item-precio">$95.00</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        `;
        contenedorCarrito.appendChild(nuevoItemCarrito);
        actualizarTotalCarrito();
        mostrarCarrito(); // Mostrar el carrito después de agregar un producto
        guardarCarritoEnLocalStorage();
    }

    function eliminarDelCarrito(item) {
        contenedorCarrito.removeChild(item);
        actualizarTotalCarrito();
        guardarCarritoEnLocalStorage();
        if (contenedorCarrito.children.length === 0) {
            ocultarCarrito(); // Ocultar el carrito si ya no hay productos en él
        }
    }

    function vaciarCarrito() {
        while (contenedorCarrito.firstChild) {
            contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        }
        actualizarTotalCarrito();
        guardarCarritoEnLocalStorage();
        ocultarCarrito(); // Ocultar el carrito al vaciarlo
    }

    function actualizarTotalCarrito() {
        let total = 0;
        const itemsCarrito = contenedorCarrito.querySelectorAll(".carrito-item");
        itemsCarrito.forEach(function(item) {
            const precioItem = parseFloat(item.querySelector(".carrito-item-precio").textContent.replace("$", ""));
            const cantidadItem = parseFloat(item.querySelector(".carrito-item-cantidad").value);
            total += precioItem * cantidadItem;
        });
        carritoTotal.textContent = `$${total.toFixed(2)}`;
    }

    function mostrarCarrito() {
        carrito.style.display = "block";
    }

    function ocultarCarrito() {
        carrito.style.display = "none";
    }

    function guardarCarritoEnLocalStorage() {
        const itemsCarrito = contenedorCarrito.innerHTML;
        localStorage.setItem('carrito', itemsCarrito);
    }

    function obtenerCarritoDesdeLocalStorage() {
        const itemsCarrito = localStorage.getItem('carrito');
        if (itemsCarrito && itemsCarrito.trim() !== "") {
            contenedorCarrito.innerHTML = itemsCarrito;
            actualizarTotalCarrito();
            mostrarCarrito(); // Mostrar el carrito al cargarlo desde el almacenamiento local
        }
    }

    // Llamar a esta función al cargar la página para obtener el carrito del LocalStorage
    obtenerCarritoDesdeLocalStorage();
});

// Función para eliminar un solo producto del carrito
function eliminarProductoDelCarrito(index) {
    const contenedorCarrito = document.querySelector(".carrito-items");
    const itemsCarrito = contenedorCarrito.querySelectorAll(".carrito-item");
    
    if (index >= 0 && index < itemsCarrito.length) {
        contenedorCarrito.removeChild(itemsCarrito[index]);
        guardarCarritoEnLocalStorage();
        actualizarTotalCarrito();
        if (contenedorCarrito.children.length === 0) {
            ocultarCarrito(); // Ocultar el carrito si ya no hay productos en él
        }
    }
}
