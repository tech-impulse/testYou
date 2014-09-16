<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$Nombre = $_POST["Nombre"];
$Apellidos = $_POST["Apellidos"];
$Email = $_POST["Email"];
$Password = md5($_POST["Password"]);
$idPais = $_POST["idPais"];

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