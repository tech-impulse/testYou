<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$Nombre = mysql_real_escape_string($_GET["Nombre"]);
$Apellidos = mysql_real_escape_string($_GET["Apellidos"]);
$Email = mysql_real_escape_string($_GET["Email"]);
$Password = mysql_real_escape_string($_GET["Password"]);

$sql_upd = 'INSERT INTO Usuarios (id, Nombre, Apellidos, Email, Password, AceptaPolitica, CuentaPaypal, Creditos, idImagen) VALUES ( null , "' .$Nombre. '","' .$Apellidos. '","'. $Email . '","' .$Password. '", 1 , 0 , 0 , 0);';

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