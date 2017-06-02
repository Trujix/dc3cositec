<?php  
	
	session_start();

	require('../clases/Trabajador.php');

	$Trabajador = new Trabajador();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'altaTrabajador':
			echo json_encode($Trabajador->altaTrabajador($info));
			break;
		case 'editarTrabajador':
			echo json_encode($Trabajador->editarTrabajador($info));
			break;
		case 'bajaTrabajador':
			echo json_encode($Trabajador->bajaTrabajador($info));
			break;
		case 'consulTrabajadorCurp':
			echo json_encode($Trabajador->consulTrabajadorCurp($info));
			break;
		case 'consulTrabajadorNombre':
			echo json_encode($Trabajador->consulTrabajadorNombre($info));
			break;
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