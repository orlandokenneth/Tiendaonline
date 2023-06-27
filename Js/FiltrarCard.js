const selectElement = document.getElementById('orden-select2');
const cardsContainer = document.getElementById('cards-container');

selectElement.addEventListener('change', function () {
    const selectedValue = selectElement.value;
    const cards = Array.from(cardsContainer.getElementsByClassName('card'));

    cards.sort(function (a, b) {
        if (selectedValue === 'precio-asc') {
            const aValue = parseInt(a.getAttribute('data-precio'));
            const bValue = parseInt(b.getAttribute('data-precio'));

            return aValue - bValue;
        } else if (selectedValue === 'precio-desc') {
            const aValue = parseInt(a.getAttribute('data-precio'));
            const bValue = parseInt(b.getAttribute('data-precio'));

            return bValue - aValue;
        } else if (selectedValue === 'alfabetico') {
            const aValue = a.getAttribute('data-nombre');
            const bValue = b.getAttribute('data-nombre');

            return aValue.localeCompare(bValue);
        } else {
            return 0;
        }
    });

    // Eliminar las tarjetas existentes del contenedor
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.firstChild);
    }

    // Volver a agregar las tarjetas ordenadas al contenedor
    cards.forEach(function (card, index) {
        cardsContainer.appendChild(card);

        // Establecer el ancho máximo de las tarjetas para mostrar tres por fila
        card.style.maxWidth = `${Math.floor(cardsContainer.clientWidth / 3) - 20}px`; // Resta 10 píxeles para dejar un espacio entre las tarjetas
        card.style.marginRight = '20px'; // Agrega un margen derecho de 10 píxeles entre las tarjetas
    });

    // Establecer el estilo flexbox para mostrar tres tarjetas por fila
    cardsContainer.style.display = 'flex';
    cardsContainer.style.justifyContent = 'center';
    cardsContainer.style.flexWrap = 'wrap';
});



