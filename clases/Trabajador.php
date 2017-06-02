<?php
	require('Mysql.php');
	Class Trabajador extends Mysql{

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

		public function editarTrabajador($info){
			$id = $info["id"];
			$nombre = $info["nombre"];
			$curp = $info["curp"];
			$ocupacion = $info["ocupacion"];
			$puesto = $info["puesto"];
			$nomEmpresa = $info["nomEmpresa"];
			$idEmpresa = $info["idEmpresa"];

			$editTrabajador = "CALL SP_EDITARTRABAJADOR(
					'$id' ,'$nombre' ,'$curp' ,'$ocupacion' ,'$puesto' ,'$nomEmpresa', '$idEmpresa'
				)";
			if($this->query($editTrabajador)){
				return "TRUE";
			}else{
				return $editTrabajador;
			}
		}

		public function bajaTrabajador($info){
			$bajaTrabajador = "CALL SP_BAJATRABAJADOR('$info')";
			return $this->query($bajaTrabajador);
		}

		public function altaDocCompleto($info){
			$nombre = $info["nombre"];
			$curp = $info["curp"];
			$ocupacion = $info["ocupacion"];
			$puesto = $info["puesto"];
			$empresa = $info["empresa"];
			$shcp = $info["shcp"];
			$curso = $info["curso"];
			$duracion = $info["duracion"];
			$init = $info["init"];
			$fin = $info["fin"];
			$clvcurso = $info["clvcurso"];
			$instructor = $info["instructor"];
			$stps = $info["stps"];
			$patron = $info["patron"];
			$representante = $info["representante"];
			$imgEmp = $info["imgEmp"];
			$imgCurso = $info["imgCurso"];
			$fecha = $info["fecha"];

			$altaDoc = "CALL SP_ALTADOCUMENTO(
					'$nombre' ,'$curp' ,'$ocupacion' ,'$puesto' ,'$empresa' ,'$shcp', '$curso',
					'$duracion' ,'$init' ,'$fin' ,'$clvcurso' ,'$instructor' ,'$stps', '$patron',
					'$representante' ,'$imgEmp' ,'$imgCurso','$fecha'
				)";
			if($this->query($altaDoc)){
				return "TRUE";
			}else{
				return $altaDoc;
			}
		}

		public function buscarDoc($info){
			$buscarDoc = "CALL SP_BUSCARDOCS('$info')";
			return $this->query_assoc($buscarDoc);
		}

		public function traerDoc($info){
			$traerDoc = "CALL SP_TRAEDOC('$info')";
			return $this->query_assoc($traerDoc);
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

		public function consulTrabajadorCurp($info){
			$traerTrabCurp = "CALL SP_BUSCARTRABAJADOR('$info', 'curp')";
			return $this->query_assoc($traerTrabCurp);
		}

		public function consulTrabajadorNombre($info){
			$traerTrabNombre = "CALL SP_BUSCARTRABAJADOR('$info', 'nombre')";
			return $this->query_assoc($traerTrabNombre);
		}

	}
?>