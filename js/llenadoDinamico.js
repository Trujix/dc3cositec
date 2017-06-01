// ::::::::::: * * * * * * * * * * * :::::::::::::::::
// FUNCIONES ESPECIALES CON EL DOM
$(function(){
	// TRAER LOS CATALOGOS
	leerCatalogos();
	var param1 = leerCookie('alterego');
	var param2 = leerCookie('key');
	if(param1 !== undefined && param2 !== undefined){
		login(param1, param2, 'cookieRead');
	}else{
		loginHTMLFill();
	}
});

// CARGADO DE IMAGENES (ALTA DE EMPRESAS)
$(document).on('change', '#imgfile', function(){
	if($(this).val !== ''){
		if (typeof window.FileReader !== 'function') {
	        sweetAlert("Error", "Esta API no escompatible con su navegador", "error");
	    }

	    input = document.getElementById('imgfile');
	    if (!input) {
	        console.log("Error", "No se pudo encontrar la imagen", "error");
	        var c = document.getElementById("canvas");
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, c.width, c.height);
			fotoPDF = 'sin-foto';
	    }
	    else if (!input.files) {
	        console.log("Navegador viejo!", "Este navegador no es compatible con esta funcion", "error");
	        var c = document.getElementById("canvas");
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, c.width, c.height);
			fotoPDF = 'sin-foto';
	    }
	    else if (!input.files[0]) {
	        console.log("Ey!", "Primero seleccione una imagen", "error");
	        var c = document.getElementById("canvas");
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, c.width, c.height);
			fotoPDF = 'sin-foto';
	    }else{
	        file = input.files[0];
	        fr = new FileReader();
	        fr.onload = createImage;
	        fr.readAsDataURL(file);
	    }
	}else{
		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, c.width, c.height);
		fotoPDF = 'sin-foto';
	}
});
// FUNCION DE CARGADO DE IMAGENES
var input, file, fr, img;
var fotoPDF = 'sin-foto';
function createImage() {
    img = new Image();
    img.onload = imageLoaded;
    img.src = fr.result;
}

function imageLoaded(){
   	var canvas = document.getElementById("canvas")
   	canvas.width = img.width;
   	canvas.height = img.height;
   	
   	if(img.width < 400 || img.height < 400){
   		var ctx = canvas.getContext("2d");
	   	ctx.drawImage(img,0,0);
	   	fotoPDF = canvas.toDataURL("image/png");
   	}else{
   		msgMulti('Imagen demasiado grande', 'La imagen no debe exceder los <b>500px</b> de alto u ancho', 20000, 'error');
   		$('#imgfile').val('');
   	}
}

// CARGADO DE IMAGENES (ALTA DE CURSOS)
$(document).on('change', '#imgfile2', function(){
	if($(this).val !== '' || $(this).val !== null || $(this).val !== undefined){
		if (typeof window.FileReader !== 'function') {
	        sweetAlert("Error", "Esta API no escompatible con su navegador", "error");
	    }

	    input = document.getElementById('imgfile2');
	    if (!input) {
	        console.log("Error", "No se pudo encontrar la imagen", "error");
	        var c = document.getElementById("canvas2");
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, c.width, c.height);
			fotoPDF2 = 'sin-foto';
	    }
	    else if (!input.files) {
	        console.log("Navegador viejo!", "Este navegador no es compatible con esta funcion", "error");
	        var c = document.getElementById("canvas2");
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, c.width, c.height);
			fotoPDF2 = 'sin-foto';
	    }
	    else if (!input.files[0]) {
	        console.log("Ey!", "Primero seleccione una imagen", "error");
	        var c = document.getElementById("canvas2");
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, c.width, c.height);
			fotoPDF2 = 'sin-foto';
	    }else{
	        file = input.files[0];
	        fr = new FileReader();
	        fr.onload = createImage2;
	        fr.readAsDataURL(file);
	    }
	}else{
		var c = document.getElementById("canvas2");
		var ctx = c.getContext("2d");
		ctx.clearRect(0, 0, c.width, c.height);
		fotoPDF2 = 'sin-foto';
	}
});
// FUNCION DE CARGADO DE IMAGENES
var input, file, fr, img;
var fotoPDF2 = 'sin-foto';
function createImage2() {
    img = new Image();
    img.onload = imageLoaded2;
    img.src = fr.result;
}

