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
        url: url + 'ubicacionestest.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "ubicaciones");
        },
        error: function (response) {
            restError(response, "ubicaciones");
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
        url: url + 'ubicacionesCPtest.php',
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
    $.getJSON('http://api.wipmania.com/jsonp?callback=?', function (data) {
        switch (data.address.country) {
        case "Spain":
            {
                idPais = 1;
                break;
            };
        default:
            idPais = 1;
        }

    });
}

function restOk(r, tipo) {

    console.log(JSON.stringify(r));

    switch (tipo) {
    case "ubicaciones":
        {
            procesoNuevoAnuncio3(r);
            displayNuevoAnuncio3();
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

    }
}

function restError(r, tipo) {
    abrirPopupAviso("Compruebe su conexión");
    //alert("Erro de consulta " + tipo);

}