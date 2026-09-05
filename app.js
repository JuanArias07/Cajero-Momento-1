//VARIABLES
let usuario=undefined;
let contra=undefined;
let respuesta=0, intentos=0;
let sesion=true;
let aux1, aux2;
let correo,cedula;
let acceso=false,option_t;
let saldo=0,aux_saldo=0;
let acum_retiro=0, acum_consig=0;
let Rgistro_movimientos=[];
//MENU DE INICIO DE SESION
while(sesion==true){
    respuesta=Number(prompt(`
        *********************
        ***** GOBANK *****
        *********************
           1. Iniciar
           2. Registrar
           3. Salir
           (1-3):`));
switch (respuesta) {
    case 1:
        if(usuario==undefined && contra==undefined){
            alert("DEBE DE REGISTARSE PRIMERO");
        }else{
            iniciar(usuario, contra);
        }
        break;
    case 2:
            registrar(aux1,aux2);
        break;
    case 3:
        sesion=false;
        salir();
        break;    
    default:
        alert("FUERA DE PARAMETRO");
        break;
    }
}
//MODULO TRANSACCIONES
while (acceso==true){
    
    option_t=Number(prompt(`
        ******************************
        ********* GOBANK *********
        ******************************
        **SALDO Y MOVIMIENTOS**
        ******************************
        1. RETIRAR
        2. CONSIGNAR
        3. CONSULTAR SALDO
        4. MOVIMIENTOS
        5. SALIR
        (1-5):`));
    switch(option_t){
        case 1:
            retirar();
            break;
        case 2:
            consignar(aux_saldo);
            break;
        case 3:
            consultaSaldo(saldo, usuario);
            break;
        case 4:
            movimientos(Rgistro_movimientos,acum_consig,acum_retiro);
            break;
        case 5:
            acceso=false;
            salir();
            break;
        default:
            alert("FUERA DE PARAMETRO");                
    }
}


//RETIRAR
function retirar(){
    if(saldo==0){
        alert("Debe de consignar primero, su cuenta esta en $0");
    }else{
        aux_saldo=Number(prompt(`
            ********
            RETIRO
            ********
            Saldo a retirar?`));
            if(aux_saldo>saldo){
                alert(`
                    No puede retirar mas de lo disponible en su cuenta 
                    Intentelo nuevamente`);
            }else{
                saldo=saldo-aux_saldo;
                alert("Usted retiro: $" + aux_saldo + ". Su nuevo saldo es: $" + saldo);
                acum_retiro=acum_retiro+aux_saldo;
                Rgistro_movimientos.push(["Retiro: ", aux_saldo]);
            }
    } 
    return [saldo, acum_retiro,Rgistro_movimientos];
}

//CONSIGNAR
function consignar(aux_saldo){
    aux_saldo=Number(prompt(`
        ***********
        CONSINACION
        ***********
        ¿Cuanto desea consignar?`))
        if (aux_saldo>0) {
            alert(`Usted consigno: $${aux_saldo}`);
            saldo=saldo+aux_saldo;
            alert(`Su nuevo saldo es de:  $${saldo}`);
            acum_consig=acum_consig+aux_saldo;
            Rgistro_movimientos.push(["Ingreso: ", aux_saldo]);
        } else {
            alert("No puede consignar un numero negativo, intentelo nuevamente");
            consignar();
        }
    
    return [saldo,acum_consig,Rgistro_movimientos];
}

//CONSULTAR SALDO
function consultaSaldo(saldo,usuario){
    alert(`
        *****************
        ***** SALDO *****
        *****************
        Señor/a ${usuario}
        Su saldo es de: $${saldo}`);
}
//MOVIMIENTOS
function movimientos(Rgistro_movimientos,acum_consig,acum_retiro){
    alert(`
        ************************
        HISTORIAL DE MOVIMIENTOS
        ************************
        ${Rgistro_movimientos}
        Total retiros: ${acum_retiro}
        Total ingresos: ${acum_consig}
        `);
}

//INICIAR SESION
function iniciar(usuario, contra){
    aux1=String(prompt(`
        ***************************
        **** INICIO DE SESION ****
        ***************************
        Ingrese su usuario:`));
    aux2=Number(prompt(`
        ***************************
        **** INICIO DE SESION ****
        ***************************
        Ingrese su contraseña:`));
    if (aux1== usuario && aux2==contra ) {
        alert("Acceso concedido");
        sesion=false;
        acceso=true;
    }else{
        alert(`Acceso denegado
        Intentelo nuevamente`);
        intentos++;
        if(intentos==3){
            alert("Cuenta bloqueada");
            sesion=false;
            salir();
        }else{
            iniciar(usuario, contra);
        }
    }
    return [sesion, acceso];
}
//REGISTRARSE 
function registrar(){
    aux1=prompt(`
        ******************
        **** REGISTRO ****
        ******************
        Registre su usuario:`);
    usuario=aux1;
    correo=prompt(`Ingrese su correo:`);
    cedula=Number(prompt(`Ingrese su cedula: `));
    aux1=Number(prompt("Registre su clave:"));
    aux2=Number(prompt("Confirme su clave:"));
    if(aux1==aux2){
        contra=aux1;
        alert("REGISTRO EXITOSO");
    }else{
        alert("Intentelo nuevamente");
    }
    return [usuario,contra,correo,cedula];
}
//SALIR DEL INICIO DE SESION
function salir(){
    alert("CERRANDO SESION, REGRESE PRONTO" );
}
