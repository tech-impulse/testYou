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
 
$imagen64 = $_POST["imagen64"];
$id = $_POST["idSesion"];
$video = $_POST["video"];

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
//$temp = explode(".", $_FILES["file"]["name"]);
//$extension = end($temp);


//$filename  = basename($_FILES['file']['name']);


$new       = $nombre;


/*
list($type, $imagen64) = explode(';', $imagen64);
list(, $imagen64)      = explode(',', $imagen64);
$imagen64 = base64_decode($imagen64);
*/

$data = str_replace('data:image/png;base64,', '', $imagen64);
$data = str_replace(' ', '+', $imagen64);

$data = base64_decode($imagen64);

$file = $_SERVER['DOCUMENT_ROOT']."/YoutterUploads" . $new . '.png';
$success = file_put_contents($file, $imagen64);

//file_put_contents($_SERVER['DOCUMENT_ROOT']."/YoutterUploads" . $new, $source);

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