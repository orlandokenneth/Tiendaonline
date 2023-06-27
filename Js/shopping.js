$(document).ready(function() {
  var totalCantidad = 0;
  var totalPrecio = 0.00;

  $(".agregar-btn").click(function() {
    var nombre = $(this).data("nombre");
    var precio = parseFloat($(this).data("precio"));
    var existeProducto = false;
    
    // Verificar si el producto ya existe en el carrito
    $("#carrito tbody tr").each(function() {
      if ($(this).find("td:nth-child(1)").text() === nombre) {
        var cantidad = parseInt($(this).find("td:nth-child(2)").text());
        var nuevoCantidad = cantidad + 1;
        $(this).find("td:nth-child(2)").text(nuevoCantidad);
        actualizarTotal();
        existeProducto = true;
        return false; // Salir del bucle each
      }
    });
    
    // Si el producto no existe, agregar una nueva fila
    if (!existeProducto) {
      totalCantidad++;
      totalPrecio += precio;

      var itemHTML = '<tr>' +
        '<td>' + nombre + '</td>' +
        '<td style="text-align: center;"  class="cantidad">' + 1 + '</td>' +
        '<td style="text-align: center;">Q.' + precio.toFixed(2) + '</td>' +
        '<td><i style="cursor: pointer;" class="fa-solid fa-trash-can text-danger eliminar-btn"></i></td>' +
        '</tr>';

      $("#carrito tbody").append(itemHTML);
      actualizarTotal();
    }
  });

  $("#carrito").on("click", ".eliminar-btn", function() {
    var fila = $(this).closest("tr");
    var cantidad = parseInt(fila.find(".cantidad").text());
    var precio = parseFloat(fila.find("td:nth-child(3)").text().substring(2));

    totalCantidad -= cantidad;
    totalPrecio -= precio;
    fila.remove();
    actualizarTotal();

    mostrarAlertaBootstrap();
    
    
  });

  $("#carrito").on("input", ".cantidad", function() {
    var fila = $(this).closest("tr");
    var cantidad = parseInt($(this).text());
    var precio = parseFloat(fila.find("td:nth-child(3)").text().substring(2));
    var subtotal = cantidad * precio;

    fila.find("td:nth-child(3)").text("Q." + subtotal.toFixed(2));
    actualizarTotal();
  });

  function actualizarTotal() {
    var nuevaTotalCantidad = 0;
    var nuevacantidadproductos = 0.00;
    var nuevaTotalPrecio = 0.00;
    var nuevaTotalPrecio2 = 0.00;

    $("#carrito tbody tr").each(function() {
      var cantidad = parseInt($(this).find(".cantidad").text());
      var precio = parseFloat($(this).find("td:nth-child(3)").text().substring(2));

      nuevaTotalCantidad += cantidad;
      nuevacantidadproductos += cantidad;
      nuevaTotalPrecio += cantidad * precio;
      nuevaTotalPrecio2 += cantidad * precio;
    });

    totalCantidad = nuevaTotalCantidad;
    cantidadproductos = nuevacantidadproductos;
    totalPrecio = nuevaTotalPrecio;
    totalPrecio2 = nuevaTotalPrecio2;

    $("#total-cantidad").text(totalCantidad);
    $("#cantidad-productos").text(cantidadproductos);
    $("#total-precio").text(totalPrecio.toFixed(2));
    $("#total-precio2").text(totalPrecio2.toFixed(2));

    calcularTotal();
  }
});

