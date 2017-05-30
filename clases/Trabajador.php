<?php
	require('Mysql.php');
	Class Trabajador extends Mysql{

		public function altaCursos($info){
			$idEmpresa = $info["idEmpresa"];
			$nomEmpresa = $info["nomEmpresa"];
			$curso = $info["curso"];
			$duracion = $info["duracion"];
			$inicio = $info["inicio"];
			$fin = $info["fin"];
			$area = $info["area"];
			$stps = $info["stps"];
			$imagen = $info["imagen"];

			$guardarCurso = "CALL SP_ALTACURSO(
					'$idEmpresa' ,'$nomEmpresa' ,'$curso' ,'$duracion' ,'$inicio','$fin' ,'$area' ,'$stps', '$imagen'
				)";
			if($this->query($guardarCurso)){
				return "TRUE";
			}else{
				return $guardarCurso;
			}
		}

		public function bajaCurso($info){
			$bajasCurso = "CALL SP_BAJACURSO('$info')";
			return $this->query($bajasCurso);
		}

		public function editarCurso($info){
			$idcurso = $info["id"];
			$idEmpresa = $info["idEmpresa"];
			$nomEmpresa = $info["nomEmpresa"];
			$curso = $info["curso"];
			$duracion = $info["duracion"];
			$inicio = $info["inicio"];
			$fin = $info["fin"];
			$area = $info["area"];
			$stps = $info["stps"];
			$imagen = $info["imagen"];

			$editarCurso = "CALL SP_EDITARCURSO(
					'$idcurso' ,'$idEmpresa' ,'$nomEmpresa' ,'$curso' ,'$duracion' ,'$inicio','$fin' ,'$area' ,'$stps', '$imagen'
				)";
			if($this->query($editarCurso)){
				return "TRUE";
			}else{
				return $editarCurso;
			}
		}

		public function consultaCurso($info){
			$buscarCurso = "CALL SP_BUSCARCURSO('$info')";
			return $this->query_assoc($buscarCurso);
		}

		public function traerCursoEmpresa($info){
			$traerCursoEmp = "CALL SP_GETCURSOEMPRESA('$info')";
			return $this->query_assoc($traerCursoEmp);
		}

		public function traerDatosCurso($info){
			$traerDataCurso = "CALL SP_GETDATACURSOS('$info')";
			return $this->query_assoc($traerDataCurso);
		}

		public function traerDataEmpresa($info){
			$traerDataEmpresa = "CALL SP_GETDATAEMPRESA('$info')";
			return $this->query_assoc($traerDataEmpresa);
		}

	}
?>