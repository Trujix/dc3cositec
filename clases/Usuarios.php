<?php
	require('Mysql.php');
	Class Usuarios extends Mysql{

		public function login($info){
			$usuario = $info["usuario"];
			$password = $info["password"];
			$status = $info["status"];

			if($status === 'loginForm'){
				$password = md5($password);
			}

			$login = "CALL SP_GETLOGIN('$usuario', '$password')";
			$result = $this->query_single_object($login)->C;
			if(intval($result) === 1)
				return "TRUE";
			else
				return "FALSE";
		}

	}
?>