function imageLoaded2(){
   	var canvas = document.getElementById("canvas2")
   	canvas.width = img.width;
   	canvas.height = img.height;
   	
   	if(img.width < 400 || img.height < 400){
   		var ctx = canvas.getContext("2d");
	   	ctx.drawImage(img,0,0);
	   	fotoPDF2 = canvas.toDataURL("image/png");
   	}else{
   		msgMulti('Imagen demasiado grande', 'La imagen no debe exceder los <b>500px</b> de alto u ancho', 20000, 'error');
   		$('#imgfile2').val('');
   	}
}

/*function docImg(){
	var dd = {
		content: [
			{
				table: {
					widths: ['*', '*'],
					body: [
						[{image: fotoPDF, height: 70, alignment: 'left', border: [false, false, false, false]}, {image: fotoPDF, height: 70, alignment: 'right', border: [false, false, false, false]}]
					]
				}
			}
		]
	}
	pdfMake.createPdf(dd).open();
}*/
// :::::::::: LLENADO DEL MODAL :::::::::::::
function loginHTMLFill(){
	var cont = '<div class="form-signin">'+
        '<h2 class="form-signin-heading">Iniciar Sesion</h2>'+
        '<label for="inputEmail" class="sr-only">Usuario</label>'+
        '<input type="text" id="user" class="form-control" placeholder="Uusario" required autofocus>'+
        '<label for="inputPassword" class="sr-only">Contraseña</label>'+
        '<input type="password" id="pass" class="form-control" placeholder="Contraseña" required>'+
        '<div class="checkbox">'+
        '</div>'+
        '<button id="loginBTN" class="btn btn-lg btn-primary btn-block">Iniciar Sesion</button>'+
      '</div>';
    setTimeout(function(){
		$('#cuerpo').html('');
		$('#cuerpo').append(cont);
	}, 450);
	setTimeout(function(){
		$('#cuerpo').show(200);
		$('#barraPrinc').show(200);
		leerCatalogos();
	}, 800);
}

function cuerpoHTMLFill(){
	var barra = '<div class="container">'+
        '<div class="navbar-header">'+
          '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">'+
            '<span class="sr-only">Toggle navigation</span>'+
            '<span class="icon-bar"></span>'+
            '<span class="icon-bar"></span>'+
            '<span class="icon-bar"></span>'+
          '</button>'+
          '<a class="navbar-brand" href="#">Formato DC-3</a>'+
        '</div>'+
        '<div id="navbar" class="navbar-collapse collapse">'+
          '<ul class="nav navbar-nav">'+
            '<li><a id="altaEmpresas" role="button">Empresas</a></li>'+
            '<li><a id="altaCursos" role="button">Cursos</a></li>'+
          '</ul>'+
        '</div>'+
      '</div>';
	var cont = '<div class="panel panel-primary">'+
			'<div class="panel-heading">DATOS DEL TRABAJADOR</div>'+
			'<div class="panel-body">'+
				'<div class="row">'+
					'<div class="col-md-7">'+
						'<div class="input-group">'+
							'<span class="input-group-btn">'+
								'<button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>'+
							'</span>'+
							'<input id="nomEmpleado" type="text" class="form-control" placeholder="Nombre (Anotar apellido paterno, apellido materno y nombre (s))" />'+
						'</div>'+
					'</div>'+
					'<div class="col-md-5">'+
						'<div class="input-group">'+
							'<span class="input-group-btn">'+
								'<button class="btn btn-default" type="button"><span class="glyphicon glyphicon-search"></span></button>'+
							'</span>'+
							'<input id="curp" type="text" class="form-control" Placeholder="CURP (Clave Unica de Registro de Poblacion)" maxlength="18" />'+
						'</div>'+
					'</div>'+
				'</div><br>'+
				'<div class="row">'+
					'<div class="col-md-7">'+
						'<select id="empleosCat" class="form-control"></select>'+
					'</div>'+
					'<div class="col-md-5">'+
						'<input id="puesto" type="text" class="form-control" Placeholder="Puesto" />'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="panel panel-warning">'+
			'<div class="panel-heading">SELECCIONE EMPRESA Y CURSO</div>'+
			'<div class="panel-body">'+
				'<div class="row">'+
					'<div class="col-md-6">'+
						'<input id="selectEmpresa" type="text" class="form-control" placeholder="Nombre de la empresa" />'+
					'</div>'+
					'<div class="col-md-6">'+
						'<select id="selectCurso" class="form-control">'+
							'<option value="-1">- Seleccione el curso -</option>'+
						'</select>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>'+
		'<div class="panel panel-default">'+
			'<div class="panel-body">'+
				'<div class="row">'+
					'<div class="col-md-4">'+
						'<button id="visualizarPDF" value="1" class="btn btn-info">'+
							'<span class="glyphicon glyphicon-print"></span> Visualizar Documento'+
						'</button>'+
					'</div>'+
					'<div class="col-md-4">'+
						'<button id="descargarPDF" value="2" class="btn btn-primary">'+
							'<span class="glyphicon glyphicon-save"></span> Descargar Documento'+
						'</button>'+
					'</div>'+
					'<div class="col-md-4">'+
						'<button id="limpiarTrabajador" value="2" class="btn btn-default">'+
							'<span class="glyphicon glyphicon-erase"></span>  Limpiar datos de trabajador'+
						'</button>'+
					'</div>'+
				'</div>	'+	
			'</div>'+
		'</div>'+
	'</div>';
	$('#cuerpo').hide(200);
	setTimeout(function(){
		$('#cuerpo').html('');
		$('#cuerpo').append(cont);
		$('#barraPrinc').html('');
		$('#barraPrinc').addClass('navbar navbar-inverse navbar-fixed-top');
		$('#barraPrinc').append(barra);
	}, 450);
	setTimeout(function(){
		$('#cuerpo').show(200);
		$('#barraPrinc').show(200);
		leerCatalogos();
	}, 800);
}

