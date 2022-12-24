//  Formulario con evento para guardar en LS los datos de nuevos socios.
const myForm = document.querySelector ('#my-form');
const inputNumFunc = document.querySelector('#NumFunc');
const inputNombre = document.querySelector('#Nombre')
const inputApellido = document.querySelector('#Apellido');
const inputSucursal = document.querySelector('#Sucursal');
const inputCargo = document.querySelector('#Cargo');
const btnEnviar = document.querySelector('#btnEnviar');
// todo lo que almacenemos en local storage será guardado como string. 
// (setitem es para guardar, getitem es para obtener la información que está guardada en LS).
// JSON permite convertir los objetos a texto plano o string.
//(JSON.stringfy() permite convertir un objeto o array a string )
let listaSocios = [];
let listaSociosLS = JSON.parse(localStorage.getItem('listaSocios'));
if (listaSocios.length === 0) {
    listaSocios = listaSociosLS
}
console.log(listaSocios);

if (listaSocios.length === 0){
fetch("/mainjs/socios-activos.json")
    .then(response => response.json())
    .then(data => {        
        localStorage.setItem ('listaSocios', JSON.stringify(data))
        const dataEnLs = JSON.parse(localStorage.getItem('listaSocios'))
    })
}


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

// const myFormCanasta = document.querySelector('#my-form-canasta');
// const inputNumFuncCan = document.querySelector('#NumFuncCan');
// const inputNombreBebe = document.querySelector('#NombreBebe');
// const inputApellidosBebe = document.querySelector('#ApellidosBebe');
// const btnEnviarCan = document.querySelector('#btnEnviarCan');

// let listaCanasta = [];
// let listaCanastaLS = JSON.parse(localStorage.getItem('listaCanasta'));
// if (listaCanasta.length === 0) {
//     listaCanasta = listaCanastaLS
// }
// console.log(myFormCanasta);
    

// myFormCanasta.addEventListener('submit', (event) => {
//     event.preventDefault()
//     if (inputNumFuncCan.value === '' || inputNombreBebe.value === '' || inputApellidosBebe.value === '') {
//         return
//     }
//     const socioRepetido = listaCanasta.some((user) => user.numero === inputNumFuncCan.value);
    
//     if (socioRepetido) {
//         alert('Ese número de socio ya ha solicitado la canasta.')
//         return
//     }
//     const socio = {
//         numero: inputNumFuncCan.value,
//         nombre_de_recien_nacido: inputNombreBebe.value,
//         apellidos_de_recien_nacido: inputApellidosBebe.value,
//     }
//     listaCanasta.push(socio)
//     localStorage.setItem('listaCanasta', JSON.stringify(listaCanasta))
//     myForm.reset()
//     console.log(listaCanasta)
// })
// Agregar un fetch que permita corroborar si el numero de socio se encuentra en la lista de socios activos.
