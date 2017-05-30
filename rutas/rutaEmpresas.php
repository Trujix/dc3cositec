<?php  
	
	session_start();

	require('../clases/Empresas.php');

	$Empresas = new Empresas();

	$action = $_POST['action'];
	
	if(isset($_POST['info']))
		$info = $_POST['info'];

	switch ($action) {
		case 'altaEmpresa':
			echo json_encode($Empresas->altaEmpresa($info));
			break;
		case 'bajaEmpresa':
			echo json_encode($Empresas->bajaEmpresa($info));
			break;
		case 'editarEmpresa':
			echo json_encode($Empresas->editarEmpresa($info));
			break;
		case 'consultaEmpresa':
			echo json_encode($Empresas->consultaEmpresa($info));
			break;
		case 'traerEmpresa':
			echo json_encode($Empresas->traerEmpresa($info));
			break;
	}
	
?>