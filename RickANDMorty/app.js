const $contenedorTarjetas = document.querySelector(".contenedor__tarjetas");
const $botonAnterior = document.querySelector(".anterior");
const $inputEspecifico = document.querySelector("#especifico");
const $botonSiguiente = document.querySelector(".siguiente");
const $botonIrPrimera = document.querySelector("#irPrimera");
const $botonIrUltima = document.querySelector("#irUltima");

let paginaActual = 1;
let personajes = [];

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
            personajes = data.results;
            mostrar(personajes);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
//Filtar por genero
function mostrarTarjetasPersonalizadas(genero) {
    if (genero === ""){
        mostrar(personajes);
    }else {
        const personajesFiltrados = personajes.filter(personaje => personaje.gender === genero);
        mostrar(personajesFiltrados);
        if (personajesFiltrados.length === 0) {
            console.log("No hay personajes que cumplan con el filtro.");
        }    
    }
}

//Funciones de Botones {ant, sig, ir ultima, ir primera} pagina
function botonAnteriorClick() {
    paginaActual--;
    actualizarEstadoBotones(paginaActual);
    cargarPagina(paginaActual);
}
function botonSiguienteClick() {
    paginaActual++;
    actualizarEstadoBotones(paginaActual);
    cargarPagina(paginaActual);
}

function botonEspecificoClick() {
    const nuevaPagina = parseInt($inputEspecifico.value);
    if (!isNaN(nuevaPagina) && nuevaPagina >= 1) {
        paginaActual = nuevaPagina;
        actualizarEstadoBotones(paginaActual);
        cargarPagina(paginaActual);
    }
}

function botonIrPrimeraClick() {
    paginaActual = 1;
    actualizarEstadoBotones(paginaActual);
    cargarPagina(paginaActual);
}

function botonIrUltimaClick() {
    const ultimaPagina = 42; // Total de páginas
    paginaActual = ultimaPagina;
    actualizarEstadoBotones(paginaActual);
    cargarPagina(paginaActual);
}
//Habilitar y deshabilitar botones segun corresponda
function actualizarEstadoBotones(paginaActual) {
    if(paginaActual <= 1){
        $botonAnterior.disabled = true;
        $botonIrPrimera.disabled = true;
    } else {
        $botonAnterior.disabled = false;
        $botonIrPrimera.disabled = false;
    }
    if(paginaActual === 42 ){
        $botonSiguiente.disabled = true
        $botonIrUltima.disabled = true
    } else {
        $botonSiguiente.disabled = false
        $botonIrUltima.disabled = false
    }
}
//validar pagina especifica 1--42
function validarInput(input) {
    const valor = parseInt(input.value);
    if (isNaN(valor)) { 
        input.value = "";
    } else {
        input.value = Math.min(Math.max(valor, 1), 42);
    }
}//nose que hace, pero funciona

$botonAnterior.addEventListener("click", botonAnteriorClick);
$botonSiguiente.addEventListener("click", botonSiguienteClick);
$inputEspecifico.addEventListener("change", botonEspecificoClick);
$botonIrPrimera.addEventListener("click", botonIrPrimeraClick);
$botonIrUltima.addEventListener("click", botonIrUltimaClick);

//actualiza el estado de los botones para la primer pagina
actualizarEstadoBotones(paginaActual);
// Cargar la primera página al cargar la página
cargarPagina(paginaActual);