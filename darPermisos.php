<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);

$userId = $_POST["idUser"];
$codig = $_POST["Hash"];

$sql_upd = 'UPDATE Usuarios SET activo=1,bloqueado=0 WHERE id="' .$userId. '" AND Hash="' .$codig. '"';

$resultado = mysql_query($sql_upd, $con);
    
if ($resultado){//se ha actualizado correctamente

    $resultados["mensaje"] = "Usuario dado de alta correctamente";
    $resultados["validacion"] = "ok";
  
}else{
    $resultados["mensaje"] = "Error de consultas";
    $resultados["validacion"] = "error";
    $resultados["query"] = $sql;
}

mysql_close($con);

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>