/*
PROGRAMACION DE LOS EVENTOS DE BOTONES DE LA APLICACIÓN
*/

$(document).bind("mobileinit", function () {
    $.support.touchOverflow = false;
    $.mobile.touchOverflowEnabled = false;

    $.ajaxSetup({
        timeout: 30000 //Time in milliseconds
    });

});

$(document).ajaxStart(function () {
    if (pantallaApp == "nuevoAnuncio9") {
        $.mobile.loading('show', {
            text: 'Espere por favor...',
            textVisible: true,
            theme: 'z',
            html: ""
        });
    } else {
        $.mobile.loading('show');
    }
    $("#footer_comun").hide();
});

$(document).ajaxStop(function () {
    $.mobile.loading('hide');
    $("#footer_comun").show();
});

$(document).on('pageinit', '#loginModule', function () {

    // Desactivar para Desarrolar
    //console.log = function() {}

    $("#inputLoginUsername").val("alain.cidrera@tech-impulse.com");
    $("#inputLoginPassword").val("test");

    $('#btnPopUpLogin').unbind('click').bind('click', function () {
        $("#loginPopUp").popup("close");

    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //MENU LATERAL


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
        restPaises();
        displayNuevoAnuncio2();
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
            abrirPopupAviso("Debes rellenar la descripción!");
        }
        //abrirPopupAviso("Acción temporalmente no disponible");

    })

    //Informe de un problema - Boton cancelar
    $('#btnInformeProblemaCancel').unbind('click').bind('click', function () {
        displayMainMenu();

    })


    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //MENU INICIAL

    //Creditos Principal - Comprar
    $('#MainMenuOpcion1').unbind('click').bind('click', function () {
        restPaises();
        displayNuevoAnuncio2();

    });

    $('#MainMenuOpcion2').unbind('click').bind('click', function () {
        displayCreditosMain();

    });

    $('#MainMenuOpcion3').unbind('click').bind('click', function () {
        restMisAnuncios();

    });

    $('#MainMenuOpcion4').unbind('click').bind('click', function () {
        displayMiCuenta();

    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLAS DE CREDITOS

    //Creditos Principal - Comprar
    $('#btnCreditosMainComprar').unbind('click').bind('click', function () {
        displayCreditosPaquetes();
        mostrarPaquetesCreditos();
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLA DE INFORMACIÓN DE LA CUENTA DEL USUARIO

    //Mi cuenta - Botón para volver atrás
    $('#btnmiCuentaCancel').unbind('click').bind('click', function () {
        displayMainMenu();
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLA DE MIS ANUNCIOS

    $("#misAnuncios").on("swipeleft", swipeDerecha);
    $("#misAnuncios").on("swiperight", swipeIzquiera);

    function swipeDerecha(event) {
        console.log("pagina mas");
    }

    function swipeIzquiera(event) {
        console.log("pagina menos");
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLAS DE CREAR ANUNCIO


    ///////// EVENTOS CREAR ANUNCIO 1 ////////////////////////////////////////////////////////////////////////////////////////////////////

    //Crear anuncio 1 - evento seleccionar fecha
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
        displayNuevoAnuncio6();

    });

    ///////// EVENTOS CREAR ANUNCIO 2 /////////////////////////////////////////////////////////////////////////////////////////////////

    //Crear anuncio 2 - Boton de ver disponibilidad

    $('#btnnuevoAnuncio2Disponibilidad').unbind('click').bind('click', function () {

        if ($("#inputnuevoAnuncio2").val() == "") {
            restUbicaciones();
        } else {
            restUbicacionesPorCodigoPostal($("#inputnuevoAnuncio2").val());
        }

        //procesoNuevoAnuncio3();
        //displayNuevoAnuncio3();

    });

    //Crear anuncio 2 - Boton Cancelar

    $('#btnnuevoAnuncio2Cancelar').unbind('click').bind('click', function () {

        displayMainMenu();

    });

    ///////// EVENTOS CREAR ANUNCIO 3 /////////////////////////////////////////////////////////////////////////////////////////////////

    //Crear anuncio 3 - Botón para continuar

    $('#btnnnuevoAnuncio3Seguir').unbind('click').bind('click', function () {

        // procesoNuevoAnuncio6();
        //displayNuevoAnuncio6();
        displayNuevoAnuncio(); // muestr

    });

    //Crear anuncio 3 - Botón para cambiar la fechga

    $('#divnuevoAnuncio3Fechas').unbind('click').bind('click', function () {

        displayNuevoAnuncio1();

    });

    //Crear anuncio 3 - Botón para cambiar la zona

    $('#divnuevoAnuncio3Zona').unbind('click').bind('click', function () {

        displayNuevoAnuncio2();

    });

    ///////// EVENTOS CREAR ANUNCIO 4 /////////////////////////////////////////////////////////////////////////////////////////////////


    //Crear anuncio 4 - Boton para subir la imagen
    $('#divnuevoAnuncio4Mapa').unbind('click').bind('click', function () {

        displayNuevoAnuncio5();

        procesoNuevoAnuncio5();

    });

    //Crear anuncio 4 - Boton para volver
    $('#divnuevoAnuncio4Volver').unbind('click').bind('click', function () {

        displayNuevoAnuncio3();

    });

    //Crear anuncio 4 - Boton para recargar Saldo
    $('#btnnuevoAnuncio4Recargar').unbind('click').bind('click', function () {

        mostrarPaquetesCreditos();
        displayCreditosPaquetes();

    });



    //Crear anuncio 4 - Boton para Guardar
    $('#btnnnuevoAnuncio4Guardar').unbind('click').bind('click', function () {
        /*
        $("#calle"+posicion).attr('data-icon', 'check').find('.ui-icon')
                     .addClass('ui-icon-' + 'check')
                     .removeClass('ui-icon-' + 'false');
        
        $("#calle"+posicion+">a.ui-btn").addClass('ui-icon-' + 'check');
        */
        //$("#calle"+posicion).attr('data-icon','check');
        //$("#calle"+posicion).children().children().next().removeClass('ui-icon-custom').addClass('ui-icon-check');
        horaInicio = $("#innuevoAnuncio4Inicio").val();
        horaFin = $("#innuevoAnuncio4Fin").val();
        creditos = $("#innuevoAnuncio4Segundos").val();
        procesoNuevoAnuncio6();

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
        //displayNuevoAnuncio3(); // Par siguientes versiones

    });


    ///////// EVENTOS CREAR ANUNCIO 5 /////////////////////////////////////////////////////////////////////////////////////////////////


    //Crear anuncio 5 - Boton para volver
    $('#btnnnuevoAnuncio5Volver').unbind('click').bind('click', function () {

        displayNuevoAnuncio4();

    });


    ///////// EVENTOS CREAR ANUNCIO 6 /////////////////////////////////////////////////////////////////////////////////////////////////

    //Crear anuncio 6 - Boton para subir la imagen
    $('#btnnuevoAnuncio6Subir').unbind('click').bind('click', function () {

        displayNuevoAnuncio7();
    });

    ///////// EVENTOS CREAR ANUNCIO 7 /////////////////////////////////////////////////////////////////////////////////////////////////


    //Crear anuncio 7 - Boton para subir la imagen
    $('#btnnuevoAnuncio7Subir').unbind('click').bind('click', function () {

        $("form#formPicture").submit();
    });

    //Crear anuncio 7- Evento para enviar el formulario con la imagen
    $("form#formPicture").submit(function (event) {

        event.preventDefault();
        formData = new FormData($(this)[0]);
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

        if (this.files[0].type == "") {
            if ($('#opcionImagen').val() == "on") {
                video = 0;
            } else if ($('#opcionVideo').val() == "on") {
                video = 1;
            }
        }
        visualizarImagen(this.files);

        $("#btnnuevoAnuncio7Subir").show();
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
    $('#opcionImagen').unbind('click').bind('click', function () {
        $('#opcionImagen').val("on");
        $('#opcionVideo').val("off");
        $("#divnuevoAnuncio7Imagen").show();
        $("#divnuevoAnuncio7Video").hide();
    });

    //Crear anuncio 9 - Boton para proceder al pago
    $('#opcionVideo').unbind('click').bind('click', function () {
        $('#opcionImagen').val("off");
        $('#opcionVideo').val("on");
        $("#divnuevoAnuncio7Imagen").hide();
        $("#divnuevoAnuncio7Video").show();
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

    ////////// EVENTOS DE POPUP ACCION ACEPTAR /////////////////////////////////////////////////////////////////////////////////////////////////

    $('#btnPopUpAccionA').unbind('click').bind('click', function () {
        switch ($("#lbPopUpAccionTitulo").val()) {
        case "horario":
            {
                displaySeleccion("seleccion");
                break;
            };
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

    $('#btnPopUpAccionB').unbind('click').bind('click', function () {
        switch ($("#lbPopUpAccionTitulo").val()) {
        case "horario":
            {
                displaySeleccion("ahora");
                break;
            };
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


});


// PRECARGA DEL CALENDARIO 

$(document).on('pageinit', '#app', function () {


    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $("#calendar").jqmCalendar({
        /*
        events: [{
                "summary": "Anuncio 1",
                "begin": new Date(y, m, 27),
                "end": new Date(y, m, 28)

        }, {
                "summary": "Anuncio 2",
                "begin": new Date(y, m, d + 3),
                "end": new Date(y, m, d + 4)

        }, {
                "summary": "Anuncio 3",
                "begin": new Date(y, m, d + 6),
                "end": new Date(y, m, d + 7)

        },
                ],
                */
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        days: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"],
        startOfWeek: 0

    });

});