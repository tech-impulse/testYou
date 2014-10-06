var SECCIONES_LOGIN = new Array('mainLogin', 'resetPassword', 'resetPasswordFinish', 'newAccount', 'newAccountFinish');

// Si se crea una nueva sección, hay que añadir en este array el nombre del div principal, tal y como están los demás
var SECCIONES_APP = new Array('mainMenu', 'miCuenta', 'creditosMain', 'misAnuncios', 'anunciosMain', 'estadisticas', 'nuevoAnuncio', 'condicionesIpoliticas', 'informeProblema', 'creditosHistorico', 'creditosPaquetes', 'nuevoAnuncio1', 'nuevoAnuncio2', 'nuevoAnuncio3', 'nuevoAnuncio4', 'nuevoAnuncio5', 'nuevoAnuncio5-1', 'nuevoAnuncio6', 'nuevoAnuncio7', 'nuevoAnuncio8', 'nuevoAnuncio9', 'nuevoAnuncio10', 'sinConexion');

/*
Desactiva todas las secciones del modulo y activa la actual.
*/
function ocultarElementosLogin(actual) {

    for (var i = 0; i < SECCIONES_LOGIN.length; i++) {

        if (actual == SECCIONES_LOGIN[i]) {
            $('#' + actual).show();
            //console.log(" MOSTRAR "+actual);
        } else {
            $('#' + SECCIONES_LOGIN[i]).hide();
            //console.log(" OCULTAR "+actual);

        }
    }
    
    $("#codigoCaptcha").val(captcha(5));

}

/*
Oculta la seccion actual y enseña el footer que toca
*/
function ocultarElementosApp(actual) {
    $("#footerCancelar").hide();
    console.log(" ----- " + actual);
    for (var i = 0; i < SECCIONES_APP.length; i++) {

        if (actual == SECCIONES_APP[i]) {
            $('#' + actual).show();
            $('#footer' + actual).show();
            //console.log("mostrar " + '#footer' + actual);

        } else {
            $('#' + SECCIONES_APP[i]).hide();
            $('#footer' + SECCIONES_APP[i]).hide();
            //console.log("ocultar " + '#footer' + SECCIONES_APP[i]);

        }
    }

}

///////////////////////////////////////////////////////////////////////////////
// LOGIN  
function displayMainLogin() {

    pantallaApp = "mainLogin";

    ocultarElementosLogin('mainLogin');


}

// Seccion de recuperar Password
function displayResetPassword() {

    pantallaApp = "resetPassword";

    ocultarElementosLogin('resetPassword');

}

// Seccion de recuperar el Password una vez solicitado
function displayResetPasswordFinish() {

    pantallaApp = "resetPasswordFinish";

    ocultarElementosLogin('resetPasswordFinish');

}

// Seccion para crear una nueva cuenta
function displayNewAccount() {

    pantallaApp = "newAccount";

    ocultarElementosLogin('newAccount');

}

