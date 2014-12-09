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

// SUBSTITUIR
function procesoNuevoAnuncio3(listaLocalizaciones) {

    JsonCalle = [];

    $("#ulnuevoAnuncio3").empty();

    $("#ulnuevoAnuncio3").listview();

    for (var i = 0; i < listaLocalizaciones.localizaciones.length; i++) {
        var localizacion = listaLocalizaciones.localizaciones[i];

        var j = 0;
        for (var key in localizacion) {
            var codigoPostal = key;
            /*
            $("#ulnuevoAnuncio3").append('<li data-role="list-divider" style="color:black; font-weight:bold"> Código Postal: <label style="display:inline" id="lbnuevoAnuncio3Codigo' + i + '">' + codigoPostal + '</label></li>');
            */
            for (var key in localizacion[codigoPostal]) {
                var calle = localizacion[codigoPostal][key];
                JsonCalle.push(calle);
                if (calle.distancia != "" && calle.disponible != 0) {
                    $("#ulnuevoAnuncio3").append('<li data-icon="false" id="calle' + j + '" onclick="procesoNuevoAnuncio4(' + j + ');"><a href=# style="color:#000">' + calle.Direccion + ", a ~ " + parseInt(calle.distancia * 1000) + ' m </a></li>');
                } else {
                    if (calle.disponible != 0) {
                        $("#ulnuevoAnuncio3").append('<li data-role="list-divider" style="color:black; font-weight:bold">' + calle.numeroPantalla + " - " + calle.descripPantalla + '</li><li data-icon="false"><div class="ui-grid-b"><div class="ui-block-a" style="width:20%"><img height="35" style="margin-top:1em; max-width: 40px;" src="js/images/ic_launcher.png"></div><div class="ui-block-b" style="width:40%; text-align: left"><p>' + calle.Direccion + '</p><p>'+ calle.Poblacion+'</p><p>'+ calle.CodigoPostal+'</p></div><div class="ui-block-c" style="width:40%; text-align: right"><button class="btn_lightblue ui-btn ui-shadow ui-corner-all" data-theme="b" onclick="procesoNuevoAnuncio5(' + j + ');">Ver mapa</button><button class="btn_lightblue ui-btn ui-shadow ui-corner-all" data-theme="b" onclick="procesoNuevoAnuncio4(' + j + ');">Seleccionar</button></div></div></li>');
                    }
                    /*
                    $("#ulnuevoAnuncio3").append('<li data-icon="false" id="calle' + j + '" onclick="procesoNuevoAnuncio4(' + j + ');"><a href=# style="color:#000">' + calle.Direccion + ", " + calle.Poblacion + '</a></li>');
                    */
                }
                j++;
            }
        }

    }

    $("#ulnuevoAnuncio3").listview('refresh');

    //---------------
    /*
        JsonCalle = [];
    posicionPagina = 0;

    $("#ulnuevoAnuncio3").empty();

    $("#ulnuevoAnuncio3").listview();


        for (var j = 0; j < listaLocalizaciones.localizaciones.length; j++) {
            var lista = listaLocalizaciones.localizaciones[j];
            $("#spanPaginaActual").text("1-" + Math.ceil(lista.anuncios.length / paginasPorPantalla));
            for (var j = 0; j < lista.anuncios.length; j++) {
                var objeto = lista.anuncios[j];
                console.log(objeto);
                objeto["relanzar"] = 1;
                JsonCalle.push(objeto);
                if (j < paginasPorPantalla) {
                    $("#ulnuevoAnuncio3").append('<li data-role="list-divider" style="color:black; font-weight:bold">' + (lista.anuncios.length - j) + "- " + objeto.Direccion + '</li><li data-icon="false"><div class="ui-grid-b"><div class="ui-block-a" style="width:20%"><img height="35" style="margin-top:1em; max-width: 40px;" src="' + objeto.urlImagen + '"></div><div class="ui-block-b" style="width:40%; text-align: left"><p> Emitido: ' + objeto.Fecha + '</p><p> Tipo: ' + objeto.Tipo + '</p> </div><div class="ui-block-c" style="width:40%; text-align: right"><button class="btn_lightblue ui-btn ui-shadow ui-corner-all" data-theme="b" onclick="relanzarAnuncio(' + j + ')">Relanzar</button></div></div></li>');
                }
            }

        }

        $("#ulnuevoAnuncio3").append('<li data-role="list-divider" style="color:black; font-weight:bold"><div class="ui-grid-b"><div onClick="paginarAtras()" class="ui-block-a" style="width:10%"><span><a href="#" class="ui-btn ui-icon-arrow-l ui-btn-icon-notext ui-corner-all"></a></div><div class="ui-block-b" style="width:78%; text-align:center; margin-top:10px"><span id="spanPaginaActual">1-' + Math.ceil(JsonCalle.length / paginasPorPantalla) + '</span></div><div onClick="paginarAdelante()" class="ui-block-c" style="width:12%"><a href="#" class="ui-btn ui-icon-arrow-r ui-btn-icon-notext ui-corner-all"></a></div></div></li>');

        $("#ulnuevoAnuncio3").listview('refresh');

    */

    //------------------
}

