// FUNCIONES PRINCIPALES
var trabajadorNuevo = true;
var empresaNuevo = true;
var cursoNuevo = true;

var accionPDF = 0;
$(document).on("click", "#visualizarPDF" ,function(){
	reeimpresion = false;
	accionPDF = parseInt($(this).val());
	valsFormulario();
});

$(document).on("click", "#descargarPDF", function(){
	reeimpresion = false;
	accionPDF = parseInt($(this).val());
	valsFormulario();
});

$(document).on('click', '#limpiarTrabajador', function(){
	limpiarTrabajador();
});
// FUNCION AUXILIAR DESHABILITAR BOTONES (ANTES DE QUE IMPRIMA)
function disabledBtnDoc(){
	$('#visualizarPDF').addClass('disabled');
	$('#descargarPDF').addClass('disabled');
	$('#limpiarTrabajador').addClass('disabled');
}
// FUNCIO AUXILIAR HABILITAR BOTONES (DESPUES DE QUE IMPRIMA)
function habilBtnDoc(){
	$('#visualizarPDF').removeClass('disabled');
	$('#descargarPDF').removeClass('disabled');
	$('#limpiarTrabajador').removeClass('disabled');
}


// ABRIR MODAL (CURSOS)
$(document).on('click', '#altaCursos', function(){
	modalCursosFill();
	accionCurso = 'altaCursos';
	idCurso = '';
	tituloCursoAccion = 'Nuevo curso';
	descCursoAccion = '¿Decea guardar este curso?';
});
// ABRIR MODAL (EMPRESAS)
$(document).on('click', '#altaEmpresas', function(){
	modalEmpresasFill();
	accionEmpresa = 'altaEmpresa';
	idEmpresa = '';
	tituloEmpresaAccion = "Nueva empresa";
	descEmpresaAccion = "¿Decea guardar esta empresa?";
});
// ABRIR MODAL (REIMPIRIMIR)
$(document).on('click', '#reimprimir', function(){
	modalDocsBusquedaFill();
});
// CERRAR MODAL
$(document).on('click', "button[name='cerrModal']", function(){
	$('#modalCapt').modal('hide');
});

// ::::::::: ******** FUNCIONES CON EMPRESAS ******* :::
// ALTA DE EMPRESA
var accionEmpresa;
var idEmpresa;
var tituloEmpresaAccion;
var descEmpresaAccion;
$(document).on('click', '#altaEmpresa', function(){
	if($('#empresa').val() === ''){
		$('#empresa').focus();
	}else if($('#rfc').val() === ''){
		$('#rfc').focus();
	}else if($('#rfc').val().length < 12){
		$('#rfc').focus();
		msgMulti('Error RFC', 'Formato de RFC incorrecto\n\n<b>Debe contener de 12 a 13 caracteres</b>', 12000, 'error');
	}else if($('#patron').val() === ''){
		$('#patron').focus();
	}else if($('#representante').val() === ''){
		$('#representante').focus();
	}else{
		if(accionEmpresa === 'editarEmpresa' && $('#imgfile').val() === ''){
			$.confirm({
			    title: 'No seleccionó imagen',
			    content: 'Si previamente eligió una imagen para esta empresa, este cambio la eliminará\n¿Decea continuar?',
			    buttons: {
			        guardar: {
			            text: 'Si, quitar imagen',
			            btnClass: 'btn-default',
			            action: function(){
			            	fotoPDF = 'sin-foto';
			            	altaEditEmpresa();
			            }
			        },
			        noguardar: {
			            text: 'Mantener imagen anterior',
			            btnClass: 'btn-warning',
			            action: function(){
			            	fotoPDF = 'noeditar';
			            	altaEditEmpresa();
			            }
			        }
			    }
			});
		}else{
			altaEditEmpresa();
		}
	}
});

// CONSULTA EMPRESA
var verifEmpresaTXT;
$(document).on('keyup', '#empresa', function(e){
	consultEmpresa($(this).val(), 'empresa', 'modal', 'empresa');
	if(e.keyCode === 27 && verifEmpresaTXT === $('#empresa').val()){
		borrarEmpresas(idEmpresa);
	}
});

// BUSCAR EMPRESAS AUX
$(document).on('keyup', '#selectEmpresa', function(e){
	consultEmpresa($(this).val(), 'selectEmpresa', 'body', 'doc');
	if(e.keyCode === 8){
		$('#selectCurso').html('');
		$('#selectCurso').append('<option value="-1">- Seleccione el curso -</option>');
	}
});

// CONSULTA EMPRESA (ALTA CURSO)
$(document).on('keyup', '#nomEmpresa', function(e){
	consultEmpresa($(this).val(), 'nomEmpresa', 'modal', 'curso');
	if(e.keyCode === 8){
		idEmpresaCurso = '';
	}
});

// CONSULTA CURSO
$(document).on('keyup', '#nomCurso', function(){
	consultCurso($(this).val(), 'nomCurso');
});

