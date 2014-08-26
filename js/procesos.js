// PROCESOS DE APP SEGÚN LA PANTALLA

//Crear anuncio 2- Carga la lista de Paises al mostrar la pantalla de crear anuncio Paso 1


function procesoNuevoAnuncio2(listaPaises) {

    $("#ulnuevoAnuncio2Pais").empty();

    $("#ulnuevoAnuncio2Pais").listview();

    for (var i = 0; i < listaPaises.paises.length; i++) {
        var Pais = listaPaises.paises[i];
        var pos = parseInt(i + 1);
        $("#ulnuevoAnuncio2Pais").append('<li id="linuevoAnuncio2Pais-' + i + '" onclick="cerrarListaPais(' + i + ')">' + Pais.Nombre + '</li>');

    }
    $("#ulnuevoAnuncio2Pais").listview('refresh');

}

//Crear anuncio 2- Función que se llama al seleccionar un País, para que cargue las provincias

function cerrarListaPais(posicion) {

    idPais = posicion + 1;
    $("#txtnuevoAnuncio2Pais").trigger("click");
    document.getElementById("txtnuevoAnuncio2Pais").innerHTML = '<a href="#" class="ui-collapsible-heading-toggle ui-btn ui-icon-plus ui-btn-icon-left ui-btn-b">' + $("#linuevoAnuncio2Pais-" + posicion).text() + '</a>';
    console.log("pais con id " + idPais);
    restProvincias(idPais);

}

//Crear anuncio 2- Carga la lista de Provincias según pais escogido de la pantalla de crear anuncio Paso 1

function procesoNuevoAnuncio2Provincia(listaProvincias) {

    $("#ulnuevoAnuncio2Provincia").empty();

    $("#ulnuevoAnuncio2Provincia").listview();

    for (var i = 0; i < listaProvincias.provincias.length; i++) {
        var Provincia = listaProvincias.provincias[i];
        var pos = parseInt(i + 1);
        $("#ulnuevoAnuncio2Provincia").append('<li id="linuevoAnuncio2Provincia-' + i + '" onclick="cerrarListaProvincia(' + i + "," + "'" + Provincia.CodigoPostal + "'" + ')">' + Provincia.Nombre + '</li>');

    }
    $("#ulnuevoAnuncio2Provincia").listview('refresh');

}

//Crear anuncio 2- Función que se llama al seleccionar una Provincia, para que pase a la pantalla Crear anuncio Paso 2 (Mostrar pantallas por CP)

function cerrarListaProvincia(posicion, cp) {

    CodigoPostal = cp;
    $("#txtnuevoAnuncio2Provincia").trigger("click");
    document.getElementById("txtnuevoAnuncio2Provincia").innerHTML = '<a href="#" class="ui-collapsible-heading-toggle ui-btn ui-icon-plus ui-btn-icon-left ui-btn-b">' + $("#linuevoAnuncio2Provincia-" + posicion).text() + '</a>';
    restUbicacionesPorCodigoPostal(cp)

    //$("#inputnuevoAnuncio2Provincia").val(08203); // Solucion temporal para poder testear

}


//Crear anuncio 3- Recarga la lista de Pantalla según la localización seleccionada previamente (Paso 2)


function procesoNuevoAnuncio3(listaLocalizaciones) {

    $("#ulnuevoAnuncio3").empty();

    $("#ulnuevoAnuncio3").listview();

    console.log(JSON.stringify(listaLocalizaciones));

    for (var i = 0; i < listaLocalizaciones.localizaciones.length; i++) {
        var localizacion = listaLocalizaciones.localizaciones[i];
        CodigoPostal = localizacion.CodigoPostal.toString(); // Guardamos el codigo postal en una variable global
        $("#ulnuevoAnuncio3").append('<li data-role="list-divider" style="color:black; font-weight:bold"> Código Postal: <label style="display:inline" id="lbnuevoAnuncio3Codigo' + i + '">' + localizacion.CodigoPostal + '</label></li>');

        for (var j = 0; j < localizacion.calles.length; j++) {
            var calle = localizacion.calles[j];
            JsonCalle.push(calle);
            $("#ulnuevoAnuncio3").append('<li data-icon="false" id="calle' + j + '" onclick="procesoNuevoAnuncio4(' + j + ');"><a href=# style="color:#000">' + calle.Direccion + " " + $("#lbnuevoAnuncio3Codigo" + i).text() + " " + calle.Poblacion + '</a></li>');
            console.log("Nombre de la calle " + calle.Direccion);

        }

    }

    $("#ulnuevoAnuncio3").listview('refresh');
}

