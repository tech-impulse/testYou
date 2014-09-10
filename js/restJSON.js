host = "api.youtter.com";

/*
Se realiza la autenticación del usuario
*/
function authentication() {

    var uri = "/login";

    console.log("Envio WS : " + uri);

    $.ajax({
        url: host + uri,
        async: true,
        timeout: maxtime,
        contentType: 'application/json',
        dataType: "json",
        method: 'GET',
        type: "GET",
        success: restLogin,
        error: serviceComunicationError

    });
}


function restLogin(data) {

    if (data.status == "OK") {

        loginOk();

    } else {

        loginError(data.errorMessage);

    }

}

function restUbicaciones() {

    var datos = {
        idSesion: idSesion
    };

    $.ajax({
        data: datos,
        url: url + 'ubicaciones.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "ubicaciones");
        },
        error: function (response) {
            restError(response, "ubicaciones");
        },
    });
}

function restGeolocalizacion() {

    var datos = {
        latitud: latitudActual,
        longitud: longitudActual
    };

    $.ajax({
        data: datos,
        url: url + 'geolocalizacion.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "geolocalizacion");
        },
        error: function (response) {
            restError(response, "geolocalizacion");
        },
    });
}

function restPaises() {

    var datos = {
        idSesion: idSesion
    };

    $.ajax({
        data: datos,
        url: url + 'paises.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "paises");
        },
        error: function (response) {
            restError(response, "paises");
        },
    });
}

function restProvincias(id) {

    var datos = {
        idSesion: idSesion,
        idPais: id
    };

    $.ajax({
        data: datos,
        url: url + 'provincias.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "provincias");
        },
        error: function (response) {
            restError(response, "provincias");
        },
    });
}

function restUbicacionesPorCodigoPostal(cp) {
    console.log("Codigo Postal " + cp);

    var datos = {
        codigo: cp,
        idSesion: idSesion
    };

    $.ajax({
        data: datos,
        url: url + 'ubicacionesCP.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "ubicacionesCP");
        },
        error: function (response) {
            restError(response, "ubicacionesCP");
        },
    });
}

function restDescripcionAnuncio(id) {

    var datos = {
        idAnuncio: id
    };

    $.ajax({
        data: datos,
        url: url + 'descripcionAnuncio.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "descripcionAnuncio");
        },
        error: function (response) {
            restError(response, "descripcionAnuncio");
        },
    });
}

function restComprarCreditos(id) {

    var datos = {
        idPaquete: id,
        idSesion: idSesion
    };

    $.ajax({
        data: datos,
        url: url + 'comprarCreditos.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "comprarCreditos");
        },
        error: function (response) {
            restError(response, "comprarCreditos");
        },
    });
}

function restHistoricoMovimientos(id) {

    var datos = {
        idSesion: idSesion
    };

    $.ajax({
        data: datos,
        url: url + 'historicoMovimientos.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "historicoMovimientos");
        },
        error: function (response) {
            restError(response, "historicoMovimientos");
        },
    });
}

function restMisAnuncios(id) {

    var datos = {
        idSesion: idSesion
    };

    $.ajax({
        data: datos,
        url: url + 'misAnuncios.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "misAnuncios");
        },
        error: function (response) {
            restError(response, "misAnuncios");
        },
    });
}

function restSubirImagen() {
    // $.mobile.loading('show');
    $.ajax({
        url: url + 'uploadFile.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        timeout: 30000,
        success: function (response) {
            restGuardarProgramacion(response);
        },
        error: function (response) {
            restError(response, "guardarProgramacion");
        },
    });
}

function restGuardarProgramacion(r) {
    //var re = /(?:\.([^.]+))?$/;
    //var ext = re.exec($("#file").val())[1];
    console.log(r);
    var obj = JSON.parse(r);
    var video = obj.video;
    //abrirPopupAviso(obj.extension);

    if (calendario == true) {
        var datos = {
            idPantalla: idPantalla,
            idSesion: idSesion,
            fechaProgramacion: fechaSeleccionada,
            horaInicio: horaInicio,
            horaFin: horaFin,
            creditos: creditos,
            video: video
        };

    } else {
        var datos = {
            idPantalla: idPantalla,
            idSesion: idSesion,
            fechaProgramacion: "NOW()",
            horaInicio: "0",
            horaFin: "0",
            creditos: creditos,
            video: video
        };

    }

    $.ajax({
        data: datos,
        url: url + 'guardarProgramacion.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "guardarProgramacion");
        },
        error: function (response) {
            restError(response, "guardarProgramacion");
        },
    });
}

function restRelanzarAnuncio(r) {


    if (calendario == true) {
        var datos = {
            idPantalla: JsonAnuncio[posicion].IdPantalla,
            idSesion: idSesion,
            idImagen: JsonAnuncio[posicion].IdImagen,
            fechaProgramacion: fechaSeleccionada,
            horaInicio: horaInicio,
            horaFin: horaFin,
            creditos: creditos,
            video: JsonAnuncio[posicion].video
        };

    } else {
        var datos = {
            idPantalla: JsonAnuncio[posicion].IdPantalla,
            idSesion: idSesion,
            idImagen: JsonAnuncio[posicion].IdImagen,
            fechaProgramacion: "NOW()",
            horaInicio: "0",
            horaFin: "0",
            creditos: creditos,
            video: JsonAnuncio[posicion].video
        };

    }

    $.ajax({
        data: datos,
        url: url + 'relanzarAnuncio.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "guardarProgramacion");
        },
        error: function (response) {
            restError(response, "guardarProgramacion");
        },
    });
}


