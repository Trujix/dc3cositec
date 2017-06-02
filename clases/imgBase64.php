<?php
	$foto = $_FILES['archivo'];
    $nombre = $_POST['nombre'];
	$temp = $foto['tmp_name'];
    $size = getimagesize($temp);

    $alto = 70;
    $ancho = "";
    if(intval($size[1]) > 70){
        $diferencia = intval($size[1]) - 70;
        $ancho = intval($size[0]) - intval($diferencia);
    }else if(intval($size[1]) < 70){
        $diferencia = 70 - intval($size[1]);
        $ancho = intval($size[0]) + intval($diferencia);
    }
    $tam = $ancho.'-'.$alto;

	$img_data = file_get_contents($temp);
    $base64 = base64_encode($img_data);
        
    $imagen = array();
    $imagen[] = array('codigo'=> $base64, 'detalles'=> $tam);
    $response['imagen'] = $imagen;
    
    $fp = fopen('../json/'.$nombre.'.json', 'w');
    fwrite($fp, json_encode($response));
    fclose($fp);
?>