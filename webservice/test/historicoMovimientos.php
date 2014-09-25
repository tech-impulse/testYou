<?php 

include 'connection.php';

$movimiento = array();
$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = mysql_real_escape_string($_GET["idSesion"]);
    
$sql = ' SELECT * FROM Historico_Movimientos WHERE  id_usuario=' . $id . ' ORDER BY fecha DESC'; 

//$resultados["query"] = $sql;
 
$resultado = mysql_query($sql, $con);

$i=0;
    while ($obj = mysql_fetch_object($resultado)) 
    {        	      
     $movimiento["importe"] = $obj->Importe;
     $movimiento["credito_actual"] = $obj->credito_actual;
     $movimiento["gratis"] = $obj->Gratis;
     $movimiento["fecha"] = $obj->fecha;
     $resultados["movimientos"][] = $movimiento;
      
     $i++;
		}
		if ($i==0){
            $resultados["mensaje"] = "No hay movimientos previos"; 
			$resultados["validacion"] = "vacio"; 
		}


mysql_close($con);


$resultadosJson = json_encode($resultados);
echo ' { "lista" : ['.$resultadosJson .']}';
 
?>