// ::::::::: ******** FUNCIONES CON CURSOS ******* :::
// FUNCION ALTA CURSOS
var accionCurso;
var idCurso;
var tituloCursoAccion;
var descCursoAccion;
$(document).on('click', '#altaCurso', function(){
	if($('#nomEmpresa').val() === ''){
		$('#nomEmpresa').focus();
	}else if(idEmpresaCurso === ''){
		msgMulti('Error de lectura de empresa', 'Vuelva a realizar la busqueda de empresa y <b>no cambie los valores</b>', 9000, 'error');
	}else if($('#nomCurso').val() === ''){
		$('#nomCurso').focus();
	}else if($('#duracion').val() === ''){
		$('#duracion').focus();
	}else if($('#fechaIni').val() === ''){
		$('#fechaIni').focus();
	}else if($('#fechaFin').val() === ''){
		$('#fechaFin').focus();
	}else if($('#cursosCat').val() === '-1'){
		$('#cursosCat').focus();
	}else if($('#instructor').val() === ''){
		$('#instructor').focus();
	}else if($('#capacitador').val() === ''){
		$('#capacitador').focus();
	}else{
		if(accionCurso === 'editarCurso' && $('#imgfile2').val() === ''){
			$.confirm({
			    title: 'No seleccionó imagen',
			    content: 'Si previamente eligió una imagen para este curso, esta se eliminará\n¿Decea continuar?',
			    buttons: {
			        guardar: {
			            text: 'Si, quitar imagen',
			            btnClass: 'btn-default',
			            action: function(){
			            	altaEditCursos();
			            }
			        },
			        noguardar: {
			            text: 'Mantener imagen anterior',
			            btnClass: 'btn-warning',
			            action: function(){
			            	fotoPDF2 = 'noeditar';
			            	altaEditCursos();
			            }
			        }
			    }
			});
		}else{
			altaEditCursos();
		}
	}
});

// **************************************************
// :::::::::: FUNCIONES CON BASE DE DATOS :::::::::::
// **************************************************

// -------------- EMPRESAS -----------------------
// ALTA - EDICION EMPRESA
function altaEditEmpresa(){
	if(accionEmpresa === 'altaEmpresa' && $('#imgfile').val() !== ''){
		cadenaRandom(8);
		fotoPDF = cadAleatoria;
	}

	var jsonEmpresa = {
		id: idEmpresa,
		nombre: $('#empresa').val(),
		rfc: $('#rfc').val(),
		patron: $('#patron').val(),
		representante: $('#representante').val(),
		img: fotoPDF
	};
	$.confirm({
	    title: tituloEmpresaAccion,
	    content: descEmpresaAccion,
	    buttons: {
	        guardar: {
	            text: 'Guardar',
	            btnClass: 'btn-default',
	            keys: ['enter', 'shift'],
	            action: function(){
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
							if(fotoPDF !== 'sin-foto' && fotoPDF !== 'noeditar'){
								var imgEmpresa = document.getElementById("imgfile").files[0];
								var data = new FormData();
								data.append('archivo', imgEmpresa);
								data.append('nombre', cadAleatoria);

								$.ajax({
									url: "clases/imgBase64.php",
									type: "POST",
									cache: false,
									contentType: false,
									data: data,
									processData: false,
									error: function(error){
										console.log(error);
										//removeSpinner();
									},
									success: function(data){
										accionEmpresa = 'altaEmpresa';
										idEmpresa = '';
										tituloEmpresaAccion = "Nueva empresa";
										descEmpresaAccion = "¿Decea guardar esta empresa?";
										$('#buscarEmpresa').val('');
										$('#tablaEmpresa').html('');
										msgMulti('Exito', 'Empresa guardada con exito', 6000, 'success');
										limpiarModalEmpresas();
									}
								});
							}else{
								accionEmpresa = 'altaEmpresa';
								idEmpresa = '';
								tituloEmpresaAccion = "Nueva empresa";
								descEmpresaAccion = "¿Decea guardar esta empresa?";
								$('#buscarEmpresa').val('');
								$('#tablaEmpresa').html('');
								msgMulti('Exito', 'Empresa guardada con exito', 6000, 'success');
								limpiarModalEmpresas();
							}

						}
					});

	            }
	        },
	        noguardar: {
	            text: 'Cancelar',
	            btnClass: 'btn-danger',
	            keys: ['enter', 'shift'],
	            action: function(){}
	        }
	    }
	});
}
// FUNCION EDITAR EMPRESAS
function editarEmpresa(id){
	idEmpresa = id;
	accionEmpresa = 'editarEmpresa';
	tituloEmpresaAccion = "Editar empresa";
	descEmpresaAccion = "¿Decea guardar los cambios?";

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
	$.confirm({
	    title: 'Eliminar empresa',
	    content: '¿Decea eliminar esta empresa?',
	    buttons: {
	        guardar: {
	            text: 'Eliminar',
	            btnClass: 'btn-danger',
	            action: function(){
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
							msgMulti('Exito', 'Empresa eliminada con exito', 6000, 'success');
						}
					});
	            }
	        },
	        noguardar: {
	            text: 'Cancelar',
	            btnClass: 'btn-default',
	            action: function(){}
	        }
	    }
	});
}
// FUNCION GLOBAL CONSULTAR EMPRESA
function consultEmpresa(nombre, idInput, lugar, accion){
	var empresas = [];
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
				$.each(data, function (i, campo){
					//empresas.push(campo.nombre);
					empresas.push({label: campo.nombre, value: campo.nombre, emp: campo.id});
				});
				$('#'+idInput).autocomplete({
					source: function(request, response) {
			            response(empresas);
			        },
					select: function(event, ui){
						var idEmp = ui.item.emp;
						if(accion === 'doc'){
							selecEmpresaDoc(idEmp);
						}else if(accion === 'empresa'){
							editarEmpresa(idEmp);
							verifEmpresaTXT = $('#empresa').val();
						}else if(accion === 'curso'){
							selecEmpresaCurso(idEmp);
						}
					}
				});
				if(lugar === 'modal'){
					$("#"+idInput).autocomplete( "option", "appendTo", "#modalCapt" );	
				}
			}
		});
	}
}

