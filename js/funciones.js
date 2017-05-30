// FUNCIONES PRINCIPALES
var trabajadorNuevo = true;
var empresaNuevo = true;
var cursoNuevo = true;
$(function(){
	// TRAER LOS CATALOGOS
	leerCatalogos();
});

var accionPDF = 0;
$("#visualizarPDF").on("click", function(){
	accionPDF = parseInt($(this).val());
	valsFormulario();
});

$("#descargarPDF").on("click", function(){
	accionPDF = parseInt($(this).val());
	valsFormulario();
});

// ABRIR MODAL (CURSOS)
$(document).on('click', '#altaCursos', function(){
	$('#modalCapt').modal('show');
	$('#titModal').text('Alta de Cursos');
});
// ABRIR MODAL (EMPRESAS)
$(document).on('click', '#altaEmpresas', function(){
	$('#modalCapt').modal('show');
	$('#titModal').text('Alta de Empresas');
	accionEmpresa = 'altaEmpresa';
	idEmpresa = '';
	limpiarModalEmpresas();
});

// CERRAR MODAL
$(document).on('click', "button[name='cerrModal']", function(){
	$('#modalCapt').modal('hide');
});

// ABRIR PANEL DE CONSULTA
$(document).on('click', '#consulEmpresa', function(){
	if($(this).val() === "0"){
		$(this).val("1");
		$('#consultaEmpresa').show(200);
	}else if($(this).val() === "1"){
		$(this).val("0");
		$('#consultaEmpresa').hide(200);
	}
});


// ::::::::: ******** FUNCIONES CON EMPRESAS ******* :::
// ALTA DE EMPRESA
var accionEmpresa;
var idEmpresa;
$(document).on('click', '#altaEmpresa', function(){
	var jsonEmpresa = {
		id: idEmpresa,
		nombre: $('#empresa').val(),
		rfc: $('#rfc').val(),
		patron: $('#patron').val(),
		representante: $('#representante').val(),
		img: fotoPDF
	};
	$.ajax({
		url:'rutas/rutaEmpresas.php',
		type:'POST',
		data: {info: jsonEmpresa, action: accionEmpresa},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			//removeSpinner();
		},
		success: function(data){
			//removeSpinner();
			$('#modalCapt').modal('hide');
			console.log('Exito');
		}
	});
});

// CONSULTA EMPRESA
$(document).on('keyup', '#buscarEmpresa', function(){
	var nombre = $(this).val();
	$('#tablaEmpresa').html('');
	if(nombre !== ''){
		$.ajax({
			url:'rutas/rutaEmpresas.php',
			type:'POST',
			data: {info: nombre, action: 'consultaEmpresa'},
			dataType:'JSON',
			error: function(error){
				console.log(error);
				//removeSpinner();
			},
			success: function(data){
				//removeSpinner();
				var tabla = "<table class='table'><thead><tr><th>Nombre</th><th>Opciones</th></tr></thead><tbody>";
				$.each(data, function (i, campo){
					tabla += "<tr><td>" + campo.nombre + "</td><td><button onclick='editarEmpresa("+campo.id+")'>EDITAR</button>&nbsp;&nbsp;<button onclick='borrarEmpresas("+campo.id+")'>BORRAR</button></td></tr>";
				});
				tabla += "</tbody></table>";
				$('#tablaEmpresa').append(tabla);
			}
		});
	}
});
// FUNCION EDITAR EMPRESAS
function editarEmpresa(id){
	idEmpresa = id;
	accionEmpresa = 'editarEmpresa';

	$.ajax({
		url:'rutas/rutaEmpresas.php',
		type:'POST',
		data: {info: idEmpresa, action: 'traerEmpresa'},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			//removeSpinner();
		},
		success: function(data){
			//removeSpinner();
			$('#empresa').val(data[0]["nombre"]);
			$('#rfc').val(data[0]["rfc"]);
			$('#patron').val(data[0]["jefe"]);
			$('#representante').val(data[0]["representante"]);
			$('#imgfile').val('');

			var c = document.getElementById("canvas");
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, c.width, c.height);
			fotoPDF = 'sin-foto';
		}
	});
}

