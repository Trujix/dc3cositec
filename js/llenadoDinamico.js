// ::::::::::: * * * * * * * * * * * :::::::::::::::::
// FUNCIONES ESPECIALES CON EL DOM
$(function(){
	// TRAER LOS CATALOGOS
	leerCatalogos();
});

// QUITAR INVALID CLASS A LOS TEXT (VALIDACION)
$(document).on('click', '#empresa', function(){
	$(this).removeClass('has-error');
});
$(document).on('click', '#rfc', function(){
	$(this).removeClass('has-error');
});
$(document).on('click', '#patron', function(){
	$(this).removeClass('has-error');
});
$(document).on('click', '#representante', function(){
	$(this).removeClass('has-error');
});
// ::::::::::::::::::::::::::::::::::::::::::::::


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
   		alert('img muy grande');
   		$('#imgfile').val('');
   	}
}

// CARGADO DE IMAGENES (ALTA DE CURSOS)
$(document).on('change', '#imgfile2', function(){
	if($(this).val !== ''){
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
	        fr.onload = createImage;
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
function createImage() {
    img = new Image();
    img.onload = imageLoaded;
    img.src = fr.result;
}

function imageLoaded(){
   	var canvas = document.getElementById("canvas2")
   	canvas.width = img.width;
   	canvas.height = img.height;
   	
   	if(img.width < 400 || img.height < 400){
   		var ctx = canvas.getContext("2d");
	   	ctx.drawImage(img,0,0);
	   	fotoPDF2 = canvas.toDataURL("image/png");
   	}else{
   		alert('img muy grande');
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
								'<input type="file" id="imgfile" /><br>'+
							'</div>'+
							'<div class="col-md-6">'+
								'<canvas id="canvas" class="img-thumbnail"></canvas>'+
							'</div>'+
						'</div>'+

						'<div class="row">'+
							'<div class="col-md-12">'+
								'<button id="consulEmpresa" value="0" class="btn btn-info"><span id="iconConsulEmpresa" class="glyphicon glyphicon-search"></span></button>'+
							'</div>'+
						'</div><br>'+

						'<div id="consultaEmpresa" class="row" hidden>'+
							'<div class="col-md-12">'+
								'<div class="row">'+
									'<div class="col-md-9">'+
										'<input id="buscarEmpresa" type="text" class="form-control" placeholder="Esciba el nombre de la empresa...">'+
									'</div>'+
									'<div class="col-md-3"><p></p></div>'+
								'</div><br>'+
								'<div class="row">'+
									'<div class="col-md-12">'+
										'<div class="tablaConsulta">'+
											'<div id="tablaEmpresa" class="table-responsive"></div>'+
										'</div>'+
									'</div>'+
								'</div>'+
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
	    				'<div class="input-group">'+
							'<span class="input-group-btn">'+
								'<button id="consulEmpresaCurso" value="0" class="btn btn-info" type="button"><span id="iconConculEmpresa" class="glyphicon glyphicon-search"></span></button>'+
							'</span>'+
							'<input id="nomEmpresa" type="text" class="form-control" placeholder="Nombre del curso" readonly="true" />'+
						'</div>'+
						'<div id="consulEmpresaDiv" class="row" hidden>'+
							'<div class="col-md-12">'+
								'<br>'+
								'<div id="tablaEmpresaCurso" class="tablaConsulta"></div>'+
							'</div>'+
						'</div>'+
	    			'</div>'+
	    		'</div>'+
	    		'<div class="panel panel-success">'+
					'<div class="panel-heading">DATOS DEL PROGRAMA DE CAPACITACIÓN, ADIESTRAMIENTO Y PRODUCTIVIDAD</div>'+
					'<div class="panel-body">'+

						'<div class="row">'+
							'<div class="col-md-8">'+
								'<div class="input-group">'+
									'<span class="input-group-btn">'+
										'<button id="consulCurso" class="btn btn-info" value="0" type="button"><span id="iconConculCurso" class="glyphicon glyphicon-search"></span></button>'+
									'</span>'+
									'<input id="nomCurso" type="text" class="form-control" placeholder="Nombre del curso" />'+
								'</div>'+
							'</div>'+
							'<div class="col-md-4">'+
								'<input id="duracion" type="text" class="form-control" placeholder="Duración en horas" />'+
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
							'<div class="col-md-6">'+
								'<select id="cursosCat" class="form-control"></select>'+
							'</div>'+
							'<div class="col-md-6">'+
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
	limpiarModalCursos();
}