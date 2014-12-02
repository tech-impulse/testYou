// Descargamos todas las ubicaciones de pantallas disponibles
function restUbicaciones() {

    var datos = {
        idSesion: idSesion
    };

    peticionActual = $.ajax({
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

// Descargamos la lista de paquetes de creditos para poder comprar
function restPreciosPaquetes() {

    peticionActual = $.ajax({
        url: url + 'preciosCreditos.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "preciosCreditos");
        },
        error: function (response) {
            restError(response, "preciosCreditos");
        },
    });
}

// Buscamos la pantalla mas cercana y la cargamos en el mapa segun nuestras coordenadas actuales
function restGeolocalizacion() {

    var datos = {
        latitud: latitudActual,
        longitud: longitudActual
    };

    peticionActual = $.ajax({
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

// Descargamos la lista de paises disponibles donde hay pantallas
function restPaises() {
    displayNuevoAnuncio2();
    var datos = {
        idSesion: idSesion
    };

    peticionActual = $.ajax({
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

// Descargamos todas las provincias disponibles en funcion del pais escogido previamente
function restProvincias(id) {

    var datos = {
        idSesion: idSesion,
        idPais: id
    };

    peticionActual = $.ajax({
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

// Descargamos todas las ubicaciones donde hay pantallas según el codigo postal de la provincia seleccionada (o prefijo Ej: Barcelona 08)
function restUbicacionesPorCodigoPostal(cp) {
    CodigoPostal = cp;
    console.log("Codigo Postal " + cp);

    var datos = {
        codigo: cp,
        idSesion: idSesion
    };

    peticionActual = $.ajax({
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

// Descargamos todas las ubicaciones donde hay pantallas según el num de pantalla
function restUbicacionesPorNumeroPantalla(num) {
    CodigoPostal = num;
    console.log("Codigo Postal " + num);

    var datos = {
        codigo: num,
        idSesion: idSesion
    };

    peticionActual = $.ajax({
        data: datos,
        url: url + 'ubicacionesNumPantalla.php',
        dataType: 'json',
        success: function (response) {
            restOk(response, "ubicacionesCP"); //utilizamos el mismo caso porque la informacion obtenida sera la misma
        },
        error: function (response) {
            restError(response, "ubicacionesCP");
        },
    });
}

/*
function restDescripcionAnuncio(id) {

    var datos = {
        idAnuncio: id
    };

    peticionActual = $.ajax({
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
*/

// Hacemos una precarga en la base de datos, y si se ha podido realizar, hacemos submit en el formulario para que se abra la web de paypal con el botón que hemos pulsado
function restComprarCreditos(id) {

    console.log("Rest Comprar Creditos");

    var datos = {
        idPaquete: id,
        idSesion: idSesion,
        token: token
    };

    peticionActual = $.ajax({
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

// Descargamos la lista de los movimientos de gastar o comprar creditos
function restHistoricoMovimientos() {

    var datos = {
        idSesion: idSesion
    };

    peticionActual = $.ajax({
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

// Descargamos la lista de anuncios publicados hasta la fecha
function restMisAnuncios() {

    var datos = {
        idSesion: idSesion
    };

    peticionActual = $.ajax({
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

// Función para subir al FTP la imagen o video que hemos seleccionado
function restSubirImagen() {
    // $.mobile.loading('show');
    $("#footerCancelar").show();
    $("#footernuevoAnuncio9").hide();
    console.log("Subir imagen");
    peticionActual = $.ajax({
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

// Funcion para guardar en la base de datos la programación del anuncio para que se reproduzca en el player
function restGuardarProgramacion(r) {
    //var re = /(?:\.([^.]+))?$/;
    //var ext = re.exec($("#file").val())[1];
    console.log("Guardar Programacion + " + calendario);
    console.log(r);
    var obj = JSON.parse(r);
    var video = obj.video;

    // Si hemos seleccionado un horario, tenemos que enviar la fecha del calendario escogida
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

    peticionActual = $.ajax({
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

// Funcion para relanzar un anuncio que se haya realizado previamente
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

    peticionActual = $.ajax({
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

// Funcion para dar de alta un nuevo usuario y guardarlo en la base de datos
function restNuevoUsuario() {

    var datos = {
        Nombre: $("#inputNewAccountNombre").val(),
        Apellidos: $("#inputNewAccountApellidos").val(),
        Email: $("#inputNewAccountEmail").val(),
        Password: $("#inputNewAccountPass").val(),
        idPais: idPais,
        codigo: captcha(25)
    };

    peticionActual = $.ajax({
        data: datos,
        url: url + 'nuevoUsuarioTest.php', //---> WS correcto es nuevoUsuario.php 
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

// Funcion que deteca en que pais estás mediante una peticion a una API publica (necesario para cuando se da de alta un usuario, que se seleccione el país automaticamente.
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

// Funcion para enviar una incidencia y crearla en la base de datos. El WS también envia un correo al usuario y un correo al administrador de incidencias de Youtter con el número de ticket creado
function restIncidencia() {

    var datos = {
        idSesion: idSesion,
        Email: $("#lbmiCuentaEmail").text(),
        Asunto: $("#inputInformeProblemaAsunto").val(),
        Descripcion: $("#textInformeProblemaDescripcion").val(),
    };

    peticionActual = $.ajax({
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

// Función que envia un correo al usuario para que a través de un enlace pueda introducir de nuevo un password y tenga acceso a la app de nuevo
function restPassword(email) {

    var datos = {
        idSesion: 0,
        Email: email,
    };

    peticionActual = $.ajax({
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

// Funcion que procesa todas las respuestas validas de los ws y actúa según el caso
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
            if (r.mensaje == "Usuario dado de alta correctamente") {
                $('#mainLogin').show();
                $("#newAccount").hide();
                $("#lbPopUpLogin").text(r.mensaje + ".<br /> Mire su email para validar su cuenta.");
                $("#loginPopUp").popup("open");
                $("#inputLoginUsername").val($('#inputNewAccountEmail').val());
                limpiarPantallaNuevoUusario();
            } else {
                $("#lbPopUpLogin").text(r.mensaje);
                $("#loginPopUp").popup("open");
                break;
            }
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
            displayMainMenu();
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
    case "preciosCreditos":
        {
            displayCreditosPaquetes();
            mostrarPaquetesCreditos(r);

            break;
        };

    }
}

// Funcion que procesa todas las respuestas invalidas de los ws y actúa según el caso
function restError(r, tipo) {
    console.log("fallo de ws, tipo " + tipo);
    console.log(r);
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
            displayNuevoAnuncio9();
            notificacion("No se ha podido cargar su imagen! Intentelo de nuevo");
            break;
        };
    case "paises":
        {
            displaySinConexion(tipo);
            break;
        };
    case "provincias":
        {
            displaySinConexion("paises");
            break;
        };
    case "misAnuncios":
        {
            displaySinConexion(tipo);
            break;
        };
    case "geolocalizacion":
        {
            displaySinConexion(tipo);
            break;
        };
    case "historicoMovimientos":
        {
            displaySinConexion(tipo);
            break;
        };
    case "ubicacionesCP":
        {
            displaySinConexion(tipo);
            break;
        };
    case "ubicaciones":
        {
            displaySinConexion(tipo);
            break;
        };

    case "nuevoUsuario":
        {
            notificacion(r);
            break;
        };
    case "preciosCreditos":
        {
            notificacion(r);
            break;
        }
    default:
        notificacion("Intentelo de nuevo");
        break;
    }
}



// MODULO DE REESTABLECER PASSWORD  (reestablecer.html)

// Envía el password al ws y trata la respuesta del ws según si ha sido valida, o el token estaba caducado.
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

// Solicita un password al ws y esté le envía un email con instrucciones al usuario para que pueda reestablecerlo
function solicitarPassword(email) {

    var datos = {
        idSesion: 0,
        Email: email,
    };

    peticionActual = $.ajax({
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

// Solicita un password al ws y esté le envía un email con instrucciones al usuario para que pueda reestablecerlo
function precioCreditos() {

    peticionActual = $.ajax({
        url: url + 'preciosCreditos.php',
        dataType: 'json',
        type: 'GET',
        success: function (response) {

        },
        error: function (response) {
            restError(response, "resetPassword");
        },
    });

}

// FUNCION DE TEST DE PAYPAL (DESECHADAS)
/*
function paypal() {

    // token 49PgCpjnQN0jSqlEc0ow-xuC8Elsw8A4AkqwBj36TQK11Gcfcs5b_RCZMxi

    peticionActual = $.ajax({
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

    peticionActual = $.ajax({
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
*/

// función para obtener variables enviadas por GET directamente de la URL de la web
function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || null
}