// FUNCION BAJA EMPRESA
function borrarEmpresas(id){
	$.ajax({
		url:'rutas/rutaEmpresas.php',
		type:'POST',
		data: {info: id, action: 'bajaEmpresa'},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			//removeSpinner();
		},
		success: function(data){
			//removeSpinner();
			limpiarModalEmpresas();
			$('#consulEmpresa').click();
			$('#buscarEmpresa').val('');
			$('#tablaEmpresa').html('');
		}
	});
}

// FUNCION LIMPIAR CAMPOS MODAL (EMPRESAS)
function limpiarModalEmpresas(){
	$('#empresa').val('');
	$('#rfc').val('');
	$('#patron').val('');
	$('#representante').val('');
	$('#imgfile').val('');

	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	fotoPDF = 'sin-foto';
}


// FUNCIONES CON CATALOGOS
function leerCatalogos(){
	$.ajax({
		url:'rutas/rutaCatalogos.php',
		type:'POST',
		data: {action: 'traerCatalogos'},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			//removeSpinner();
		},
		success: function(data){
			//removeSpinner();
			llenarCatalogoSelect(data);
		}
	});
}

// FUNCION LLENADO DINAMICO DE DATOS
function llenarCatalogoSelect(json){
	$('#cursosCat').html('');
	$('#empleosCat').html('');
	var empleoOptions = "<option value='-1'>- Eliga la Ocupacion específica (Catálogo nacional de ocupaciones) -</option>";
	var cursosOptions = "<option value='-1'>- Área temática del curso -</option>";
	$.each(json, function (i, catalogo){
		if(catalogo.tipo === "curso"){
			cursosOptions += "<option value='" + catalogo.clave + "'>" + catalogo.clave + " - " + catalogo.denominacion + "</option>";
		}else{
			empleoOptions += "<option value='" + catalogo.clave + "'>" + catalogo.clave + " - " + catalogo.denominacion + "</option>";
		}
	});
	$('#cursosCat').append(cursosOptions);
	$('#empleosCat').append(empleoOptions);
}
// FUNCION LLENAR VARIABLES
var nombreTXT, curpTXT, ocupacionTXT, puestoTXT, empresaTXT, shcpTXT, cursoTXT, duracionTXT, initTXT, finTXT, clvcursoTXT, stpsTXT;

var nombreSAVE, curpSAVE, ocupacionSAVE, puestoSAVE, empresaSAVE, shcpSAVE, cursoSAVE, duracionSAVE, initSAVE, finSAVE, clvcursoSAVE, stpsSAVE;
function configValsPDF(){
	var temIniFecha = initTXT;
	var temFinFecha = finTXT;

	initTXT = [];
	finTXT = [];

	for(i = 0; i < temIniFecha.length; i++){
		var iniFechaAux = temIniFecha[i].split('');
		var finFechaAux = temFinFecha[i].split('');
		if(i > 0){
			initTXT.push([iniFechaAux[0], iniFechaAux[1], '-', '-']);
			finTXT.push([finFechaAux[0], finFechaAux[1], '-', '-']);
		}else{
			initTXT.push([iniFechaAux[0], iniFechaAux[1], iniFechaAux[2], iniFechaAux[3]]);
			finTXT.push([finFechaAux[0], finFechaAux[1], finFechaAux[2], finFechaAux[3]]);
		}
	}

	crearDocumento();
}

// FUNCION QUE LLENA LAS VARS DESDE EL FORMULARIO
function valsFormulario(){
	nombreTXT = $('#nomEmpleado').val();

	curpTXT = $('#curp').val();
	curpTXT = curpTXT.split('');
	if(curpTXT.length < 18){
		var curpNum = 18 - curpTXT.length;
		for(c = 0; c < curpNum; c++){
			curpTXT.push('');
		}
	}

	ocupacionTXT = $('#empleosCat option:selected').text();
	puestoTXT = $('#puesto').val();

	empresaTXT = $('#empresa').val();

	shcpTXT = $('#rfc').val().split('');
	if(shcpTXT.length < 13){
		var shcpAux = [''];
		for(r = 0; r < shcpTXT.length; r++){
			shcpAux.push(shcpTXT[r]);
		}
		shcpTXT = [];
		shcpTXT = shcpAux;
	}

	cursoTXT = $('#nomCurso').val();
	duracionTXT = $('#duracion').val();
	initTXT = $('#fechaIni').val().split('-');
	finTXT = $('#fechaFin').val().split('-');
	clvcursoTXT = $('#cursosCat option:selected').text();
	stpsTXT = $('#capacitador').val();

	configValsPDF();
}

