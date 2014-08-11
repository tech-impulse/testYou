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
            //console.log(" MOSTRAR "+actual);
        } else {
            $('#' + SECCIONES_APP[i]).hide();
            //console.log(" OCULTAR "+actual);

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

    localStorage['pantalla'] = p;

    ocultarElementosApp(p);

}

function displayCreditosMain() {
    var p = "creditosMain";

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