// ------------------------------------------------
// -------------- CURSOS -----------------------
var idEmpresaCurso = '';
function selecEmpresaCurso(id){
	idEmpresaCurso = id;
	$('#nomCurso').focus();
}
// FUNCION ALTA DE CURSOS
function altaEditCursos(){
	if(accionCurso === 'altaCursos' && $('#imgfile2').val() !== ''){
		cadenaRandom(8);
		fotoPDF2 = cadAleatoria;
	}
	var jsonCursos = {
		id: idCurso,
		idEmpresa: idEmpresaCurso,
		nomEmpresa: $('#nomEmpresa').val(),
		curso: $('#nomCurso').val(),
		duracion: $('#duracion').val(),
		inicio: $('#fechaIni').val(),
		fin: $('#fechaFin').val(),
		area: $('#cursosCat option:selected').text(),
		instructor: $('#instructor').val(),
		stps: $('#capacitador').val(),
		imagen: fotoPDF2
	};

	$.confirm({
	    title: tituloCursoAccion,
	    content: descCursoAccion,
	    buttons: {
	        guardar: {
	            text: 'Guardar',
	            btnClass: 'btn-default',
	            action: function(){
	               $.ajax({
						url:'rutas/rutaCursos.php',
						type:'POST',
						data: {info: jsonCursos, action: accionCurso},
						dataType:'JSON',
						error: function(error){
							console.log(error);
							//removeSpinner();
						},
						success: function(data){
							//removeSpinner();

							if(fotoPDF2 !== 'sin-foto' || fotoPDF2 !== 'noeditar'){
								var imgEmpresa = document.getElementById("imgfile2").files[0];
								var data = new FormData();
								data.append('archivo', imgEmpresa);
								data.append('nombre', cadAleatoria);

								$.ajax({
									url: "clases/imgBase64.php",
									type: "POST",
									cache: false,
									contentType: false,
									data: data,
									processData: false,
									error: function(error){
										console.log(error);
										//removeSpinner();
									},
									success: function(data){
										limpiarModalCursos();
							            msgMulti('Exito', 'Curso guardado con exito', 6000, 'success');
									}
								});
							}else{
								limpiarModalCursos();
							    msgMulti('Exito', 'Curso guardado con exito', 6000, 'success');
							}

							/*$.confirm({
							    title: 'Limpiar Campos',
							    content: '¿Decea limpiar el formulario?',
							    buttons: {
							        guardar: {
							            text: 'Limpiar',
							            btnClass: 'btn-info',
							            action: function(){
							            	limpiarModalCursos();
							            	msgMulti('Exito', 'Curso guardado con exito', 6000, 'success');
							            }
							        },
							        noguardar: {
							            text: 'Mantener valores',
							            btnClass: 'btn-default',
							            action: function(){
							            	msgMulti('Exito', 'Curso guardado con exito', 6000, 'success');
							            }
							        }
							    }
							});*/
						//FIN DE SUCCESS
						}
					});
	            }
	        },
	        noguardar: {
	            text: 'Cancelar',
	            btnClass: 'btn-danger',
	            action: function(){}
	        }
	    }
	});
}

// FUNCION EDITAR CURSO
function editarCurso(id){
	idCurso = id;
	if($('#consulCurso').val() === "1")
		$('#consulCurso').click();

	accionCurso = 'editarCurso';
	tituloCursoAccion = 'Editar curso';
	descCursoAccion = '¿Decea guardar los cambios?';

	$.ajax({
		url:'rutas/rutaCursos.php',
		type:'POST',
		data: {info: idCurso, action: 'traerCurso'},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			//removeSpinner();
		},
		success: function(data){
			//removeSpinner();
			idEmpresaCurso =  data[0]["idempresa"];
			$('#nomEmpresa').val(data[0]["nomempresa"]);
			$('#nomCurso').val(data[0]["curso"]);
			$('#duracion').val(data[0]["duracion"]);
			$('#fechaIni').val(data[0]["inicio"]);
			$('#fechaFin').val(data[0]["final"]);

			var valArea = data[0]["area"].split(' - ')[0];
			$("#cursosCat option[value='"+valArea+"']").prop('selected',true);

			$('#capacitador').val(data[0]["stps"]);
			$('#instructor').val(data[0]["instructor"]);
			$('#imgfile2').val('');

			var c = document.getElementById("canvas2");
			var ctx = c.getContext("2d");
			ctx.clearRect(0, 0, c.width, c.height);
			fotoPDF2 = 'sin-foto';
		}
	});
}

// FUNCION DE BORRADO DE CURSOS
function borrarCurso(id){
	$.confirm({
	    title: 'Eliminar curso',
	    content: '¿Decea eliminar este curso?',
	    buttons: {
	        guardar: {
	            text: 'Eliminar',
	            btnClass: 'btn-danger',
	            action: function(){
	               $.ajax({
						url:'rutas/rutaCursos.php',
						type:'POST',
						data: {info: id, action: 'bajaCurso'},
						dataType:'JSON',
						error: function(error){
							console.log(error);
							//removeSpinner();
						},
						success: function(data){
							//removeSpinner();
							$('#consulCurso').click();
							$('#nomCurso').val('');
							$('#tablaCurso').html('');
							msgMulti('Exito', 'Curso eliminado con exito', 6000, 'success');
						}
					});
	            }
	        },
	        noguardar: {
	            text: 'Cancelar',
	            btnClass: 'btn-default',
	            action: function(){}
	        }
	    }
	});
}

