<?php 

header('Access-Control-Allow-Origin: *'); 


$server = "mysql.hostinger.es";
$username = "u676222109_a";
$password = "b0pensimper";
$database = "u676222109_a";

$resultados = array();
$lista = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);

$medida = $_GET["medida"];

$sql = 'SELECT * FROM historicoMedidas WHERE DATEDIFF(NOW(), fecha) <= 7 ORDER BY fecha DESC;';
$resulset = mysql_query($sql, $con);
if ($medida == "tc"){
            while ($obj = mysql_fetch_object($resulset)) {
                 $resultados["fecha"] = $obj->fecha;
                 $resultados["valor"] = $obj->temperaturaZonaCalida;
                 $lista[] = $resultados;
            }
}
if ($medida == "hc"){
            while ($obj = mysql_fetch_object($resulset)) {
                 $resultados["fecha"] = $obj->fecha;
                 $resultados["valor"] = $obj->humedadZonaCalida;
                 $lista[] = $resultados;
            }
} 
if ($medida == "tf"){
            while ($obj = mysql_fetch_object($resulset)) {
                 $resultados["fecha"] = $obj->fecha;
                 $resultados["valor"] = $obj->temperaturaZonaFria;
                 $lista[] = $resultados;
            }
} 
if ($medida == "hf"){
            while ($obj = mysql_fetch_object($resulset)) {
                 $resultados["fecha"] = $obj->fecha;
                 $resultados["valor"] = $obj->humedadZonaFria;
                 $lista[] = $resultados;
            }
} if ($medida == "lum"){
            while ($obj = mysql_fetch_object($resulset)) {
                 $resultados["fecha"] = $obj->fecha;
                 $resultados["valor"] = $obj->luminiscencia;
                 $lista[] = $resultados;
            }
}

mysql_close($con);

$resultadosJson = json_encode($lista);
echo ' { "muestras" : '.$resultadosJson .'}';


 
?>  		