//Muestra todas las recargas y pagos de creditos
function mostrarHistoricoCreditos(movimientos) {

    if (movimientos.lista[0].validacion == "vacio") {
        notificacion("No dispones de movimientos");
    } else {

        $("#ulcreditosHistorico").empty();

        $("#ulcreditosHistorico").listview();

        $("#ulcreditosHistorico").append('<li data-role="list-divider" style="color:black; font-weight:bold"><div class="ui-grid-b"><div class="ui-block-a">Creditos</div><div class="ui-block-b">Importe</div><div class="ui-block-c">Fecha</div></li>');
        JsonMovimientos = [];
        for (var j = 0; j < movimientos.lista.length; j++) {
            var lista = movimientos.lista[j];
            console.log(lista);

            $("#spanPaginaActualCreditos").text("1-" + Math.ceil(lista.movimientos.length / paginasPorPantallaCreditos));
            console.log(JSON.stringify(lista));
            for (var j = 0; j < lista.movimientos.length; j++) {
                var objeto = lista.movimientos[j];
                JsonMovimientos.push(objeto);
                if (j < paginasPorPantallaCreditos) {
                    $("#ulcreditosHistorico").append('<li data-icon="false"><div class="ui-grid-b"><div class="ui-block-a txt_historicoMovimientos">' + parseInt(objeto.credito_actual) + ' Creditos</div><div class="ui-block-b txt_historicoMovimientos">' + parseInt(objeto.importe) + ' Creditos</div><div class="ui-block-c txt_historicoMovimientos">' + objeto.fecha + '</div></li>');
                }
            }

        }

        $("#ulcreditosHistorico").append('<li data-role="list-divider" style="color:black; font-weight:bold"><div class="ui-grid-b"><div onClick="paginarAtrasCreditos()" class="ui-block-a" style="width:10%"><span><a href="#" class="ui-btn ui-icon-arrow-l ui-btn-icon-notext ui-corner-all"></a></div><div class="ui-block-b" style="width:78%; text-align:center; margin-top:10px"><span id="spanPaginaActualCreditos">1-' + Math.ceil(JsonMovimientos.length / paginasPorPantallaCreditos) + '</span></div><div onClick="paginarAdelanteCreditos()" class="ui-block-c" style="width:12%"><a href="#" class="ui-btn ui-icon-arrow-r ui-btn-icon-notext ui-corner-all"></a></div></div></li>');

        $("#ulcreditosHistorico").listview('refresh');

        displayHistoricoMovimientos();
    }

}

// Funcion para paginar Mis Creditos