// ::::::::::::::::: ****** ::::::::::::::
// ********** FUNCION QUE CREA EL PDF ****
function crearDocumento(){
	// FUENTES
	pdfMake.fonts = {
		Roboto: {
			normal: 'Roboto-Regular.ttf',
			bold: 'Roboto-Medium.ttf',
			italics: 'Roboto-Italic.ttf',
			bolditalics: 'Roboto-Italic.ttf'
		},
		ArialNarrow: {
			normal: 'Arial-Narrow.ttf',
			bold: 'Arial-Narrow-Bold.TTF',
			italics: 'Arial-Narrow-Italic.TTF'
		},
		ArialBoldMT: {
			normal: 'Arial-Mt-Bold.ttf',
			bold: 'Arial-Boldmt.ttf'
		}
	};
	// CREACION DEL DOCUMENTO
	var doc = {
		pageSize: 'LETTER',
		pageOrientation: 'portrait',
		pageMargins: [25, 25, 35, 25],
		content: [
			{
				text: 'En este espacio la empresa puede imprimir su logotipo y, en su caso, también se puede imprimir el del agente capacitador externo',
				style: 'encabezado'
			},
			{
				text: '\n\n\n\n\n',
			},
			{
				text: 'FORMATO DC-3\nCONSTANCIA DE COMPETENCIAS O DE HABILIDADES LABORALES\n',
				style: 'titulo'
			},
			{
				text: {text: ' '},
				style: 'espaciado'
			},
			{
				table: {
					widths: ['*', '*'],
					body: [
						[{text: 'DATOS DEL TRABAJADOR', style: 'tituloTabla', fillColor: 'black', colSpan: 2},{}],
						[{text: 'Nombre (Anotar apellido paterno, apellido materno y nombre (s))\n'+nombreTXT+'\n', style: 'descripTabla', colSpan: 2}, {}],
						[
							[
								{text: 'Clave Única de Registro de Población\n', style: 'descripTabla'},
								{
									margin: [0 ,0 ,0 ,-3],
									table: {
										widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
										body: [
											[
												{text: curpTXT[0], style: "llenadoTabla", border: [false, false, false, false]},
												{text: curpTXT[1], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[2], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[3], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[4], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[5], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[6], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[7], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[8], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[9], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[10], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[11], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[12], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[13], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[14], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[15], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[16], style: "llenadoTabla", border: [true, false, false, false]},
												{text: curpTXT[17], style: "llenadoTabla", border: [true, false, false, false]}
											]
										]
									},
								}
							],
							{text: 'Ocupación específica (Catálogo Nacional de Ocupaciones)¹\n'+ocupacionTXT, style: 'descripTabla'}
						],
						[{text: 'Puesto*\n'+puestoTXT, style: 'descripTabla', colSpan: 2}, {}]
					]
				}
			},
			{
				text: {text: ' '},
				style: 'espaciado'
			},
			{
				table: {
					widths: ['*'],
					body: [
						[{text: 'DATOS DE LA EMPRESA', style: 'tituloTabla', fillColor: 'black'}],
						[{text: 'Nombre o razón social (En caso de persona física, anotar apellido paterno, apellido materno y nombre(s))\n\n\n', style: 'descripTabla'}],
						[
							[
								{text: 'Registro Federal de Contribuyentes con homoclave (SHCP)\n', style: 'descripTabla'},
								{
									margin: [0 ,0 ,0 ,-3],
									table: {
										widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
										body: [
											[
												{text: shcpTXT[0], style: "llenadoTabla", border: [false, false, false, false]},
												{text: shcpTXT[1], style: "llenadoTabla", border: [true, false, false, false]},
												{text: shcpTXT[2], style: "llenadoTabla", border: [true, false, false, false]},
												{text: shcpTXT[3], style: "llenadoTabla", border: [true, false, false, false]},
												{text: '-', style: "llenadoTabla", border: [true, false, false, false]},
												{text: shcpTXT[4], style: "llenadoTabla", border: [true, false, false, false]},
												{text: shcpTXT[5], style: "llenadoTabla", border: [true, false, false, false]},
												{text: shcpTXT[6], style: "llenadoTabla", border: [true, false, false, false]},
												{text: shcpTXT[7], style: "llenadoTabla", border: [true, false, false, false]},
												{text: shcpTXT[8], style: "llenadoTabla", border: [true, false, false, false]},
												{text: shcpTXT[9], style: "llenadoTabla", border: [true, false, false, false]},
												{text: '-', style: "llenadoTabla", border: [true, false, false, false]},
												{text: shcpTXT[10], style: "llenadoTabla", border: [true, false, false, false]},
												{text: shcpTXT[11], style: "llenadoTabla", border: [true, false, false, false]},
												{text: shcpTXT[12], style: "llenadoTabla", border: [true, false, true, false]}
											]
										]
									},
								}
							]
						]
					]
				}
			},
			{
				text: {text: ' '},
				style: 'espaciado'
			},
			{
				table: {
					widths: [150, 'auto', 'auto', '*', '*', 5, 'auto', '*', '*'],
					body: [
						[{text: 'DATOS DEL PROGRAMA DE CAPACITACIÓN, ADIESTRAMIENTO Y PRODUCTIVIDAD', style: 'tituloTabla', fillColor: 'black', colSpan: 9}, {}, {}, {}, {}, {}, {}, {}, {}],
						[{text: 'Nombre del curso\n'+cursoTXT, style: 'descripTabla', colSpan: 9}, {}, {}, {}, {}, {}, {}, {}, {}],
						[
							{text: 'Duración en horas \n'+duracionTXT, style: 'descripTabla'},
							{text: 'Periodo de\nejecución:     De', style: 'descripTabla'},
							[
								{text: 'Año', style: 'descripTabla2'},
								{
									margin: [0 ,0 ,0 ,-3],
									table: {
										widths: ['*', '*', '*', '*'],
										body: [
											[
												{text: initTXT[0][0], style: "llenadoTabla", border: [false, false, false, false]},
												{text: initTXT[0][1], style: "llenadoTabla", border: [true, false, false, false]},
												{text: initTXT[0][2], style: "llenadoTabla", border: [true, false, false, false]},
												{text: initTXT[0][3], style: "llenadoTabla", border: [true, false, false, false]}
											]
										]
									},
								}
							],
							[
								{text: 'Mes', style: 'descripTabla2'},
								{
									margin: [0 ,0 ,0 ,-3],
									table: {
										widths: ['*', '*'],
										body: [
											[
												{text: initTXT[1][0], style: "llenadoTabla", border: [false, false, false, false]},
												{text: initTXT[1][1], style: "llenadoTabla", border: [true, false, false, false]}
											]
										]
									},
								}
							],
							[
								{text: 'Dia', style: 'descripTabla2'},
								{
									margin: [0 ,0 ,0 ,-3],
									table: {
										widths: ['*', '*'],
										body: [
											[
												{text: initTXT[2][0], style: "llenadoTabla", border: [false, false, false, false]},
												{text: initTXT[2][1], style: "llenadoTabla", border: [true, false, false, false]}
											]
										]
									},
								}
							],
							{text: '\na', style: 'descripTabla2'},
							[
								{text: 'Año', style: 'descripTabla2'},
								{
									margin: [0 ,0 ,0 ,-3],
									table: {
										widths: ['*', '*', '*', '*'],
										body: [
											[
												{text: finTXT[0][0], style: "llenadoTabla", border: [false, false, false, false]},
												{text: finTXT[0][1], style: "llenadoTabla", border: [true, false, false, false]},
												{text: finTXT[0][2], style: "llenadoTabla", border: [true, false, false, false]},
												{text: finTXT[0][3], style: "llenadoTabla", border: [true, false, false, false]}
											]
										]
									},
								}
							],
							[
								{text: 'Mes', style: 'descripTabla2'},
								{
									margin: [0 ,0 ,0 ,-3],
									table: {
										widths: ['*', '*'],
										body: [
											[
												{text: finTXT[1][0], style: "llenadoTabla", border: [false, false, false, false]},
												{text: finTXT[1][1], style: "llenadoTabla", border: [true, false, false, false]}
											]
										]
									},
								}
							],
							[
								{text: 'Dia', style: 'descripTabla2'},
								{
									margin: [0 ,0 ,0 ,-3],
									table: {
										widths: ['*', '*'],
										body: [
											[
												{text: finTXT[2][0], style: "llenadoTabla", border: [false, false, false, false]},
												{text: finTXT[2][1], style: "llenadoTabla", border: [true, false, false, false]}
											]
										]
									},
								}
							]
						],
						[{text: 'Área temática del curso²\n'+clvcursoTXT, style: 'descripTabla', colSpan: 9}, {}, {}, {}, {}, {}, {}, {}, {}],
						[{text: 'Nombre del agente capacitador o STPS³\n'+stpsTXT, style: 'descripTabla', colSpan: 9}, {}, {}, {}, {}, {}, {}, {}, {}]
					]
				}
			},
			{
				text: {text: ' '},
				style: 'espaciado'
			},
			{
				table: {
					widths: ['*', '*', '*'],
					body: [
						[{text: 'Los datos se asientan en esta constancia bajo protesta de decir verdad, apercibidos de la responsabilidad en que incurre todo', style: 'descripTabla4', colSpan: 3, border: [true, true, true, false], margin: [0 ,5 ,0 , 0]}, {}, {}],
						[{text: 'aquel que no se conduce con verdad.', style: 'descripTabla4', colSpan: 3, border: [true, false, true, false]}, {}, {}],
						[
							{text: 'Instructor o tutor\n\n' + stpsTXT + '\n____________________________________\nNombre y firma\n', style: 'descripTabla2', border: [true, false, false, true], margin: [0 ,8 ,0 , 8]},
							{text: 'Patrón o representante legal\n\n\n____________________________________\nNombre y firma\n', style: 'descripTabla2', border: [false, false, false, true], margin: [0 ,8 ,0 , 8]},
							{text: 'Representante de los trabajadores\n\n\n____________________________________\nNombre y firma\n', style: 'descripTabla2', border: [false, false, true, true], margin: [0 ,8 ,0 , 8]}
						]
					]
				}
			},
			{
				text: {text: ' '},
				style: 'espaciado'
			},
			{
				text: {text: 'INSTRUCCIONES'},
				style: 'encabezadoBold'
			},
			{
				text: {text: '  - Llenar a máquina o con letra de molde'},
				style: 'descripTabla3'
			},
			{
				text: {text: '  - Deberá entregarse al trabajador dentro de los veinte días hábiles siguientes al término del curso de capacitación aprobado.'},
				style: 'descripTabla3'
			},
			{
				text: [
					{text: '³ Las áreas y subáreas ocupacionales del Catálogo Nacional de Ocupaciones se encuentran disponibles en el reverso de este formato y en la página ', style: 'descripTabla3'},
					{text: 'www.stps.gob.mx', link: 'http://www.stps.gob.mx', style: 'link'}
				]
			},
			{
				text: [
					{text: '³ Las áreas temáticas de los cursos se encuentran disponibles en el reverso de este formato y en la página ', style: 'descripTabla3'},
					{text: 'www.stps.gob.mx', link: 'http://www.stps.gob.mx', style: 'link'}
				]
			},
			{
				text: {text: '³ Cursos impartidos por el área competente de la Secretaria del Trabajo y Previsión Social.'},
				style: 'descripTabla3'
			},
			{
				text: {text: ' ³ Para empresas con menos de 51 trabajadores. Para empresas con más de 50 trabajadores firmaría el representante del patrón ante la Comisión mixta de capacitación,'},
				style: 'descripTabla3'
			},
			{
				text: [
					{text: ' \t    \t    \t     ', style: 'tabEspacio'},
					{text: 'adiestramiento y productividad.', style: 'descripTabla3'}
				]
			},
			{
				text: {text: '³ Solo para empresas con más de 50 trabajadores'},
				style: 'descripTabla3'
			},
			{
				text: {text: '* Dato no obligatorio.'},
				style: 'descripTabla3'
			},
			{
				text: [
					{text: 'DC-3', style: 'piePagina'},
					{text: ' \t    \t    \t    \t   \t', style: 'tabEspacio'}
				]
			},
			{
				text: [
					{text: 'ANVERSO', style: 'piePagina'},
					{text: ' \t    \t    \t      \t', style: 'tabEspacio'}
				]
			},
			{ // HOJA NUMERO 2
				text: '\n\n\n', pageBreak: 'before'
			},
			{
				text: {text: 'CLAVES Y DENOMINACIONES DE ÁREAS Y SUBÁREAS DEL CATÁLOGO NACIONAL DE OCUPACIONES\n'},
				style: 'tituloH2'
			},
			{
				text: {text: '\n'},
				style: 'tituloH2'
			},
			{
				table: {
					widths: [80, '*', 80, '*'],
					body: [
						[
							{text: '  CLAVE DEL\n  ÁREA/SUBÁREA', style: 'tituloH2', border: [false, false, false, false]},
							{text: '\nDENOMINACIÓN', style: 'tituloH2', border: [false, false, false, false]},
							{text: 'CLAVE DEL\nÁREA/SUBÁREA ', style: 'tituloH2', border: [false, false, false, false]},
							{text: '\nDENOMINACIÓN', style: 'tituloH2', border: [false, false, false, false]}
						],
						[
							{text: '01', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Cultivo, crianza y aprovechamiento', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '06', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Transporte', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '01.1', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Agricultura y silvicultura', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '06.1', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Ferroviario', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '01.2', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Ganadería', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '06.2', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Autotransporte', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '01.3', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Pesca y acuacultura', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '06.3', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Aéreo', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '06.4', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Marítimo y fluvial', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '02', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Extracción y suministro', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '06.5', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Servicios de apoyo', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '02.1', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Exploración', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '02.2', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Extracción', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '07', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Provisión de bienes y servicios', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '02.3', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Refinación y beneficio', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '07.1', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Comercio', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '02.4', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Provisión de energía', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '07.2', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Alimentación y hospedaje', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '02.5', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Provisión de agua', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '07.3', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Turismo', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '07.4', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Deporte y esparcimiento', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '03', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Construcción', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '07.5', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Servicios personales', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '03.1', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Planeación y dirección de obras', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '07.6', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Reparación de artículos de uso doméstico y personal', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '03.2', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Edificación y urbanización', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '07.7', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Limpieza', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '03.3', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Acabado', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '07.8', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Servicio postal y mensajería', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '03.4', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Instalación y mantenimiento', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '08', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Gestión y soporte administrativo', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '04', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Tecnología', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '08.1', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Bolsa, banca y seguros', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '04.1', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Mecánica', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '08.2', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Administración', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '04.2', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Electricidad', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '08.3', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Servicios legales', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '04.3', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Electrónica', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '04.4', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Informática', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '09', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Salud y protección social', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '04.5', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Telecomunicaciones', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '09.1', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Servicios médicos', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '04.6', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Procesos industriales', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '09.2', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Inspección sanitaria y del medio ambiente', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '09.3', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Seguridad social', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '05', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Procesamiento y fabricación', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '09.4', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Protección de bienes y/o personas', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '05.1', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Minerales no metálicos', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '05.2', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Metales', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '10', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Comunicación', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '05.3', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Alimentos y bebidas', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '10.1', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Publicación', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '05.4', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Textiles y prendas de vestir', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '10.2', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Radio, cine, televisión y teatro', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '05.5', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Materia orgánica', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '10.3', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Interpretación artística', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '05.6', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Productos químicos', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '10.4', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Traducción e interpretación lingüística', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '05.7', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Productos metálicos y de hule y plástico', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '10.5', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Publicidad, propaganda y relaciones públicas', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '05.8', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Productos eléctricos y electrónicos', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '05.9', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Productos impresos', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '11', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Desarrollo y extensión del conocimiento', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '11.1', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Investigación', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '11.2', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Enseñanza', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '11.3', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Difusión cultural', style: 'contTabla2H2', border: [false, false, false, false]}
						]
					]
				}
			},
			{
				text: {text: '\nCLAVES Y DENOMINACIONES DEL CATÁLOGO DE ÁREAS TEMÁTICAS DE LOS CURSOS\n'},
				style: 'tituloH2'
			},
			{
				table: {
					widths: [80, '*', 80, '*'],
					body: [
						[
							{text: '  CLAVE DEL\n  ÁREA', style: 'tituloH2', border: [false, false, false, false]},
							{text: '\nDENOMINACIÓN', style: 'tituloH2', border: [false, false, false, false]},
							{text: 'CLAVE DEL\nÁREA ', style: 'tituloH2', border: [false, false, false, false]},
							{text: '\nDENOMINACIÓN', style: 'tituloH2', border: [false, false, false, false]}
						],
						[
							{text: '1000', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Producción general', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '6000', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Seguridad', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '2000', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Servicios', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '7000', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Desarrollo personal y familiar', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '3000', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Administración, contabilidad y economía', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '8000', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Uso de tecnologías de la información y comunicación', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '4000', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Comercialización', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '9000', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Participación social', style: 'contTabla2H2', border: [false, false, false, false]}
						],
						[
							{text: '5000', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: 'Mantenimiento y reparación', style: 'contTabla2H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla1H2', border: [false, false, false, false]},
							{text: '\n', style: 'contTabla2H2', border: [false, false, false, false]}
						]
					]
				}
			},
			{
				text: [
					{text: 'DC-3', style: 'piePagina'},
					{text: ' \t    \t    \t    \t   \t', style: 'tabEspacio'}
				]
			},
			{
				text: [
					{text: 'REVERSO', style: 'piePagina'},
					{text: ' \t    \t    \t      \t', style: 'tabEspacio'}
				]
			}
		],
		styles: {
			encabezado: {
				fontSize: 9.12,
				alignment: 'center',
				font: 'ArialNarrow'
			},
			encabezadoBold: {
				fontSize: 9.12,
				alignment: 'left',
				font: 'ArialNarrow',
				bold: true
			},
			titulo: {
				fontSize: 12,
				alignment: 'center',
				font: 'ArialBoldMT',
				bold: true
			},
			tituloTabla: {
				fontSize: 10.20,
				bold: false,
				font: 'ArialBoldMT',
				alignment: 'center',
				color: 'white'
			},
			descripTabla: {
				fontSize: 9.12,
				alignment: 'left',
				font: 'ArialNarrow'
			},
			descripTabla2: {
				fontSize: 9.12,
				alignment: 'center',
				font: 'ArialNarrow'
			},
			descripTabla3: {
				fontSize: 7.92,
				alignment: 'left',
				font: 'ArialNarrow'
			},
			descripTabla4: {
				fontSize: 9.12,
				alignment: 'center',
				font: 'ArialNarrow',
				bold: true
			},
			llenadoTabla: {
				fontSize: 9,
				alignment: 'center'
			},
			espaciado: {
				fontSize: 5
			},
			tabEspacio: {
				fontSize: 7.92,
				color: 'white'
			},
			link: {
				fontSize: 7.92,
				alignment: 'left',
				font: 'ArialNarrow',
				color: 'blue',
				decoration: 'underline'
			},
			piePagina: {
				alignment: 'right',
				font: 'ArialNarrow',
				fontSize: 9.12
			},
			tituloH2: {
				fontSize: 6.48,
				alignment: 'center',
				font: 'ArialBoldMT',
				bold: true
			},
			contTabla1H2: {
				fontSize: 6.80,
				alignment: 'center',
				font: 'ArialNarrow'
			},
			contTabla2H2: {
				fontSize: 6.80,
				alignment: 'left',
				font: 'ArialNarrow'
			},
			espacionContH2: {
				fontSize: 5
			}
		}
	};

	// VERIFICAMOS QUE ACCION REALIZAREMOS
	if(accionPDF === 1){
		// ABRIMOS EL DOC
		pdfMake.createPdf(doc).open();
	}else if(accionPDF === 2){
		// DESCARGAMOS EL DOC
		pdfMake.createPdf(doc).download();
	}
}