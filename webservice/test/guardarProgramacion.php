<?php 

include 'connection.php';
require_once 'notificaciones/androidPusher.php';

$resultados = array();
 
$con = mysql_connect($server, $username, $password) or die ("No se conecto: " . mysql_error());
 
mysql_select_db($database, $con);
 
$idPantalla = mysql_real_escape_string($_GET["idPantalla"]);
$idUsuario = mysql_real_escape_string($_GET["idSesion"]);
$fechaProgramacion = mysql_real_escape_string($_GET["fechaProgramacion"]);
$horaDesde = mysql_real_escape_string($_GET["horaInicio"]);
$horaHasta = mysql_real_escape_string($_GET["horaFin"]);
$creditos = mysql_real_escape_string($_GET["creditos"]);
$video = mysql_real_escape_string($_GET["video"]);


//$sql = 'SELECT * FROM Ubicaciones WHERE idClient='.$id.' AND CodigoPostal='.$cp.' ORDER BY Direccion;'; 
$sql_sel = 'SELECT u.idImagen as idImagen, u.Creditos as Creditos, g.gcm_regid as gmc FROM Usuarios as u, gcm_users as g WHERE u.id='.$idUsuario.' AND name='.$idUsuario.';';
	if ($resultado = mysql_query($sql_sel, $con)){
        while ($obj = mysql_fetch_object($resultado)) 
        {        	      
            $resultados["idImagen"] = $obj->idImagen;   
            $resultados["creditos"] = $obj->Creditos;
            $resultados["gmc"] = $obj->gmc;
            $nombre = $idUsuario . "." . $resultados["idImagen"];
            $resultados["idImagen"] = ($resultados["idImagen"] - 1);
            $i++;
		}
	}
    if( $fechaProgramacion=="NOW()")
    {
        $resultados["creditos"] = ($resultados["creditos"] - $creditos/10);
        $sql_upd = 'INSERT INTO Programacion (id, idPantalla, idUsuario, idImagen, Fecha_programacion, Fecha, HoraDesde, HoraHasta, Segundos, video) VALUES ( null , "' .$idPantalla. '",' .$idUsuario. ',' .$resultados["idImagen"]. ',' .$fechaProgramacion. ', NOW() ,' .$horaDesde. ',' .$horaHasta. ',' .$creditos. ',' .$video. ');';
        
    } else {
            $resultados["creditos"] = ($resultados["creditos"] - $creditos/10);
        	$sql_upd = 'INSERT INTO Programacion (id, idPantalla, idUsuario, idImagen, Fecha_programacion, Fecha, HoraDesde, HoraHasta, Segundos, video) VALUES ( null , "' .$idPantalla. '",' .$idUsuario. ',' .$resultados["idImagen"]. ',"' .$fechaProgramacion. '", NOW() ,' .$horaDesde. ',' .$horaHasta. ',' .$creditos. ',' .$video. ');';
    }


	if ($resultado = mysql_query($sql_upd, $con)){
            $resultados["mensaje"] = " Tu anuncio ha sido publicado! " ;
            sendPush($resultados["gmc"], $resultados["mensaje"]);
			$resultados["validacion"] = "ok"; 
             
	}
	else
	{
		$resultados["mensaje"] = "No se ha podido realizar el proceso";
		$resultados["validacion"] = "error";
	}

mysql_close($con);

$resultados["querySel"] = $sql_sel;
$resultados["queryUpd"] = $sql_upd;

$resultadosJson = json_encode($resultados);
echo $resultadosJson;
 
?>