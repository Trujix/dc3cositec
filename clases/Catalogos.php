<?php
	require('Mysql.php');
	Class Catalogos extends Mysql{

		public function traerCatalogos(){
			$catalogos = ("CALL SP_GETCATALOGOS()");
			return $this->query_assoc($catalogos);
		}

	}
?>