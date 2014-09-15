<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = mysql_real_escape_string($_GET["idSesion"]);
$token = mysql_real_escape_string($_GET["token"]);
$idPaquete = mysql_real_escape_string($_GET["idPaquete"]);

$sql_upd = 'INSERT INTO Recargas (id, idUsuario, Token, Creditos, Fecha, Pagado) VALUES ( null , "' .$id. '","' .$token. '","'. $idPaquete . '",NOW(), 0);';

if ($resultado = mysql_query($sql_upd, $con)){
            $resultados["mensaje"] = "Precarga hecha" ;
        
			$resultados["validacion"] = "ok"; 
             
	}
	else
	{
		$resultados["mensaje"] = "Error de consulta del servicio";
		$resultados["validacion"] = "error";
        $resultados["query"] = $sql_upd;
	}

mysql_close($con);

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>
