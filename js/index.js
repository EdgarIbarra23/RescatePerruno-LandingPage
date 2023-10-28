// Año Correspondiente del Copyright
const año = new Date().getFullYear();
// document.getElementById("año").textContent = año;

// Manejo del Icono del Toggle
const toggle = document.getElementById("toggle");
let isChecked = false;

toggle.addEventListener("click", function(){
    const iconToggle = document.getElementById("iconToggle");
    const icono = document.createElement("i");
    isChecked = !isChecked;

    if (isChecked){
        icono.classList.add("fa-solid", "fa-xmark");
        iconToggle.textContent = '';
        iconToggle.appendChild(icono);
    } else {
        icono.classList.add("fa-solid", "fa-bars");
        iconToggle.textContent = '';
        iconToggle.appendChild(icono);
    }
})

// URLs de APIs
const urlUsers = "https://randomuser.me/api/?results=5";
const urlPaises = "https://restcountries.com/v3.1/all";

// ----------------------------------------------------------------------------
// Llamar a la Random User API
const getApiUsers = async(URL) => {
    try {
        const respuesta = await fetch(URL)
        const data = await respuesta.json();
        return data.results;
    } catch (err) {
        console.log(err)
    }
}

// Llamar a la API de Paises "restcountries"
const getApiPaises = async(URL) => {
    try {
        const respuesta = await fetch(URL)
        const data = await respuesta.json();
        return data;
    } catch (err) {
        console.log(err)
    }
}

// ----------------------------------------------------------------------------
// Crear la Card del Usuario
const allPersonal = document.getElementById("all-personal");
const createUsers = (user) => {
    const personal = document.createElement("div");
    personal.classList.add("personal");

    const image = document.createElement("img");
    image.src = user.picture.large;
    image.alt = user.name.first + ' ' + user.name.last;

    const name = document.createElement("h4");
    name.textContent = user.name.first + ' ' + user.name.last;

    personal.appendChild(image);
    personal.appendChild(name);

    allPersonal.appendChild(personal);
}

// Crear los Option de los Paises
const paises = document.getElementById("paises");
const createPaises = (countries) => {
    const option = document.createElement("option");
    option.value = countries.name.common;
    option.textContent = countries.name.common;
    paises.appendChild(option);
}

// ----------------------------------------------------------------------------
// Colocar la Card con info de la API al DOM
const getUsers = async () => {
    const users = await getApiUsers(urlUsers)
    users.map( user => createUsers(user));
}
window.addEventListener("DOMContentLoaded", getUsers);

// Colocar los Option al Select del DOM
const getPaises = async () => {
    const paises = await getApiPaises(urlPaises);

    if (paises) {
        // Para ordenar los elementos del abecedario
        paises.sort((a, b) => a.name.common.localeCompare(b.name.common));
        paises.forEach((pais) => createPaises(pais));
    }
}

window.addEventListener("DOMContentLoaded", getPaises);





