<?php  
	
	session_start();

	require('../clases/Cursos.php');

	$Cursos = new Cursos();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'altaCursos':
			echo json_encode($Cursos->altaCursos($info));
			break;
		case 'editarCurso':
			echo json_encode($Cursos->editarCurso($info));
			break;
		case 'bajaCurso':
			echo json_encode($Cursos->bajaCurso($info));
			break;
		case 'consultaCurso':
			echo json_encode($Cursos->consultaCurso($info));
			break;
		case 'traerCurso':
			echo json_encode($Cursos->traerCurso($info));
			break;
	}
	
?>