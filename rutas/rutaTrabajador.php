<?php  
	
	session_start();

	require('../clases/Trabajador.php');

	$Trabajador = new Trabajador();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'traerCursoEmpresa':
			echo json_encode($Trabajador->traerCursoEmpresa($info));
			break;
		case 'traerDatosCurso':
			echo json_encode($Trabajador->traerDatosCurso($info));
			break;
		case 'traerDataEmpresa':
			echo json_encode($Trabajador->traerDataEmpresa($info));
			break;
	}
	
?>