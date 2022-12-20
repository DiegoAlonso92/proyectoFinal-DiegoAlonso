//  Formulario con evento para guardar en LS los datos de nuevos socios.

const myForm = document.querySelector('#my-form');
const inputNumFunc = document.querySelector('#NumFunc');
const inputNombre = document.querySelector('#Nombre')
const inputApellido = document.querySelector('#Apellido');
const inputSucursal = document.querySelector('#Sucursal');
const inputCargo = document.querySelector('#Cargo');
const btnEnviar = document.querySelector('#btnEnviar');

let listaSocios = [];
const listaSociosLS = JSON.parse(localStorage.getItem('listaSocios'));
console.log(listaSociosLS);
if (listaSociosLS !== null) {
    listaSocios = listaSociosLS
}
fetch("/mainjs/socios-activos.json")
    .then(response => response.json())
    .then(data => {
        listaSocios.push(data);
        console.log(listaSocios);
    })

myForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if (inputNumFunc.value === '' || inputNombre.value === '' || inputApellido.value === '' || inputSucursal.value === '' || inputCargo.value === '') {
        return
    }
    const socioRepetido = listaSocios.some((user) => user.numero === inputNumFunc.value);
    if (socioRepetido) {
        alert('Ese número de socio ya está registrado.')
        return
    }
    const socio = {
        numero: inputNumFunc.value,
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        sucursal: inputSucursal.value,
        cargo: inputCargo.value
    }

    listaSocios.push(socio)
    localStorage.setItem('listaSocios', JSON.stringify(listaSocios))
    myForm.reset()
    console.log(listaSocios)
})