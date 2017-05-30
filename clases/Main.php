<?php  

	Class Main{

		public function DateTime(){
			$time = date('H:i:s', time());
			$date = date('d-m-Y');
			return array($time, $date);
		}

		public function getDate(){
			$dateTime = $this->DateTime();
			$fecha = explode('-', $dateTime[1]);
			// $fecha[2] = substr($fecha[2], 2, 3);
			$fecha = $fecha[2].'-'.$fecha[1].'-'.$fecha[0];
			return $fecha;
		}

		public function getTime(){
			$dateTime = $this->DateTime();
			$hora = $dateTime[0];
			return $hora;
		}

		public function log($texto){
			$myfile = fopen("log.txt", "a") or die("Unable to open file!");

			$log = $clientes[0]->nombre.'--';

			$txt = "
			---- ".$texto." ----- ";

			fwrite($myfile, $txt);
			fclose($myfile);
		}


		public function jsonToObject($info){
			$info = str_replace('\"', '"', $info);
			$info = json_decode($info);
			return $info[0];
		}

		public function normaliza($cadena){
		    $originales = 'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŔŕ';
		    $modificadas = 'aaaaaaaceeeeiiiidnoooooouuuuybsaaaaaaaceeeeiiiidnoooooouuuyybyRr';
		    $cadena = utf8_decode($cadena);
		    $cadena = strtr($cadena, utf8_decode($originales), $modificadas);
		    $cadena = strtolower($cadena);
		    return utf8_encode($cadena);
		}

		// public function getEstados($bandera){
		// 	if($bandera)
		// 		return json_encode($this->query_assoc("SELECT * FROM estados"));
		// 	else
		// 		return $this->query_assoc("SELECT * FROM estados");
		// }

		// public function getMunicipios($edo){
		// 	$consult = "SELECT idmunicipio, municipio 
		// 				FROM municipios WHERE idestado = $edo";
								
		// 	return json_encode($this->query_assoc($consult));
		// }

		public function enviarMailCliente($mailTo, $nameTo, $cuerpo, $subject, $copia){
			// $page = 'http://localhost/volanteo/configTrabajo.php'; CAMBIAR ESTA VARIABLE POR SITIO DONDE SE ALOJA PROYECTO
			$msg = $cuerpo;
			
		    $bcc = "";
			$mailFrom = 'pruebacorreo2236@gmail.com';

			require("../plugins/PHPMailer-maste/PHPMailerAutoload.php");
			
			$mail = new PHPMailer();

			$mail->SMTPDebug = 0;

		    $mail->SetLanguage( 'es', '../PHPMailer-maste/includes/language/' );
		                    
		    $mail->From     = $mailFrom;   // Correo Electronico para SMTP 
		    $mail->FromName = 'Grupo Publicitario Heraldos';
		    $mail->AddAddress($mailTo); // Dirección a la que llegaran los mensajes

		    if($bcc != "")
		    	$mail->AddBCC($bcc); // copia oculta

		    $mail->WordWrap = 50; 
		    $mail->IsHTML(true);     
		    $mail->CharSet = 'UTF-8';  
		    $mail->Subject  =  utf8_decode($subject);
		    $mail->Body     =  $msg;

			$mail->IsSMTP(); 
		    $mail->Host = "smtp.gmail.com";  // mail. o solo dominio - Servidor de 
		    $mail->Port = 587;
    		$mail->SMTPSecure = 'tls';
		    $mail->SMTPAuth = true; 
		    $mail->Username = $mailFrom;  // Correo Electrónico para SMTP correo@dominio
		    $mail->Password = "prueba2236"; // Contraseña para SMTP

		    if(!$mail->send())
		    	return false;
		    else
		    	return true;
		}

	}
	
?>