//Muestra todas las recargas y pagos de creditos
function mostrarHistoricoCreditos(movimientos) {


    $("#ulcreditosHistorico").empty();

    $("#ulcreditosHistorico").listview();

    $("#ulcreditosHistorico").append('<li data-role="list-divider" style="color:black; font-weight:bold"><div class="ui-grid-b"><div class="ui-block-a">Creditos</div><div class="ui-block-b">Importe</div><div class="ui-block-c">Fecha</div></li>');

    for (var j = 0; j < movimientos.lista.length; j++) {
        var lista = movimientos.lista[j];
        console.log(JSON.stringify(lista));
        for (var j = 0; j < lista.movimientos.length; j++) {
            var objeto = lista.movimientos[j];
            console.log(objeto);
            $("#ulcreditosHistorico").append('<li data-icon="false"><div class="ui-grid-b"><div class="ui-block-a txt_historicoMovimientos">' + parseInt(objeto.credito_actual) + ' Creditos</div><div class="ui-block-b txt_historicoMovimientos">' + parseInt(objeto.importe) + ' Creditos</div><div class="ui-block-c txt_historicoMovimientos">' + objeto.fecha + '</div></li>');
        }

    }



    $("#ulcreditosHistorico").listview('refresh');

    displayHistoricoMovimientos();


}

//Crear anuncio 4- Muestra el detalle de la pantalla seleccionada en el Paso 2

function procesoNuevoAnuncio4(pos) {

    posicion = pos; // Nos guardamos la posicion que ocupa esta calle en una variable para poder desglosar la informacion del JSON.

    $("#linuevoAnuncio4Codigo").text("Codigo Postal: " + CodigoPostal);
    $("#lbnuevoAnuncio4Calle").text(JsonCalle[pos].Direccion + ", " + JsonCalle[pos].Poblacion);
    $("#lbnuevoAnuncio4TipoPantalla").text(JsonCalle[pos].Descripcion);
    $("#lbnuevoAnuncio4Localizacion").text();
    $("#lbnuevoAnuncio4Establecimiento").text();
    idPantalla = JsonCalle[pos].idPantalla;

    displayNuevoAnuncio4();

    abrirPopupAccion("", "horario");

}

//Crear anuncio 5- Muestra el mapa con la localización de la pantalla

function procesoNuevoAnuncio5() {

    var myCenter = new google.maps.LatLng(JsonCalle[posicion].LatitudGPS, JsonCalle[posicion].LongitudGPS);

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

//Crear anuncio 6- Muestra nuevamente el detalle de la pantalla con la programación establecida en el Paso 3

function procesoNuevoAnuncio6() {
    $("#lbnuevoAnuncio6Horario").text("De " + horaInicio + ":00h a " + horaFin + ":00h");
    $("#lbnuevoAnuncio6Calle").text($("#lbnuevoAnuncio4Calle").text());
    $("#lbnuevoAnuncio6Tipo").text($("#lbnuevoAnuncio4TipoPantalla").text());
    //  $("#lbnuevoAnuncio6Localizacion").text();
    //  $("#lbnuevoAnuncio6Establecimiento").text();
    if (fechaSeleccionada == undefined) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth() + 1;
        var y = date.getFullYear();
        fechaSeleccionada = d + "-" + m + "-" + y;
        $("#lbnuevoAnuncio6Fecha").text(fechaSeleccionada);
    } else {
        $("#lbnuevoAnuncio6Fecha").text(fechaSeleccionada);
    }
    displayNuevoAnuncio6();

}

