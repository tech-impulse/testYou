<?php 

include 'connection.php';

$resultados = array();

$lista = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);


$sql = 'SELECT * FROM preciosCreditos order by id'; 
 
$resultado = mysql_query($sql, $con);

$i=0;
		while ($obj = mysql_fetch_object($resultado)) 
    {        	      
     $resultados["id"] = $obj->id;
     $resultados["cantidad"] = utf8_encode($obj->cantidad);
     $resultados["precio"] = utf8_encode($obj->precio);
     $lista[] = $resultados;
            
     $i++;
		}
		if ($i==0){
			$lista["validacion"] = "empty"; 
		}


mysql_close($con);

$resultadosJson = json_encode($lista);
echo ' { "paquetes" : '.$resultadosJson .'}';
 
?>