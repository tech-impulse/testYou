<?php 

include 'connection.php';

$anuncio = array();
$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = mysql_real_escape_string($_GET["idSesion"]);
    
$sql = ' SELECT pr.idImagen, pr.Fecha_programacion, u.Direccion FROM Programacion AS pr, Pantallas AS pa, Ubicaciones as u WHERE pr.idUsuario=' . $id . ' AND pr.idPantalla=pa.id AND pa.idUbicacion=u.id ORDER BY pr.Fecha DESC LIMIT 5'; 

$resultados["query"] = $sql;
 
$resultado = mysql_query($sql, $con);

$i=0;
    while ($obj = mysql_fetch_object($resultado)) 
    {        	      
     $anuncio["idImagen"] = $obj->idImagen;
     $anuncio["fecha"] = $obj->Fecha_programacion;
     $anuncio["direccion"] = $obj->Direccion;
     $anuncio["urlImagen"] = "http://admin.youtter.com/YoutterUploads/". $id . "." . $anuncio["idImagen"] . ".jpg";
     $resultados["anuncios"][] = $anuncio;
      
     $i++;
		}
		if ($i==0){
            $resultados["mensaje"] = "No se han publicacio anuncios"; 
			$resultados["validacion"] = "vacio"; 
		}

mysql_close($con);

$resultadosJson = json_encode($resultados);
echo ' { "lista" : ['.$resultadosJson .']}';
 
?>