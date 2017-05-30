<?php  
	
	session_start();

	require('../clases/Catalogos.php');

	$Catalogos = new Catalogos();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'traerCatalogos':
			echo json_encode($Catalogos->traerCatalogos());
			break;
	}
	
?>