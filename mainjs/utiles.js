
const myFormUtiles = document.querySelector('#myFormUtiles');
const inputNumFuncUtiles = document.querySelector('#NumFuncUtiles');
const inputEdad = document.querySelector('#Edad');
const inputJardin = document.querySelector('#Jardín');
const inputPrimaria = document.querySelector('#Primaria');
const inputSecCicloBas = document.querySelector('#SecundariaCicloBasico');
const inputSecBachi = document.querySelector('#SecundariaBachillerato');
const inputBtnEnviarUtiles = document.querySelector('#btnEnviarUtiles');
const btnResetCanUtiles = document.querySelector('#btnResetCanUtiles');


if (!localStorage.getItem('listaSocios')) {
    fetch("../mainjs/socios-activos.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('listaSocios', JSON.stringify(data))
            listaSocios = JSON.parse(localStorage.getItem('listaSocios'))
            console.log(listaSocios)
        })
} else if (localStorage.getItem('listaSocios')) {
    listaSocios = JSON.parse(localStorage.getItem('listaSocios'))
    console.log(listaSocios)
}

if (!localStorage.getItem('listaUtiles')) {
    fetch("../mainjs/utiles-confirmados.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('listaUtiles', JSON.stringify(data))
            listaUtiles = JSON.parse(localStorage.getItem('listaUtiles'))
            console.log(listaUtiles)
        })
} else if (localStorage.getItem('listaUtiles')) {
    listaUtiles = JSON.parse(localStorage.getItem('listaUtiles'))
    console.log(listaUtiles)
}

myFormUtiles.addEventListener('submit', (event) => {
    event.preventDefault()
    if (inputNumFuncUtiles.value === '') {
        return
    }

    const socioRegistrado = listaSocios.some((user) => user.numero === inputNumFuncUtiles.value);
    if (!socioRegistrado) {
        Swal.fire({
            title: 'Error!',
            text: 'Ese número de socio no está activo.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })
        return
    }

    const socioRepetido = listaUtiles.some((user) => user.numero === inputNumFuncUtiles.value);

    if (socioRepetido) {
        Swal.fire({
            title: 'Error!',
            text: 'Ese número de socio ya ha solicitado el  beneficio.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })
        return
    }

    
    const crearSocio = (numero, nivel_de_estudio, edad) => {
        const socio = {
            numero: numero,
            nivel_de_estudio: nivel_de_estudio,
            edad: edad
        }
        listaUtiles.push(socio)
    }

    if (inputJardin.checked) {
        crearSocio(inputNumFuncUtiles.value, inputJardin.value, inputEdad.value)
    } else if (inputPrimaria.checked) {
        crearSocio(inputNumFuncUtiles.value, inputPrimaria.value, inputEdad.value)
    } else if (inputSecCicloBas.checked) {
        crearSocio(inputNumFuncUtiles.value, inputSecCicloBas.value, inputEdad.value)
    } else if (inputSecBachi.checked) {
        crearSocio(inputNumFuncUtiles.value, inputSecBachi.value, inputEdad.value)
    }
    localStorage.setItem('listaUtiles', JSON.stringify(listaUtiles))
    myFormUtiles.reset()
    console.log(listaUtiles)
})
// Agregar un fetch que permita corroborar si el numero de socio se encuentra en la lista de socios activos.
