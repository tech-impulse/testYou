<?php
//header("Content-type: application/json"); 
$dir = 'youtterUploads';
$resultado = "Error0";
error_reporting(-1);

 // create new directory with 744 permissions if it does not exist yet
 // owner will be the user/group the PHP script is run under

// chown ("$youtterUploads", "$server_user");
 if ( !file_exists($dir) ) {
     echo "No existe el directorio";
  $old = umask(0); 
    mkdir($_SERVER['DOCUMENT_ROOT']."/youtterUploads");
    umask($old); 
 }

 file_put_contents ($dir.'/test.txt', 'Hello File');
$allowedExts = array("gif", "jpeg", "jpg", "png", "JPG");
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);

if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 200000)
&& in_array($extension, $allowedExts)) {
  if ($_FILES["file"]["error"] > 0) {
    //echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
  } else {
    //echo "Upload: " . $_FILES["file"]["name"] . "<br>";
    //echo "Type: " . $_FILES["file"]["type"] . "<br>";
    //echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
    //echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";
    if (file_exists($_SERVER['DOCUMENT_ROOT']."testServiceAlain/youtterUploads/" . $_FILES["file"]["name"])) {
      //echo $_FILES["file"]["name"] . " already exists. ";
       $resultado = 'Esta imagen ya existe!';
    } else {
      if (move_uploaded_file($_FILES["file"]["tmp_name"],
       $_SERVER['DOCUMENT_ROOT']."testServiceAlain/youtterUploads/" . $_FILES["file"]["name"]))
         {
           //echo "Stored in: " . $_SERVER['DOCUMENT_ROOT']."testServiceAlain/youtterUploads" . $_FILES["file"]["name"];
         $resultado = "Imagen cargada correctamente!";
         }
       else
         {
           //echo "Error al mover de" . $_FILES["file"]["tmp_name"] . "a " . $_SERVER['DOCUMENT_ROOT']."testServiceAlain/youtterUploads";
           $resultado = "Error1";

           //output the errors here (ie using $_FILES["file"]["error"])
         }
        if (!is_writeable( $_SERVER['DOCUMENT_ROOT']."testServiceAlain/youtterUploads/" . $_FILES["file"]["name"])) {
           //echo "Cannot write to destination file";
            $resultado = "Error2";
        } else {
            //echo "Si se puede";
        }
    }
  }
} else {
  //echo "Invalid file";
    $resultado = "Tipo de archivo incompatible";
}


//$resultadoJson = json_encode($resultado);
echo $resultado;

?>