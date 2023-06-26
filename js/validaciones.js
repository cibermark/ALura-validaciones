// const inputNacimiento = document.querySelector('#birth')

// inputNacimiento.addEventListener('blur', (e)=>{
//     console.log(e.target)
//     validarNacimiento(e.target)
// })


export function validar (input){
    const tipoInput = input.dataset.tipo //esto es para llarmar a los data-tipo
        console.log("tipp input correcto")
    if (validadores[tipoInput]){
        validadores[tipoInput](input)
        console.log("if tipo input validadores correct")
    }

    if(input.validity.valid){
    
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector('.input-container-error').innerHTML = ''
    }else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeerror(tipoInput, input)
      
    }
}

const tipoError = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre:{
        valueMissing: "Este campo esta vacio."
    },
    email:{
        valueMissing: "Este campo esta vacio.",
        typeMismatch: "EL correo no es valido.",
    },
    password:{
        valueMissing: "Este campo esta vacio.",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales."
    },
    nacimiento: { 
        valueMissing: "Este campo esta vacio.",
        customError : 'Debes de tener almenos 18 a;os de edad.'
    },
    numero:{
        valueMissing: "Este campo esta vacio",
        patternMismatch: "El numoero solo debe de contener 10 digitos (xxxxxxxxxx)"
        //debdio aque en el patter agregamos solo d/{10} tambien sirve para evadir que agreguen letras
    },
    direccion:{
        valueMissing: "Este campo esta vacio",
        patternMismatch: "la dirección debee contenere entre 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing: "Este campo esta vacio",
        patternMismatch: "la ciudad debee contenere entre 10 a 20 caracteres"
    },
    estado:{
        valueMissing: "Este campo esta vacio",
        patternMismatch: "El estado debee contenere entre 10 a 20 caracteres"
    }
}

const validadores = {
    nacimiento: (input)=> validarNacimiento(input),
}


function mostrarMensajeDeerror (tipoInput, input){
    let mensaje = '';
    tipoError.forEach(error => {
        if(input.validity[error]){
            console.log(error);
            console.log(input.validity[error])
            console.log(tipoInput)
             console.log(mensajesDeError[tipoInput][error])
             mensaje = mensajesDeError[tipoInput][error]
        }
    })
    console.log('hola de error')
    return mensaje;

}



function validarNacimiento (input){
    console.log(input.value.replaceAll('-', '/'))
    const fechaCliente = new Date(input.value.replaceAll('-', '/'))
    //podemos hacer el replace para arreglar el formato de la fecha y no nos de un dia menos, pero aquui  en la funcion mayor de edad se pide la inforamcion de utc full year lo cual arregla este probelam por lo cual aunque enesta parte nos de un dia menos con el utc nos dara el dia seleccionado. en cambio si solo usaramos getfullyear tendriamos denuevo un dia menos
    console.log('sooy la fecha' + fechaCliente)
    
    let mensaje = ''
    if(!mayorDeEdad(fechaCliente)) {
       mensaje = 'eres menor de edad, debes de tener mas de 18 a;os'
    }   
    input.setCustomValidity(mensaje)
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    console.log(fecha, fechaActual)
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    )

     return fechaActual >= diferenciaFechas
       
}