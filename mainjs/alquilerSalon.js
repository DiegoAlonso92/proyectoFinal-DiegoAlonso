
const myFormSalon = document.querySelector('#myFormSalon');
const inputNumFunSalon = document.querySelector('#NumFuncSalon');
const inputNombreSalon = document.querySelector('#Nombre');
const inputApellidoSalon = document.querySelector('#Apellido');
const inputMailSalon = document.querySelector('#Mail');
const inputTelSalon = document.querySelector('#Tel');
const inputFechaSalon = document.querySelector('#Fecha');
const btnEnviarSalon = document.querySelector('#btnEnviarSalon');
const btnResetSalon = document.querySelector('#btnResetSalon');

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


if (!localStorage.getItem('listaAlqSalon')) {
    fetch("../mainjs/reservas-salon.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('listaAlqSalon', JSON.stringify(data))
            listaAlqSalon = JSON.parse(localStorage.getItem('listaAlqSalon'))
            console.log(listaAlqSalon)
        })
} else if (localStorage.getItem('listaAlqSalon')) {
    listaAlqSalon = JSON.parse(localStorage.getItem('listaAlqSalon'))
    console.log(listaAlqSalon)
}


myFormSalon.addEventListener('submit', (event) => {
    event.preventDefault()

    if (inputNumFunSalon.value === '' || inputNombreSalon.value === '' || inputApellidoSalon.value === '' || inputMailSalon.value === '' || inputTelSalon.value === '' || inputFechaSalon.value === '') {
        return
    }

    const socioRegistrado = listaSocios.some((user) => user.numero === inputNumFunSalon.value);
    if (!socioRegistrado) {
        Swal.fire({
            title: 'Error!',
            text: 'Ese número de socio no está activo.',
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: 'red'
        })
        return
    }

    const socioRepetido = listaAlqSalon.some((user) => user.numero === inputNumFunSalon.value);

    if (socioRepetido) {
        Swal.fire({
            title: 'Error!',
            text: 'Ese número de socio ya tiene una reserva.',
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: 'red'
        })
        return
    }
    const socio = {
        numero: inputNumFunSalon.value,
        nombre: inputNombreSalon.value,
        apellido: inputApellidoSalon.value,
        mail: inputMailSalon.value,
        telefono: inputTelSalon.value,
        reserva: inputFechaSalon.value
    }
    listaAlqSalon.push(socio)
    localStorage.setItem('listaAlqSalon', JSON.stringify(listaAlqSalon))
    myFormSalon.reset()
    console.log(listaAlqSalon)
})
