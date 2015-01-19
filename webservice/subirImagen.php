<?php
//header("Content-type: application/json");
include 'connection.php';
$dir = 'YoutterUploads';
$resultado = "";
error_reporting(-1);
$a = 1;

$nombre;
$resultados = array();
$idNuevaImagen;
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$id = $_POST["idSesion"];
$video = $_POST["video"];
$imagen64 = $_POST["imagen64"];

$sql = 'SELECT idImagen FROM Usuarios WHERE id='.$id.';';
 
$resultado = mysql_query($sql, $con);


$i=0;
		while ($obj = mysql_fetch_object($resultado)) 
        {        	      
            $resultados["idImagen"] = $obj->idImagen;    
            $nombre = $id . "." . $resultados["idImagen"];
            $i++;
		}
$idNuevaImagen = $resultados["idImagen"]+1;

file_put_contents ($dir.'/test.txt', 'Hello File');
$allowedExtsImg = array("jpg", "jpeg", "gif", "png", "bmp", "JPG", "JPEG", "GIF", "PNG", "BMP");
$allowedExtsVid = array("mp4", "wma", "mpg", "mpeg", "avi", "mov","MP4", "WMA", "MPG", "MPEG", "AVI", "MOV");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);


$filename  = basename($_FILES['file']['name']);


$new       = $nombre;


$data = 'data:image/png;base64,AAAFBfj42Pj4';

list($type, $imagen64) = explode(';', $imagen64);
list(, $imagen64)      = explode(',', $imagen64);
$imagen64 = base64_decode($imagen64);

file_put_contents($_SERVER['DOCUMENT_ROOT']."/YoutterUploads" . $new, $imagen64);

$output = array();
$return_var = array();

$resultados["nombre"] =$new;


$isvideo = shell_exec('/comunica/shells/whatisist.sh ' . $new);

if($isvideo == 0){
    $resultados["video"] = 0;
} else if ($isvideo == 1){
    $resultados["video"] = 1;
}
else {
    $resultados["video"] = $isvideo;
}

mysql_close($con);

$resultadosJson = json_encode($resultados);

echo $resultadosJson;


?>