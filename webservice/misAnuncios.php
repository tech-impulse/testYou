<?php 

include 'connection.php';

$anuncio = array();
$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = mysql_real_escape_string($_GET["idSesion"]);
    
$sql = ' SELECT pr.id, pr.idImagen, pr.Fecha_programacion, pr.video, pa.id as idPantalla, u.Direccion, u.CodigoPostal, u.Poblacion, t.Descripcion, u.LatitudGPS, u.LongitudGPS FROM Programacion AS pr, Pantallas AS pa, Ubicaciones as u, tiposPantallas as t WHERE pr.idUsuario=' . $id . ' AND pr.idPantalla=pa.id AND pa.idUbicacion=u.id AND t.id=pa.id ORDER BY pr.Fecha DESC LIMIT 5'; 

$resultados["query"] = $sql;
 
$resultado = mysql_query($sql, $con);

$i=0;
    while ($obj = mysql_fetch_object($resultado)) 
    {     
     $anuncio["IdProgramacion"] = $obj->id;
     $anuncio["IdPantalla"] = $obj->idPantalla;
     $anuncio["IdImagen"] = $obj->idImagen;
     $anuncio["Fecha"] = $obj->Fecha_programacion;
     $anuncio["CodigoPostal"] = $obj->CodigoPostal;
     $anuncio["Poblacion"] = $obj->Poblacion;
     $anuncio["Direccion"] = $obj->Direccion;
     $anuncio["Descripcion"] = $obj->Descripcion;
     $anuncio["video"] = $obj->video;
     $anuncio["LatitudGPS"] = $obj->LatitudGPS;
     $anuncio["LongitudGPS"] = $obj->LongitudGPS;
        
            
     $anuncio["urlImagen"] = "http://admin.youtter.com/YoutterUploads/". $id . "." . $obj->idImagen . ".jpg";
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