<?php 

include 'connection.php';

$resultados = array();

$lista = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);


$sql = 'SELECT * FROM Paises WHERE id>0 ORDER BY id'; 
 
$resultado = mysql_query($sql, $con);

$i=0;
		while ($obj = mysql_fetch_object($resultado)) 
    {        	      
     $resultados["idPais"] = $obj->id;
     $resultados["Nombre"] = utf8_encode($obj->Nombre);
     $lista[] = $resultados;
            
     $i++;
		}
		if ($i==0){
			$lista["validacion"] = "empty"; 
		}


mysql_close($con);

$resultadosJson = json_encode($lista);
echo ' { "paises" : '.$resultadosJson .'}';
 
?>