function restNuevoUsuario() {

    var datos = {
        Nombre: $("#inputNewAccountNombre").val(),
        Apellidos: $("#inputNewAccountApellidos").val(),
        Email: $("#inputNewAccountEmail").val(),
        Password: CryptoJS.MD5($("#inputNewAccountPass").val()).toString(),
        idPais: idPais
    };

    $.ajax({
        data: datos,
        url: url + 'nuevoUsuario.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "nuevoUsuario");
        },
        error: function (response) {
            restError(response, "nuevoUsuario");
        },
    });
}

function restPais() {
    console.log("dame el pais");
    $.getJSON('http://api.wipmania.com/jsonp?callback=?', function (data) {
        switch (data.address.country) {
        case "Spain":
            {
                idPais = 1;
                break;
            };
        default:
            {
                idPais = 1;
            }
        }

    });
}

function restIncidencia() {

    var datos = {
        idSesion: idSesion,
        Email: $("#lbmiCuentaEmail").text(),
        Asunto: $("#inputInformeProblemaAsunto").val(),
        Descripcion: $("#textInformeProblemaDescripcion").val(),
    };

    $.ajax({
        data: datos,
        url: url + 'incidencia.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            restOk(response, "incidencia");
        },
        error: function (response) {
            restError(response, "incidencia");
        },
    });

}

function restPassword(email) {

    var datos = {
        idSesion: 0,
        Email: email,
    };

    $.ajax({
        data: datos,
        url: url + 'reestablecerPassword.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            restOk(response, "resetPassword");
        },
        error: function (response) {
            restError(response, "resetPassword");
        },
    });

}

function restOk(r, tipo) {
    console.log(tipo);
    console.log(JSON.stringify(r));

    switch (tipo) {
    case "ubicaciones":
        {
            procesoNuevoAnuncio3(r);
            displayNuevoAnuncio3();
            console.log("ubicaciones");
            break;
        };
    case "geolocalizacion":
        {
            procesoNuevoAnuncio3(r);
            displayNuevoAnuncio5_1();
            mostrarCerca();
            console.log("ubicaciones");
            break;
        };
    case "paises":
        {
            procesoNuevoAnuncio2(r);
            displaySelector(tipo);
            console.log("paises");
            break;
        };
    case "provincias":
        {
            procesoNuevoAnuncio2Provincia(r);
            displaySelector(tipo);
            console.log("provincias");
            break;
        };
    case "ubicacionesCP":
        {
            console.log(r);
            if (r.localizaciones[0].validacion == "vacio") {
                abrirPopupAviso(r.localizaciones[0].mensaje);
            } else {
                procesoNuevoAnuncio3(r);
                displayNuevoAnuncio3();
                console.log("ubicacionesCP");
            }

            break;
        };
    case "descripcionAnuncio":
        {
            procesoNuevoAnuncio4(r);
            displayNuevoAnuncio4();
            console.log("descripcionAnuncio");
            break;
        };
    case "comprarCreditos":
        {
            creditosDisponibles = r.creditos;
            abrirPopupAviso(r.mensaje);
            break;
        };
    case "guardarProgramacion":
        {
            creditosDisponibles = r.creditos;
            abrirPopupAccion(r.mensaje, tipo);
            break;
        };
    case "nuevoUsuario":
        {
            displayNewAccountFinish();
            break;
        };

    case "packs":
        {
            console.log("Packs de creditos");
            break;
        };

    case "historicoMovimientos":
        {
            mostrarHistoricoCreditos(r);
            break;
        };
    case "misAnuncios":
        {
            procesoMisAnuncios(r);
            break;
        };
    case "incidencia":
        {
            abrirPopupAviso(r.mensaje);
            break;
        };
    case "resetPassword":
        {
            if (r.validacion != "ok") {
                abrirPopupAviso(r.mensaje);
            } else {
                displayResetPasswordFinish();
            }
            break;
        };

    }
}

function restError(r, tipo) {
    console.log("fallo de ws");
    abrirPopupAviso("Compruebe su conexión");
    //alert("Erro de consulta " + tipo);

}



// MODULO DE REESTABLECER PASSWORD

function nuevoPassword() {
    var pass = $("#password1").val();
    var url = "http://admin.youtter.com/webservices/";
    var datos = {
        Token: getURLParameter('token'),
        Password: CryptoJS.MD5(pass).toString()
    };

    $.ajax({
        data: datos,
        url: url + 'nuevoPassword.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            console.log(JSON.stringify(response));
            if (response.validacion == "ok") {
                $("#inicio").hide();
                $("#fin").show();
            } else if (response.validacion == "caducado") {
                alert("Token de sesión caducado, vuelve a solicitar una contraseña");
                $("#inicio").hide();
                $("#email").show();
            } else {
                alert(response.mensaje);
            }
        },
        error: function (response) {
            alert("Ha habido un error");
        },
    });
}

function solicitarPassword(email) {

    var datos = {
        idSesion: 0,
        Email: email,
    };

    $.ajax({
        data: datos,
        url: url + 'reestablecerPassword.php',
        dataType: 'json',
        type: 'POST',
        success: function (response) {
            if (response.validacion != "ok") {
                abrirPopupAviso(response.mensaje);
            } else {
                $("#fin2").show();
                $("#email").hide();
            }
        },
        error: function (response) {
            restError(response, "resetPassword");
        },
    });

}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}