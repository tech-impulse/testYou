<?php 
/*
echo 'Estoy en ello';
require_once '../class.phpmailer.php';
echo 'Estoy en ello2';
$mail = new PHPMailer();
echo 'Estoy en ello3';

//Luego tenemos que iniciar la validación por SMTP:
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Host = "mail.esadecreapolis.com"; // SMTP a utilizar. Por ej. smtp.elserver.com
$mail->Username = "alain.cidrera@esadecreapolis.com"; // Correo completo a utilizar
$mail->Password = "Alacid01"; // Contraseña
$mail->Port = 25; // Puerto a utilizar

//Con estas pocas líneas iniciamos una conexión con el SMTP. Lo que ahora deberíamos hacer, es configurar el mensaje a enviar, el //From, etc.
$mail->From = "info@youtter.com"; // Desde donde enviamos (Para mostrar)
$mail->FromName = "Youtter";

//Estas dos líneas, cumplirían la función de encabezado (En mail() usado de esta forma: “From: Nombre <correo@dominio.com>”) de //correo.
$mail->AddAddress("ldalain88@gmail.com"); // Esta es la dirección a donde enviamos
$mail->IsHTML(true); // El correo se envía como HTML
$mail->Subject = "Willy"; // Este es el titulo del email.
$body = "Hola mundo. Esta es la primer línea<br />";
$mail->Body = $body; // Mensaje a enviar
$exito = $mail->Send(); // Envía el correo.

//También podríamos agregar simples verificaciones para saber si se envió:
if($exito){
echo 'El correo fue enviado correctamente.';
}else{
echo 'Hubo un inconveniente. Contacta a un administrador.';
}

*/

echo 'Estoy en ello';




echo 'Estoy en ello2';
try {
    
    //include('class.phpmailer.php');
    include('/usr/share/php/libphp-phpmailer/class.phpmailer.php');
    echo 'Estoy en ello3';
    $mail = new PHPMailer(true); //defaults to using php "mail()"; the true param means it will throw exceptions on errors, which we need to catch
     echo 'Estoy en ello4';
$mail->IsSMTP();
$mail->SMTPAuth = true;
$mail->Host = "mail.esadecreapolis.com"; // SMTP a utilizar. Por ej. smtp.elserver.com
$mail->Username = "alain.cidrera@esadecreapolis.com"; // Correo completo a utilizar
$mail->Password = "Alacid01"; // Contraseña
$mail->Port = 25; // Puerto a utilizar

  $mail->AddReplyTo('alain.cidrera@esadecreapolis.com', 'First Last');
  $mail->AddAddress('ldalain88@gmail.com', 'John Doe');
  $mail->SetFrom('alain.cidrera@esadecreapolis.com', 'First Last');
  $mail->AddReplyTo('alain.cidrera@esadecreapolis.com', 'First Last');
  $mail->Subject = 'PHPMailer Test Subject via mail(), advanced';
  $body = "Hola mundo. Esta es la primer línea<br />";
  $mail->Body = $body; // Mensaje a enviar

  $mail->Send();
  echo "Message Sent OK<p></p>\n";
} catch (phpmailerException $e) {
  echo $e->errorMessage(); //Pretty error messages from PHPMailer
} catch (Exception $e) {
  echo $e->getMessage(); //Boring error messages from anything else!
}
    
?>
