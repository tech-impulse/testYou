
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

    console.log("Rest Comprar Creditos");

    var datos = {
        idPaquete: id,
        idSesion: idSesion,
        token: token
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
    console.log("Subir imagen");
    $.ajax({
        url: url + 'uploadFile.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        timeout: 60000,
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
    console.log("Guardar Programacion");
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
            creditos: 0, // GRATIS
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
        Password: $("#inputNewAccountPass").val(),
        idPais: idPais
    };

    $.ajax({
        data: datos,
        url: url + 'nuevoUsuario.php',
        dataType: 'json',
        type: 'POST',
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
            displaySelector(tipo);
            procesoNuevoAnuncio2(r);            
            console.log("paises");
            break;
        };
    case "provincias":
        {
            displaySelector(tipo);
            procesoNuevoAnuncio2Provincia(r);            
            console.log("provincias");
            break;
        };
    case "ubicacionesCP":
        {
            console.log(r);
            if (r.localizaciones[0].validacion == "vacio") {
                notificacion(r.localizaciones[0].mensaje);
                //abrirPopupAviso(r.localizaciones[0].mensaje);
            } else {
                displayNuevoAnuncio3();
                procesoNuevoAnuncio3(r);                
                console.log("ubicacionesCP");
            }

            break;
        };
    case "descripcionAnuncio":
        {
            displayNuevoAnuncio4();
            procesoNuevoAnuncio4(r);            
            console.log("descripcionAnuncio");
            break;
        };
    case "comprarCreditos":
        {
            $("#formPago").submit();
            break;
        };
    case "guardarProgramacion":
        {
            creditosDisponibles = r.creditos;
            abrirPopupAccion(r.mensaje, tipo);
            //notificacion(r.mensaje);
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
            notificacion(r.mensaje);
            //abrirPopupAviso(r.mensaje);
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
    

    switch (tipo) {
    case "comprarCreditos":
        {
            notificacion("Compruebe su conexión");
            //abrirPopupAviso("Compruebe su conexión");
            $('#submitPaypal').prop('disabled', false);
            break;
        };
    case "guardarProgramacion":
        {
            notificacion("No se ha podido cargar su imagen!");
            //abrirPopupAviso("No se ha podido cargar su imagen!");
            break;
        };
    default:
            notificacion("Intentelo de nuevo");
            //abrirPopupAviso("Compruebe su conexión");
        break;
    }
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
                notificacion(response.mensaje);
                //abrirPopupAviso(response.mensaje);
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

function paypal() {

    // token 49PgCpjnQN0jSqlEc0ow-xuC8Elsw8A4AkqwBj36TQK11Gcfcs5b_RCZMxi

    $.ajax({
        headers: {
            "Accept": "application/json",
            "Accept-Language": "en_US",
            "Authorization": "Basic " + btoa("AQkhHRDAyltyqrM1E9me7-D1yIj7XETaMQhM057smwshexCt1NFX_JehopOw:EKM_8xAMcpun1d_1t-Wgf30cGR-DRWS0WoC8degha5lvd66mqRhex8oHxdHj")
        },
        url: "https://api.sandbox.paypal.com/v1/oauth2/token",
        type: "POST",
        data: "grant_type=client_credentials",
        complete: function (result) {
            console.log(JSON.stringify(result));
        },
    });

}

function pagar(accessToken) {

    var datos = {
        "intent": "sale",
        "payer": {
            "payment_method": "credit_card",
            "funding_instruments": [{
                "credit_card": {
                    "number": "4417119669820331",
                    "type": "visa",
                    "expire_month": 11,
                    "expire_year": 2018,
                    "cvv2": "874",
                    "first_name": "Joe",
                    "last_name": "Shopper",
                    "billing_address": {
                        "line1": "52 N Main ST",
                        "city": "Johnstown",
                        "country_code": "US",
                        "postal_code": "43210",
                        "state": "OH"
                    }
                }
                }]
        },
        "transactions": [{
            "amount": {
                "total": "7.47",
                "currency": "USD",
                "details": {
                    "subtotal": "7.41",
                    "tax": "0.03",
                    "shipping": "0.03"
                }
            },
            "description": "This is the payment transaction description."
            }]
    };

    $.ajax({
        type: 'POST',
        url: "https://api.sandbox.paypal.com/v1/payments/payment",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify(datos),

        success: function (data) {
            console.lo
            console.log(data);
        },
        error: function (data) {
            console.log('fail payment...' + accessToken);
            console.log(JSON.stringify(data));
        }
    });

    //console.log(datos);
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}