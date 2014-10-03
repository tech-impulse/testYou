<?php 

include('/usr/share/php/libphp-phpmailer/class.phpmailer.php');

function envioEmailValidacion($Nombre,$Apellidos,$Email,$cod,$idUser){
    
    /*$Nombre="Alberto";
    $Apellidos="Alberto";
    $Email="albertobcn86@gmail.com";
    $cod="few42523frt4t43534sdf4354";
    $idUser=23;*/

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
        $message .= '<h1>Bienvenido a Youtter,</h1>';
        $message .= '<h2>Hemos recibido una solicitud de creación de cuenta. Para finalizar el proceso, haz clic en el enlace que aparece abajo:</h2>';
        $message .= '<div><a href="http://www.youtter.com/app/validarUsuario.html?idUser=' . $idUser . '&Hash=' . $cod . '" style="border:none;color:#0084b4;text-decoration:none;color:#30368b;font-size:13px;font-weight:bold;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif" target="_blank"></a></div>';
        $message .= '</body></html>';
        $message .= '<br><div>Att. Cliente: <bold>+34 737 96 46</bold></div>';
        $message .= '<div>Youtter © 2014 - All rights reserved ••• Política de privacidad y Condiciones de uso</div>';
        $mail->Body = $message; // Mensaje a enviar.
        //$mail->AltBody = "Nueva Incidencia, El usuario con email: " . $Email . " ha creado la incidencia con Asunto: " .  $Asunto . " Desctipcion: "  . $Descripcion;
        $mail->Send();
        //echo "email enviado";
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
 
?>
