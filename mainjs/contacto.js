
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


fetch("../mainjs/socios-activos.json")
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('listaSocios', JSON.stringify(data))
        listaSocios = JSON.parse(localStorage.getItem('listaSocios'))
        console.log(listaSocios)
    })
    

    
    //  Formulario con evento para guardar en LS los datos de nuevos socios.
myForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (inputNumFunc.value === '' || inputNombre.value === '' || inputApellido.value === '' || (inputSucursalItaliano.value === '' || inputSucursalMillan.value === '' || inputSucursalCurva.value === '') || inputCargo.value === '' || inputMail.value === '' || inputTel.value === '') {
        return
    }
    const socioRepetido = listaSocios.some((user) => user.numero === inputNumFunc.value);
    if (socioRepetido) {
        Swal.fire({
            title: 'Error!',
            text: 'Ese número de socio ya está registrado.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })
        return
    }

    const mailRepetido = listaSocios.some((user) => user.email === inputMail.value);
    if (mailRepetido) {
        Swal.fire({
            title: 'Error!',
            text: 'Ese Email ya se encuentra registrado.',
            icon: 'error',
            confirmButtonText: 'Entendido'
        })
        return
    }


    const socio = {
        numero: inputNumFunc.value,
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        sucursal: (inputSucursalItaliano.value || inputSucursalMillan || inputSucursalCurva),
        cargo: inputCargo.value,
        email: inputMail.value,
        telefono: inputTel.value
    }
    listaSocios.push(socio)
    localStorage.setItem('listaSocios', JSON.stringify(listaSocios))
    myForm.reset()
    console.log(listaSocios)
})
