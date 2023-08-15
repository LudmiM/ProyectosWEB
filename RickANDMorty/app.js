const $contenedorTarjetas = document.querySelector(".contenedor__tarjetas");
const $botonAnterior = document.querySelector(".anterior");
const $inputEspecifico = document.querySelector("#especifico");
const $botonSiguiente = document.querySelector(".siguiente");
const $botonIrPrimera = document.querySelector("#irPrimera");
const $botonIrUltima = document.querySelector("#irUltima");

let paginaActual = 1;

function mostrar(array) {
    $contenedorTarjetas.innerHTML = ""; // Limpiar el contenido actual

    array.forEach(item => {
        const tarjetaDiv = document.createElement("div");
        tarjetaDiv.classList.add("tarjeta");
        tarjetaDiv.innerHTML = `
            <img src="${item.image}">
            <div class="datos">
                <p>Nombre: ${item.name}</p>
                <p>Género: ${item.gender}</p>
                <p>Especie: ${item.species}</p>
                <p>Estado: ${item.status}</p>
                <p>Origen: ${item.origin.name}</p>
                <p>Localización: ${item.location.name}</p>
            </div>
        `;
        $contenedorTarjetas.appendChild(tarjetaDiv);
    });
}

function cargarPagina(pagina) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${pagina}`)
        .then(response => response.json())
        .then(data => {
            const personajes = data.results;
            mostrar(personajes);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

function botonAnteriorClick() {
    if (paginaActual > 1) {
        paginaActual--;
        cargarPagina(paginaActual);
    }else{
        $botonAnterior.disabled = true;
    }
}

function botonSiguienteClick() {
    paginaActual++;
    cargarPagina(paginaActual);
}

function botonEspecificoClick() {
    const nuevaPagina = parseInt($inputEspecifico.value);
    if (!isNaN(nuevaPagina) && nuevaPagina >= 1) {
        paginaActual = nuevaPagina;
        cargarPagina(paginaActual);
    }
}

function botonIrPrimeraClick() {
    paginaActual = 1;
    cargarPagina(paginaActual);
    
}

function botonIrUltimaClick() {
    const ultimaPagina = 42; // Total de páginas
    paginaActual = ultimaPagina;
    cargarPagina(paginaActual);
    
}

$botonAnterior.addEventListener("click", botonAnteriorClick);
$botonSiguiente.addEventListener("click", botonSiguienteClick);
$inputEspecifico.addEventListener("change", botonEspecificoClick);
$botonIrPrimera.addEventListener("click", botonIrPrimeraClick);
$botonIrUltima.addEventListener("click", botonIrUltimaClick);

// Cargar la primera página al cargar la página
cargarPagina(paginaActual);
