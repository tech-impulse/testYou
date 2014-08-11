/*
PROGRAMACION DE LOS EVENTOS DE BOTONES DE LA APLICACIÓN
*/



$(document).bind("mobileinit", function () {
    $.support.touchOverflow = false;
    $.mobile.touchOverflowEnabled = false;
});

$(document).on('pageinit', '#loginModule', function () {

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
        displayCreditosPaquetes();
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

        restUbicaciones();

        //procesoNuevoAnuncio2();

        //displayNuevoAnuncio2();

    });

    //Crear anuncio 2 - Boton de ver disponibilidad

    $('#btnnuevoAnuncio2Disponibilidad').unbind('click').bind('click', function () {

        restUbicacionesPorCodigoPostal();

        //procesoNuevoAnuncio3();
        //displayNuevoAnuncio3();

    });

    //Crear anuncio 3 - Botón para continuar

    $('#btnnnuevoAnuncio3Seguir').unbind('click').bind('click', function () {

       // procesoNuevoAnuncio6();
        displayNuevoAnuncio6();

    });

    //Crear anuncio 4 - Boton para subir la imagen
    $('#divnuevoAnuncio4Mapa').unbind('click').bind('click', function () {

        displayNuevoAnuncio5();

        procesoNuevoAnuncio5();

    });

    //Crear anuncio 6 - Boton para subir la imagen
    $('#btnUpload').unbind('click').bind('click', function () {

        $("form#formPicture").submit();
    });

    //Crear anuncio 6- Evento para enviar el formulario con la imagen
    $("form#formPicture").submit(function (event) {

        //disable the default form submission
        event.preventDefault();
        $.mobile.loading('show');
        //grab all form data  
        var formData = new FormData($(this)[0]);
        console.log("subir foto");

        $.ajax({
            url: url + 'uploadFile.php',
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




function procesoNuevoAnuncio2(listaLocalizaciones) {

    $("#ulnuevoAnuncio2").empty();

    $("#ulnuevoAnuncio2").listview();

    for (var i = 0; i < listaLocalizaciones.localizaciones.length; i++) {
        var localizacion = listaLocalizaciones.localizaciones[i];
        var pos = parseInt(i + 1);
        $("#ulnuevoAnuncio2").append('<li id="linuevoAnuncio2-' + i + '" onclick="cerrarLista(' + i + ')">' + localizacion.Direccion + '</li>');

    }
    $("#ulnuevoAnuncio2").listview('refresh');

}

function cerrarLista(posicion) {

    $("#txtnuevoAnuncio2").trigger("click");

    document.getElementById("txtnuevoAnuncio2").innerHTML = '<a href="#" class="ui-collapsible-heading-toggle ui-btn ui-icon-plus ui-btn-icon-left ui-btn-b">' + $("#linuevoAnuncio2-" + posicion).text() + '</a>';
    
    $("#inputnuevoAnuncio2").val(08203); // Solucion temporal para poder testear
}

function procesoNuevoAnuncio3(listaLocalizaciones) {

    $("#ulnuevoAnuncio3").empty();

    $("#ulnuevoAnuncio3").listview();

    /* JSON DE MUESTRA
    {
        "localizaciones": [
            {
                "CodigoPostal": "08203",
                "calles": [
                    {
                        "id": "2",
                        "Direccion": "asdasdasdasdsd",
                        "Poblacion": "",
                        "Provincia": "",
                        "LatitudGPS": "0.000",
                        "LongitudGPS": "0.000"
                    },
                    {
                        "id": "1",
                        "Direccion": "Granada 1",
                        "Poblacion": "Viladecans",
                        "Provincia": "BARCELONA",
                        "LatitudGPS": "41.533",
                        "LongitudGPS": "2.104"
                    }
                ]
            }
        ]
    }
    */

    console.log(JSON.stringify(listaLocalizaciones));

    for (var i = 0; i < listaLocalizaciones.localizaciones.length; i++) {
        var localizacion = listaLocalizaciones.localizaciones[i];
        console.log(localizacion.codigo);
        $("#ulnuevoAnuncio3").append('<li data-role="list-divider" style="color:black; font-weight:bold"> Código Postal: <label style="display:inline" id="lbnuevoAnuncio3Codigo' + i + '">' + localizacion.CodigoPostal + '</label></li>');
        for (var j = 0; j < localizacion.calles.length; j++) {
            var calle = localizacion.calles[j];
            JsonCalle.push(calle);
            $("#ulnuevoAnuncio3").append('<li onclick="procesoNuevoAnuncio4(JsonCalle,' + j + ',' + $("#lbnuevoAnuncio3Codigo" + i).text() + ');">' + calle.Direccion + " " + $("#lbnuevoAnuncio3Codigo" + i).text() + " " + calle.Poblacion + '</li>');
            console.log("Nombre de la calle " + calle.Direccion);

        }

    }

    $("#ulnuevoAnuncio3").listview('refresh');
}

function procesoNuevoAnuncio4(calles, pos, cp) {

    posicion = pos; // Nos guardamos la posicion que ocupa esta calle en una variable para poder desglosar la informacion del JSON.

    $("#lbnuevoAnuncio4Calle").text(calles[pos].Direccion + " " + cp + " " + calles[pos].Poblacion);
    $("#lbnuevoAnuncio4TipoPantalla").text();
    $("#lbnuevoAnuncio4Localizacion").text();
    $("#lbnuevoAnuncio4Establecimiento").text();

    displayNuevoAnuncio4();

}

function procesoNuevoAnuncio5() {

    var myCenter=new google.maps.LatLng(JsonCalle[posicion].LatitudGPS,JsonCalle[posicion].LongitudGPS);

    {
        var mapProp = {
            center: myCenter,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("divnuevoAnuncio5Mapa"), mapProp);

        var marker = new google.maps.Marker({
            position: myCenter,
        });

        marker.setMap(map);
    }

    google.maps.event.addDomListener(window, 'load', initialize);



}


// GENERA LOS PAQUETES DE CREDITOS DE FORMA DINAMICA

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
    var j = 1;
    var div1 = "#div1-" + j;
    var div2 = "#div2-" + 1;
    var div3 = "#div3-" + 1;
    var div4 = "#div4-" + 1;
    var div5 = "#div5-" + 1;

    for (var i = 0; i < listaPaquetes.paquetes.length; i++) {
        var paquete = listaPaquetes.paquetes[i];
        var pos = parseInt(i + 1);
        div2 = "#div2-" + pos;
        div3 = "#div3-" + pos;
        div4 = "#div4-" + pos;
        div5 = "#div5-" + pos;

        if (i % 2 != 0) {
            jQuery('<div/>', {
                id: 'div2-' + pos,
                style: 'padding:1em',
                onclick: 'procesoCompraCreditos(' + paquete.id + ')',
                class: 'ui-block-b',

            }).appendTo(div1);
        } else {
            div1 = "#div1-" + j;
            jQuery('<div/>', {
                id: 'div1-' + j,
                class: 'ui-grid-a',
            }).appendTo('#paquetesCreditos');

            jQuery('<div/>', {
                id: 'div2-' + pos,
                style: 'padding:1em',
                onclick: 'procesoCompraCreditos(' + paquete.id + ')',
                class: 'ui-block-a',
            }).appendTo(div1);
            j++;

        }

        jQuery('<div/>', {
            id: 'div3-' + pos,
            style: 'padding:1em',
            class: 'ui-grid-a  ui-body-a ui-corner-all',
        }).appendTo(div2);

        jQuery('<div/>', {
            id: 'div4-' + pos,
            class: 'ui-block-a',
        }).appendTo(div3);

        jQuery('<div/>', {
            id: 'div5-' + pos,
            class: 'ui-block-b',
        }).appendTo(div3);


        $(div4).append('<img src="js/images/img_creditos.png" height="64px" width="64px">');
        $(div5).append('<label>' + paquete.cantidad + '</label>');
        $(div5).append(' <label> créditos </label>');
        $(div2).append('<button class="btn_blue ui-btn ui-shadow ui-corner-all">' + paquete.precio + '</button>');

    }


}


//Proceso de compra de creditos
function procesoCompraCreditos(id) {

    alert("comprar paquete con id " + id);

}

//Muestra todas las recargas y pagos de creditos
function mostrarHistoricoCreditos() {

}