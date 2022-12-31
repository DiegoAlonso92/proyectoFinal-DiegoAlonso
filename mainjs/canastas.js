
const myFormCanasta = document.querySelector('#myFormCanasta');
const inputNumFuncCan = document.querySelector('#NumFuncCan');
const inputNombreBebe = document.querySelector('#NombreBebe');
const inputApellidosBebe = document.querySelector('#ApellidosBebe');
const btnEnviarCan = document.querySelector('#btnEnviarCan');
const btnResetCan = document.querySelector('#btnResetCan');

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


if (!localStorage.getItem('listaCanasta')) {
    fetch("../mainjs/canastas-confirmadas.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('listaCanasta', JSON.stringify(data))
            listaCanasta = JSON.parse(localStorage.getItem('listaCanasta'))
            console.log(listaCanasta)
        })
} else if (localStorage.getItem('listaCanasta')) {
    listaCanasta = JSON.parse(localStorage.getItem('listaCanasta'))
    console.log(listaCanasta)
}


myFormCanasta.addEventListener('submit', (event) => {
    event.preventDefault()

    if (inputNumFuncCan.value === '' || inputNombreBebe.value === '' || inputApellidosBebe.value === '') {
        return
    }

    const socioRegistrado = listaSocios.some((user) => user.numero === inputNumFuncCan.value);
    if (!socioRegistrado) {
        Swal.fire({
            title: 'Error!',
            text: 'Ese número de socio no está activo.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })
        return
    }

    const socioRepetido = listaCanasta.some((user) => user.numero === inputNumFuncCan.value);

    if (socioRepetido) {
        Swal.fire({
            title: 'Error!',
            text: 'Ese número de socio ya ha solicitado la canasta.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })
        return
    }
    const socio = {
        numero: inputNumFuncCan.value,
        nombre_de_recien_nacido: inputNombreBebe.value,
        apellidos_de_recien_nacido: inputApellidosBebe.value,
    }
    listaCanasta.push(socio)
    localStorage.setItem('listaCanasta', JSON.stringify(listaCanasta))
    myFormCanasta.reset()
    console.log(listaCanasta)
})
// Agregar un fetch que permita corroborar si el numero de socio se encuentra en la lista de socios activos.