// FUNCION DE CONSULTA DE CURSO
function consultCurso(nombre, idInput){
	var cursos = [];
	if(nombre !== ''){
		$.ajax({
			url:'rutas/rutaCursos.php',
			type:'POST',
			data: {info: nombre, action: 'consultaCurso'},
			dataType:'JSON',
			error: function(error){
				console.log(error);
				//removeSpinner();
			},
			success: function(data){
				$.each(data, function (i, campo){
					cursos.push({label: campo.curso, value: campo.curso, cur: campo.id});
				});
				$('#'+idInput).autocomplete({
					source: function(request, response) {
			            response(cursos);
			        },
					select: function(event, ui){
						var idCurs = ui.item.cur;
						editarCurso(idCurs);
					}
				});
				$("#"+idInput).autocomplete( "option", "appendTo", "#modalCapt" );	
			}
		});
	}
}

// FUNCIONES CON TRABAJADORES
function altaTrabajador(){
	var accionTrab;
	if(idTrabajador === ''){
		accionTrab = 'altaTrabajador';
	}else{
		accionTrab = 'editarTrabajador';
	}

	var dataTrabajador = {
		id: idTrabajador,
		nombre: $('#nomEmpleado').val(),
		curp: $('#curp').val().toUpperCase(),
		ocupacion: $('#empleosCat option:selected').text(),
		puesto: $('#puesto').val(),
		nomEmpresa: $('#selectEmpresa').val(),
		idEmpresa: idEmpresaDoc
	};
	$.ajax({
		url:'rutas/rutaTrabajador.php',
		type:'POST',
		data: {info: dataTrabajador, action: accionTrab},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			//removeSpinner();
		},
		success: function(data){
			limpiarTrabajador();
			// FIN
		}
	});
}
// FUNCION DE BORRADO DE TRABAJADOR
function borrarTrabajador(idTrab){
	$.confirm({
	    title: 'Eliminar trabajador',
	    content: '¿Decea eliminar este trabajador?',
	    buttons: {
	        guardar: {
	            text: 'Eliminar',
	            btnClass: 'btn-danger',
	            action: function(){
	               $.ajax({
						url:'rutas/rutaTrabajador.php',
						type:'POST',
						data: {info: idTrab, action: 'bajaTrabajador'},
						dataType:'JSON',
						error: function(error){
							console.log(error);
							//removeSpinner();
						},
						success: function(data){
							//removeSpinner();
							limpiarTrabajador();
							msgMulti('Exito', 'Trabajador eliminado con exito', 6000, 'success');
						}
					});
	            }
	        },
	        noguardar: {
	            text: 'Cancelar',
	            btnClass: 'btn-default',
	            action: function(){}
	        }
	    }
	});
}

// FUNCION CONSULTA TRABAJADOR
$(document).on('keyup', '#nomEmpleado', function(e){
	busqTrabajador($(this).val(), 'nomEmpleado', 'consulTrabajadorNombre');
	if(e.keyCode === 27){
		borrarTrabajador(idTrabajador);
	}
});

$(document).on('keyup', '#curp', function(e){
	busqTrabajador($(this).val(), 'curp', 'consulTrabajadorCurp');
	if(e.keyCode === 27){
		borrarTrabajador(idTrabajador);
	}
});

var idTrabajador = '';
function busqTrabajador(trabData, idInput, tipoBusq){
	var trabajador = [];
	if(trabData !== ''){
		$.ajax({
			url:'rutas/rutaTrabajador.php',
			type:'POST',
			data: {info: trabData, action: tipoBusq},
			dataType:'JSON',
			error: function(error){
				console.log(error);
				//removeSpinner();
			},
			success: function(data){
				$.each(data, function (i, campo){
					if(tipoBusq === 'consulTrabajadorNombre'){
							trabajador.push({label: campo.nombre, value: campo.nombre, curp: campo.curp, idt: campo.id, emp: campo.idempresa, nomemp: campo.empresa, ocup: campo.ocupacion, pues: campo.puesto});
					}else if(tipoBusq === 'consulTrabajadorCurp'){
							trabajador.push({label: campo.curp, value: campo.curp, nombre: campo.nombre, idt: campo.id, emp: campo.idempresa, nomemp: campo.empresa, ocup: campo.ocupacion, pues: campo.puesto});
					}
				});
				$('#'+idInput).autocomplete({
					source: function(request, response) {
			            response(trabajador);
			        },
					select: function(event, ui){
						idTrabajador = ui.item.idt;
						$("#empleosCat option[value='"+ui.item.ocup.split(' - ')[0]+"']").prop('selected',true);
						$('#puesto').val(ui.item.pues);
						if(tipoBusq === 'consulTrabajadorNombre'){
							$('#curp').val(ui.item.curp);
						}else if(tipoBusq === 'consulTrabajadorCurp'){
							$('#nombre').val(ui.item.nombre);
						}
						selecEmpresaDoc(ui.item.emp);
						$('#selectEmpresa').val(ui.item.nomemp);
					}
				});
			}
		});
	}
}
// FUNCION GUARDAR DOCUMENTO COMPLETO
function altaDocCompleto(){
	fechaHoraFunc();
	var docData = {
		nombre : nombreSAVE,
		curp : curpSAVE,
		ocupacion : ocupacionSAVE,
		puesto : puestoSAVE,
		empresa : empresaSAVE,
		shcp : shcpSAVE.toUpperCase(),
		curso : cursoSAVE,
		duracion : duracionSAVE,
		init : initSAVE,
		fin : finSAVE,
		clvcurso : clvcursoSAVE,
		instructor : instructorSAVE,
		stps : stpsSAVE,
		patron : patronSAVE,
		representante : representanteSAVE,
		imgEmp : imgEmpSAVE,
		imgCurso : imgCursoSAVE,
		fecha: fechaHora              
	};
	$.ajax({
		url:'rutas/rutaTrabajador.php',
		type:'POST',
		data: {info: docData, action: 'altaDocCompleto'},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			//removeSpinner();
		},
		success: function(data){
			//removeSpinner();
		}
	});
}