//Crear anuncio 7- Carga la imagen para visualizarla en la pantalla 8

function visualizarImagen(files) {
    var img = document.getElementById('imgnuevoAnuncio9');
    img.src = "js/images/video.png";
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var imageType = /image.*/;
        if (!file.type.match(imageType)) {
            continue;
        }
        img = document.getElementById('imgnuevoAnuncio9');
        var reader = new FileReader();
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
                console.log(e.target.result);
            };
        })(img);
        reader.readAsDataURL(file);
    }
}


//Crear anuncio 10- Carga la imagen para visualizarla en la pantalla 8

function procesoNuevoAnuncio10() {

    if (creditos / 10 < creditosDisponibles) {
        restSubirImagen();
    } else {
        $("#lbPopUpAviso").text("No dispones de creditos suficientes");
        $("#PopUpAviso").popup("open");
    }

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

    $("#paquetesCreditos").empty();

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
                onclick: 'procesoCompraCreditos(' + paquete.cantidad + ')',
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
                onclick: 'procesoCompraCreditos(' + paquete.cantidad + ')',
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
            style: 'padding-top:0.5em',
        }).appendTo(div3);


        $(div4).append('<img src="js/images/img_creditos.png" height="30em" width="37em">');
        $(div5).append('<label class="num_creditos_paquete">' + paquete.cantidad + '</label>');
        $(div5).append(' <label class="creditos_paquete"> créditos </label>');
        $(div2).append('<button class="btn_blue ui-btn ui-shadow ui-corner-all">' + paquete.precio + '</button>');

    }


}


//Proceso de compra de creditos
function procesoCompraCreditos(id) {

    restComprarCreditos(id);

    //alert("comprar paquete con id " + id);

}



// FUNCIONES GENERICAS PARA UTILIZAR EN LA APP

// Funcion para ocultar un Div

function ocultarDiv(div) {
    if ($(div).is(":visible")) {
        $(div).hide();
    } else {
        $(div).show();
    }
}

// Cargar mensaje en Popup de Aviso

function abrirPopupAviso(mensaje) {
    $.mobile.loading('hide');
    $("#lbPopUpAviso").text(mensaje);
    $("#PopUpAviso").popup("open");
}

// Cargar mensaje en Popup de Accion

function abrirPopupAccion(mensaje, tipo) {
    $.mobile.loading('hide');
    console.log(tipo);
    switch (tipo) {
    case "horario":
        {
            $("#lbPopUpAccion").text("Aqui puedes configurar la programación de tu pantalla ¿Cuando deseas reproducirlo?");
            $("#btnPopUpAccionA").text("Seleccionar un horario");
            $("#btnPopUpAccionB").text("Ahora!");
            break;
        };
    case "guardarProgramacion":
        {
            $("#lbPopUpAccion").text(mensaje);
            $("#btnPopUpAccionA").text("Publicar otro anuncio");
            $("#btnPopUpAccionB").text("Ir al Menú Principal");
            break;
        };
    default:
        console.log(tipo);
    }
    $("#lbPopUpAccionTitulo").val(tipo);
    $("#PopUpAccion").popup("open");
}


// CONTROL DE ERRORES DE SUBIDA DE IMAGENES

// la foto se ha subido correctamente
function enviarFoto(r) {
    $.mobile.loading('hide');
    //$("#lbPopUpAviso").text(r);
    //$("#PopUpAviso").popup("open");
    displayNuevoAnuncio9();
}

// Ha habido algún error en el envío de la imagen
function errorenviarFoto(r) {
    $.mobile.loading('hide');
    console.log("Foto no subida");
    $("#lbPopUpAviso").text(r);
    $("#PopUpAviso").popup("open");
}