<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$Token = $_POST["Token"];
$Password = $_POST["Password"];

$sql_sel = 'SELECT Email, Fecha FROM Incidencias WHERE Token="'. $Token . '";';

    if ($resultado = mysql_query($sql_sel, $con)){
    
     while ($obj = mysql_fetch_object($resultado)) 
        {        	      
            $resultados["Email"] = $obj->Email;  
            $resultados["Fecha"] = $obj->Fecha;           
            $timeFirst  = strtotime($resultados["Fecha"]);
            $timeSecond = strtotime(date("Y-m-d h:i:s"));
            $differenceInSeconds = $timeSecond - $timeFirst;
            $resultados["Fecha"] = $differenceInSeconds;
              //echo $resultados["Fecha"];
            $i++;
		}       
        if( $resultados["Fecha"] < 1800){
            $sql_upd = 'UPDATE Usuarios SET Password="'.$Password.'" WHERE Email="'.$resultados["Email"].'";';

            if ($resultado = mysql_query($sql_upd, $con)){
                $resultados["mensaje"] = "Cambio de password correcto" ;

                $resultados["validacion"] = "ok"; 

            }
            else
            {
                $resultados["mensaje"] = "Error de consulta del servicio";
                $resultados["validacion"] = "error";
            }  
        }
        else {
            $resultados["mensaje"] = "El token está caducado, vuelva a solicitar de nuevo el password";
            $resultados["validacion"] = "caducado";
        }
	}
	else
	{
		$resultados["mensaje"] = "Error de consulta del servicio, token no existe";
		$resultados["validacion"] = "error";
        $resultados["sql"] = $sql_sel;
	}
$resultados["sql1"] = $sql_sel;
$resultados["sql2"] = $sql_upd;

mysql_close($con);

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>