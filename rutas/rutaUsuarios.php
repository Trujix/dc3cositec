<?php  
	
	session_start();

	require('../clases/Usuarios.php');

	$Usuarios = new Usuarios();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'login':
			echo json_encode($Usuarios->login($info));
			break;
	}
	
?>