<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$idPantalla = mysql_real_escape_string($_GET["idPantalla"]);
$idUsuario = mysql_real_escape_string($_GET["idSesion"]);
$fechaProgramacion = mysql_real_escape_string($_GET["fechaProgramacion"]);
$horaDesde = mysql_real_escape_string($_GET["horaInicio"]);
$horaHasta = mysql_real_escape_string($_GET["horaFin"]);
$creditos = mysql_real_escape_string($_GET["creditos"]);
$idLocalizacion = mysql_real_escape_string($_GET["idLocalizacion"]);


//$sql = 'SELECT * FROM Ubicaciones WHERE idClient='.$id.' AND CodigoPostal='.$cp.' ORDER BY Direccion;'; 
$sql_sel = 'SELECT idImagen FROM Usuarios WHERE id='.$id.';';
	if ($resultado = mysql_query($sql_sel, $con)){
        while ($obj = mysql_fetch_object($resultado)) 
        {        	      
            $resultados["idImagen"] = $obj->idImagen;    
            $nombre = $id . "." . $resultados["idImagen"];
            $i++;
		}
	}

	$sql_upd = 'INSERT INTO Programacion ( , ' .$idPantalla. ',' .$idUsuario. ',' .$resultados["idImagen"]. ',' .$fechaProgramacion. ', CURDATE() ,' .$horaDesde. ',' .$horaHasta. ',' .$creditos. ');';
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