function paginarMisCreditos() {

    console.log("Paginar mis creditos");
    $("#ulcreditosHistorico").empty();

    $("#ulcreditosHistorico").listview();

    $("#ulcreditosHistorico").append('<li data-role="list-divider" style="color:black; font-weight:bold"><div class="ui-grid-b"><div class="ui-block-a">Creditos</div><div class="ui-block-b">Importe</div><div class="ui-block-c">Fecha</div></li>');

    for (var j = posicionPagina; j < (JsonMovimientos.length - (JsonMovimientos.length - (posicionPagina + paginasPorPantallaCreditos))); j++) {
        if (j < JsonMovimientos.length) {
            var objeto = JsonMovimientos[j];

            $("#ulcreditosHistorico").append('<li data-icon="false"><div class="ui-grid-b"><div class="ui-block-a txt_historicoMovimientos">' + parseInt(objeto.credito_actual) + ' Creditos</div><div class="ui-block-b txt_historicoMovimientos">' + parseInt(objeto.importe) + ' Creditos</div><div class="ui-block-c txt_historicoMovimientos">' + objeto.fecha + '</div></li>');

        }
    }

    $("#ulcreditosHistorico").append('<li data-role="list-divider" style="color:black; font-weight:bold"><div class="ui-grid-b"><div onClick="paginarAtrasCreditos()" class="ui-block-a" style="width:10%"><span><a href="#" class="ui-btn ui-icon-arrow-l ui-btn-icon-notext ui-corner-all"></a></div><div class="ui-block-b" style="width:78%; text-align:center; margin-top:10px"><span id="spanPaginaActualCreditos">1-' + Math.ceil(JsonMovimientos.length / paginasPorPantallaCreditos) + '</span></div><div onClick="paginarAdelanteCreditos()" class="ui-block-c" style="width:12%"><a href="#" class="ui-btn ui-icon-arrow-r ui-btn-icon-notext ui-corner-all"></a></div></div></li>');


    $("#spanPaginaActualCreditos").text(parseInt((posicionPagina / paginasPorPantallaCreditos) + 1) + "-" + Math.ceil(JsonMovimientos.length / paginasPorPantallaCreditos));

    $("#ulcreditosHistorico").listview('refresh');

    displayHistoricoMovimientos();


}



//Crear anuncio 4- Muestra el detalle de la pantalla seleccionada en el Paso 2

function procesoNuevoAnuncio4(pos) {

    posicion = pos; // Nos guardamos la posicion que ocupa esta calle en una variable para poder desglosar la informacion del JSON.

    console.log("Ubicacion seleccionada ");
    //console.log(JSON.stringify(JsonCalle[pos]));

    $("#linuevoAnuncio4Codigo").text("Codigo Postal: " + JsonCalle[pos].CodigoPostal);
    $("#lbnuevoAnuncio4Calle").text(JsonCalle[pos].Direccion + ", " + JsonCalle[pos].Poblacion);
    $("#lbnuevoAnuncio4TipoPantalla").text(JsonCalle[pos].Descripcion);
    $("#lbnuevoAnuncio4Localizacion").text();
    $("#lbnuevoAnuncio4Establecimiento").text();
    idPantalla = JsonCalle[pos].idPantalla;

    displayNuevoAnuncio4();

    if (avanzado == 0){ // Avanzado indica si es youttear o programar
    procesoGuardarAnuncio();
    calendario = false;
    }
    else {
        abrirPopupAccion("", "horario");
    }


}

//Crear anuncio 5- Muestra el mapa con la localización de la pantalla

