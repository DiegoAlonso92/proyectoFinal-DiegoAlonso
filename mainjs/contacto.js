//  Formulario con evento para guardar en LS los datos de nuevos socios.
const myForm = document.querySelector('#myForm');
const inputNumFunc = document.querySelector('#NumFunc');
const inputNombre = document.querySelector('#Nombre')
const inputApellido = document.querySelector('#Apellido');
const inputSucursal = document.querySelector('#Sucursal');
const inputCargo = document.querySelector('#Cargo');
const inputMail = document.querySelector('#Mail');
const inputTel = document.querySelector('#Tel');
const btnEnviar = document.querySelector('#btnEnviar');
// todo lo que almacenemos en local storage será guardado como string. 
// (setitem es para guardar, getitem es para obtener la información que está guardada en LS).
// JSON permite convertir los objetos a texto plano o string.
//(JSON.stringfy() permite convertir un objeto o array a string )



const listaSocios = JSON.parse(localStorage.getItem('listaSocios'));
const listaSociosLS = JSON.parse(localStorage.getItem('listaSocios'));

        fetch("/mainjs/socios-activos.json")
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('listaSocios', JSON.stringify(data))
                JSON.parse(localStorage.getItem('listaSocios'))
            })

console.log(listaSocios);



myForm.addEventListener('submit', (event) => {
    event.preventDefault()

    if (inputNumFunc.value === '' || inputNombre.value === '' || inputApellido.value === '' || inputSucursal.value === '' || inputCargo.value === '' || inputMail.value === '' || inputTel.value === '') {
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
        sucursal: inputSucursal.value,
        cargo: inputCargo.value,
        email: inputMail.value,
        telefono: inputTel.value
    }
    listaSocios.push(socio)
    localStorage.setItem('listaSocios', JSON.stringify(listaSocios))
    myForm.reset()
    console.log(listaSocios)
})
