/*
PROGRAMACION DE LOS EVENTOS DE BOTONES DEL MODULO DE LOG IN
*/

$(document).on('pageinit', '#loginModule', function () {


    displayMainLogin();

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLA INICIAL DE LOGIN

    //Logarse
    $('#btnLogIn').unbind('click').bind('click', function () {
        procesoDeLogin();

    });


    //CREAR una nueva cuenta
    $('#btnLogInNewAccount').unbind('click').bind('click', function () {

        displayNewAccount();
    });

    //Olvidar contraseña
    $('#loginForgotPassword').unbind('click').bind('click', function () {

        displayResetPassword();

    });

    //reestablecer contraseña OK
    $('#btnOkResetPassword').unbind('click').bind('click', function () {
        /* FALTA CODIGO */

        displayResetPasswordFinish();

    });

    //Reestrablecer contraseña Cancel
    $('#btnCancelResetPassword').unbind('click').bind('click', function () {

        displayMainLogin();

    });

    //Finalizar reset contraseña
    $('#btnResetPasswordFinish').unbind('click').bind('click', function () {

        displayMainLogin();

    });




    //Nueva cuenta OK
    $('#btnOkNewAccount').unbind('click').bind('click', function () {

        /* FALTA CODIGO */
        if ($('#inputNewAccountPass').val() != $('#inputNewAccountPass2').val()) {

            alert('Las contraseñas no coinciden.');

        } else if ($('#inputNewAccountPass').val() == '') {

            alert('Debe rellenar la contraseña');
        } else {

            displayNewAccountFinish();
        }
    });


    //Nueva cuenta Cancel
    $('#btnCancelNewAccount').unbind('click').bind('click', function () {

        displayMainLogin();

    });

    //Finalizar con crear cuenta
    $('#btnNewAccountFinish').unbind('click').bind('click', function () {

        displayMainLogin();

    });









});



function procesoDeLogin() {
    
    //Control de errores
    if ($('#inputLoginUsername').val() == '' || $('#inputLoginPassword').val() == '') {
        alert("DEBE RELLENAR LOS CAMPOS DE USUARIO Y CONTRASEÑA");

    } else {
        //Recuperamos los valores y los enviamos al ws y esperamos respuesta

        autentication($('#inputLoginUsername').val(), $('#inputLoginPassword').val());
    }

}


function autentication(user, pass){

        var parametros = {

                usuario : user,

                password : pass

        };
     $.ajax({
                     data: parametros,
            url: url + 'login.php',
            type: 'POST',
            dataType: 'json',
            success: loginOk,
            error: loginError,
        });
}

//Recibimos la respuesta del WS de login
function loginOk(r) {
    

    if(r.validacion=="ok")
    {
    idSesion = r.id_user;
    $.mobile.changePage('#app');
    displayMainMenu();
    }   
    else {
        alert("Usuario incorrecto");
    }

}


//Recibimos ERROR en la respuesta del WS de login
function loginError() {
    alet("Error");


}