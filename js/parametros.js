var url = "https://admin.youtter.com/webservices/";

//var url = "http://testhtml5.esadecreapolis.com/youtter/webservice/";

// VARIABLES QUE SE USAN EN LA APP
var pantallaApp; // Pantalla actual para poder esconder/enseñar secciones
var fechaSeleccionada; // FECHA QUE SE SELECCIONA DEL CALENDARIO
var idSesion; // ID DE LA SESION DEL USUARIO (ID DE USUARIO EN BASE DE DATOS)
var usuarioBloqueado = 0; // FLAG PARA VERIFICAR SI LA CUENTA ESTA BLOQUEADA
var creditosDisponibles; // CREDITOS DE LOS QUE DISPONE EL USUARIO PARA GASTAR
var JsonCalle = []; // JSON CON TODAS LAS CALLES DISPONIBLES DESPUES DE SELECCIONAR UNA UBICACION
var JsonAnuncio = []; // JSON CON TODA LA INFORMACION DE LOS ANUNCIOS JUNTO CON EL QUE SE VA A PUBLICAR
var JsonMovimientos = [];
var JsonFechas = []; // JSON CON LA LISTA DE FECHAS DONDE SE VA A PUBLICAR EL ANUNCIO
var JsonCalendario = []; // JSON CON LA LISTA DE FECHAS DONDE SE VA A PUBLICAR EL ANUNCIO
var CodigoPostal; // Variable que guarda el codigo postal
var posicion; // variable para guardar la posicion actual en cualquier posicion
var mesActual = 0; // 
var posicionPagina = 0; // variable para guardar la posicion actual de la pagina
var creditos; // creditos que se van a gastar (segundos)
var horaInicio; // hora de inicio de la programacion
var horaFin; // Hora de fin de programacion
var calendario; // booleano para ver si el calendario es necesario o no
var idPantalla; // id de la pantalla seleccionada
var idPais; // id del pais seleccionado
var formData; // Variable que incluye la información de la imagen, junto con la id de Sesion y si es un video
var video; // Variable que indica si es un video o no en caso no especificado por la plataforma
var longitudActual; // Variable que indica la longitud actual de tu geolocalizacion
var latitudActual; // Variable que indica la latitud actual de tu geolocalizacion
var map; // Variable global de mapa de google para poder reutilizarlo en otras funciones una vez creado
var token; // token de la sesion del usuario que se utiliza en algunos ws
var moneda; // Siglas de la moneda de tu pais, se utiliza en el modulo de Paypal para cambiar los precios y el tipo de moneda
var cambio; // factor para cambiar la moneda Pej de euros a Dolares
var peticionActual; // Petición AJAX actual, necesario para poder cancelarla si se requiriera
var tiempoNotificacion = 1500; // 1 Segundo se mantiene abierta el popup de notificacion

var paginasPorPantalla = Math.round(($(window).height() * 0.4) / 80); // Numero de anuncios que caben por pantalla
var paginasPorPantallaCreditos = Math.round(($(window).height() * 0.4) / 30); // Numero de detalle de movimientos que caben por pantalla
