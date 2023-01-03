
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
            mostrarSocios()
        })
} else if (localStorage.getItem('listaCanasta')) {
    listaCanasta = JSON.parse(localStorage.getItem('listaCanasta'))
    console.log(listaCanasta)
    mostrarSocios()
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
            confirmButtonText: 'Entendido',
            confirmButtonColor: 'red'
        })
        return
    }

    const socioRepetido = listaCanasta.some((user) => user.numero === inputNumFuncCan.value);

    if (socioRepetido) {
        Swal.fire({
            title: 'Error!',
            text: 'Ese número de socio ya ha solicitado la canasta.',
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: 'red'
        })
        return
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
        title: 'Confirma la solicitud?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                'Solicitud realizada.',
                'Para confirmar que su solicitud ha sido ingresada correctamente recargue la página, debería figurar en la lista de solicitudes confirmadas.'
            )
            const socio = {
                numero: inputNumFuncCan.value,
                nombre_de_recien_nacido: inputNombreBebe.value,
                apellidos_de_recien_nacido: inputApellidosBebe.value,
            }
            listaCanasta.push(socio)
            localStorage.setItem('listaCanasta', JSON.stringify(listaCanasta))
            myFormCanasta.reset()
            console.log(listaCanasta)
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelar',
                'La solicitud ha sido cancelada.'
            )
        }
    })
    
})


function mostrarSocios() {
    let listaCanastaParse = JSON.parse(localStorage.getItem('listaCanasta'))
    console.log(listaCanastaParse);

    let containerCanasta = document.querySelector('#Solicitudes')
    listaCanastaParse.forEach(socio => {
        containerCanasta.innerHTML += `<p>- el número de socio: ${socio.numero}, ha solicitado una canasta para recién nacidos a nombre de ${socio.nombre_de_recien_nacido} ${socio.apellidos_de_recien_nacido}.</p>`
    })
    }
    
