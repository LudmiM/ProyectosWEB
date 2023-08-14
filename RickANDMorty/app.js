const $contenedorTarjetas = document.querySelector(".contenedor__tarjetas");

function mostrar(array) {
    array.forEach(item => {
        const tarjetaDiv = document.createElement("div");
        tarjetaDiv.classList.add("tarjeta");
        tarjetaDiv.innerHTML = `
            <img src="${item.image}">
            <p>Nombre: ${item.name}</p>
            <p>Género: ${item.gender}</p>
            <p>Especie: ${item.species}</p>
            <p>Estado: ${item.status}</p>
            <p>Origen: ${item.origin.name}</p>
            <p>Localización: ${item.location.name}</p>
        `;
        $contenedorTarjetas.appendChild(tarjetaDiv);
    });
}

fetch("https://rickandmortyapi.com/api/character")
    .then(response => response.json())
    .then(data => {
        const personajes = data.results;
        mostrar(personajes);
    })
    .catch(error => {
        console.error("Error:", error);
    });

/*
    function actualizarBotonesNavegacion() {
        // Obtener el contenedor de los botones de navegación
        var pagination = document.getElementById("pagination");
    
        // Limpiar los botones de navegación
        pagination.innerHTML = "";
    
        // Obtener la lista completa de elementos
        var listaElementos = obtenerListaElementos();
    
        // Obtener la cantidad de filas seleccionada
        var selectElement = document.getElementById("cantFilas");
        var elementosPorPagina = parseInt(selectElement.value);
    
        // Obtener la página actual y la cantidad total de páginas
        var currentPage = parseInt(localStorage.getItem("currentPage")) || 1;
        var totalPages = Math.ceil(listaElementos.length / elementosPorPagina);
    
        // Agregar botón de retroceso
        var backButton = document.createElement("button");
        backButton.innerText = "Anterior";
        backButton.disabled = currentPage === 1;
        backButton.addEventListener("click", function() {
            if (currentPage > 1) {
                currentPage--;
                localStorage.setItem("currentPage", currentPage);
                actualizarTabla();
                actualizarBotonesNavegacion();
            }
        });
        pagination.appendChild(backButton);
    
        // Agregar botón central con puntos suspensivos y label
        if (totalPages > 3) {
            var dotsButton = document.createElement("button");
            dotsButton.className = "dots-button";
            dotsButton.addEventListener("click", function() {
                var inputLabel = document.createElement("input");
                inputLabel.type = "number";
                inputLabel.min = 1;
                inputLabel.max = totalPages;
                inputLabel.value = currentPage;
                inputLabel.addEventListener("keydown", function(event) {
                    if (event.keyCode === 13) { // Presionar Enter
                        var pageNumber = parseInt(this.value);
                        if (pageNumber >= 1 && pageNumber <= totalPages) {
                            currentPage = pageNumber;
                            localStorage.setItem("currentPage", currentPage);
                            actualizarTabla();
                            actualizarBotonesNavegacion();
                        }
                    }
                });
                this.innerHTML = "";
                this.appendChild(inputLabel);
                inputLabel.focus();
            });
            dotsButton.innerText = "...";
            pagination.appendChild(dotsButton);
        }
    
        // Agregar botón de avance
        var nextButton = document.createElement("button");
        nextButton.innerText = "Siguiente";
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener("click", function() {
            if (currentPage < totalPages) {
                currentPage++;
                localStorage.setItem("currentPage", currentPage);
                actualizarTabla();
                actualizarBotonesNavegacion();
            }
        });
        pagination.appendChild(nextButton);
    }
 */   