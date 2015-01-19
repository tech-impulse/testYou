/*
PROGRAMACION DE LOS EVENTOS DE BOTONES DE LA APLICACIÓN
*/


$(document).bind("mobileinit", function () {

    $.support.touchOverflow = false;
    $.mobile.touchOverflowEnabled = false;

    $.ajaxSetup({
        timeout: 10000, //Time in milliseconds
        crossDomain: true
    });

});


$(document).ajaxStart(function () {
    $("#footer_comun").hide();
    if (pantallaApp == "creditosPaquetes") {
        $.mobile.loading('show', {
            text: 'Espere por favor...',
            textVisible: true,
            theme: 'a',
            html: "<span class='ui-bar ui-overlay-c ui-corner-all'><img src='lib/jquerymobile/images/ajax-loader.gif' />Procesando...</span>"

        });

    } else if (pantallaApp == "nuevoAnuncio9") {
        $.mobile.loading('show', {
            text: 'Espere por favor...',
            textVisible: true,
            theme: 'a',
            html: "<span class='ui-bar ui-overlay-c ui-corner-all'><img src='lib/jquerymobile/images/ajax-loader.gif' /><h2><br>Youtteando...</h2></span>"

        });
        $("#footer_comun").show();

    } else if (pantallaApp == "mainMenu") {

    } else {
        $.mobile.loading('show', {
            textVisible: false,
            theme: 'a',
            html: "<span class='ui-bar ui-overlay-c ui-corner-all'><img src='lib/jquerymobile/images/ajax-loader.gif' /></span>"
        });
    }

});

$(document).ajaxStop(function () {
    $.mobile.loading('hide');
    $("#footer_comun").show();
});

$(document).on('pageshow', '#app', function () {
    getLocation();
    if (idSesion == undefined) {
        setTimeout('$.mobile.changePage("#loginModule")', 10);
    } else console.log(idSesion);

});


