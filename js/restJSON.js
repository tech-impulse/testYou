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

function restGuardarProgramación(id) {

    if (calendario == true) {
        var datos = {
            idPantalla: idPantalla,
            idSesion: idSesion,
            fechaProgramacion: fechaSeleccionada,
            horaInicio: horaInicio,
            horaFin: horaFin,
            creditos: creditos,
        };

    } else {
        var datos = {
            idPantalla: idPantalla,
            idSesion: idSesion,
            fechaProgramacion: "NOW()",
            horaInicio: "0",
            horaFin: "0",
            creditos: creditos,
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


function restNuevoUsuario() {

    var datos = {
        Nombre: $("#inputNewAccountNombre").val(),
        Apellidos: $("#inputNewAccountApellidos").val(),
        Email: $("#inputNewAccountEmail").val(),
        Password: $("#inputNewAccountPass").val(),
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

function restOk(r, tipo) {

    console.log(JSON.stringify(r));

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
            creditosDisponibles = r.creditos;
            abrirPopup(r.mensaje);
            break;
        };
    case "guardarProgramacion":
        {
            creditosDisponibles = r.creditos;
            abrirPopup(r.mensaje);
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


    }
}

function restError(r, tipo) {
    alert("Erro de consulta " + tipo);

}