// FUNCION DE LLENAR MODAL PARA EMPRESAS
function modalEmpresasFill(){
	var cont = '<div class="panel panel-info">'+
					'<div class="panel-heading">DATOS DE LA EMPRESA</div>'+
					'<div class="panel-body">'+

						'<div class="row">'+
							'<div class="col-md-12">'+
								'<input id="empresa" type="text" class="form-control" placeholder="Nombre o razón social (En caso de persona física, anotar apellido paterno, apellido materno y nombre(s))" />'+
							'</div>'+
						'</div><br>'+

						'<div class="row">'+
							'<div class="col-md-4">'+
								'<input id="rfc" type="text" class="form-control" Placeholder="RFC de la empresa" maxlength="13" />'+
							'</div>'+
							'<div class="col-md-4">'+
								'<input id="patron" type="text" class="form-control" Placeholder="Patrón o representante Legal" />'+
							'</div>'+
							'<div class="col-md-4">'+
								'<input id="representante" type="text" class="form-control" Placeholder="Representante de trabajadores" />'+
							'</div>'+
						'</div><br>'+

						'<div class="row">'+
							'<div class="col-md-6">'+
								'<input name="empresa" type="file" id="imgfile" /><br>'+
							'</div>'+
							'<div class="col-md-6">'+
								'<canvas id="canvas" class="img-thumbnail"></canvas>'+
							'</div>'+
						'</div>'+

					'</div>'+
				'</div>'+

				'<div class="row">'+
					'<div class="col-md-3">'+
						'<p></p>'+
					'</div>'+
					'<div class="col-md-3">'+
						'<button id="altaEmpresa" class="btn btn-success">Guardar</button>'+
					'</div>'+
					'<div class="col-md-3">'+
						'<button name="cerrModal" class="btn btn-danger">Cancelar</button>'+
					'</div>'+
					'<div class="col-md-3">'+
						'<p></p>'+
					'</div>'+
				'</div>';
	$('#modalCuerpo').html('');
	$('#modalCuerpo').append(cont);

	$('#modalCapt').modal('show');
	$('#titModal').text('Alta de Empresas');
	limpiarModalEmpresas();
}

