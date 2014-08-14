<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = mysql_real_escape_string($_GET["idSesion"]);
$idPaquete = mysql_real_escape_string($_GET["idPaquete"]);

//$sql = 'SELECT * FROM Ubicaciones WHERE idClient='.$id.' AND CodigoPostal='.$cp.' ORDER BY Direccion;'; 

$sql = 'SELECT Creditos FROM Usuarios WHERE id="'.$id.'"';
if($resultado = mysql_query($sql, $con)) {

    $i=0;
    while ($obj = mysql_fetch_object($resultado)) 
    {        	      
    $creditos = $obj->Creditos;
    $i++;
    }
            
    $valorTotal = $creditos+$idPaquete;
	$sql_upd = 'UPDATE Usuarios SET Creditos="'.$valorTotal.'";';
	if ($resultado = mysql_query($sql_upd, $con)){
            $resultados["mensaje"] = "Completado: Saldo actual " . $valorTotal . " Creditos";
			$resultados["validacion"] = "ok"; 
	}
	else
	{
		$resultados["mensaje"] = "Error de consulta del servicio";
		$resultados["validacion"] = "error";
	}
}
else
{
	$resultados["mensaje"] = "Error de consulta de proceso";
	$resultados["validacion"] = "error";
}
mysql_close($con);

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>