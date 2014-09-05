<?php 

include 'connection.php';

$resultados = array();

$calle = array();

$lista = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 

$sql = ' SELECT *, p.id as idPantalla FROM Ubicaciones AS u, Pantallas AS p, tiposPantallas AS t WHERE p.activa=1 AND p.idUbicacion=u.id AND p.idTipoPantalla = t.id ORDER BY Direccion'; 

//$resultados["query"] = $sql;
 
$resultado = mysql_query($sql, $con);

$i=0;
    while ($obj = mysql_fetch_object($resultado)) 
    {        	      
     $calle["id"] = $obj->id;
     $calle["Direccion"] = $obj->Direccion;
     $calle["Poblacion"] = $obj->Poblacion;
     $calle["Provincia"] = $obj->Provincia;
     $calle["LatitudGPS"] = $obj->LatitudGPS;
     $calle["LongitudGPS"] = $obj->LongitudGPS;
     $calle["Descripcion"] = $obj->Descripcion;
     $calle["HorarioDesde"] = $obj->HorarioDesde;
     $calle["HorarioHasta"] = $obj->HorarioHasta;
     $calle["idPantalla"] = $obj->idPantalla;
     $calle["CodigoPostal"] = $obj->CodigoPostal;
     $calle["distancia"] = "";
    // $resultados["CodigoPostal"] = $obj->CodigoPostal;
     $resultados[$obj->CodigoPostal][] = $calle;   
            
     $i++;
		}
		if ($i==0){
            $resultados["mensaje"] = "No hay pantallas disponibles para esta ubicación"; 
			$resultados["validacion"] = "vacio"; 
		}


mysql_close($con);


$resultadosJson = json_encode($resultados);
echo ' { "localizaciones" : ['.$resultadosJson .']}';
 
?>





