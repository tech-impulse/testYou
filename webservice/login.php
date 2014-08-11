<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$usu = mysql_real_escape_string($_POST["usuario"]);
$pass = mysql_real_escape_string($_POST["password"]);

$resultados["us"] = $_POST['usuario'];


$resultados["validacion"] = "Sin validar"; 
 
$sql = 'SELECT id FROM Usuarios WHERE Email="'.$usu.'" AND Password="'.$pass.'";';
$resultados["linea"] = $sql;
 
if ($resultado = mysql_query($sql, $con)){
		$resultados["validacion"] = "comprobado";
	  $resultados["linea"] = $resultados;
	  
    if (mysql_num_rows($resultado) > 0){
    $resultados["mensaje"] = "Validacion Correcta";
		$resultados["validacion"] = "ok";   
		
			$i=0;
			while($row=mysql_fetch_array($resultado)){
	               $a1=$row[$i]; 
				   $i++;
			}
	        $resultados["id_user"] = $a1;    
	    }
    else
    {
    $resultados["mensaje"] = "Credenciales no validas";
		$resultados["validacion"] = "invalido";   
    }
}
else
{
  $resultados["mensaje"] = "Error de consulta del servicio";
	$resultados["validacion"] = "error";
	$resultados["consulta"] = $resultado;
}
mysql_close($con);

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>