$(document).on('keyup', '#buscarTrabajador', function(){
	$('#tablaDocs').html('');
	if($(this).val() !== ''){
		$.ajax({
			url:'rutas/rutaTrabajador.php',
			type:'POST',
			data: {info: $(this).val(), action: 'buscarDoc'},
			dataType:'JSON',
			error: function(error){
				console.log(error);
				//removeSpinner();
			},
			success: function(data){
				//removeSpinner();
				var tabla = "<table class='table'><thead><tr><th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='glyphicon glyphicon-file'></span><th>Trabajador</th><th>Empresa</th><th>Curso</th><th>Emisión</th></tr></thead><tbody>";
				$.each(data, function (i, campo){
					fechaHoraFormatear(campo.fecha);
						tabla += '<tr><td><button class="btn btn-xs btn-success" onclick="reimprimirDoc(1,' + campo.id + ')"><span class="glyphicon glyphicon-print" title="Imprimir PDF"></span></button>&nbsp;&nbsp;<button class="btn btn-xs btn-primary" title="Descargar PDF" onclick="reimprimirDoc(2,' + campo.id + ')"><span class="glyphicon glyphicon-save"></span></button></td>' + 
								'<td>' + campo.nombre + '</td>' +
								'<td>' + campo.empresa + '</td>' +
								'<td>' + campo.curso + '</td>' +
								'<td>' + fechaHoraFormato + '</td></tr>';
				});
				tabla += '</tbody></table>';
				$('#tablaDocs').append(tabla);
			}
		});
	}
});

var reeimpresion;
function reimprimirDoc(acc, id){
	$.ajax({
		url:'rutas/rutaTrabajador.php',
		type:'POST',
		data: {info: id, action: 'traerDoc'},
		dataType:'JSON',
		error: function(error){
			console.log(error);
				//removeSpinner();
		},
		success: function(data){
			//removeSpinner();
			$('#modalCapt').modal('hide');
			$.each(data, function (i, campo){
				nombreSAVE = campo.nombre;
				curpSAVE = campo.curp;
				ocupacionSAVE = campo.ocupacion;
				puestoSAVE = campo.puesto;
				empresaSAVE = campo.empresa;
				shcpSAVE = campo.shcp;
				cursoSAVE = campo.curso;
				duracionSAVE = campo.duracion;
				initSAVE = campo.init;
				finSAVE = campo.fin;
				clvcursoSAVE = campo.clvcurso;
				instructorSAVE = campo.instructor;
				stpsSAVE = campo.stps;
				patronSAVE = campo.patron;
				representanteSAVE = campo.representante;
				imgEmpSAVE = campo.imgemp;
				imgCursoSAVE = campo.imgcurso;
				fechaHora = campo.fechaHora;
			});
			if(imgCursoSAVE !== 'sin-foto'){
				$.getJSON( "json/" + imgCursoSAVE + ".json", function( data ) {
					$.each(data, function( key, val) {
						imgCursoTXT = val[0]["codigo"];
						imgEmpW = val[0]["detalles"].split('-')[0];
						imgEmpH = val[0]["detalles"].split('-')[1];
					});
				});
			}else{
				imgCursoTXT = imgCursoSAVE;
			}
			if(imgEmpSAVE !== 'sin-foto'){
				$.getJSON( "json/" + imgEmpSAVE + ".json", function( data ) {
					$.each(data, function( key, val) {
						imgEmpTXT = val[0]["codigo"];
						imgCurW = val[0]["detalles"].split('-')[0];
						imgCurH = val[0]["detalles"].split('-')[1];
					});
				});
			}else{
				imgEmpTXT = imgEmpSAVE;
			}
			
			setTimeout(function(){
				reeimpresion = true;
				accionPDF = parseInt(acc);
				valsFormulario();
			},1000);
		}
	});
}
// ************************************************
// :::::::::::: FIN FUNCONES BASES DE DATOS :::::::
// ************************************************


// :::::::::::::::::::::::::::::::::::
// FUNCIONES CON CATALOGOS
function leerCatalogos(sel){
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
			llenarCatalogoSelect(data, sel);
		}
	});
}
// :::::::::::::::::::::::::::::::::::


// FUNCION TRAER CURSOS
var idEmpresaDoc;
function selecEmpresaDoc(id){
	idEmpresaDoc = id;
	$('#selectEmpresa').val($('#nomEmp_' + id).text());
	$('#selectCurso').html('');
	$.ajax({
		url:'rutas/rutaTrabajador.php',
		type:'POST',
		data: {info: id, action: 'traerCursoEmpresa'},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			//removeSpinner();
		},
		success: function(data){
			//removeSpinner();
			var option = '<option value="-1">- Seleccione el curso -</option>';
			$.each(data, function (i, campo){
				option += "<option value='" + campo.id +"'>" + campo.curso + "</option>";
			});
			$('#selectCurso').append(option);

			llenarDataEmpresas(id);
		}
	});
}

