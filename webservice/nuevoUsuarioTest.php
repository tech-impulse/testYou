<?php 

include 'connection.php';
include 'emailValidacion.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);

$emailBusqueda="";
$Nombre = $_POST["Nombre"];
$Apellidos = $_POST["Apellidos"];
$Email = $_POST["Email"];
$Password = md5($_POST["Password"]);
$idPais = $_POST["idPais"];
$cod = $_POST["codigo"];

 $sel = 'SELECT Email FROM Usuarios WHERE Email="' . $Email . '" ';
      
    $resultado = mysql_query($sel, $con);
    $objet = mysql_fetch_object($resultado);    	      
    $emailBusqueda = $objet->Email;

    if ($emailBusqueda == ""){

        $sql_upd = 'INSERT INTO Usuarios (id, Nombre, Apellidos, Email, Password, idPais, AceptaPolitica, CuentaPaypal, Creditos, idImagen, activo,bloqueado,Hash) VALUES ( null , "' .$Nombre. '","' .$Apellidos. '","'. $Email . '","' .$Password. '", "' .$idPais. '", 1 , 0 , 0 , 1, 0,1,"' .$cod. '");';

        $resultado2 = mysql_query($sql_upd, $con);
            
        if ($resultado2){//se ha insertado correctamente

            $sql = "SELECT id as userid FROM Usuarios WHERE Hash='". $cod ."'"; 
            
            $resultado3 = mysql_query($sql, $con);
            $obj = mysql_fetch_object($resultado3);    	      
            $idUser = $obj->userid;
            
            if ($idUser){
              
                $envioCorreo = envioEmailValidacion($Nombre, $Apellidos, $Email, $cod,$idUser);
                
                //if($envioCorreo == "email enviado"){
                $resultados["mensaje"] = "Usuario dado de alta correctamente ";
                $resultados["validacion"] = "ok";
                
                /*}else{
                    echo "problema en el envio del correo";                
                }*/

            }else{
                $resultados["mensaje"] = "Error de consultas";
                $resultados["validacion"] = "error";
                $resultados["query"] = $sql;
            }
        }
        else
        {
            $resultados["mensaje"] = "Error de consulta del servicio";
            $resultados["validacion"] = "error";
            $resultados["query"] = $sql_upd;
        }
    }else
    {
        $resultados["mensaje"] = "Ya existe ese usuario";
        $resultados["validacion"] = "error";
        $resultados["query"] = $sel;
    }
mysql_close($con);

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>