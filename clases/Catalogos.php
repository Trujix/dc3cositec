<?php
	require('Mysql.php');
	Class Catalogos extends Mysql{

		public function traerCatalogos(){
			$catalogos = $this->query_assoc("SELECT clave,denominacion, 'curso' AS tipo
											FROM cursos_catalogo
										UNION
										SELECT clave,denominacion, 'empleo' AS tipo
											FROM empleo_catalogo");
			return $catalogos;
		}

	}
?>