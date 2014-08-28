var url = "http://admin.youtter.com/webservices/";

//var url = "http://testhtml5.esadecreapolis.com/youtter/webservice/";

// VARIABLES QUE SE USAN EN LA APP
var pantallaApp;
var fechaSeleccionada; // FECHA QUE SE SELECCIONA DEL CALENDARIO
var idSesion; // ID DE LA SESION DEL USUARIO (ID DE USUARIO EN BASE DE DATOS)
var creditosDisponibles; // CREDITOS DE LOS QUE DISPONE EL USUARIO PARA GASTAR
var JsonCalle = []; // JSON CON TODAS LAS CALLES DISPONIBLES DESPUES DE SELECCIONAR UNA UBICACION
var JsonAnuncio = []; // JSON CON TODA LA INFORMACION DE LOS ANUNCIOS JUNTO CON EL QUE SE VA A PUBLICAR
var CodigoPostal; // Variable que guarda el codigo postal
var posicion; // variable para guardar la posicion actual en cualquier posicion
var creditos; // creditos que se van a gastar (segundos)
var horaInicio; // hora de inicio de la programacion
var horaFin; // Hora de fin de programacion
var calendario; // booleano para ver si el calendario es necesario o no
var idPantalla; // id de la pantalla seleccionada
var idPais; // id del pais seleccionado
var formData; // Variable que incluye la información de la imagen, junto con la id de Sesion y si es un video
var video; // Variable que indica si es un video o no en caso no especificado por la plataforma