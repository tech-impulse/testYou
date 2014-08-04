/*
PROGRAMACION DE LOS EVENTOS DE BOTONES DE LA APLICACIÓN
*/

var fechaSeleccionada;

$(document).bind("mobileinit", function () {
    $.support.touchOverflow = false;
    $.mobile.touchOverflowEnabled = false;
});

$(document).on('pageinit', '#loginModule', function () {

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //MENU LATERAL

    //Creditos Principal - Comprar
    $('#btnCreditosMainComprar').unbind('click').bind('click', function () {
        procesoCompraCreditos();
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
        displayMisAnuncios();
        $("#navpanel").panel("close");

    });

    $('#btnMenuEstadisticas').unbind('click').bind('click', function () {
        displayEstadisticas();
        $("#navpanel").panel("close");

    });

    $('#btnMenuCrearAnuncio').unbind('click').bind('click', function () {
        displayNuevoAnuncio();
        $("#navpanel").panel("close");

    });


    $('#btnMenuCondiciones').unbind('click').bind('click', function () {
        $("#navpanel").panel("close");

    });

    $('#btnMenuSalir').unbind('click').bind('click', function () {
        $.mobile.changePage('#loginModule');
    });

    $('#btnMenuProblema').unbind('click').bind('click', function () {
        $("#navpanel").panel("close");

    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //MENU INICIAL

    //Creditos Principal - Comprar
    $('#MainMenuOpcion1').unbind('click').bind('click', function () {
        displayNuevoAnuncio();

    });

    $('#MainMenuOpcion2').unbind('click').bind('click', function () {
        displayCreditosMain();

    });

    $('#MainMenuOpcion3').unbind('click').bind('click', function () {
        displayMisAnuncios();

    });

    $('#MainMenuOpcion4').unbind('click').bind('click', function () {
        displayMiCuenta();

    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLAS DE CREDITOS

    //Creditos Principal - Comprar
    $('#btnCreditosMainComprar').unbind('click').bind('click', function () {
        mostrarPaquetesCreditos();
    });


    //Creditos Principal - Volver
    $('#btnCreditosMainCancelar').unbind('click').bind('click', function () {

        displayMainMenu();
    });


    //Creditos Principal - Historico
    $('#btnCreditosMainHistorico').unbind('click').bind('click', function () {

        mostrarHistoricoCreditos();

    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    //PANTALLAS DE CREAR ANUNCIO

    //Crear anuncio 1 - evento seleccionar fecha
    $("#calendar").bind('change', function (event, date) {
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();

        fechaSeleccionada = d + "/" + m + "/" + y;
        console.log("FECHA " + fechaSeleccionada);

    });

    //Crear anuncio 1 - Boton Aceptar

    $('#btnnuevoAnuncio1Aceptar').unbind('click').bind('click', function () {

        displayNuevoAnuncio2();

    });

    //Crear anuncio 2 - Boton de ver disponibilidad

    $('#btnnuevoAnuncio2Disponibilidad').unbind('click').bind('click', function () {

        displayNuevoAnuncio3();

    });

    //Crear anuncio 3 - Opcion de lista

    $('#lista1').unbind('click').bind('click', function () {

        displayNuevoAnuncio4();

    });


    //Crear anuncio 4 - Eventos de pantalla de subir imagen

    //Crear anuncio 4 - Boton para subir la imagen
    $('#btnUpload').unbind('click').bind('click', function () {

        $("form#formPicture").submit();
    });

    //Crear anuncio 4- Evento para enviar el formulario con la imagen
    $("form#formPicture").submit(function (event) {

        //disable the default form submission
        event.preventDefault();
        $.mobile.loading('show');
        //grab all form data  
        var formData = new FormData($(this)[0]);
        console.log("subir foto");

        $.ajax({
            url: 'http://testhtml5.esadecreapolis.com/testServiceAlain/uploadFile.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: enviarFoto,
            error: errorenviarFoto,
        });

        return false;

    });

    // EVENTOS DE POPUP ACEPTAR

    $('#btnPopUpAviso').unbind('click').bind('click', function () {

        $("#PopUpAviso").popup("close");
    });


});

// CONTROL DE ERRORES DE SUBIDA DE IMAGENES

function enviarFoto(r) {
    $.mobile.loading('hide');
    console.log("Enviado Ok, respuesta");
    $("#lbPopUpAviso").text(r);
    $("#PopUpAviso").popup("open");
}

function errorenviarFoto(r) {
    $.mobile.loading('hide');
    console.log("Foto no subida");
    $("#lbPopUpAviso").text(r);
    $("#PopUpAviso").popup("open");
}


// INICIO DE LA PARTE DE APLICACION

$(document).on('pageinit', '#app', function () {


    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $("#calendar").jqmCalendar({
        events: [{
                "summary": "Meet PM",
                "begin": new Date(y, m, 27),
                "end": new Date(y, m, 28)

        }, {
                "summary": "Dinner",
                "begin": new Date(y, m, d + 3),
                "end": new Date(y, m, d + 4)

        }, {
                "summary": "Lunch with Friends",
                "begin": new Date(y, m, d + 6),
                "end": new Date(y, m, d + 7)

        },
                ],
        months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        days: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
        startOfWeek: 0

    });

});

function mostrarPaquetesCreditos() {

    var listaPaquetes = {
        "paquetes": [
            {
                "id": "1",
                "cantidad": "45",
                "precio": "30.00"
        },
            {
                "id": "2",
                "cantidad": "80",
                "precio": "90.00"
        },
            {
                "id": "3",
                "cantidad": "200",
                "precio": "300.00"
        },
            {
                "id": "4",
                "cantidad": "500",
                "precio": "600.00"
        }
    ]
    };

    for (var i = 0; i < listaPaquetes.paquetes.length; i++) {
        var paquete = listaPaquetes.paquetes[i];
        var divSecundarioActual = "#" + i;
        console.log(divSecundarioActual);
        if (i % 2 != 0) {
            jQuery('<div/>', {
                id: paquete.id,
                class: 'ui-block-b',
            }).appendTo(divPrincipalActual);
        } else {
            var divPrincipalActual = "#div" + i;
            jQuery('<div/>', {
                id: "div" + i,
                class: 'ui-grid-a',
            }).appendTo('#paquetesCreditos');
            jQuery('<div/>', {
                id: paquete.id,
                class: 'ui-block-a',
            }).appendTo(divPrincipalActual);
        }

        $(divSecundarioActual).empty().append('<img src="js/images/icno_miscreditos.png" height="64px" width="64px">');

    }




}


//Proceso de compra de creditos
function procesoCompraCreditos() {

}

//Muestra todas las recargas y pagos de creditos
function mostrarHistoricoCreditos() {

}