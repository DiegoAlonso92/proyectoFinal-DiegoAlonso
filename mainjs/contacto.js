//  Formulario con evento para guardar en LS los datos de nuevos socios.

const myForm = document.querySelector('#my-form')
const inputNumFunc = myForm.querySelector('#NumFunc')
const inputNombre = myForm.querySelector('#Nombre')
const inputApellido = myForm.querySelector('#Apellido')
const inputSucursal = myForm.querySelector('#Sucursal')
const inputCargo = myForm.querySelector('#Cargo')


const listaSocios = []

myForm.addEventListener('submit',(event) => {
    event.preventDefault()

    if (inputNumFunc.value === '' || inputNombre.value === '' || inputApellido.value === '' || inputSucursal.value === '' || inputCargo.value === '') {
        return
    }
    
    const socioRepetido = listaSocios.some((user) => user.numero === inputNumFunc.value)

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
myForm.reset()
console.log(listaSocios)
})