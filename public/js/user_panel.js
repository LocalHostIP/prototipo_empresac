
//Scroll to div_date
var posicion = $("#div_date").offset().top;
$("html, body").animate({
	scrollTop: posicion
}, 1000); 


//validates day format
function isValidDate(dateString) {
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	if(!dateString.match(regEx)) return false;  // Invalid format
	var d = new Date(dateString);
	var dNum = d.getTime();
	if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
	return d.toISOString().slice(0,10) === dateString;
}

//validate inputs
$( "#main_form" ).submit(function( event ) {
	validPost=true;
	//get inputs
	let date=$("#date").val();
	let concepto=$("#concepto").val();
	let cantidad=$("#cantidad").val();
	let predio=$("#predio").val();

	//validate date
	if (!isValidDate(date)){
		makeInputValid($('#date'),$('#div_date'),$('#lbDate_invalid'),false,'Fecha no valida');
		validPost=false;
	}

	//validate cantidad
	if(isNaN(cantidad)){
		makeInputValid($('#cantidad'),$('#div_cantidad'),$('#lbCantidad_invalid'),false,'No es un número');
		validPost=false;
	}

	if (validPost){
		$.ajax({
			type:"POST", 
			url:"/users/"+date, //url guarda la ruta hacia donde se hace la peticion
			data:{
				concepto : concepto,
				cantidad: cantidad,
				predio: predio,
			}, // data recive un objeto con la informacion que se enviara al servidor
			success:function(datos){ //success es una funcion que se utiliza si el servidor retorna informacion
				let type_errors=[]
				let msgs=[]
				//check server messages
				for (i=0;i<datos.length;i+=1){			
					type_errors.push(datos[i].msgtype)
					msgs.push(datos[i].msg)
				}     

				if(type_errors.includes(100)){ //Fecha registrada cone exito
					location.reload();
				}	
				refreshInputs(msgs)
			},
			dataType: 'json' 
		})
	}

	event.preventDefault(); //prevent default post
});

//Implements css bostrap for valid and invalid inputs, parameters are input, its cointener and its component for feedback
function makeInputValid(input,div_input,lb_feedback,valid,feedback){
	input.removeClass('is-valid is-invalid')
	div_input.removeClass('is-valid is-invalid')

	if(valid){
		input.addClass('is-valid')
		div_input.addClass('is-valid')
	}else{
		input.addClass('is-invalid')
		div_input.addClass('is-invalid')
		lb_feedback.html(feedback)
	}
}

//Changes inputs desing depending on errorType
function refreshInputs(errors){ 
	date = $('#date')
	div_date=$('#div_date')
	lb_date=$('#lbDate_invalid')

	concepto = $('#concepto')
	div_concepto=$('#div_concepto')
	lb_concepto=$('#lbConcepto_invalid')

	predio = $('#predio')
	div_predio=$('#div_predio')
	lb_predio=$('#lbPredio_invalid')

	cantidad = $('#cantidad')
	div_cantidad=$('#div_cantidad')
	lb_cantidad=$('#lbCantidad_invalid')

	makeInputValid(date,div_date,lb_date,true,"") 
	makeInputValid(concepto,div_concepto,lb_concepto,true,"") 
	makeInputValid(predio,div_predio,lb_predio,true,"") 
	makeInputValid(cantidad,div_cantidad,lb_cantidad,true,"") 

	if(errors.includes('Concepto invalido')){
		makeInputValid(concepto,div_concepto,lb_concepto,false,'Concepto invalido')
	}
	if(errors.includes('Predio invalido')){
		makeInputValid(predio,div_predio,lb_predio,false,'Predio invalido')
	}
	if(errors.includes('Cantidad invalida')){
		makeInputValid(cantidad,div_cantidad,lb_cantidad,false,'Cantidad invalida')
	}
	if(errors.includes('Fecha invalida')){
		makeInputValid(fecha,div_cantidad,lb_cantidad,false,'Fecha invalida')
	}

	if(errors.includes('Concepto vacio')){
		makeInputValid(concepto,div_concepto,lb_concepto,false,'Agregue el concepto')
	}
	if(errors.includes('Predio vacio')){
		makeInputValid(predio,div_predio,lb_predio,false,'Agregue el predio')
	}
	if(errors.includes('Cantidad vacio')){
		makeInputValid(cantidad,div_cantidad,lb_cantidad,false,'Agregue la cantidad')
	}
	if(errors.includes('Fecha vacio')){
		makeInputValid(fecha,div_cantidad,lb_cantidad,false,'Agregue la fecha')
	}
}

//On date changed redirect
$('#date').change(function(){
	window.location.href = '/users/'+$('#date').val(); //one level up
})

//Date picker disable days
$( document ).ready(function() {
	var datetime = new Date();
	$("#date").prop('max',datetime.toISOString().slice(0,10));
});