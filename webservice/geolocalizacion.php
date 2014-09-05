<?php 

include 'connection.php';

$resultados = array();

$UbicacionMasCerca = array();

$calle = array();

$lista = array();

$lat1 = $_GET["latitud"];
$lng1 = $_GET["longitud"];
$distanciaMinima = 100; // 100 km
 
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
     $calle["LatitudGPSActual"] = $lat1;
     $calle["LongitudGPSActual"] = $lng1;
     $calle["Descripcion"] = $obj->Descripcion;
     $calle["HorarioDesde"] = $obj->HorarioDesde;
     $calle["HorarioHasta"] = $obj->HorarioHasta;
     $calle["idPantalla"] = $obj->idPantalla;
     $calle["CodigoPostal"] = $obj->CodigoPostal;
    // $resultados["CodigoPostal"] = $obj->CodigoPostal;
     $lat2 = $obj->LatitudGPS;
     $lng2 = $obj->LongitudGPS;
        
    $pi80 = M_PI / 180;
	$lat1 *= $pi80;
	$lng1 *= $pi80;
	$lat2 *= $pi80;
	$lng2 *= $pi80; 
	$r = 6372.797; // mean radius of Earth in km
	$dlat = $lat2 - $lat1;
	$dlng = $lng2 - $lng1;
	$a = sin($dlat / 2) * sin($dlat / 2) + cos($lat1) * cos($lat2) * sin($dlng / 2) * sin($dlng / 2);
	$c = 2 * atan2(sqrt($a), sqrt(1 - $a));
    $disntanciaKm = $r * $c;
    
    $calle["distancia"] = $disntanciaKm;
        
        if($disntanciaKm<0.5){
            $resultados[$obj->CodigoPostal][] = $calle; 
            $i++;
        } else {
            if ($disntanciaKm<$distanciaMinima){
                unset($UbicacionMasCerca);
                $UbicacionMasCerca = array();
                $distanciaMinima = $disntanciaKm;
                $UbicacionMasCerca[$obj->CodigoPostal][] = $calle;
            }
        }
     
    }

    if ($i==0){
            $resultados = $UbicacionMasCerca;
            //$resultados["mensaje"] = "La pantalla mas cercana está a " . $disntanciaKm*1000 . " metros"; 
			//$resultados["validacion"] = "unica"; 
    }


mysql_close($con);


$resultadosJson = json_encode($resultados);
echo ' { "localizaciones" : ['.$resultadosJson .']}';
 
?>
