<?php 

include 'connection.php';

$resultados = array();

$lista = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
$idPais = mysql_real_escape_string($_GET["idPais"]);

mysql_select_db($database, $con);


$sql = 'SELECT * FROM Provincias WHERE idPais=' . $idPais . '  ORDER BY id'; 
 
$resultado = mysql_query($sql, $con);

$i=0;
		while ($obj = mysql_fetch_object($resultado)) 
    {        	      
     $resultados["idProvincia"] = $obj->id;
     $resultados["Nombre"] = utf8_encode($obj->Nombre);
     $resultados["CodigoPostal"] = $obj->CodigoPostal;
     $lista[] = $resultados;
            
     $i++;
		}
		if ($i==0){
			$lista["validacion"] = "empty"; 
		}


mysql_close($con);

$resultadosJson = json_encode($lista);
echo ' { "provincias" : '.$resultadosJson .'}';
 
?>