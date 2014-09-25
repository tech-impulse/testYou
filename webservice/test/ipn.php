  
<?php

include 'connection.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);

define("DEBUG", 1);

// Set to 0 once you're ready to go live
define("USE_SANDBOX", 1);


define("LOG_FILE", "./ipnLOG14.log");


// Read POST data
// reading posted data directly from $_POST causes serialization
// issues with array data in POST. Reading raw POST data from input stream instead.
$raw_post_data = file_get_contents('php://input');
$raw_post_array = explode('&', $raw_post_data);
$myPost = array();
foreach ($raw_post_array as $keyval) {
	$keyval = explode ('=', $keyval);
	if (count($keyval) == 2)
		$myPost[$keyval[0]] = urldecode($keyval[1]);
}
// read the post from PayPal system and add 'cmd'
$req = 'cmd=_notify-validate';
if(function_exists('get_magic_quotes_gpc')) {
	$get_magic_quotes_exists = true;
}
foreach ($myPost as $key => $value) {
	if($get_magic_quotes_exists == true && get_magic_quotes_gpc() == 1) {
		$value = urlencode(stripslashes($value));
	} else {
		$value = urlencode($value);
	}
	$req .= "&$key=$value";
}

// Post IPN data back to PayPal to validate the IPN data is genuine
// Without this step anyone can fake IPN data

if(USE_SANDBOX == true) {
	$paypal_url = "https://www.sandbox.paypal.com/cgi-bin/webscr";
} else {
	$paypal_url = "https://www.paypal.com/cgi-bin/webscr";
}

$ch = curl_init($paypal_url);
if ($ch == FALSE) {
	return FALSE;
}

curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $req);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
curl_setopt($ch, CURLOPT_FORBID_REUSE, 1);

if(DEBUG == true) {
	curl_setopt($ch, CURLOPT_HEADER, 1);
	curl_setopt($ch, CURLINFO_HEADER_OUT, 1);
}



// Set TCP timeout to 30 seconds
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Connection: Close'));

$res = curl_exec($ch);
if (curl_errno($ch) != 0) // cURL error
	{
	if(DEBUG == true) {	
		error_log(date('[Y-m-d H:i e] '). "Can't connect to PayPal to validate IPN message: " . curl_error($ch) . PHP_EOL, 3, LOG_FILE);
	}
	curl_close($ch);
	exit;

} else {
		// Log the entire HTTP response if debug is switched on.
		if(DEBUG == true) {
			error_log(date('[Y-m-d H:i e] '). "HTTP request of validation request:". curl_getinfo($ch, CURLINFO_HEADER_OUT) ." for IPN payload: $req" . PHP_EOL, 3, LOG_FILE);
			error_log(date('[Y-m-d H:i e] '). "HTTP response of validation request: $res" . PHP_EOL, 3, LOG_FILE);

			// Split response headers and payload
			list($headers, $res) = explode("\r\n\r\n", $res, 2);
		}
		curl_close($ch);
}

// Inspect IPN validation result and act accordingly

if (strcmp ($res, "VERIFIED") == 0) {

	
	if(DEBUG == true) {
		error_log(date('[Y-m-d H:i e] '). "Verified IPN: $req ". PHP_EOL, 3, LOG_FILE);
	}
} else if (strcmp ($res, "INVALID") == 0) {
	// log for manual investigation
	// Add business logic here which deals with invalid IPN messages
	if(DEBUG == true) { 
		error_log(date('[Y-m-d H:i e] '). "Invalid IPN: $req" . PHP_EOL, 3, LOG_FILE);
	}
}

if($_POST){
    
    $todo = var_export($_POST, true);
    $estado = $_POST['payment_status'];
    $item = $_POST['item_number']; 
    $token = $_POST['custom']; 
    if($estado == "Completed")
    {
        $sql_sel = 'SELECT idUsuario, Creditos FROM Recargas WHERE Token="'.$token.'"';
        if($resultado = mysql_query($sql_sel, $con)) {

                $i=0;
                while ($obj = mysql_fetch_object($resultado)) 
                {        	      
                    $id = $obj->idUsuario;
                    $idPaquete = $obj->Creditos;
                    $i++;
                }
            if($i>0){
                $sql = 'SELECT Creditos, id FROM Usuarios WHERE id="'.$id.'"';
                            if($resultado = mysql_query($sql, $con)) {
                                $i=0;
                                while ($obj = mysql_fetch_object($resultado)) 
                                {        	      
                                $creditos = $obj->Creditos;
                                $id = $obj->id;
                                $i++;
                                }

                                $valorTotal = $creditos+$idPaquete;
                                $sql_upd = 'UPDATE Usuarios SET Creditos="'.$valorTotal.'" WHERE id="'.$id.'";';
                                if ($resultado = mysql_query($sql_upd, $con)){
                                        $resultados["mensaje"] = "Completado: Saldo actual " . $valorTotal . " Creditos";
                                        $resultados["validacion"] = "ok"; 
                                        $resultados["creditos"] = $valorTotal; 
                                    $sql_ins = 'INSERT INTO Historico_Movimientos values(0 , '.$id.' , NOW() , '.$idPaquete.' , '.$creditos.' ,0 ,0 );';
                                    mysql_query($sql_ins, $con);
                                    $sql_upd2 = 'UPDATE Recargas SET Pagado=1 WHERE Token="'.$token.'";';
                                    mysql_query($sql_upd2, $con);
                                }
                                else
                                {
                                    $resultados["mensaje"] = "Error de consulta del servicio";
                                    $resultados["validacion"] = "error";
                                }
                            }
                            else
                            {
                                $resultados["mensaje"] = "Error de consulta de proceso";
                                $resultados["validacion"] = "error";
                            }
            }
            else {                
                $resultados["mensaje"] = "No hay prepago";
                $resultados["validacion"] = "error";
            }
               
        }
        mysql_close($con);
            
        error_log(date('[Y-m-d H:i e] '). "COMPLETADO " . $todo . " " . $sql_upd . " " . $sql . " Verified IPN: $req ". PHP_EOL, 3, LOG_FILE);
    }
    else {
        error_log(date('[Y-m-d H:i e] '). "NO COMPLETADO " . $todo . " Verified IPN: $req ". PHP_EOL, 3, LOG_FILE);
    }
    
    
    
}
else {
    error_log(date('[Y-m-d H:i e] '). "NO Verified IPN: $req ". PHP_EOL, 3, LOG_FILE);
}

?>