$(document).on('pageinit', '#loginModule', function () {

    if (isAndroidDevice()) {
        var element = '<script type="text/javascript" src="cordova.js"></script>';
        $('head').append(element);

    } else {
        console.log("No es Android");
    }

    if (typeof (Storage) !== "undefined") {
        console.log("Soporta");
    } else {
        console.log("No soporta");
    }

    if (localStorage["youtter_email"] != undefined && localStorage["youtter_pass"] != undefined) {
        //autentication(localStorage["youtter_email"], localStorage["youtter_pass"]);
    }

    // Desactivar para Desarrolar
    //console.log = function() {}

    //$("#inputLoginUsername").val("alain.cidrera@tech-impulse.com");
    //$("#inputLoginPassword").val("test");

    $('#btnPopUpLogin').unbind('click').bind('click', function () {
        $("#loginPopUp").popup("close");

    });

    // PRECARGA LA IMAGEN DEL MENÚ
    $("#divmainMenu").css("background-image: url('js/images/fondo_main2.png'); background-size: contain; background-repeat: no-repeat; height:16em; width:22em");

    //CONTROL DEL BOTÓN RECORDAR
    localStorage["youtter_recordar"] = 0; //Incializamos la variable siempre para que luego cambie en funcion de los datos

    if (localStorage["youtter_email"] != undefined && localStorage["youtter_email"] != "") {
        $("#inputLoginUsername").val(localStorage["youtter_email"]);
        $("#inputLoginPassword").val(localStorage["youtter_pass"]);
        localStorage["youtter_recordar"] = 1;
        $("#lbmainLoginRecordar").trigger("click");
    }


    $('#mainLoginRecordar').unbind('click').bind('click', function () {
        if (localStorage["youtter_recordar"] == 1) {
            localStorage["youtter_recordar"] = 0;
        } else {
            localStorage["youtter_recordar"] = 1;
        }
        //localStorage["youtter_pass"] = CryptoJS.MD5($("#inputLoginUsername").val()).toString();
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //MENU LATERAL DE LA APP

    $('#btnMenuPrincipal').unbind('click').bind('click', function () {
        displayMainMenu();
        $("#navpanel").panel("close");

    });
    $('#btnMenuCuenta').unbind('click').bind('click', function () {
        displayMiCuenta();
        $("#navpanel").panel("close");

    });

    $('#btnMenuCreditos').unbind('click').bind('click', function () {
        displayCreditosMain();
        $("#navpanel").panel("close");

    });

    $('#btnMenuAnuncios').unbind('click').bind('click', function () {
        restMisAnuncios();
        $("#navpanel").panel("close");

    });

    $('#btnMenuEstadisticas').unbind('click').bind('click', function () {
        displayEstadisticas();
        $("#navpanel").panel("close");

    });

    $('#btnMenuCrearAnuncio').unbind('click').bind('click', function () {
        publicacionAvanzada();
        $("#navpanel").panel("close");

    });


    $('#btnMenuCondiciones').unbind('click').bind('click', function () {
        displayCondicionesIpoliticas();
        $("#navpanel").panel("close");

    });

    $('#btnMenuSalir').unbind('click').bind('click', function () {
        $.mobile.changePage('#loginModule');
    });

    $('#btnMenuProblema').unbind('click').bind('click', function () {
        displayInformeProblema();
        $("#navpanel").panel("close");

    });

    $('#btnMenuInicio').unbind('click').bind('click', function () {
        displayMainMenu();
        $("#navpanel").panel("close");

    });

    //Condiciones y Politicas - Boton cancelar
    $('#btncondicionesIpoliticasCancel').unbind('click').bind('click', function () {
        displayMainMenu();

    });

    //Informe de un problema - Boton cancelar
    $('#btnInformeProblemaEnviar').unbind('click').bind('click', function () {
        if ($("#textInformeProblemaDescripcion").val() != "") {
            restIncidencia();
        } else {
            notificacion("Debes rellenar la descripción!");
            //abrirPopupAviso("Debes rellenar la descripción!");
        }
        //abrirPopupAviso("Acción temporalmente no disponible");

    })

    //Informe de un problema - Boton cancelar
    $('#btnInformeProblemaCancel').unbind('click').bind('click', function () {
        displayMainMenu();

    })


    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //MENU INICIAL

    //Boton de pantalla de recargar pagina (Cuando falla según que peticion rest)
    $('#btnsinConexion').unbind('click').bind('click', function () {
        var tipo = $("#sinConexionAccion").text();
        switch (tipo) {
        case "paises":
            {
                restPaises();
                break;
            };
        case "misAnuncios":
            {
                restMisAnuncios();
                break;
            };
        case "geolocalizacion":
            {
                restGeolocalizacion();
                break;
            };
        case "historicoMovimientos":
            {
                restHistoricoMovimientos();
                break;
            };
        case "ubicaciones":
            {
                restUbicaciones();
                break;
            };
        case "ubicacionesCP":
            {
                restUbicacionesPorCodigoPostal(CodigoPostal);
                break;
            };
        default:
            console.log(tipo);
        }

    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLA DE MENÚ PRINCIPAL

    //Menu principal - Crear anuncio
    $('#MainMenuOpcion1').unbind('click').bind('click', function () {
        youttear();

    });

    //Menu principal - Mostrar Creditos
    $('#MainMenuOpcion2').unbind('click').bind('click', function () {
        displayCreditosMain();

    });

    //Menu principal - Mostrar lista de anuncios publicados previamente
    $('#MainMenuOpcion3').unbind('click').bind('click', function () {
        publicacionAvanzada();

    });

    //Menu principal - mostrar información del usuario
    $('#MainMenuOpcion4').unbind('click').bind('click', function () {
        displayMiCuenta();

    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLAS DE CREDITOS

    //Creditos Principal - Mostrar pantalla con paquetes de creditos
    $('#btnCreditosMainComprar').unbind('click').bind('click', function () {
        restPreciosPaquetes();
    });


    //Creditos Principal - Volver
    $('#btnCreditosMainCancel').unbind('click').bind('click', function () {

        displayMainMenu();
    });


    //Creditos Principal - Historico
    $('#btnCreditosMainHistorico').unbind('click').bind('click', function () {

        restHistoricoMovimientos();

    });

    //Creditos Principal - Historico - Botón para volver atrás
    $('#btncreditosHistoricoCancel').unbind('click').bind('click', function () {

        displayCreditosMain();

    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLAS DE COMPRAR PAQUETES DE CREDITOS

    //Paquetes de creditos - Botón para volver atrás
    $('#btncreditosPaquetesMenu').unbind('click').bind('click', function () {
        displayMainMenu();
    });

    $('#submitPaypal').unbind('click').bind('click', function () {
        $('#submitPaypal').prop('disabled', true);
        restComprarCreditos($("#submitPaypal").val());
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLA DE INFORMACIÓN DE LA CUENTA DEL USUARIO

    //Mi cuenta - Botón para volver atrás
    $('#btnmiCuentaCancel').unbind('click').bind('click', function () {
        displayMainMenu();
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLA DE MIS ANUNCIOS

    // Mis anuncios - EVENTOS SWIPE
    /*
    $("#misAnuncios").on("swipeleft", "", function () {

        paginarAdelante();

    });

    $("#misAnuncios").on("swipedown", "", function () {

    });

    $("#misAnuncios").on("swiperight", "", function () {

        paginarAtras();

    });
    */

    $("#app").on("swipeleft", "", function () {

        $("#navpanel").panel("close");

    });

    $("#app").on("swiperight", "", function () {

        $("#navpanel").panel("open");

    });

    //Mis Anuncios - Botón para volver atrás
    $('#btnmisAnunciosCancel').unbind('click').bind('click', function () {
        displayMainMenu();
    })



    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLAS DE CREAR ANUNCIO


    ///////// EVENTOS CREAR ANUNCIO 1 ////////////////////////////////////////////////////////////////////////////////////////////////////

    //Crear anuncio 1 - Evento que controla cuando se ha seleccionado una fecha
    $("#calendar").bind('change', function (event, date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();

        //fechaSeleccionada = d + "-" + m + "-" + y;
        fechaSeleccionada = y + "-" + m + "-" + d;

        console.log("FECHA " + fechaSeleccionada);

    });

    //Crear anuncio 1 - Boton Cancelar
    $('#btnnuevoAnuncio1Cancelar').unbind('click').bind('click', function () {

        displayNuevoAnuncio3();

    });


    //Crear anuncio 1 - Boton Aceptar
    $('#btnnuevoAnuncio1Aceptar').unbind('click').bind('click', function () {

        procesoNuevoAnuncio6();
        // Comprueba si estamos guardando la programacion de un anuncio nuevo o relanzado.
        if (JsonAnuncio.length == 0) {
            $("#btnnuevoAnuncio7Subir").hide();
            displayNuevoAnuncio7(); // Ir directamente a subir la imagen
        } else {

            // Si estamos relanzando un aviso anterior, pasamos directamente a publicar
            if (JsonAnuncio[posicion].relanzar == 1) {
                procesoNuevoAnuncio9();
            } else {
                $("#btnnuevoAnuncio7Subir").hide();
                displayNuevoAnuncio7(); // Ir directamente a subir la imagen
            }
        }

    });

    ///////// EVENTOS CREAR ANUNCIO 2 /////////////////////////////////////////////////////////////////////////////////////////////////

    //Crear anuncio 2 - Boton de continuar, buscara las pantallas según si se ha escrito un codigo postal o no
    $('#btnnuevoAnuncio2Disponibilidad').unbind('click').bind('click', function () {


        if ($("#selecBusqueda :radio:checked").val() == "cer") {
            restGeolocalizacion();
        }
        if ($("#selecBusqueda :radio:checked").val() == "zon") {
            if ($("#inputnuevoAnuncio2").val() == "") {
                restUbicaciones();
            } else {
                restUbicacionesPorCodigoPostal(CodigoPostal);
            }
        }
        if ($("#selecBusqueda :radio:checked").val() == "num") {
            restUbicacionesPorNumeroPantalla($("#inputnuevoAnuncio2").val());
        }

        //procesoNuevoAnuncio3();
        //displayNuevoAnuncio3();

    });
    $('#btnnuevoAnuncio2Volver').unbind('click').bind('click', function () {

        displayMainMenu();

    });

    //Crear anuncio 2 - Botón de seleccionar por cerca de mi
    $('#innuevoAnuncio2Cerca').unbind('click').bind('click', function () {
        $("#divnuevoAnuncio2").hide();
        $("#inputnuevoAnuncio2").hide();

    });

    //Crear anuncio 2 - Botón de seleccionar por Zona 
    $('#innuevoAnuncio2Zona').unbind('click').bind('click', function () {
        $("#divnuevoAnuncio2").show();
        $("#inputnuevoAnuncio2").hide();
        $("#inputnuevoAnuncio2").val("");

    });

    //Crear anuncio 2 - Botón de seleccionar por Numero de pantalla
    $('#innuevoAnuncio2Numero').unbind('click').bind('click', function () {
        $("#divnuevoAnuncio2").hide();
        $("#inputnuevoAnuncio2").show();
        $("#inputnuevoAnuncio2").val("");

    });

    //Crear anuncio 2 - Boton Cancelar
    $('#btnnuevoAnuncio2Cancelar').unbind('click').bind('click', function () {

        displayMainMenu();

    });

    ///////// EVENTOS CREAR ANUNCIO 3 /////////////////////////////////////////////////////////////////////////////////////////////////



    ///////// EVENTOS DESCRIPCION DE PANTALLA /////////////////////////////////////////////////////////////////////////////////////////////////

    $('#btndetallePantallaVolver').unbind('click').bind('click', function () {

        displayNuevoAnuncio3();

    });

    //Crear anuncio 3 - Botón para continuar (INACTIVO POR CAMBIOS)
    $('#btnnnuevoAnuncio3Seguir').unbind('click').bind('click', function () {

        // procesoNuevoAnuncio6();
        //displayNuevoAnuncio6();
        displayCalendario(); // muestra la pantalla de calendario

    });

    //Crear anuncio 3 - Botón para cambiar la fecha --> Vuelve a la pantalla anterior (Atrás)
    $('#divnuevoAnuncio3Fechas').unbind('click').bind('click', function () {

        displayNuevoAnuncio2();

    });

    //Crear anuncio 3 - Botón para cambiar la zona --> Vuelve a la pantalla de selección de ubicaciones
    $('#divnuevoAnuncio3Zona').unbind('click').bind('click', function () {

        displayNuevoAnuncio2();

    });

    ///////// EVENTOS CREAR ANUNCIO 4 /////////////////////////////////////////////////////////////////////////////////////////////////


    //Crear anuncio 4 - Boton para visualizar en el mapa la localización de la pantalla actual
    $('#divnuevoAnuncio4Mapa').unbind('click').bind('click', function () {

        displayNuevoAnuncio5();

        procesoNuevoAnuncio5();

    });

    //Crear anuncio 4 - Boton para volver
    $('#divnuevoAnuncio4Volver').unbind('click').bind('click', function () {

        displayNuevoAnuncio3();

    });

    //Crear anuncio 4 - Boton para recargar Saldo --> Lleva directamente a mostrar los paquetes de creditos disponibles y poder comprarlos
    $('#btnnuevoAnuncio4Recargar').unbind('click').bind('click', function () {

        mostrarPaquetesCreditos();
        displayCreditosPaquetes();

    });

    //Crear anuncio 4 - Boton para Guardar la configuracion de tiempo de la pantalla
    $('#btnnnuevoAnuncio4Guardar').unbind('click').bind('click', function () {
        procesoGuardarAnuncio();
    });

    //Crear anuncio 4 - Evento que captura cuando cambian los segundos para actualizar el saldo actual
    $("#innuevoAnuncio4Segundos").change(function () {
        var creditosUsados = $("#innuevoAnuncio4Segundos").val() / 10;
        $("#lbnuevoAnuncio4Disponibles").text(" Disponibles: " + parseInt(creditosDisponibles - creditosUsados) + " creditos");
    });

    ///////// EVENTOS CREAR ANUNCIO 5 /////////////////////////////////////////////////////////////////////////////////////////////////

    //Crear anuncio 5 - Boton para volver atrás
    $('#btnnnuevoAnuncio5Volver').unbind('click').bind('click', function () {

        displayNuevoAnuncio4();

    });

    //Crear anuncio 5-1 - Boton para volver atrás
    $('#btnnnuevoAnuncio5-1Volver').unbind('click').bind('click', function () {

        displayNuevoAnuncio2();

    });

    ///////// EVENTOS CREAR ANUNCIO 6 /////////////////////////////////////////////////////////////////////////////////////////////////

    //Crear anuncio 6 - Boton para subir la imagen (BOTON INACTIVO, NOS SALTAMOS ESTA PAGINA)
    $('#btnnuevoAnuncio6Subir').unbind('click').bind('click', function () {

        displayNuevoAnuncio7();
    });

    ///////// EVENTOS CREAR ANUNCIO 7 /////////////////////////////////////////////////////////////////////////////////////////////////


    //Crear anuncio 7 - Boton para subir la imagen, simplemente carga la imagen en memoria para posteriormente poder enviarla al FTP
    $('#btnnuevoAnuncio7Subir').unbind('click').bind('click', function () {

        $("form#formPicture").submit();
    });

    //Crear anuncio 7- Evento para enviar el formulario con la imagen
    $("form#formPicture").submit(function (event) {

        event.preventDefault();
        formData = new FormData($(this)[0]);
        alert($(this)[0]);
        console.log($(this)[0]);
        formData.append("idSesion", idSesion);
        formData.append("video", undefined);
        if (video != undefined) {
            formData.append("video", video);
        }
        displayNuevoAnuncio9();
        return false;

    });

    //Crear anuncio 7- Controla cuando se selecciona un archivo desde el input tipo File
    $('#file').change(function () {
        visualizarImagen(this.files);

        var fi = $('input[type="file"]').get(0).files[0];
        var size = fi.size / 1048576;

        if ($("#file").val() != "") {
            if (size > 127) {
                notificacion("El achivo no puede superar los 128Mb!");
                $("#btnnuevoAnuncio7Subir").hide();
                $("#file").val("");
            } else {
                $("#btnnuevoAnuncio7Subir").show();
            }
        }
    });

    //Crear anuncio 7- Controla cuando se selecciona un archivo desde el input tipo File y lo reinicializa
    $('#file').unbind('click').bind('click', function () {
        $("#file").val("");
    });


    ///////// EVENTOS CREAR ANUNCIO 8 /////////////////////////////////////////////////////////////////////////////////////////////////


    //Crear anuncio 8 - Boton para ver vista previa
    $('#btnnuevoAnuncio8Previa').unbind('click').bind('click', function () {
        displayNuevoAnuncio9();
    });


    ///////// EVENTOS CREAR ANUNCIO 9 /////////////////////////////////////////////////////////////////////////////////////////////////

    //Crear anuncio 9 - Boton para ver cambiar la imagen
    $('#btnnuevoAnuncio9Cambiar').unbind('click').bind('click', function () {
        displayNuevoAnuncio7();
    });

    //Crear anuncio 9 - Boton para proceder al pago
    $('#btnnuevoAnuncio9Proceder').unbind('click').bind('click', function () {
        //procesoNuevoAnuncio9();
        //displayNuevoAnuncio10();
        procesoNuevoAnuncio10(); // Compra los creditos directamente
    });

    //Crear anuncio 9 - Boton para proceder al pago
    $('#btnFooterCancelar').unbind('click').bind('click', function () {
        peticionActual.abort();
        displayNuevoAnuncio9();
    });

    ///////// EVENTOS CREAR ANUNCIO 10 /////////////////////////////////////////////////////////////////////////////////////////////////

    //Crear anuncio 10 - Boton para proceder al pago mediante creditos
    $('#btnnuevoAnuncio10Creditos').unbind('click').bind('click', function () {
        procesoNuevoAnuncio10();
    });

    //Crear anuncio 10 - Boton para volver atrás
    $('#btnnuevoAnuncio10Cancelar').unbind('click').bind('click', function () {
        displayNuevoAnuncio9();
    });

    //Crear anuncio 10 - Boton para ir a la pantalla de comprar creditos
    $('#btnnuevoAnuncio10Comprar').unbind('click').bind('click', function () {
        displayCreditosMain();
    });


    ////////// EVENTOS DE POPUP AVISO ACEPTAR /////////////////////////////////////////////////////////////////////////////////////////////////

    $('#btnPopUpAviso').unbind('click').bind('click', function () {

        $("#PopUpAviso").popup("close");
        if (pantallaApp == "creditosPaquetes") {
            displayCreditosMain();
        }
    });

    ////////// EVENTOS DE POPUP ACCION ACEPTAR/CANCELAR /////////////////////////////////////////////////////////////////////////////////////////////////

    // Botón A 
    $('#btnPopUpAccionA').unbind('click').bind('click', function () {
        switch ($("#lbPopUpAccionTitulo").val()) {
            // Caso en que en el popup de seleccion de Horario o Ahora escojas SELECCIONAR HORARIO
        case "horario":
            {
                displaySeleccion("seleccion");
                break;
            };
            // Caso en que en el popup que emerje tras haber subido la imagen y guardado la programación escojas Crear nuevo anuncio
        case "guardarProgramacion":
            {
                displayNuevoAnuncio2();
                break;
            };
        default:
            console.log($("#lbPopUpAccionTitulo").val());

        }

        $("#PopUpAccion").popup("close");
    });

    //Botón B
    $('#btnPopUpAccionB').unbind('click').bind('click', function () {
        switch ($("#lbPopUpAccionTitulo").val()) {
            // Caso en que en el popup de seleccion de Horario o Ahora escojas AHORA!
        case "horario":
            {
                displaySeleccion("ahora"); //free
                break;
            };
            // Caso en que en el popup que emerje tras haber subido la imagen y guardado la programación escojas Volvér al Menú
        case "guardarProgramacion":
            {
                displayMainMenu();
                break;
            };
        default:
            console.log($("#lbPopUpAccionTitulo").val());

        }

        $("#PopUpAccion").popup("close");
    });

    // TEST CARGAR IMAGEN 

    $('#btnFooterSeleccionarImagen').unbind('click').bind('click', function () {
        window.imagePicker.getPictures(
            function (results) {
                var will;
                for (var i = 0; i < results.length; i++) {
                    console.log('Image URI: ' + results[i]);
                    var image = new Image();
                    /*
                    image.onload = function () {
                        document.body.appendChild(image);
                    };
                    */
                    image.src = results[i];
                    will = getBase64Image(image);
                    var img = document.getElementById('imgnuevoAnuncio9');
                    img.src = results[i];
                    imageUrl = will;
                    formData = new FormData(imageUrl);
                    //alert(imageUrl);
                    $("#textotest").text(imageUrl);
                    formData.append("idSesion", idSesion);
                    formData.append("video", undefined);
                }

                displayNuevoAnuncio9();
                $("#footernuevoAnuncio9").show();
                
            }, function (error) {
                console.log('Error: ' + error);
            }, {
                maximumImagesCount: 1,
            });
    });
});
/*
    $('#btnFooterSeleccionarImagen').unbind('click').bind('click', function () {
        console.log("Pick");
        window.imagePicker.getPictures(
            function (results) {
                var will;
                for (var i = 0; i < results.length; i++) {
                    //alert(results[i]);
                    var img = document.getElementById('imgnuevoAnuncio9');
                    img.src = results[i];
                    //var data = getBase64Image(results[i]);
                    //formData = new FormData(data);
                    //alert(data);
                    //formData.append("idSesion", idSesion);
                    //formData.append("video", undefined);
                    var image = new Image();
                    image.onload = function () {
                        document.body.appendChild(image);
                    };
                    image.src = results[i];
                    will = getBase64Image(image);
                }

                //console.log('imageUrl', imageUrl);
                //convertImgToBase64(imageUrl, function (base64Img) {
                //alert(base64Img);

                $('.output')
                    .find('textarea')
                    .val(will)
                    .end()
                    .find('a')
                    .attr('href', will)
                    .text(will)
                    .end()
                    .find('img')
                    .attr('src', will);

            });

        var img = document.getElementById('imgnuevoAnuncio9');
        //alert(img.src);
        //displayNuevoAnuncio9();
        imagenCargada = results;
    }, function (error) {
        console.log('Error: ' + error);
    }, {
        maximumImagesCount: 1,
    });



});
*/

/*
        function convertImgToBase64(url, callback, outputFormat) {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var img = new Image;
            img.crossOrigin = 'Anonymous';
            img.src = imageUrl;
            img.onload = function () {
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL(outputFormat || 'image/png');
                callback.call(this, dataURL);
                // Clean up
                canvas = null;
            };
            img.src = url;
        }
        */

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

// PRECARGA DEL CALENDARIO 

$(document).on('pageinit', '#app', function () {

    document.addEventListener("backbutton", function (e) {
        if (pantallaApp == "mainMenu") {
            $.mobile.changePage('#loginModule');
            //alert("test");
            /* 
         Event preventDefault/stopPropagation not required as adding backbutton
          listener itself override the default behaviour. Refer below PhoneGap link.
        */
            e.preventDefault();
            //navigator.app.exitApp();
        } else {
            displayMainMenu();
            //navigator.app.backHistory()
        }
    }, false);


    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    /*
    $("#calendar").jqmCalendar({
        
        events: JsonFechas,
                
                
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        days: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        startOfWeek: 0

    });
    */


});

// MODULO DE REESTABLECIMIENTO DE PASSWORD HTML INDEPENDIENTE reestablecer.html

$(document).on('pageinit', '#reestablecer', function () {

    $('#btnPopUpLogin').unbind('click').bind('click', function () {
        $("#loginPopUp").popup("close");

    });

    console.log(getURLParameter('token'));

    $("#fin").hide();
    $("#fin2").hide();
    $("#email").hide();
    $("#boton").hide();

    $("#password1").change(function () {
        console.log("esta cambiando");
        $("#password1").css("background-color : #81F781");
    });

    $('#password1').keyup(function () {
        if ($('#password1').val().length > 7) {
            $("#password1").css("background-color", "#81F781");
        } else {
            $("#password1").css("background-color", "#F6CECE");
        }
    });

    $('#password2').keyup(function () {
        if ($('#password1').val() == $('#password2').val() && $('#password1').val().length > 7) {
            $("#password2").css("background-color", "#81F781");
            $("#boton").show();

        } else {
            $("#password2").css("background-color", "#F6CECE");
        }
    });

    $('#validarPassword').unbind('click').bind('click', function () {
        if ($('#password1').val() == $('#password2').val()) {

            if ($('#password1').val().length > 7) {

                nuevoPassword();

            } else {
                alert("El password debe tener al menos 8 digitos");
                $("#password1").css("background-color : #F6CECE");
            }

        } else {
            alert("Passwords Diferentes");
        }


    });

    $('#validarEmail').unbind('click').bind('click', function () {
        if (isValidEmailAddress($('#inputEmail').val())) {
            solicitarPassword($('#inputEmail').val());
        } else {
            $("#lbPopUpLogin").text("Compruebe la direccion de correo!");
            $("#loginPopUp").popup("open");
        }

    });

    $('#visita').unbind('click').bind('click', function () {
        window.location = "http://www.youtter.com/"
    });



});


// MODULO DE PAGO POR PAYPAL REALIZADO HTML INDEPENDIENTE pago.html

$(document).on('pageinit', '#pagoFinalizado', function () {
    /*
    var infoHeader = getURLParameter('info');
    var arr = infoHeader.split('#');
    idSesion = arr[1];
    var item = getURLParameter('item_number');
   
    switch (item) { // mira el tipo de popup que se ha abierto
    case "p45": // es el popup de seleccion de horario
        {
            restComprarCreditos("45");
            break;
        };
    case "p80": // es el popup de seleccion de horario
        {
            restComprarCreditos("80");
            break;
        };
    case "p200": // es el popup de seleccion de horario
        {
            restComprarCreditos("200");
            break;
        };
    case "p500": // es el popup de seleccion de horario
        {
            restComprarCreditos("500");
            break;
        };
    case "test": // es el popup de seleccion de horario
        {
            restComprarCreditos("80");
            break;
        };
    default:
        abrirPopupAviso("Ha habido algun error, consulte su email");

    }
    */



});


/*Funcion que nos devuelve un string alfanuemrico de longitud 5*/
function captcha(n) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < n; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}