<?php
	require('Mysql.php');
	Class Cursos extends Mysql{

		public function altaCursos($info){
			$idEmpresa = $info["idEmpresa"];
			$nomEmpresa = $info["nomEmpresa"];
			$curso = $info["curso"];
			$duracion = $info["duracion"];
			$inicio = $info["inicio"];
			$fin = $info["fin"];
			$area = $info["area"];
			$instructor = $info["instructor"];
			$stps = $info["stps"];
			$imagen = $info["imagen"];

			$guardarCurso = "CALL SP_ALTACURSO(
					'$idEmpresa' ,'$nomEmpresa' ,'$curso' ,'$duracion' ,'$inicio','$fin' ,'$area' ,'$instructor' ,'$stps', '$imagen'
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
			$instructor = $info["instructor"];
			$stps = $info["stps"];
			$imagen = $info["imagen"];

			$editarCurso = "CALL SP_EDITARCURSO(
					'$idcurso' ,'$idEmpresa' ,'$nomEmpresa' ,'$curso' ,'$duracion' ,'$inicio','$fin' ,'$area', '$instructor' ,'$stps', '$imagen'
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

		public function traerCurso($info){
			$traerCurso = "CALL SP_GETCURSO('$info')";
			return $this->query_assoc($traerCurso);
		}

	}
?>