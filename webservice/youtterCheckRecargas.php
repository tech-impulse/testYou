<?php 

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$sql_sel = 'SELECT * FROM Recargas;';

$resultado = mysql_query($sql_sel, $con);

$i=0;
		while ($obj = mysql_fetch_object($resultado)) 
        {        	      
            $resultados["id"] = $obj->id;
            $resultados["fecha"] = $obj->Fecha; 
            $tiempoPago = strtotime($resultados["fecha"]);
            $tiempoAhora = strtotime(date("Y-m-d H:i:s"));
            $differenceInMinutes = round(abs($tiempoAhora - $tiempoPago) / 60,2);
            
                if($differenceInMinutes > 30)
                {
                    $sql_del = 'DELETE FROM Recargas WHERE id='.$resultados["id"].' AND Pagado=0;';
                    mysql_query($sql_del, $con);
                }               
            $i++;
		}

mysql_close($con);
 
?>
