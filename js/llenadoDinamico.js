// ::::::::::: * * * * * * * * * * * :::::::::::::::::
// FUNCIONES ESPECIALES CON EL DOM

$(document).on('click', '#convImg', function(){
	docImg();
});

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
// LLENADO DEL MODAL
