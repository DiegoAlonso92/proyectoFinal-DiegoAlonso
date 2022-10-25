function saludar() {
    alert("bienvenido a nuestra web");
}
saludar();

// la idea es crear un programa interactivo que le solicite al usuario Nombre; Apellido; Numero de funcionario; Si es o no es socio del sindicado; Sucursal donde trabaja; Cargo ejercido y luego mediante un alert le muestre los datos que ingresó.
function solicitarInfo() {
    let nombreIngresado = prompt("Ingresa tu nombre:")
    let apellidoIngresado = prompt("Ingresa tu apellido:")
    let sucursalIngresda = prompt("Ingresa el nombre de la sucursal donde trabajas:")
    let cargoIngresado = prompt("Ingresa el cargo que ejerces:")
    let numFuncionario = prompt("Ingresa tu número de funcionario:")
    let afiliado = prompt("¿Eres afiliado al sindicato? responde con 'si / no':")
    if (afiliado != "si") {
        alert("Si te interesa ser parte de nuestro sindicato contacta a un integrante de nuestra mesa")
    }

    let mostrarInfo = alert("Estos fueron los datos ingresados:                                                     " + "Nombre: " + nombreIngresado + "      " + "Apellido: " + apellidoIngresado + "      " + "Sucursal: " + sucursalIngresda + "      " + "Cargo: " + cargoIngresado + "      " + "Numero de funcionario: " + numFuncionario)
}

solicitarInfo()
mostrarInfo();