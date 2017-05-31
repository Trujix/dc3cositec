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

	}
?>