function procesoNuevoAnuncio5(pos) {

    if (pos != undefined) {
        posicion = pos;
        displayDetallePantalla();
        $("#lbdetallePantallaDescripcion").text(JsonCalle[posicion].numeroPantalla + " - " + JsonCalle[posicion].descripPantalla);
        $("#lbdetallePantallaCalle").text(JsonCalle[posicion].Direccion);
        $("#lbdetallePantallaPoblacion").text(JsonCalle[posicion].CodigoPostal + ", " + JsonCalle[posicion].Poblacion);
        $("#lbdetallePantallaTipo").text(JsonCalle[posicion].Descripcion);
        $("#lbdetallePantallaHorario").text("De " + JsonCalle[posicion].HorarioDesde + "h a " + JsonCalle[posicion].HorarioHasta + "h");
        var img = document.getElementById('imgdetallePantalla');
        img.src = "js/images/video.png";

    }

    var myCenter = new google.maps.LatLng(JsonCalle[posicion].LatitudGPS, JsonCalle[posicion].LongitudGPS);

    {
        var mapProp = {
            center: myCenter,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("detallePantallaMapa"), mapProp);

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
            zoom: 15,
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
        $("#lbnuevoAnuncio6Horario").text("Ahora! (Free)")
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
    //displayNuevoAnuncio6();

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
    //displayMainMenu();
    if (usuarioBloqueado == 0 && calendario == true) {
        if (creditos / 10 <= creditosDisponibles) {
            if (JsonAnuncio.length > 0) {
                if (JsonAnuncio[posicion].relanzar == 1) {

                    restRelanzarAnuncio();
                }
            } else {
                //notificacion("Publicando tu anuncio!");
                restSubirImagen();
            }
        } else {
            notificacion("No dispones de creditos suficientes");
            //abrirPopupAviso("No dispones de creditos suficientes");
        }
    } else if (usuarioBloqueado == 0 && calendario == false) {
        if (JsonAnuncio.length > 0) {
            if (JsonAnuncio[posicion].relanzar == 1) {

                restRelanzarAnuncio();
            }
        } else {
            //notificacion("Publicando tu anuncio!");
            restSubirImagen();
        }
    } else {
        notificacion("Tu cuenta está temporalmente bloqueada");
        //abrirPopupAviso("Tu cuenta está temporalmente bloqueada");
    }


}




// GENERA LOS PAQUETES DE CREDITOS DE FORMA DINAMICA

function mostrarPaquetesCreditos(listaPaquetes) {

    $("#divcreditosPaquetesPaypal").hide();
    /*
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
    */

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
    $('#submitPaypal').prop('disabled', false);
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
            $("#paypalMoneda").val(moneda);
            $("#paypalIdBoton").val("p45");
            $("#paypalPrecio").val(6.75 / cambio);
            var formulario = document.getElementById('formPago');
            $("#submitPaypal").val(45);
            formulario.appendChild(input);
            break;
        };
    case 80: //es el popup de guardar programacion
        {
            $("#paypalMoneda").val(moneda);
            $("#paypalIdBoton").val("p80");
            $("#paypalPrecio").val(12 / cambio);
            var formulario = document.getElementById('formPago');
            $("#submitPaypal").val(80);
            formulario.appendChild(input);
            break;
        };
    case 200: //es el popup de guardar programacion
        {
            $("#paypalMoneda").val(moneda);
            $("#paypalIdBoton").val("p200");
            $("#paypalPrecio").val(30 / cambio);
            var formulario = document.getElementById('formPago');
            $("#submitPaypal").val(200);
            formulario.appendChild(input);
            break;
        };
    case 500: //es el popup de guardar programacion
        {
            $("#paypalMoneda").val(moneda);
            $("#paypalIdBoton").val("p500");
            $("#paypalPrecio").val(75 / cambio);
            var formulario = document.getElementById('formPago');
            $("#submitPaypal").val(500);
            formulario.appendChild(input);
            break;
        };
    default:
        notificacion("Paquete no disponible " + id);
        //abrirPopupAviso("Paquete no disponible " + id);

    }




    $("#inputcreditosPaquetesCantidad").val("Comprar " + id + " Creditos");
    //restComprarCreditos(id);

    //alert("comprar paquete con id " + id);

}

// Proceso que se encarga de Guardar el anuncio despues de haber seleccionado el horario o los segundos (O si se pulsa ahora y no tienes creditos se lanza automaticamente)

function procesoGuardarAnuncio() {
    horaInicio = $("#innuevoAnuncio4Inicio").val();
    horaFin = $("#innuevoAnuncio4Fin").val();
    creditos = $("#innuevoAnuncio4Segundos").val();
    procesoNuevoAnuncio6();

    // Comprueba si estamos guardando la programacion de un anuncio nuevo o relanzado.
    if (JsonAnuncio.length == 0) {
        if (calendario == true) {
            displayCalendario();
        } else {
            $("#btnnuevoAnuncio7Subir").hide();
            displayNuevoAnuncio7(); // Ir directamente a subir la imagen
        }
    } else {

        // Si estamos relanzando un aviso anterior, pasamos directamente a publicar
        if (calendario == true) {
            displayCalendario();
        } else {
            if (JsonAnuncio[posicion].relanzar == 1) {
                procesoNuevoAnuncio9();
            } else {
                $("#btnnuevoAnuncio7Subir").hide();
                displayNuevoAnuncio7(); // Ir directamente a subir la imagen
            }
        }
    }
}


