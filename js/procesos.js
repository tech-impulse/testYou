// PROCESOS DE APP SEGÚN LA PANTALLA

//Crear anuncio 2- Carga la lista de Paises al mostrar la pantalla de crear anuncio Paso 1

function procesoNuevoAnuncio2(listaPaises) {

    JsonAnuncio = []; // Vaciamos el Json de Auncios para que no sobrecargar la App.

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

    JsonCalle = [];

    $("#ulnuevoAnuncio3").empty();

    $("#ulnuevoAnuncio3").listview();

    for (var i = 0; i < listaLocalizaciones.localizaciones.length; i++) {
        var localizacion = listaLocalizaciones.localizaciones[i];

        var j = 0;
        for (var key in localizacion) {
            var codigoPostal = key;
            $("#ulnuevoAnuncio3").append('<li data-role="list-divider" style="color:black; font-weight:bold"> Código Postal: <label style="display:inline" id="lbnuevoAnuncio3Codigo' + i + '">' + codigoPostal + '</label></li>');
            for (var key in localizacion[codigoPostal]) {
                var calle = localizacion[codigoPostal][key];
                JsonCalle.push(calle);
                if (calle.distancia != "") {
                    $("#ulnuevoAnuncio3").append('<li data-icon="false" id="calle' + j + '" onclick="procesoNuevoAnuncio4(' + j + ');"><a href=# style="color:#000">' + calle.Direccion + ", a ~ " + parseInt(calle.distancia * 1000) + ' m </a></li>');
                } else {
                    $("#ulnuevoAnuncio3").append('<li data-icon="false" id="calle' + j + '" onclick="procesoNuevoAnuncio4(' + j + ');"><a href=# style="color:#000">' + calle.Direccion + ", " + calle.Poblacion + '</a></li>');
                }
                j++;
            }
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

    console.log("Ubicacion seleccionada ");
    console.log(JSON.stringify(JsonCalle[pos]));

    $("#linuevoAnuncio4Codigo").text("Codigo Postal: " + JsonCalle[pos].CodigoPostal);
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
            icon: "js/images/icno_mapa.png"
        });

        marker.setMap(map);

    }

}

//Crear anuncio 5- Muestra las pantallas mas cercanas por geolocalización.

function mostrarCerca() {

    var myCenter = new google.maps.LatLng(latitudActual, longitudActual);

    {
        var mapProp = {
            center: myCenter,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById("divnuevoAnuncio5-1Mapa"), mapProp);

        var marker = new google.maps.Marker({
            position: myCenter,
            icon: "js/images/iconoPosicion.png",
        });

        marker.setMap(map);
        var j = 0;
        for (var i = 0; i < JsonCalle.length; i++) {
            var pantalla = new google.maps.LatLng(JsonCalle[i].LatitudGPS, JsonCalle[i].LongitudGPS);
            createMarker(pantalla, i);
        }

    }

}

function createMarker(latlng, id) {
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "js/images/icno_mapa.png",
        labelContent: "Youttea!",
        labelAnchor: new google.maps.Point(22, 0),
        labelClass: "map-labels", // the CSS class for the label
    });
    google.maps.event.addListener(marker, "click", function () {
        procesoNuevoAnuncio4(id);
    });
    return marker;
}


//Crear anuncio 6- Muestra nuevamente el detalle de la pantalla con la programación establecida en el Paso 3

