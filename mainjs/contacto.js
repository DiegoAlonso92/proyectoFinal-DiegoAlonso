
const myForm = document.querySelector('#myForm');
const inputNumFunc = document.querySelector('#NumFunc');
const inputNombre = document.querySelector('#Nombre')
const inputApellido = document.querySelector('#Apellido');
const inputCargo = document.querySelector('#Cargo');
const inputMail = document.querySelector('#Mail');
const inputTel = document.querySelector('#Tel');
const inputSucursalItaliano = document.querySelector('#SucursalItaliano');
const inputSucursalMillan = document.querySelector('#SucursalMillan');
const inputSucursalCurva = document.querySelector('#SucursalCurva');
const btnEnviar = document.querySelector('#btnEnviar');
const btnReset = document.querySelector('#btnReset');
const parrafoSociosRegistrados = document.querySelector('#ParrafoSociosRegistrados');


if (!localStorage.getItem('listaSocios')) {
    fetch("../mainjs/socios-activos.json")
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('listaSocios', JSON.stringify(data))
            listaSocios = JSON.parse(localStorage.getItem('listaSocios'))
            console.log(listaSocios)
            mostrarSocios()
        })
} else if (localStorage.getItem('listaSocios')) {
    listaSocios = JSON.parse(localStorage.getItem('listaSocios'))
    console.log(listaSocios)
    mostrarSocios()

}

//  Formulario con evento para guardar en LS los datos de nuevos socios.
myForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (inputNumFunc.value === '' || inputNombre.value === '' || inputApellido.value === '' || inputCargo.value === '' || inputMail.value === '' || inputTel.value === '') {
        return
    }
    const socioRepetido = listaSocios.some((user) => user.numero === inputNumFunc.value);
    if (socioRepetido) {
        Swal.fire({
            title: 'Error!',
            text: 'Ese número de socio ya está registrado.',
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: 'red'
        })
        return
    }

    const mailRepetido = listaSocios.some((user) => user.email === inputMail.value);
    if (mailRepetido) {
        Swal.fire({
            title: 'Error!',
            text: 'Ese Email ya se encuentra registrado.',
            icon: 'error',
            confirmButtonText: 'Entendido',
            confirmButtonColor: 'red'
        })
        return
    }

    const crearSocio = (numero, nombre, apellido, sucursal, cargo, email, telefono) => {
        const socio = {
            numero: numero,
            nombre: nombre,
            apellido: apellido,
            sucursal: sucursal,
            cargo: cargo,
            email: email,
            telefono: telefono
        }
        listaSocios.push(socio)
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
                'Socio registrado',
                'Para confirmar que ha sido ingresado correctamente recargue la página, debería figurar como socio registrado.'
            )
            if (inputSucursalItaliano.checked) {
                crearSocio(inputNumFunc.value, inputNombre.value, inputApellido.value, inputSucursalItaliano.value, inputCargo.value, inputMail.value)
            } else if (inputSucursalMillan.checked) {
                crearSocio(inputNumFunc.value, inputNombre.value, inputApellido.value, inputSucursalMillan.value, inputCargo.value, inputMail.value)
            } else if (inputSucursalCurva.checked) {
                crearSocio(inputNumFunc.value, inputNombre.value, inputApellido.value, inputSucursalCurva.value, inputCargo.value, inputMail.value)
            }
            localStorage.setItem('listaSocios', JSON.stringify(listaSocios))
            myForm.reset()
            console.log(listaSocios)


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
    let listaSociosParse = JSON.parse(localStorage.getItem('listaSocios'))
    console.log(listaSociosParse);

    let containerSocios = document.querySelector('#SociosRegistrados')
    listaSociosParse.forEach(socio => {
        containerSocios.innerHTML += `<p>- ${socio.numero} ${socio.nombre} ${socio.apellido}.</p>`
    })
    
    }
    
    
