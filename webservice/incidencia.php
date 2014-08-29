<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = $_POST["idSesion"];
$Asunto = $_POST["Asunto"];
$Descripcion = $_POST["Descripcion"];

$sql_upd = 'INSERT INTO Incidencias (id, idUsuario, Asunto, Descripcion, Fecha) VALUES ( null , "' .$id. '","' .$Asunto. '","'. $Descripcion . '", NOW() );';

if ($resultado = mysql_query($sql_upd, $con)){
            $resultados["mensaje"] = "Incidencia reportada" ;
        
			$resultados["validacion"] = "ok";              
	}
	else
	{
		$resultados["mensaje"] = "No se ha podido reportar la incidencia";
		$resultados["validacion"] = "error";
        $resultados["query"] = $sql_upd;
	}

mysql_close($con);

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>