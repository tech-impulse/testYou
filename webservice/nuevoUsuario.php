<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$Nombre = mysql_real_escape_string($_GET["Nombre"]);
$Apellidos = mysql_real_escape_string($_GET["Apellidos"]);
$Email = mysql_real_escape_string($_GET["Email"]);
$Password = mysql_real_escape_string($_GET["Password"]);
$idPais = mysql_real_escape_string($_GET["idPais"]);

$sql_upd = 'INSERT INTO Usuarios (id, Nombre, Apellidos, Email, Password, idPais, AceptaPolitica, CuentaPaypal, Creditos, idImagen, activo) VALUES ( null , "' .$Nombre. '","' .$Apellidos. '","'. $Email . '","' .$Password. '", ' . $idPais . ', 1 , 0 , 0 , 1, 1);';

if ($resultado = mysql_query($sql_upd, $con)){
            $resultados["mensaje"] = "Usuario dado de alta correctamente " ;
        
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