// Proceso que carga la información que viene del ws en una lista de anuncios paginable
function procesoMisAnuncios(anuncios) {

    JsonAnuncio = [];
    posicionPagina = 0;

    $("#ulmisAnuncios").empty();

    $("#ulmisAnuncios").listview();

    if (anuncios.lista[0].validacion == "vacio") {
        notificacion("No tienes anuncios previos");
    } else {
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

}


// función para paginar mis anuncios segun la variable posicionPagina
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

// Funcion que carga en la vista toda la información del anuncio
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

// Cargar una notificacion
function notificacion(mensaje) {
    $("#PopUpNotificacion").popup("open");
    $("#PopUpNotificacionTexto").text(mensaje);
    setTimeout(' $("#PopUpNotificacion").popup("close")', tiempoNotificacion);
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
            $("#btnPopUpAccionB").text("Ahora !");
            break;
        };
    case "guardarProgramacion":
        {
            $("#lbPopUpAccion").text(mensaje);
            $("#btnPopUpAccionA").text("Youttear de nuevo!");
            $("#btnPopUpAccionB").text("Ir al Menú Principal");
            break;
        };
    default:
        console.log(tipo);
    }
    $("#lbPopUpAccionTitulo").val(tipo);
    $("#PopUpAccion").popup("open");
}

// FUNCION PARA TRADUCIR TODA LA APP SEGÚN EL ID DE PAIS
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

// la foto se ha subido correctamente (por modificaciones del codigo, al final solo muestra la ultima pantalla antes de subir la imagen)
function enviarFoto(r) {
    //$.mobile.loading('hide');
    //$("#lbPopUpAviso").text(r);
    //$("#PopUpAviso").popup("open");
    displayNuevoAnuncio9();
}

// Ha habido algún error en el envío de la imagen, lo notificamos
function errorenviarFoto(r) {

    notificacion(r);
    //abrirPopupAviso(r);
}

// Función para paginar Adelante mis anuncios
function paginarAdelante(event) {
    if (posicionPagina < (JsonAnuncio.length - paginasPorPantalla)) {
        posicionPagina = posicionPagina + paginasPorPantalla;
        paginarMisAnuncios();
    }
}

// Función para paginar atras mis anuncios
function paginarAtras(event) {
    if (posicionPagina != 0) {
        posicionPagina = posicionPagina - paginasPorPantalla;
        paginarMisAnuncios();
    }
}

// funcion para paginar mis creditos adelante
function paginarAdelanteCreditos() {
    if (posicionPagina < (JsonMovimientos.length - paginasPorPantallaCreditos)) {
        posicionPagina = posicionPagina + paginasPorPantallaCreditos;
        paginarMisCreditos();
    }
}

// Funcion para paginar mis creditos atrás
function paginarAtrasCreditos() {
    if (posicionPagina != 0) {
        posicionPagina = posicionPagina - paginasPorPantallaCreditos;
        paginarMisCreditos();
    }
}

// funcion para checkear si el email indroducido tiene un formato válido
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};

// Función para checkear si el password introducido es válido
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

// Funcion que localiza tu posición y llama a showPosition para guardar la latitud y longitud en memoria
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// Guarda en memoria la posicion actual
function showPosition(position) {
    latitudActual = position.coords.latitude;
    longitudActual = position.coords.longitude;
    //restGeolocalizacion();
    console.log("Latitude: " + position.coords.latitude +
        "Longitude: " + position.coords.longitude);
}

// Funcion que calcula la distancia entre dos puntos geologicos (No se usa, lo hace el ws)
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