$(document).on('change', '#selectCurso', function(){
	if($(this).val() !== '-1'){
		$.ajax({
			url:'rutas/rutaTrabajador.php',
			type:'POST',
			data: {info: $(this).val(), action: 'traerDatosCurso'},
			dataType:'JSON',
			error: function(error){
				console.log(error);
				//removeSpinner();
			},
			success: function(data){
				//removeSpinner();
				$.each(data, function (i, campo){
					cursoSAVE = campo.curso;
					duracionSAVE = campo.duracion;
					initSAVE = campo.inicio;
					finSAVE = campo.final;
					clvcursoSAVE = campo.area;
					stpsSAVE = campo.stps;
					instructorSAVE = campo.instructor;
					imgCursoSAVE = campo.imagen;
				});
				// LLENADO DE CODIGO BASE64 (SI EXISTE)
				if(imgCursoSAVE !== 'sin-foto'){
					$.getJSON( "json/" + imgCursoSAVE + ".json", function( data ) {
						$.each(data, function( key, val) {
							imgCursoTXT = val[0]["codigo"];
							imgCurW = val[0]["detalles"].split('-')[0];
							imgCurH = val[0]["detalles"].split('-')[1];
						});
					}).done(function(){
						msgMulti('Datos de curso', '<b>Duracion (hrs): </b>' + duracionSAVE + '\n<b>Inicia: </b>' + initSAVE + '\n<b>Concluye: </b>' + finSAVE + '\n<b>Clave de Area: </b>' + clvcursoSAVE+ '\n<b>Capacitador: </b>' + stpsSAVE, 15000, 'info');
					});
				}else{
					imgCursoTXT = imgCursoSAVE;
					msgMulti('Datos de curso', '<b>Duracion (hrs): </b>' + duracionSAVE + '\n<b>Inicia: </b>' + initSAVE + '\n<b>Concluye: </b>' + finSAVE + '\n<b>Clave de Area: </b>' + clvcursoSAVE+ '\n<b>Capacitador: </b>' + stpsSAVE, 15000, 'info');
				}
			}
		});
	}
})

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

// FUNCION LIMPIAR CAMPOS MODAL (CURSOS)
function limpiarModalCursos(){
	idEmpresaCurso =  '';
	$('#nomEmpresa').val('');
	$('#nomCurso').val('');
	$('#duracion').val('');
	$('#fechaIni').val('');
	$('#fechaFin').val('');
	$("#cursosCat option[value='-1']").prop('selected',true);
	$('#capacitador').val('');
	$('#instructor').val('');
	$('#imgfile2').val('');

	var c = document.getElementById("canvas2");
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, c.width, c.height);
	fotoPDF = 'sin-foto';
}
// FUNCION LIMPIAR DATOS TRABAJADOR
function limpiarTrabajador(){
	$("#empleosCat option[value='-1']").prop('selected',true);
	$('#nomEmpleado').val('');
	$('#curp').val('');
	$('#puesto').val('');
	idTrabajador = '';

	$('#nomEmpleado').focus();
}

// *****************************************
// FUNCION LLENADO DINAMICO DE DATOS
function llenarCatalogoSelect(json, num){
	var empleoOptions = "<option value='-1'>- Eliga la Ocupacion específica (Catálogo nacional de ocupaciones) -</option>";
	var cursosOptions = "<option value='-1'>- Área temática del curso -</option>";
	$.each(json, function (i, catalogo){
		if(catalogo.tipo === "curso"){
			cursosOptions += "<option value='" + catalogo.clave + "'>" + catalogo.clave + " - " + catalogo.denominacion + "</option>";
		}else{
			empleoOptions += "<option value='" + catalogo.clave + "'>" + catalogo.clave + " - " + catalogo.denominacion + "</option>";
		}
	});
	if(num === 1){
		$('#cursosCat').html('');
		$('#cursosCat').append(cursosOptions);
	}else if(num === 2){
		$('#empleosCat').html('');
		$('#empleosCat').append(empleoOptions);
	}
	else if(num === 3){
		$('#cursosCat').html('');
		$('#empleosCat').html('');
		$('#cursosCat').append(cursosOptions);
		$('#empleosCat').append(empleoOptions);
	}
}
// FUNCION LLENAR VARIABLES


function llenarDataEmpresas(id){
	$.ajax({
		url:'rutas/rutaTrabajador.php',
		type:'POST',
		data: {info: id, action: 'traerDataEmpresa'},
		dataType:'JSON',
		error: function(error){
			console.log(error);
			//removeSpinner();
		},
		success: function(data){
			$.each(data, function (i, campo){
				empresaSAVE = campo.nombre;
				shcpSAVE = campo.rfc;
				patronSAVE = campo.jefe;
				representanteSAVE = campo.representante;
				imgEmpSAVE = campo.imagen;
			});
			// LLENADO DE CODIGO BASE64 (SI EXISTE)
			if(imgEmpSAVE !== 'sin-foto'){
				$.getJSON( "json/" + imgEmpSAVE + ".json", function( data ) {
					$.each(data, function( key, val) {
						 imgEmpTXT = val[0]["codigo"];
						 imgEmpW = val[0]["detalles"].split('-')[0];
						 imgEmpH = val[0]["detalles"].split('-')[1];
					});
				}).done(function(){
					msgMulti('Datos de empresa', '<b>RFC: </b>' + shcpSAVE + '\n<b>Jefe: </b>' + patronSAVE + '\n<b>Representante: </b>' + representanteSAVE, 15000, 'info');
				});
			}else{
				imgEmpTXT = imgEmpSAVE;
				msgMulti('Datos de empresa', '<b>RFC: </b>' + shcpSAVE + '\n<b>Jefe: </b>' + patronSAVE + '\n<b>Representante: </b>' + representanteSAVE, 15000, 'info');
			}
		}
	});
}