// Seccion que se muestra despues de crear una cuenta
function displayNewAccountFinish() {

    pantallaApp = "newAccountFinish";

    ocultarElementosLogin('newAccountFinish');

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// MENUs LATERAL 

// Muestra el Menú principal con opciones de crear anuncio, mis creditos, etc
function displayMainMenu() {
    var p = "mainMenu";

    $("#tituloSeccion").text("youtter");

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra información del usuario
function displayMiCuenta() {
    var p = "miCuenta";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra los creditos totales y opciones
function displayCreditosMain() {
    var p = "creditosMain";

    $("#numCreditosMain").text(parseInt(creditosDisponibles));

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra la lista con los movimientos que se han efectuado de carga/recarga de creditos
function displayHistoricoMovimientos() {

    var p = "creditosHistorico";

    pantallaApp = p;

    ocultarElementosApp(p);
}

// Muestra Las opciones de paquetes que puedes comprar por Paypal
function displayCreditosPaquetes() {

    var p = "creditosPaquetes";

    pantallaApp = p;

    ocultarElementosApp(p);
}

// Muestra una lista de Anuncios publicados previamente por el usuario
function displayMisAnuncios() {
    var p = "misAnuncios";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra la información de Condiciones y Políticas
function displayCondicionesIpoliticas() {
    var p = "condicionesIpoliticas";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra un formulario para enviar una incidencia
function displayInformeProblema() {
    var p = "informeProblema";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra el calendario para que se pueda seleccionar una fecha donde quieres publicar el anuncio
function displayCalendario() {

    $("#divCalendar").empty();

    $("#divCalendar").append('<div id="calendar"> </div>');

    $("#calendar").jqmCalendar({

        events: JsonFechas,

        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        days: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        startOfWeek: 0

    });
    var p = "nuevoAnuncio1";

    pantallaApp = p;

    ocultarElementosApp(p);

    if (calendario == true) {
        console.log("El calendario es neceario");
    } else {
        console.log("El calendario NO es neceario");
        procesoNuevoAnuncio6();
    }

}

// Muestra el PASO 1
function displayNuevoAnuncio2() {
    var p = "nuevoAnuncio2";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra el PASO 2
function displayNuevoAnuncio3() {
    var p = "nuevoAnuncio3";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra el PASO 3
function displayNuevoAnuncio4() {
    var p = "nuevoAnuncio4";

    $("#lbnuevoAnuncio3Fecha").text(fechaSeleccionada);

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra el mapa de la ubicacion de la pantalla seleccionada
function displayNuevoAnuncio5() {
    var p = "nuevoAnuncio5";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra el mapa con las pantallas cercanas a ti
function displayNuevoAnuncio5_1() {
    var p = "nuevoAnuncio5-1";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra el paso 4 (INHABILITADA POR CAMBIO DE CIRCUITO DE LA APP, está muestra la parte de subir la misma imagen en todas las pantallas)

function displayNuevoAnuncio6() {
    var p = "nuevoAnuncio6";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra el paso 4 - Seleccionar la imagen que se va a publicar en el anuncio
function displayNuevoAnuncio7() {
    if ($("#file").val() != "") {
        $("#btnnuevoAnuncio7Subir").show();
    }

    var p = "nuevoAnuncio7";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra una pantalla donde especifica los requisitos del formato que se tiene que seleccionar para subir (INHABILITADA POR CAMBIO DE CIRCUITO EN LA APP)
function displayNuevoAnuncio8() {
    var p = "nuevoAnuncio8";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Paso 5 - Muestra la imagen seleccionada y permite pulsar el botón para publicar el anuncio
function displayNuevoAnuncio9() {
    var p = "nuevoAnuncio9";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muetsra la pagina final donde se permite seleccionar el tipo de pago (INHABILITADA POR CAMBIO DE CIRCUITO EN LA APP)
function displayNuevoAnuncio10() {
    var p = "nuevoAnuncio10";

    pantallaApp = p;

    ocultarElementosApp(p);

}

// Muestra una pantalla con un botón para poder recargar en caso de que el ws falle
function displaySinConexion(accion) {
    var p = "sinConexion";

    $("#sinConexionAccion").text(accion);

    pantallaApp = p;

    ocultarElementosApp(p);

}

//  Muestra configuracion del anuncio PASO 3 (horario, segundos) según lo que se haya seleccionado en el popup previo, y de los creditos o permisos del usuario
function displaySeleccion(opcion) {

    // has seleccionado horario y dispones de creditos
    if (opcion == "seleccion" && parseInt(creditosDisponibles) > 0) {
        $("#lbnuevoAnuncio4Disponibles").text(" Disponibles: " + parseInt(creditosDisponibles) + " creditos");
        $('#divnuevoAnuncio4FranjasHorarias1').show();
        $('#divnuevoAnuncio4FranjasHorarias2').show();
        calendario = true;
        var input = document.getElementById("innuevoAnuncio4Segundos");
        if ((creditosDisponibles * 10) >= 2520) {
            input.setAttribute("max", 2520);
        } else {
            input.setAttribute("max", parseInt(creditosDisponibles * 10));
        }
        input.setAttribute("value", 10);

        // Has seleccionado ahora! y dispones de creditos
    } else if (opcion == "ahora" && parseInt(creditosDisponibles) > 0) {
        $("#lbnuevoAnuncio4Disponibles").text(" Disponibles: " + parseInt(creditosDisponibles) + " creditos");
        $('#divnuevoAnuncio4FranjasHorarias1').hide();
        $('#divnuevoAnuncio4FranjasHorarias2').show();
        calendario = false;
        var input = document.getElementById("innuevoAnuncio4Segundos");
        if ((creditosDisponibles * 10) >= 60) {
            input.setAttribute("max", 60);
        } else {
            input.setAttribute("max", parseInt(creditosDisponibles * 10));
        }
        input.value = 10;
        $('#innuevoAnuncio4Segundos').val("10");

        // Has seleccionado ahora! y NO dispones de creditos (OPCION FREE)
    } else if (opcion == "ahora" && parseInt(creditosDisponibles) == 0) {
        calendario = false;
        procesoGuardarAnuncio();

    } else {
        $("#lbnuevoAnuncio4Disponibles").text(" No tienes creditos");
        $('#divnuevoAnuncio4FranjasHorarias1').hide();
        $('#divnuevoAnuncio4FranjasHorarias2').hide();
    }
    $('#innuevoAnuncio4Segundos').slider('refresh');

}

// Enseña la lista de Paises o Provincias según se solicite en el PASO 1
function displaySelector(opcion) {

    switch (opcion) {
    case "paises":
        {
            $("#divnuevoAnuncio2ListaPais").show();
            $("#divnuevoAnuncio2ListaProvincia").hide();
            break;
        };
    case "provincias":
        {
            $("#divnuevoAnuncio2ListaPais").show();
            $("#divnuevoAnuncio2ListaProvincia").show();
            break;
        };
    }
}

function limpiarPantallaNuevoUusario(){

    $('#inputNewAccountNombre').val("");
    $('#inputNewAccountApellidos').val("");
    $('#inputNewAccountEmail').val("");
    $('#inputNewAccountPass').val("");
    $('#inputNewAccountPass2').val("");
    $('#codigoCaptchaUser').val("");
    $('#aceptarPoliticas').prop( "checked", false );

}