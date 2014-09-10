<?php 

include 'connection.php';
include('/usr/share/php/libphp-phpmailer/class.phpmailer.php');

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = $_POST["idSesion"];
$Asunto = $_POST["Asunto"];
$Descripcion = $_POST["Descripcion"];
$Email = $_POST["Email"];

$sql_upd = 'INSERT INTO Incidencias (id, idUsuario, Asunto, Descripcion, Fecha) VALUES ( null , "' .$id. '","' .$Asunto. '","'. $Descripcion . '", NOW() );';

if ($resultado = mysql_query($sql_upd, $con)){
            $resultados["mensaje"] = "Gracias por ponerse en contacto con nosotros!" ;
        
			$resultados["validacion"] = "ok"; 
    $sql_sel = 'SELECT id FROM Incidencias WHERE idUsuario='.$id.' ORDER BY id DESC LIMIT 1;';
	if ($resultado = mysql_query($sql_sel, $con)){
        while ($obj = mysql_fetch_object($resultado)) 
        {        	        
            $resultados["idIncidencia"] = $obj->id;
            $i++;
		}
	}
    try {
    $mail = new PHPMailer(true); //defaults to using php "mail()"; the true param means it will throw exceptions on errors, which we need to catch
    $mail->IsSMTP();
    $mail->SMTPAuth = true;
    $mail->Host = "mail.esadecreapolis.com"; // SMTP a utilizar. Por ej. smtp.elserver.com
    $mail->Username = "alain.cidrera@esadecreapolis.com"; // Correo completo a utilizar
    $mail->Password = "Alacid01"; // Contraseña
    $mail->Port = 25; // Puerto a utilizar
    $mail->AddReplyTo($Email, 'Youtter');
    $mail->AddAddress($Email, 'Support Youtter'); // A quien se lo envias
    $mail->SetFrom('support@youtter.com', 'Support Youtter'); // Quien envia el email
    $mail->Subject = 'Incidencia creada de Youtter App';
    $message = '<html><body>';
    $message .= '<h3>Nueva Incidencia</h3>';
    $message .= '<div>Se ha creado una incidencia con tu solicitud</div>';
    $message .= '<div>Numero de ticket: ' .  $resultados["idIncidencia"] . '</div>';
    $message .= '<div>Asunto: ' .  $Asunto . '</div>';
    $message .= '<div>Desctipcion: '  . $Descripcion . '</div>';
    $message .= '<br><div>Att. Cliente: +34 737 96 46</div>';
    $message .= '<div>Youtter © 2014 - All rights reserved ••• Política de privacidad y Condiciones de uso</div>';
    $message .= '</body></html>';
    //$body = "Nueva Incidencia, El usuario con email: " . $Email . " ha creado la incidencia con Asunto: " .  $Asunto . " Desctipcion: "  . $Descripcion ;
    $mail->Body = $message; // Mensaje a enviar.
    $mail->AltBody = "Nueva Incidencia, El usuario con email: " . $Email . " ha creado la incidencia con Asunto: " .  $Asunto . " Desctipcion: "  . $Descripcion;
    $mail->Send();
      //echo "Message Sent OK<p></p>\n";
    } catch (phpmailerException $e) {
      echo $e->errorMessage(); //Pretty error messages from PHPMailer
    } catch (Exception $e) {
      echo $e->getMessage(); //Boring error messages from anything else!
    }
    
    try {
    $mail = new PHPMailer(true); //defaults to using php "mail()"; the true param means it will throw exceptions on errors, which we need to catch
    $mail->IsSMTP();
    $mail->SMTPAuth = true;
    $mail->Host = "mail.esadecreapolis.com"; // SMTP a utilizar. Por ej. smtp.elserver.com
    $mail->Username = "alain.cidrera@esadecreapolis.com"; // Correo completo a utilizar
    $mail->Password = "Alacid01"; // Contraseña
    $mail->Port = 25; // Puerto a utilizar
    $mail->AddReplyTo('alain.cidrera@youtter.com', 'Youtter');
    $mail->AddAddress('alain.cidrera@youtter.com', 'Support Youtter'); // A quien se lo envias
    $mail->SetFrom('support@youtter.com', 'Incidencias Youtter'); // Quien envia el email
    $mail->Subject = 'Incidencia creada de Youtter App';
    $message = '<html><body>';
    $message .= '<h3>Nueva Incidencia</h3>';
    $message .= '<div>El usuario con email: ' . $Email . ' ha creado la siguiente incidencia:</div>';
    $message .= '<br><div>Numero de ticket: ' .  $resultados["idIncidencia"] . '</div>';
    $message .= '<div>Asunto: ' .  $Asunto . '</div>';
    $message .= '<div>Desctipcion: '  . $Descripcion . '</div>';
    $message .= '</body></html>';
    //$body = "Nueva Incidencia, El usuario con email: " . $Email . " ha creado la incidencia con Asunto: " .  $Asunto . " Desctipcion: "  . $Descripcion ;
    $mail->Body = $message; // Mensaje a enviar.
    $mail->AltBody = "Nueva Incidencia, El usuario con email: " . $Email . " ha creado la incidencia con Asunto: " .  $Asunto . " Desctipcion: "  . $Descripcion;
    $mail->Send();
      //echo "Message Sent OK<p></p>\n";
    } catch (phpmailerException $e) {
      echo $e->errorMessage(); //Pretty error messages from PHPMailer
    } catch (Exception $e) {
      echo $e->getMessage(); //Boring error messages from anything else!
    }
	}
	else
	{
		$resultados["mensaje"] = "No se ha podido reportar la incidencia";
		$resultados["validacion"] = "error";
        $resultados["query"] = $sql_upd;
	}

mysql_close($con);

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>