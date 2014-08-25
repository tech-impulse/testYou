var SECCIONES_LOGIN = new Array('mainLogin', 'resetPassword', 'resetPasswordFinish', 'newAccount', 'newAccountFinish');

var SECCIONES_APP = new Array('mainMenu', 'miCuenta', 'creditosMain', 'misAnuncios', 'anunciosMain', 'estadisticas', 'nuevoAnuncio', 'acuerdoLegal', 'informeErrores', 'creditosHistorico', 'creditosPaquetes', 'nuevoAnuncio1', 'nuevoAnuncio2', 'nuevoAnuncio3', 'nuevoAnuncio4', 'nuevoAnuncio5', 'nuevoAnuncio6', 'nuevoAnuncio7', 'nuevoAnuncio8', 'nuevoAnuncio9', 'nuevoAnuncio10');

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

    localStorage['pantalla'] = "mainLogin";

    ocultarElementosLogin('mainLogin');


}


function displayResetPassword() {

    localStorage['pantalla'] = "resetPassword";

    ocultarElementosLogin('resetPassword');

}


function displayResetPasswordFinish() {

    localStorage['pantalla'] = "resetPasswordFinish";

    ocultarElementosLogin('resetPasswordFinish');

}


function displayNewAccount() {

    localStorage['pantalla'] = "newAccount";

    ocultarElementosLogin('newAccount');

}


function displayNewAccountFinish() {

    localStorage['pantalla'] = "newAccountFinish";

    ocultarElementosLogin('newAccountFinish');

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
// MENUs LATERAL 
function displayMainMenu() {
    var p = "mainMenu";

    $("#tituloSeccion").text("youtter");

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayMiCuenta() {
    var p = "miCuenta";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayCreditosMain() {
    var p = "creditosMain";

    $("#numCreditosMain").text(parseInt(creditosDisponibles));

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayHistoricoMovimientos() {

    var p = "creditosHistorico";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);
}

function displayCreditosPaquetes() {

    var p = "creditosPaquetes";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);
}

function displayMisAnuncios() {
    var p = "misAnuncios";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio() {
    var p = "nuevoAnuncio";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayAcuerdoLegal() {
    var p = "acuertoLegal";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayReportarError() {
    var p = "reportarError";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}


function displayNuevoAnuncio() {
    var p = "nuevoAnuncio1";

    localStorage['pantalla'] = p;

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

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio3() {
    var p = "nuevoAnuncio3";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio4() {
    var p = "nuevoAnuncio4";

    $("#lbnuevoAnuncio3Fecha").text(fechaSeleccionada);

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio5() {
    var p = "nuevoAnuncio5";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio6() {
    var p = "nuevoAnuncio6";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio7() {
    var p = "nuevoAnuncio7";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio8() {
    var p = "nuevoAnuncio8";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio9() {
    var p = "nuevoAnuncio9";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayNuevoAnuncio10() {
    var p = "nuevoAnuncio10";

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displaySeleccion(opcion) {

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