// VARIABLES DE LLENADO DE DATOS PARA CREAR DOCUMENTO
// VARIABLES FIJAS
var nombreTXT, curpTXT, ocupacionTXT, puestoTXT, empresaTXT;
var shcpTXT, cursoTXT, duracionTXT, initTXT, finTXT, clvcursoTXT, instructorTXT;
var stpsTXT, patronTXT, representanteTXT, imgEmpTXT, imgCursoTXT;
// VARIABLES MANIPULABLES
var nombreSAVE, curpSAVE, ocupacionSAVE, puestoSAVE, empresaSAVE;
var shcpSAVE, cursoSAVE, duracionSAVE, initSAVE, finSAVE, clvcursoSAVE, instructorSAVE;
var stpsSAVE, patronSAVE, representanteSAVE, imgEmpSAVE, imgCursoSAVE;
// VARIABLES DE VERIFICACION IMAGEN O TEXTO
var imgEmpW, imgEmpH, imgCurW, imgCurH;
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

	// CREACION DE IMAGENES O TEXTO EN DOC
	if(imgEmpSAVE === 'sin-foto'){
		imgTxtEmp = "{text: '\\n\\n\\n\\n\\n',border: [false, false, false, false]}";
	}else{
		imgTxtEmp = "{image: 'data:image/png;base64," + imgEmpTXT + "', fit: [" + parseInt(imgEmpW) + "," + parseInt(imgEmpW) + "], alignment: 'left', border: [false, false, false, false]}";
	}

	if(imgCursoSAVE === 'sin-foto'){
		imgTxtCurso = "{text: '\\n\\n\\n\\n\\n',border: [false, false, false, false]}";
	}else{
		imgTxtCurso = "{image: 'data:image/png;base64," + imgCursoTXT + "', fit: [" + parseInt(imgCurW) + "," + parseInt(imgCurH) + "], alignment: 'right', border: [false, false, false, false]}";
	}

	contTXTIMG = "[[" + imgTxtEmp + "," + imgTxtCurso + "]]";

	setTimeout(function(){
		crearDocumento();
		habilBtnDoc();
	}, 1500);
}

// ::::::::::::: FUNCION CON EL DOCUMENTO :::::::::::
// FUNCION QUE LLENA LAS VARS DESDE EL FORMULARIO
function valsFormulario(){
	var imprimir = false;
	if(reeimpresion === true){
		imprimir = true;
	}else if($('#nomEmpleado').val() === ''){
		msgMulti('Error', 'Coloque el nombre del trabajador', 6000,'error');
		$('#nomEmpleado').focus();
	}else if($('#curp').val() === ''){
		msgMulti('Error', 'Escriba la CURP del trabajador', 6000,'error');
		$('#curp').focus();
	}else if($('#curp').val().length < 17){
		msgMulti('Error', 'La estructura de la CURP es incorrecta\n\n<b>No debe ser inferior a 17 caracteres</b>', 10000,'error');
		$('#curp').focus();
	}else if($('#empleosCat').val() === '-1'){
		msgMulti('Error', 'Seleccione la ocupacion', 6000,'error');
		$('#empleosCat').focus();
	}else if($('#puesto').val() === ''){
		msgMulti('Error', 'Escriba el puesto del trabajador', 6000,'error');
		$('#puesto').focus();
	}else if($('#selectEmpresa').val() === ''){
		msgMulti('Error', 'Eliga la empresa', 6000,'error');
	}else if($('#selectCurso').val() === '-1'){
		msgMulti('Error', 'Eliga el curso', 6000,'error');
		$('#selectCurso').focus();
	}else{
		imprimir = true;
	}

	if(imprimir === true){
		if(reeimpresion === false){
			nombreSAVE = $('#nomEmpleado').val();
			curpSAVE = $('#curp').val().toUpperCase();
			ocupacionSAVE = $('#empleosCat option:selected').text();
			puestoSAVE = $('#puesto').val();
		}

		disabledBtnDoc();
		nombreTXT = nombreSAVE;

		curpTXT = curpSAVE;
		curpTXT = curpTXT.split('');
		if(curpTXT.length < 18){
			var curpNum = 18 - curpTXT.length;
			for(c = 0; c < curpNum; c++){
				curpTXT.push('');
			}
		}

		ocupacionTXT = ocupacionSAVE;
		puestoTXT = puestoSAVE;

		empresaTXT = empresaSAVE;

		shcpTXT = shcpSAVE.toUpperCase().split('');
		if(shcpTXT.length < 13){
			var shcpAux = [''];
			for(r = 0; r < shcpTXT.length; r++){
				shcpAux.push(shcpTXT[r]);
			}
			shcpTXT = [];
			shcpTXT = shcpAux;
		}

		cursoTXT = cursoSAVE;
		duracionTXT = duracionSAVE;
		initTXT = initSAVE.split('-');
		finTXT = finSAVE.split('-');
		clvcursoTXT = clvcursoSAVE;
		instructorTXT = instructorSAVE;
		stpsTXT = stpsSAVE;
		patronTXT = patronSAVE;
		representanteTXT = representanteSAVE;

		configValsPDF();
	}
}

