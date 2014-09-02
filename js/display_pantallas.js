var SECCIONES_LOGIN = new Array('mainLogin', 'resetPassword', 'resetPasswordFinish', 'newAccount', 'newAccountFinish');

var SECCIONES_APP = new Array('mainMenu', 'miCuenta', 'creditosMain', 'misAnuncios', 'anunciosMain', 'estadisticas', 'nuevoAnuncio', 'condicionesIpoliticas', 'informeProblema', 'creditosHistorico', 'creditosPaquetes', 'nuevoAnuncio1', 'nuevoAnuncio2', 'nuevoAnuncio3', 'nuevoAnuncio4', 'nuevoAnuncio5', 'nuevoAnuncio6', 'nuevoAnuncio7', 'nuevoAnuncio8', 'nuevoAnuncio9', 'nuevoAnuncio10');

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

}

function ocultarElementosApp(actual) {
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


function displayResetPassword() {

    pantallaApp = "resetPassword";

    ocultarElementosLogin('resetPassword');

}


function displayResetPasswordFinish() {

    pantallaApp = "resetPasswordFinish";

    ocultarElementosLogin('resetPasswordFinish');

}


function displayNewAccount() {

    pantallaApp = "newAccount";

    ocultarElementosLogin('newAccount');

}


function displayNewAccountFinish() {

    pantallaApp = "newAccountFinish";

    ocultarElementosLogin('newAccountFinish');

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// MENUs LATERAL 
function displayMainMenu() {
    var p = "mainMenu";

    $("#tituloSeccion").text("youtter");

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayMiCuenta() {
    var p = "miCuenta";

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayCreditosMain() {
    var p = "creditosMain";

    $("#numCreditosMain").text(parseInt(creditosDisponibles));

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayHistoricoMovimientos() {

    var p = "creditosHistorico";

    pantallaApp = p;

    ocultarElementosApp(p);
}

function displayCreditosPaquetes() {

    var p = "creditosPaquetes";

    pantallaApp = p;

    ocultarElementosApp(p);
}

function displayMisAnuncios() {
    var p = "misAnuncios";

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayCondicionesIpoliticas() {
    var p = "condicionesIpoliticas";

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayInformeProblema() {
    var p = "informeProblema";

    pantallaApp = p;

    ocultarElementosApp(p);

}


function displayCalendario() {
    var p = "nuevoAnuncio1";

    pantallaApp = p;

    ocultarElementosApp(p);

    if (calendario == true) {
        console.log("El calendario es neceario");
    } else {
        console.log("El calendario NO es neceario");
        procesoNuevoAnuncio6();
        displayNuevoAnuncio6();
    }

}

function displayNuevoAnuncio2() {
    var p = "nuevoAnuncio2";

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio3() {
    var p = "nuevoAnuncio3";

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio4() {
    var p = "nuevoAnuncio4";

    $("#lbnuevoAnuncio3Fecha").text(fechaSeleccionada);

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio5() {
    var p = "nuevoAnuncio5";

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio6() {
    var p = "nuevoAnuncio6";

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio7() {
    if ($("#file").val() != "") {
        $("#btnnuevoAnuncio7Subir").show();
    }

    var p = "nuevoAnuncio7";

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio8() {
    var p = "nuevoAnuncio8";

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio9() {
    var p = "nuevoAnuncio9";

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio10() {
    var p = "nuevoAnuncio10";

    pantallaApp = p;

    ocultarElementosApp(p);

}

function displaySeleccion(opcion) {

    if (parseInt(creditosDisponibles) > 0) {
        $("#lbnuevoAnuncio4Disponibles").text(" Disponibles: " + parseInt(creditosDisponibles) + " creditos");

        if (opcion == "seleccion") {
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


        } else {
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
        }
        $('#innuevoAnuncio4Segundos').slider('refresh');
    } else {
        $("#lbnuevoAnuncio4Disponibles").text(" No tienes creditos");
        $('#divnuevoAnuncio4FranjasHorarias1').hide();
        $('#divnuevoAnuncio4FranjasHorarias2').hide();
    }

}

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