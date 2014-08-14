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

function restUbicacionesPorCodigoPostal() {

    var datos = {
        codigo: $("#inputnuevoAnuncio2").val(),
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

function restGuardarLocalizacion(id) {

    var datos = {
        idLocalizacion: id,
        horaInicio: horaInicio,
        horaFin: horaFin,
        creditos: creditos,
        idSesion: idSesion
    };

    $.ajax({
        data: datos,
        url: url + 'guardarLocalizacion.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "guardarLocalizacion");
        },
        error: function (response) {
            restError(response, "guardarLocalizacion");
        },
    });
}

function restOk(r, tipo) {

    switch (tipo) {
    case "ubicaciones":
        {
            procesoNuevoAnuncio2(r);
            displayNuevoAnuncio2();
            console.log("ubicaciones");
            break;
        };
    case "ubicacionesCP":
        {
            console.log(r);
            procesoNuevoAnuncio3(r);
            displayNuevoAnuncio3();
            console.log("ubicacionesCP");
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
            abrirPopup(r.mensaje);
            break;
        };
    case "guardarLocalizacion":
        {
            abrirPopup(r.mensaje);
            break;
        };

    case "packs":
        {
            console.log("Packs de creditos");
            break;
        };


    }
}

function restError(r, tipo) {
    console.log("Erro de consulta " + tipo);

}