// ::::::::::: FUNCIONES MISCELANEAS :::::::::::::::::
// FUNCION GLOBAL DE MENSAJE ALERT PARA NOTIFICACIONES
function msgMulti(titulo, descip, tiempo, tipo){
	new PNotify({
		title: titulo,
		text: descip,
		type: tipo,
		delay: tiempo
	});
}
var cadAleatoria;
function cadenaRandom(lng){
	cadAleatoria = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < lng; i++ )
        cadAleatoria += possible.charAt(Math.floor(Math.random() * possible.length));
    return cadAleatoria;
}

// CREACION DE FECHA - HORA
var fechaHora;
function fechaHoraFunc(){
	var d = new Date();
	var mes = d.getMonth() + 1;
	d = d.toString().split(' ');
	var dia;
	if(parseInt(mes) < 10){
		mes = '0' + mes;
	}
	fechaHora = d[3] + '-' + mes + '-' + d[2];
	// FORMATO DE FECHA :: AÑO-MES-DIA
}
var fechaHoraFormato;
function fechaHoraFormatear(fecha){
	var meses = ["*","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
	var dMes = parseInt(fecha.split("-")[1]);
	var dDia = parseInt(fecha.split("-")[2]);
	var dYear = parseInt(fecha.split("-")[0]);
	fechaHoraFormato = parseInt(dDia) + ' de ' + meses[dMes] + ' del ' + dYear;
}
// ::::::::::: FIN FUNCIONES MISCELANEAS :::::::::::::
var imgTxtEmp;
var imgTxtCurso;
var contTXTIMG;
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
	var tabla = eval(contTXTIMG);
	var doc = {
		pageSize: 'LETTER',
		pageOrientation: 'portrait',
		pageMargins: [25, 25, 35, 25],
		content: [
			{
				text: 'En este espacio la empresa puede imprimir su logotipo y, en su caso, también se puede imprimir el del agente capacitador externo',
				style: 'encabezado'
			},
			/*{
				text: '\n\n\n\n\n',
			},*/
			{
				table: {
					widths: ['*', '*'],
					body: tabla
				}
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
						[{text: 'Nombre o razón social (En caso de persona física, anotar apellido paterno, apellido materno y nombre(s))\n\n'+empresaTXT, style: 'descripTabla'}],
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
							{text: 'Instructor o tutor\n\n' + instructorTXT + '\n____________________________________\nNombre y firma\n', style: 'descripTabla2', border: [true, false, false, true], margin: [0 ,8 ,0 , 8]},
							{text: 'Patrón o representante legal\n\n' + patronTXT + '\n____________________________________\nNombre y firma\n', style: 'descripTabla2', border: [false, false, false, true], margin: [0 ,8 ,0 , 8]},
							{text: 'Representante de los trabajadores\n\n' + representanteTXT + '\n____________________________________\nNombre y firma\n', style: 'descripTabla2', border: [false, false, true, true], margin: [0 ,8 ,0 , 8]}
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
		altaTrabajador();
		if(reeimpresion === false){
			altaDocCompleto();
		}
	}else if(accionPDF === 2){
		// DESCARGAMOS EL DOC

		var nomDoc;
		$.confirm({
		    title: 'Agregar Nombre',
		    content: '' +
		    '<form action="" class="formName">' +
		    '<div class="form-group">' +
		    '<label>Escriba el nombre del archivo...</label>' +
		    '<input type="text" placeholder="Nombre de PDF..." class="name form-control"/>' +
		    '</div>' +
		    '</form>',
		    buttons: {
		        nombre: {
		            text: 'Asignar nombre',
		            btnClass: 'btn-blue',
		            action: function () {
		                var name = this.$content.find('.name').val();
		                if(!name){
		                    $.alert('Coloque un nombre...');
		                    return false;
		                }
		                nomDoc = name;
		                pdfMake.createPdf(doc).download(nomDoc);
		                altaTrabajador();
		                if(reeimpresion === false){
							altaDocCompleto();
						}
		            }
		        },
		        defecto: {
		            text: 'Nombre por defecto',
		            btnClass: 'btn-warning',
		            action: function () {
		            	nomDoc = 'Trabajador_';
		                for(n = 0; n < curpTXT.length; n++){
							nomDoc += curpTXT[n];
						}
						pdfMake.createPdf(doc).download(nomDoc);
						altaTrabajador();
						if(reeimpresion === false){
							altaDocCompleto();
						}
		            }
		        },
		        cancelar: {
		            text: 'Cancelar',
		            btnClass: 'btn-danger',
		            action: function () {
		            	habilBtnDoc();
		            }
		        },
		    },
		});
	}
}
// CODIGO SUELTO (POR SI LO NECESITO)
//= "[[{text: '\\n\\n\\n\\n\\n',border: [false, false, false, false]},{text: '\\n\\n\\n\\n\\n',border: [false, false, false, false]}]]";
//var prubIMG = "{image: fotoPDF, height: 70, alignment: 'left', border: [false, false, false, false]}, {image: fotoPDF, height: 70, alignment: 'right', border: [false, false, false, false]}";
//var prubIMG = "{image: fotoPDF, height: 70, alignment: 'left', border: [false, false, false, false]}, {image: fotoPDF, height: 70, alignment: 'right', border: [false, false, false, false]}";
//var contTXTIMG = "[[{text: '\\n\\n\\n\\n\\n',border: [false, false, false, false]},{text: '\\n\\n\\n\\n\\n',border: [false, false, false, false]}]]";