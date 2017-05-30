<?php
	require('Mysql.php');
	Class Empresas extends Mysql{

		public function altaEmpresa($info){
			$nombre = $info["nombre"];
			$rfc = $info["rfc"];
			$patron = $info["patron"];
			$representante = $info["representante"];
			$img = $info["img"];

			$guardarEmpresa = "CALL SP_ALTAEMPRESA(
					'$nombre' ,'$rfc' ,'$patron' ,'$representante' ,'$img'
				)";
			if($this->query($guardarEmpresa)){
				return "TRUE";
			}else{
				return $guardarEmpresa;
			}
		}

		public function bajaEmpresa($info){
			$bajasEmpresa = "CALL SP_BAJAEMPRESA('$info')";
			return $this->query($bajasEmpresa);
		}

		public function editarEmpresa($info){
			$id = $info["id"];
			$nombre = $info["nombre"];
			$rfc = $info["rfc"];
			$patron = $info["patron"];
			$representante = $info["representante"];
			$img = $info["img"];

			$editEmpresa = "CALL SP_EDITAREMPRESA(
					'$id', '$nombre' ,'$rfc' ,'$patron' ,'$representante' ,'$img'
				)";
			if($this->query($editEmpresa)){
				return "TRUE";
			}else{
				return $editEmpresa;
			}
		}

		public function consultaEmpresa($info){
			$buscarEmpresa = "CALL SP_BUSCAREMPRESA('$info')";
			return $this->query_assoc($buscarEmpresa);
		}

		public function traerEmpresa($info){
			$traeEmpresa = "CALL SP_GETEMPRESA('$info')";
			return $this->query_assoc($traeEmpresa);
		}

	}
?>