function procesoNuevoAnuncio6() {
    if (calendario == true) {
        $("#lbnuevoAnuncio6Horario").text("De " + horaInicio + ":00h a " + horaFin + ":00h");
    } else {
        $("#lbnuevoAnuncio6Horario").text("Ahora!")
    }
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

//Crear anuncio 10- Carga la imagen para visualizarla en la pantalla 9

function procesoNuevoAnuncio9() {

    var img = document.getElementById('imgnuevoAnuncio9');

    if (JsonAnuncio.length > 0) {
        if (JsonAnuncio[posicion].relanzar == 1) {
            if (JsonAnuncio[posicion].video == 1) {
                img.src = "js/images/video.png";
            } else {
                img.src = JsonAnuncio[posicion].urlImagen;
            }
        }
    }

    displayNuevoAnuncio9();

}


//Crear anuncio 10- Ejecuta la orden de progrogramar el anuncio

function procesoNuevoAnuncio10() {

    if (usuarioBloqueado == 0) {
        if (creditos / 10 < creditosDisponibles) {
            if (JsonAnuncio.length > 0) {
                if (JsonAnuncio[posicion].relanzar == 1) {
                    restRelanzarAnuncio();
                }
            } else {
                restSubirImagen();
            }
        } else {
            $("#lbPopUpAviso").text("No dispones de creditos suficientes");
            $("#PopUpAviso").popup("open");
        }
    } else {
        $("#lbPopUpAviso").text("Tu cuenta está temporalmente bloqueada");
        $("#PopUpAviso").popup("open");
    }


}




// GENERA LOS PAQUETES DE CREDITOS DE FORMA DINAMICA

function mostrarPaquetesCreditos() {


    $("#divcreditosPaquetesPaypal").hide();
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

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    var h = date.getHours();
    var min = date.getMinutes();
    var s = date.getSeconds();
    var fecha = y + "-" + m + "-" + d + " " + h + ":" + min + ":" + s;

    token = $("#lbmiCuentaEmail").text() + fecha + Math.random();
    token = CryptoJS.MD5(token).toString();
    console.log(id);
    $("#divcreditosPaquetesPaypal").show();
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'custom';
    input.value = token;


    switch (id) {
    case 45:
        {
            var formulario = document.getElementById('form45');
            $("#divcreditosPaquetesPaypal45").show();
            $("#divcreditosPaquetesPaypal80").hide();
            $("#divcreditosPaquetesPaypal200").hide();
            $("#divcreditosPaquetesPaypal500").hide();
            formulario.appendChild(input);
            break;
        };
    case 80: //es el popup de guardar programacion
        {
            var formulario = document.getElementById('form80');
            $("#p80").val("http://www.youtter.com/app/pago.html?info=" + "#" + idSesion + "#" + $("#lbmiCuentaEmail").text() + "");
            $("#divcreditosPaquetesPaypal45").hide();
            $("#divcreditosPaquetesPaypal80").show();
            $("#divcreditosPaquetesPaypal200").hide();
            $("#divcreditosPaquetesPaypal500").hide();
            formulario.appendChild(input);
            break;
        };
    case 200: //es el popup de guardar programacion
        {
            $("#divcreditosPaquetesPaypal45").hide();
            $("#divcreditosPaquetesPaypal80").hide();
            $("#divcreditosPaquetesPaypal200").show();
            $("#divcreditosPaquetesPaypal500").hide();
            break;
        };
    case 500: //es el popup de guardar programacion
        {
            $("#divcreditosPaquetesPaypal45").hide();
            $("#divcreditosPaquetesPaypal80").hide();
            $("#divcreditosPaquetesPaypal200").hide();
            $("#divcreditosPaquetesPaypal500").show();
            break;
        };
    default:
        abrirPopupAviso("Paquete no disponible " + id);

    }
    

    

    $("#inputcreditosPaquetesCantidad").val("Comprar " + id + " Creditos");
    //restComprarCreditos(id);

    //alert("comprar paquete con id " + id);

}


function procesoMisAnuncios(anuncios) {

    JsonAnuncio = [];
    posicionPagina = 0;

    $("#ulmisAnuncios").empty();

    $("#ulmisAnuncios").listview();

    for (var j = 0; j < anuncios.lista.length; j++) {
        var lista = anuncios.lista[j];
        $("#spanPaginaActual").text("1-" + Math.ceil(lista.anuncios.length / paginasPorPantalla));
        for (var j = 0; j < lista.anuncios.length; j++) {
            var objeto = lista.anuncios[j];
            console.log(objeto);
            objeto["relanzar"] = 1;
            JsonAnuncio.push(objeto);
            if (j < paginasPorPantalla) {
                $("#ulmisAnuncios").append('<li data-role="list-divider" style="color:black; font-weight:bold">' + (lista.anuncios.length - j) + "- " + objeto.Direccion + '</li><li data-icon="false"><div class="ui-grid-b"><div class="ui-block-a" style="width:20%"><img height="35" style="margin-top:1em; max-width: 40px;" src="' + objeto.urlImagen + '"></div><div class="ui-block-b" style="width:40%; text-align: left"><p> Emitido: ' + objeto.Fecha + '</p><p> Tipo: ' + objeto.Tipo + '</p> </div><div class="ui-block-c" style="width:40%; text-align: right"><button class="btn_lightblue ui-btn ui-shadow ui-corner-all" data-theme="b" onclick="relanzarAnuncio(' + j + ')">Relanzar</button></div></div></li>');
            }
        }

    }

    $("#ulmisAnuncios").append('<li data-role="list-divider" style="color:black; font-weight:bold"><div class="ui-grid-b"><div onClick="paginarAtras()" class="ui-block-a" style="width:10%"><span><a href="#" class="ui-btn ui-icon-arrow-l ui-btn-icon-notext ui-corner-all"></a></div><div class="ui-block-b" style="width:78%; text-align:center; margin-top:10px"><span id="spanPaginaActual">1-' + Math.ceil(JsonAnuncio.length / paginasPorPantalla) + '</span></div><div onClick="paginarAdelante()" class="ui-block-c" style="width:12%"><a href="#" class="ui-btn ui-icon-arrow-r ui-btn-icon-notext ui-corner-all"></a></div></div></li>');

    $("#ulmisAnuncios").listview('refresh');

    displayMisAnuncios();


}

function paginarMisAnuncios() {

    $("#ulmisAnuncios").empty();

    $("#ulmisAnuncios").listview();

    //$("#ulmisAnuncios").append('<li data-role="list-divider" style="color:black; font-weight:bold">Mis anuncios <span class="ui-li-count" id="spanPaginaActual"></span></li>');

    for (var j = posicionPagina; j < (JsonAnuncio.length - (JsonAnuncio.length - (posicionPagina + paginasPorPantalla))); j++) {
        if (j < JsonAnuncio.length) {
            var objeto = JsonAnuncio[j];

            $("#ulmisAnuncios").append('<li data-role="list-divider" style="color:black; font-weight:bold">' + (JsonAnuncio.length - j) + "- " + objeto.Direccion + '</li><li data-icon="false"><div class="ui-grid-b"><div class="ui-block-a" style="width:20%"><img height="35" style="margin-top:1em; max-width: 40px;" src="' + objeto.urlImagen + '"></div><div class="ui-block-b" style="width:40%; text-align: left"><p> Emitido: ' + objeto.Fecha + '</p><p> Tipo: ' + objeto.Tipo + '</p> </div><div class="ui-block-c" style="width:40%; text-align: right"><button class="btn_lightblue ui-btn ui-shadow ui-corner-all" data-theme="b" onclick="relanzarAnuncio(' + j + ')">Relanzar</button></div></div></li>');
            /*
            $("#ulmisAnuncios").append('<li data-icon="false"><img height="35" style="margin-top:1em; margin-left:0.5em" src="' + objeto.urlImagen + '?dummy=371662"><div class="ui-grid-a"><div class="ui-block-a" style="width:60%"><h2>' + objeto.Direccion + '</h2><p> Emitido: ' + objeto.Fecha + '</p> </div><div class="ui-block-b" style="width:45%; text-align: right"><button class="btn_lightblue ui-btn ui-shadow ui-corner-all" data-theme="b" onclick="relanzarAnuncio(' + j + ')">Relanzar</button></div></div></li>');
            */
        }
    }

    $("#ulmisAnuncios").append('<li data-role="list-divider" style="color:black; font-weight:bold"><div class="ui-grid-b"><div onClick="paginarAtras()" class="ui-block-a" style="width:10%"><span><a href="#" class="ui-btn ui-icon-arrow-l ui-btn-icon-notext ui-corner-all"></a></div><div class="ui-block-b" style="width:78%; text-align:center; margin-top:10px"><span id="spanPaginaActual"></span></div><div onClick="paginarAdelante()" class="ui-block-c" style="width:12%"><a href="#" class="ui-btn ui-icon-arrow-r ui-btn-icon-notext ui-corner-all"></a></div></div></li>');

    $("#spanPaginaActual").text(parseInt((posicionPagina / paginasPorPantalla) + 1) + "-" + Math.ceil(JsonAnuncio.length / paginasPorPantalla));

    $("#ulmisAnuncios").listview('refresh');

    displayMisAnuncios();

}

function relanzarAnuncio(pos) {

    console.log("Posicion del anuncio " + pos);

    $("#linuevoAnuncio4Codigo").text("Codigo Postal: " + JsonAnuncio[pos].CodigoPostal);
    $("#lbnuevoAnuncio4Calle").text(JsonAnuncio[pos].Direccion + ", " + JsonAnuncio[pos].Poblacion);
    $("#lbnuevoAnuncio4TipoPantalla").text(JsonAnuncio[pos].Descripcion);
    $("#lbnuevoAnuncio4Localizacion").text();
    $("#lbnuevoAnuncio4Establecimiento").text();
    idPantalla = JsonAnuncio[pos].idPantalla;

    posicion = pos;

    displayNuevoAnuncio4();

    abrirPopupAccion("", "horario");

    /*
    restUbicaciones();
    
        $("#linuevoAnuncio4Codigo").text("Codigo Postal: " + CodigoPostal);
    $("#lbnuevoAnuncio4Calle").text(JsonCalle[pos].Direccion + ", " + JsonCalle[pos].Poblacion);
    $("#lbnuevoAnuncio4TipoPantalla").text(JsonCalle[pos].Descripcion);
    $("#lbnuevoAnuncio4Localizacion").text();
    $("#lbnuevoAnuncio4Establecimiento").text();
    idPantalla = JsonCalle[pos].idPantalla;
    */
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
    //$.mobile.loading('hide');
    $("#lbPopUpAviso").text(mensaje);
    $("#PopUpAviso").popup("open");
}

// Cargar mensaje en Popup de Accion

function abrirPopupAccion(mensaje, tipo) {
    //$.mobile.loading('hide');
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

// FUNCION PARA TRADUCIR LA PAGINA
function traducir(idPais) {
    var pais;
    switch (idPais) {
    case "1":
        {
            pais = "es";
            break;
        };
    default:
        pais = "es"
    }
    $("#titulocondicionesIpoliticas").text(textos.es.condicionesIpoliticas.titulocondicionesIpoliticas);
    $("#divcondicionesIpoliticas").text(textos.es.condicionesIpoliticas.divcondicionesIpoliticas);
}


// CONTROL DE ERRORES DE SUBIDA DE IMAGENES

// la foto se ha subido correctamente
function enviarFoto(r) {
    //$.mobile.loading('hide');
    //$("#lbPopUpAviso").text(r);
    //$("#PopUpAviso").popup("open");
    displayNuevoAnuncio9();
}

// Ha habido algún error en el envío de la imagen
function errorenviarFoto(r) {

    console.log("Foto no subida");
    $("#lbPopUpAviso").text(r);
    $("#PopUpAviso").popup("open");
}

function paginarAdelante(event) {
    if (posicionPagina < (JsonAnuncio.length - paginasPorPantalla)) {
        posicionPagina = posicionPagina + paginasPorPantalla;
        paginarMisAnuncios();
    }
}

function paginarAtras(event) {
    if (posicionPagina != 0) {
        posicionPagina = posicionPagina - paginasPorPantalla;
        paginarMisAnuncios();
    }
}

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};

function CheckPassword(inputtxt) {
    var decimal = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
    if (decimal.test(inputtxt)) {
        //alert('Correct, try another...')  
        return true;
    } else {
        //alert('Wrong...!')  
        return false;
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    latitudActual = position.coords.latitude;
    longitudActual = position.coords.longitude;
    //restGeolocalizacion();
    console.log("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude);
}

function distance(lat1, lon1, lat2, lon2, unit) {

    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var radlon1 = Math.PI * lon1 / 180
    var radlon2 = Math.PI * lon2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") {
        dist = dist * 1.609344
    }
    if (unit == "N") {
        dist = dist * 0.8684
    }
    return dist

}