// LLENADO DE MODAL PARA CURSOS
function modalCursosFill(){
	var cont = '<div class="panel panel-default">'+
	    			'<div class="panel-body">'+
						'<input id="nomEmpresa" type="text" class="form-control" placeholder="Realize una consulta para elegir empresa..." />'+
	    			'</div>'+
	    		'</div>'+
	    		'<div class="panel panel-success">'+
					'<div class="panel-heading">DATOS DEL PROGRAMA DE CAPACITACIÓN, ADIESTRAMIENTO Y PRODUCTIVIDAD</div>'+
					'<div class="panel-body">'+

						'<div class="row">'+
							'<div class="col-md-8">'+
								'<input id="nomCurso" type="text" class="form-control" placeholder="Nombre del curso" />'+
							'</div>'+
							'<div class="col-md-4">'+
								'<input id="duracion" type="text" class="form-control" placeholder="Duración en horas" onkeypress="if ( isNaN( String.fromCharCode(event.keyCode) )) return false;" />'+
							'</div>'+
						'</div><br>'+

						'<div class="row">'+
							'<div class="col-md-3">'+
								'<label>PERIODO EJECUCIÓN DE: </label>'+
							'</div>'+
							'<div class="col-md-4">'+
								'<input id="fechaIni" type="date" class="form-control" />'+
							'</div>'+
							'<div class="col-md-1">'+
								'<label>- A -</label>'+
							'</div>'+
							'<div class="col-md-4">'+
								'<input id="fechaFin" type="date" class="form-control" />'+
							'</div>'+
						'</div><br>'+
						'<div class="row">'+
							'<div class="col-md-4">'+
								'<select id="cursosCat" class="form-control"></select>'+
							'</div>'+
							'<div class="col-md-3">'+
								'<input id="instructor" type="text" class="form-control" Placeholder="Instructor o tutor..." />'+
							'</div>'+
							'<div class="col-md-5">'+
								'<input id="capacitador" type="text" class="form-control" Placeholder="Nombre del agente capacitador o STPS" />'+
							'</div>'+
						'</div><br>'+

						'<div class="row">'+
							'<div class="col-md-6">'+
								'<input type="file" id="imgfile2" /><br>'+
							'</div>'+
							'<div class="col-md-6">'+
								'<canvas id="canvas2" class="img-thumbnail"></canvas>'+
							'</div>'+
						'</div>'+
						'<div id="consultaCurso" class="row" hidden>'+
							'<br>'+
							'<div class="col-md-12">'+
								'<br>'+
								'<div id="tablaCurso" class="tablaConsulta"></div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
				'<div class="row">'+
					'<div class="col-md-3">'+
						'<p></p>'+
					'</div>'+
					'<div class="col-md-3">'+
						'<button id="altaCurso" class="btn btn-success">Guardar</button>'+
					'</div>'+
					'<div class="col-md-3">'+
						'<button name="cerrModal" class="btn btn-danger">Cancelar</button>'+
					'</div>'+
					'<div class="col-md-3">'+
						'<p></p>'+
					'</div>'+
				'</div>';
	$('#modalCuerpo').html('');
	$('#modalCuerpo').append(cont);

	$('#modalCapt').modal('show');
	$('#titModal').text('Alta de Cursos');
	leerCatalogos();
	limpiarModalCursos();
}

function modalBusqEmpresaFill(){
	var cont = '<div class="panel panel-default"><div class="panel-body">'+
				'<div class="row">'+
	    			'<div class="col-md-12">'+
	    				'<input id="buscarEmpresaDoc" type="text" class="form-control" placeholder="Escriba el nombre de la empresa" />'+
	    			'</div>'+
	    		'</div><br>'+
	    		'<div class="row">'+
	    			'<div class="col-md-12">'+
	    				'<br>'+
	    				'<div class="tablaConsulta2">'+
	    					'<div id="tablaEmpresasDoc" class="table-responsive"></div>'+
	    				'</div>'+
	    			'</div>'+
	    		'</div>'+
	    		'</div></div>';
	$('#modalCuerpo').html('');
	$('#modalCuerpo').append(cont);
	$('#tablaEmpresasDoc').html('');
	$('#buscarEmpresaDoc').val('');
	$('#titModal').text('Buscar Empresa');
	$('#modalCapt').modal('show');
	setTimeout(function(){
		$('#buscarEmpresaDoc').focus();
	}, 500);
}

$(document).on('click', '#loginBTN', function(){
	var us = $("#user").val();
	var pas = $("#pass").val();
	login(us, pas, 'loginForm');
});

// FUNCIONES DE SEGURIDAD
function login(user, clave, origen){
	var userData = {
		usuario: user,
		password: clave,
		status: origen
	};
	$.ajax({
		url:'rutas/rutaUsuarios.php',
		type:'POST',
		data: {info: userData, action: 'login'},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			//removeSpinner();
		},
		success: function(data){
			if(data === 'TRUE'){
				cuerpoHTMLFill();
				if(origen === 'loginForm'){
					document.cookie = "alterego=" + $('#user').val() + ";path=/";
					document.cookie = "key=" + md5(pass.value) + ";path=/";
				}
			}else if(data === 'FALSE'){
				if(origen === 'loginForm'){
					$.alert({
					    title: 'Error de inicio sesion',
					    content: 'Usuario y/o contraseña incorrectos',
					});
				}else{
					loginHTMLFill();
					document.cookie = "alterego=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
					document.cookie = "key=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
				}
			}
		}
	});
}
function leerCookie(nombre){
  var value = "; " + document.cookie;
  var parts = value.split("; " + nombre + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}