<?php 

include 'connection.php';

$resultados = array();

$calle = array();

$lista = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = mysql_real_escape_string($_GET["idSesion"]);
$cp = mysql_real_escape_string($_GET["codigo"]);

$sql = 'SELECT * FROM Ubicaciones WHERE idClient='.$id.' AND CodigoPostal='.$cp.' ORDER BY Direccion;'; 
 
$resultado = mysql_query($sql, $con);

$i=0;
		while ($obj = mysql_fetch_object($resultado)) 
    {        	      
     $calle["id"] = $obj->id;
     $calle["Direccion"] = $obj->Direccion;
     $calle["Poblacion"] = $obj->Poblacion;
     $calle["Provincia"] = $obj->Provincia;
     $resultados["CodigoPostal"] = $obj->CodigoPostal;
     $calle["LatitudGPS"] = $obj->LatitudGPS;
     $calle["LongitudGPS"] = $obj->LongitudGPS;
     $resultados["calles"][] = $calle;      
            
     $i++;
		}
		if ($i==0){
			$lista["validacion"] = "empty"; 
		}


mysql_close($con);

$resultadosJson = json_encode($resultados);
echo ' { "localizaciones" : ['.$resultadosJson .']}';
 
?>