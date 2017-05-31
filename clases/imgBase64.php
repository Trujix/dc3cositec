<?php
	$foto = $_FILES['archivo'];
    $nombre = $_POST['nombre'];
	$temp = $foto['tmp_name'];

	$img_data = file_get_contents($temp);
    $base64 = base64_encode($img_data);
        
    $imagen = array();
    $imagen[] = array('codigo'=> $base64);
    $response['imagen'] = $imagen;
    
    $fp = fopen('../json/'.$nombre.'.json', 'w');
    fwrite($fp, json_encode($response));
    fclose($fp);
?>