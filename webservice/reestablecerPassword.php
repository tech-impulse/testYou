<?php 

include 'connection.php';
include('/usr/share/php/libphp-phpmailer/class.phpmailer.php');

$resultados = array();


 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = $_POST["idSesion"];
$Email = $_POST["Email"];

$token = $Email . '/' . date("Y-m-d h:i:s") . '/' . rand();
$resultados["token"] = $token;

$sql = 'SELECT id FROM Usuarios WHERE Email="' . $Email . '";';

if ($resultado = mysql_query($sql, $con)){
     if (mysql_num_rows($resultado) > 0){
    $resultados["mensaje"] = "Validacion Correcta";
    $resultados["validacion"] = "ok";  
    $sql_ins = 'INSERT INTO Incidencias (id, idUsuario, Asunto, Descripcion, Fecha, Token, Email) VALUES ( null , 0 , "Solicitud" ,"Solicitud de password", NOW(), "' .$token .'","' . $Email .'" );';
    $resultado = mysql_query($sql_ins, $con);
     try {
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: example@example.com\r\n";
    $headers .= "Reply-To: example@example.com\r\n";
    $mail = new PHPMailer(true); //defaults to using php "mail()"; the true param means it will throw exceptions on errors, which we need to catch
    $mail->IsSMTP();
    $mail->CharSet = 'UTF-8';
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
    $message .= '<h1>Solicitud de Password</h1>';
    $message .= '<h2>Youtter recibió una solicitud para restablecer la contraseña de tu cuenta '. $Email . '. <br>Para restablecer la contraseña, haz clic en el botón de abajo:</h2>';
    $message .= '<div><a href="http://www.youtter.com/app/reestablecer.html?token=' . $token . '" style="border:none;color:#0084b4;text-decoration:none;color:#30368b;font-size:13px;font-weight:bold;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif" target="_blank">Pulse aqui para reestablecer su contraseña</a></div>';
    $message .= '</body></html>';
    $message .= '<br><div>Att. Cliente: <bold>+34 737 96 46</bold></div>';
    $message .= '<div>Youtter © 2014 - All rights reserved ••• Política de privacidad y Condiciones de uso</div>';
    //$body = "Nueva Incidencia, El usuario con email: " . $Email . " ha creado la incidencia con Asunto: " .  $Asunto . " Desctipcion: "  . $Descripcion ;
    $mail->Body = $message; // Mensaje a enviar.
    $mail->AltBody = "Nueva Incidencia, El usuario con email: " . $Email . " ha creado la incidencia con Asunto: " .  $Asunto . " Desctipcion: "  . $Descripcion;
    $mail->Send();
        $resultados["mensaje"] = "Email enviado";
      //echo "Message Sent OK<p></p>\n";
    } catch (phpmailerException $e) {
        $resultados["mensaje"] = "Email NO enviado";
      echo $e->errorMessage(); //Pretty error messages from PHPMailer
    } catch (Exception $e) {
        $resultados["mensaje"] = "Email NO enviado";
      echo $e->getMessage(); //Boring error messages from anything else!
    }
	}
}
	else
	{
		$resultados["mensaje"] = "El usuario no está dado de alta";
		$resultados["validacion"] = "error";
        $resultados["query"] = $sql;
	}

mysql_close($con);

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>
