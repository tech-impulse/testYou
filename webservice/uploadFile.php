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




 if ( !file_exists($dir) ) {
     echo "No existe el directorio";
  $old = umask(0); 
    mkdir($_SERVER['DOCUMENT_ROOT']."/YoutterUploads");
    umask($old); 
 }



 file_put_contents ($dir.'/test.txt', 'Hello File');
$allowedExtsImg = array("jpg", "jpeg", "gif", "png", "bmp", "JPG", "JPEG", "GIF", "PNG", "BMP");
$allowedExtsVid = array("mp4", "wma", "mpg", "mpeg", "avi", "mov","MP4", "WMA", "MPG", "MPEG", "AVI", "MOV");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);
/*
    if (in_array($extension, $allowedExtsImg))
    {
        $resultados["video"] = 0; 
    }
    else if (in_array($extension, $allowedExtsVid)){
        $resultados["video"] = 1;
        $extension = "mpg";   
    }
    else if($video!="undefined")  {
        if($video==0){
            $resultados["video"] = 0; 
            $extension = "jpg";
        } else {
            $resultados["video"] = 1; 
            $extension = "mpg";
        }

    }
    */

$filename  = basename($_FILES['file']['name']);
//$new       = $nombre.'.'.$extension;

$new       = $nombre;

//$isvideo = exec("sh /comunica/shells/whatisit.sh " . $new . " >/dev/null");
$output = array();
$return_var = array();

$resultados["nombre"] =$new;
//$isvideo = system("sh /comunica/shells/whatisit.sh 5.161", $output, $return_var);
//$contents = file_get_contents('/comunica/shells/whatisit.sh 5.161');
//echo shell_exec($contents);

//echo " isvideo ";
//echo $isvideo;

/*
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 200000)
&& in_array($extension, $allowedExts)) {
*/
if($a=1){
  if ($_FILES["file"]["error"] > 0) {
    $resultados["mensaje"] = 'Error de carga';
    //echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
  } else {
   // echo "Upload: " . $_FILES["file"]["name"] . "<br>";
    //echo "Type: " . $_FILES["file"]["type"] . "<br>";
    //echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
    //echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";
    if (file_exists($_SERVER['DOCUMENT_ROOT']."/YoutterUploads" . $_FILES["file"]["name"])) {
       $resultados["error"] = 'Esta imagen ya existe! ' . $_FILES["file"]["name"];
    } else {
      if (move_uploaded_file($_FILES["file"]["tmp_name"], 
       $_SERVER['DOCUMENT_ROOT']."/YoutterUploads/" . $new))
         {

            $sql_upd = 'UPDATE Usuarios SET idImagen='.($idNuevaImagen).' WHERE id='.$id.';';
            $query = mysql_query($sql_upd, $con);
            $resultados["mensaje"] = "Imagen cargada correctamente! "; 
          
         }
       else
         {
           $resultados["error"] = "Error1";

         }
        if (!is_writeable( $_SERVER['DOCUMENT_ROOT']."/YoutterUploads" . $_FILES["file"]["name"])) {

        } else {

        }
    }
  }
} else {
    $resultados["mensaje"] = "Tipo de archivo incompatible";
}

$isvideo = shell_exec('/comunica/shells/whatisist.sh ' . $new);

if($isvideo == 0){
    $resultados["video"] = 0;
} else if ($isvideo == 1){
    $resultados["video"] = 1;
}
else {
    $resultados["video"] = $isvideo;
}

//$resultados["extension"] = $extension;
mysql_close($con);

$resultadosJson = json_encode($resultados);

echo $resultadosJson;


?>