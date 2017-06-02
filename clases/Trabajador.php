<?php
	require('Mysql.php');
	Class Trabajador extends Mysql{

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

		public function altaTrabajador($info){
			$nombre = $info["nombre"];
			$curp = $info["curp"];
			$ocupacion = $info["ocupacion"];
			$puesto = $info["puesto"];
			$nomEmpresa = $info["nomEmpresa"];
			$idEmpresa = $info["idEmpresa"];

			$guardarTrabajador = "CALL SP_ALTATRABAJADOR(
					'$nombre' ,'$curp' ,'$ocupacion' ,'$puesto' ,'$nomEmpresa', '$idEmpresa'
				)";
			if($this->query($guardarTrabajador)){
				return "TRUE";
			}else{
				return $guardarTrabajador;
			}
		}

	}
?>