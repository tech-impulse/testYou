/*
PROGRAMACION DE LOS EVENTOS DE BOTONES DEL MODULO DE LOG IN
*/

$(document).on('pageinit', '#loginModule', function () {


    displayMainLogin();

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLA INICIAL DE LOGIN

    //Logarse
    $('#btnLogIn').unbind('click').bind('click', function () {
        if (localStorage["youtter_recordar"] == 1) {
            localStorage["youtter_email"] = $("#inputLoginUsername").val();
            localStorage["youtter_pass"] = $("#inputLoginPassword").val();
        } else {
            localStorage["youtter_email"] = "";
            localStorage["youtter_pass"] = "";
        }
        procesoDeLogin();
        register();

    });


    //CREAR una nueva cuenta
    $('#btnLogInNewAccount').unbind('click').bind('click', function () {
        restPais(); // Obtiene el pais del usuario por localizacion
        displayNewAccount();
    });

    //Olvidar contraseña
    $('#loginForgotPassword').unbind('click').bind('click', function () {

        displayResetPassword();

    });

    //reestablecer contraseña OK
    $('#btnOkResetPassword').unbind('click').bind('click', function () {
        /* FALTA CODIGO */
        if (isValidEmailAddress($('#inputUserResetPassword').val())) {
            restPassword($("#inputUserResetPassword").val());
        } else {
            $("#lbPopUpLogin").text("Compruebe la direccion de correo!");
            $("#loginPopUp").popup("open");
        }

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
            $("#lbPopUpLogin").text("Las contraseñas no coinciden");
            $("#loginPopUp").popup("open");

        } if ($('#inputNewAccountPass').val() == '') {
            $("#lbPopUpLogin").text("Debe rellenar la contraseña");
            $("#loginPopUp").popup("open");
        } if ($('#inputNewAccountPass').val().length < 1) {
            $('#inputNewAccountPass').val("El password debe ser de 8 caracteres");
        } else {
            if (isValidEmailAddress($('#inputNewAccountEmail').val())) {
                if ($('#inputNewAccountNombre').val() != '' && $('#inputNewAccountApellidos').val() != '') {
                    restNuevoUsuario();
                } else {
                    $("#lbPopUpLogin").text("Rellene su nombre y apellido");
                    $("#loginPopUp").popup("open");
                }
            } else {
                $("#lbPopUpLogin").text("El email no tiene un formato correcto");
                $("#loginPopUp").popup("open");
            }
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
        $("#lbPopUpLogin").text("Debe rellenar los campos de usuario y contraseña");
        $("#loginPopUp").popup("open");

    } else {
        //Recuperamos los valores y los enviamos al ws y esperamos respuesta

        autentication($('#inputLoginUsername').val(), $('#inputLoginPassword').val());
    }

}


function autentication(user, pass) {
    // $.mobile.loading('show');

    var parametros = {

        usuario: user,

        password: CryptoJS.MD5(pass).toString()

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
    //$.mobile.loading('hide');

    console.log(JSON.stringify(r));
    if (r.validacion == "ok") {
        if (r.Activo == 1) {
            idSesion = r.id_user;
            $("#lbmiCuentaNombre").text(r.Nombre + " " + r.Apellidos);
            $("#lbmiCuentaDireccion").text(r.Direccion);
            $("#lbmiCuentaPoblacion").text(r.Poblacion);
            $("#lbmiCuentaProvincia").text(r.Provincia);
            $("#lbmiCuentaTelefono").text(r.TelefonoContacto);
            $("#lbmiCuentaEmail").text(r.Email);
            $("#lbmiCuentaPaypal").text(r.CuentaPaypal);
            $("#lbmiCuentaBloqueado").text(r.Bloqueado);
            moneda = r.Moneda;
            cambio = r.Cambio;
            if (r.Pais == 1) {
                $("#lbmiCuentaPais").text("España");
            } else {
                $("#lbmiCuentaPais").text("Indeterminado");
            }
            if (r.Bloqueado == "Bloqueado") {
                usuarioBloqueado = 1;
            } else {
                usuarioBloqueado = 0;
            }
            traducir(r.Pais);
            creditosDisponibles = r.Creditos;
            $.mobile.changePage('#app');
            displayMainMenu();
        } else {
            $("#lbPopUpLogin").text("Tu usuario esté temporalmente inactivo");
            $("#loginPopUp").popup("open");
        }
    } else {
        $("#lbPopUpLogin").text("Usuario/Password incorrecto");
        $("#loginPopUp").popup("open");
    }

}


//Recibimos ERROR en la respuesta del WS de login
function loginError() {
    //$.mobile.loading('hide');
    $("#lbPopUpLogin").text("Error al iniciar Sesión");
    $("#loginPopUp").popup("open");

}