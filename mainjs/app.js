function saludar() {
    alert("bienvenido a nuestra web");
}
saludar();



//Ver como queda mejor, this.numFuncionario = parseFloat (numFuncionario);
class socioNum { 
    constructor (nombreIngresado, apellidoIngresado, sucursalIngresda, cargoIngresado, afiliado) {
        this.nombreIngresado = nombreIngresado,
        this.apellidoIngresado = apellidoIngresado,
        this.sucursalIngresda = sucursalIngresda,
        this.cargoIngresado = cargoIngresado,
        this.afiliado = afiliado
    }
}
    const listaSocios = [];
    function ingresarSocio (socioNum) {
        listaSocios.push(new parseFloat (socioNum ()))
    }
    
// la idea es crear un programa interactivo que le solicite al usuario Nombre; Apellido; Numero de funcionario; Si es o no es socio del sindicado; Sucursal donde trabaja; Cargo ejercido y luego mediante un alert le muestre los datos que ingresó.




let numFuncionario = prompt("Ingresa tu número de funcionario:");
let nombreIngresado = prompt("Ingresa tu nombre:");
let apellidoIngresado = prompt("Ingresa tu apellido:");
let sucursalIngresda = prompt("Ingresa el nombre de la sucursal donde trabajas:");
let cargoIngresado = prompt("Ingresa el cargo que ejerces:");
let afiliado = prompt("¿Eres afiliado al sindicato? responde con 'si / no':").toLowerCase();
if (afiliado != "si") {
    alert("Si te interesa ser parte de nuestro sindicato contacta a un integrante de nuestra mesa")
};

alert("Estos fueron los datos ingresados:                                                     " + "Nombre: " + nombreIngresado + "      " + "Apellido: " + apellidoIngresado + "      " + "Sucursal: " + sucursalIngresda + "      " + "Cargo: " + cargoIngresado + "      " + "Numero de funcionario: " + numFuncionario);

// como segundo avance del proyecto pretendo crear un Array que almacene la información ingresada por los usuarios.



