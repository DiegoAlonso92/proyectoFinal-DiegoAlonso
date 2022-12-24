
const myFormCanasta = document.querySelector('#myFormCanasta');
const inputNumFuncCan = document.querySelector('#NumFuncCan');
const inputNombreBebe = document.querySelector('#NombreBebe');
const inputApellidosBebe = document.querySelector('#ApellidosBebe');
const btnEnviarCan = document.querySelector('#btnEnviarCan');
let listaCanasta = [];
let listaCanastaLS = JSON.parse(localStorage.getItem('listaCanasta'));
let listaSocios = JSON.parse(localStorage.getItem('listaSocios'));
if (listaCanasta.length === 0 && listaCanastaLS !== null) {
    listaCanasta = listaCanastaLS
}
console.log(listaSocios);
console.log(listaCanasta);


myFormCanasta.addEventListener('submit', (event) => {
    event.preventDefault()
    if (inputNumFuncCan.value === '' || inputNombreBebe.value === '' || inputApellidosBebe.value === '') {
        return
    }
    
    const socioRegistrado = listaSocios.some((user) => user.numero === inputNumFuncCan.value);
    if (!socioRegistrado) {
        alert('Ese número de socio no está activo.')
        return
    }

    const socioRepetido = listaCanasta.some((user) => user.numero === inputNumFuncCan.value);
    
    if (socioRepetido) {
        alert('Ese número de socio ya ha solicitado la canasta.')
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
