<?php 

include 'connection.php';

$resultados = array();

$lista = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = mysql_real_escape_string($_GET["idSesion"]);

$sql = 'SELECT * FROM Ubicaciones WHERE idClient='.$id.' ORDER BY Direccion;'; 
 
$resultado = mysql_query($sql, $con);

$i=0;
		while ($obj = mysql_fetch_object($resultado)) 
    {        	      
     $resultados["id"] = $obj->id;
     $resultados["idSector"] = $obj->idSector;
     $resultados["Direccion"] = $obj->Direccion;
     $resultados["Poblacion"] = $obj->Poblacion;
     $resultados["Provincia"] = $obj->Provincia;
     $resultados["CodigoPostal"] = $obj->CodigoPostal;
     $resultados["idPais"] = $obj->idPais;
     $resultados["LatitudGPS"] = $obj->LatitudGPS;
     $resultados["LongitudGPS"] = $obj->LongitudGPS;
     $lista[] = $resultados;
            
     $i++;
		}
		if ($i==0){
			$lista["validacion"] = "empty"; 
		}


mysql_close($con);

$resultadosJson = json_encode($lista);
echo ' { "localizaciones" : '.$resultadosJson .'}';
 
?>