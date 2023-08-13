let $tarjeta = document.getElementById('tarjeta');

function mostrar(array) {
    for (let i = 0; i < array.length; i++) {
        $tarjeta.innerHTML += `
            <div>
                <img src="${array[i].image}">
                <p>Nombre: ${array[i].name}</p>
                <p>Género: ${array[i].gender}</p>
                <p>Especie: ${array[i].species}</p>
                <p>Estado: ${array[i].status}</p>
                <p>Origen: ${array[i].origin.name}</p>
                <p>Localización: ${array[i].location.name}</p>
            </div>
        `;
    }
}

fetch("https://rickandmortyapi.com/api/character")
    .then(data => {
        return data.json();
    })
    .then(data => {
        let personajes = data.results;
        console.log(personajes);
        mostrar(personajes);
    })
    .catch(error => {
        console.error("Error:", error);
    });
