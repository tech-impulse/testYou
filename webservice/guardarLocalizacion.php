<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = mysql_real_escape_string($_GET["idSesion"]);
$horaInicio = mysql_real_escape_string($_GET["horaInicio"]);
$horaFin = mysql_real_escape_string($_GET["horaFin"]);
$creditos = mysql_real_escape_string($_GET["creditos"]);
$idLocalizacion = mysql_real_escape_string($_GET["idLocalizacion"]);

//$sql = 'SELECT * FROM Ubicaciones WHERE idClient='.$id.' AND CodigoPostal='.$cp.' ORDER BY Direccion;'; 


	$sql_upd = 'UPDATE Programacion SET horaDesde="'.$horaInicio.'" , horaHasta="'.$horaFin.'", Segundos="'.$creditos.'" WHERE idUsuario="'.$id.'" AND idPantalla="'.$idLocalizacion.'";';
	if ($resultado = mysql_query($sql_upd, $con)){
            $resultados["mensaje"] = "Programación modificada";
			$resultados["validacion"] = "ok"; 
	}
	else
	{
		$resultados["mensaje"] = "Error de consulta del servicio";
		$resultados["validacion"] = "error";
	}

mysql_close($con);

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>