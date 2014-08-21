<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$usu = mysql_real_escape_string($_POST["usuario"]);
$pass = mysql_real_escape_string($_POST["password"]);

$resultados["us"] = $_POST['usuario'];


$resultados["validacion"] = "Sin validar"; 
 
$sql = 'SELECT * FROM Usuarios WHERE Email="'.$usu.'" AND Password="'.$pass.'";';
//$resultados["linea"] = $sql;
 
if ($resultado = mysql_query($sql, $con)){
		$resultados["validacion"] = "comprobado";
	  $resultados["linea"] = $resultados;
	  
    if (mysql_num_rows($resultado) > 0){
    $resultados["mensaje"] = "Validacion Correcta";
		$resultados["validacion"] = "ok";   
		
			$i=0;
        
        	while ($obj = mysql_fetch_object($resultado)) 
            {        	      
             $resultados["id_user"] = $obj->id;
             $resultados["Creditos"] = $obj->Creditos;  
             $resultados["Nombre"] = utf8_encode($obj->Nombre);
             $resultados["Apellidos"] = utf8_encode($obj->Apellidos);
             $resultados["Email"] = $obj->Email;
             $resultados["Direccion"] = $obj->Direccion;
             $resultados["Poblacion"] = $obj->Poblacion;
             $resultados["Provincia"] = $obj->Provincia;
             $resultados["TelefonoContacto"] = $obj->TelefonoContacto;
             $resultados["Pais"] = $obj->idPais;

                if($obj->CuentaPaypal == 1)
                {
             $resultados["CuentaPaypal"] = "Si";
                }
                else {
                    $resultados["CuentaPaypal"] = "No";
                }
            
             $i++;
                }  
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
	//$resultados["consulta"] = $resultado;
}
mysql_close($con);

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>
