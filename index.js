document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el primer swiper (slider grande)
    var swiper1 = new Swiper('.mySwiper-1', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
  
    // Inicializar los demás swipers (sliders pequeños)
    var swipers = document.querySelectorAll('.myswiper-2');
    swipers.forEach(function (swiper, index) {
        new Swiper(swiper, {
            navigation: {
                nextEl: '#swiper' + (index + 1) + ' .swiper-button-next',
                prevEl: '#swiper' + (index + 1) + ' .swiper-button-prev',
            },
        });
    });
  });
  // js de carrito
  let carrito = [];
  let total = 0;
  
  function agregarAlCarrito(nombre, precio) {
      carrito.push({ nombre, precio });
      total += precio;
      actualizarCarrito();
  }
  
  function actualizarCarrito() {
      const carritoLista = document.getElementById('carrito-lista');
      const totalElemento = document.getElementById('total');
      
      carritoLista.innerHTML = '';
      
      carrito.forEach(producto => {
          const item = document.createElement('li');
          item.textContent = `${producto.nombre} - $${producto.precio}`;
          carritoLista.appendChild(item);
      });
      
      totalElemento.textContent = `Total: $${total}`;
  }
  
  
    
    