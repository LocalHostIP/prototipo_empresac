//Login when enter on password input
$('#password').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		$('#formLogin').submit();
	}
});

//prevent submit when fields are empty
$(document).ready(function(){
	$("form").on("submit", function(event){	
			usuario = $('#usuario');
			password=$('#password');
			if(usuario.val()=="" || password.val()==""){
				refreshInputs([111]); //send code for emty fields 
				event.preventDefault();
				return  false;
			}
	});
});

//Desing for invalid inputs
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

//default desing for inputs
function makeInputDefault(input,div_input){
	input.removeClass('is-valid is-invalid')
	div_input.removeClass('is-valid is-invalid')
}

//If fields are empy
function refreshInputs(type_errors){ 
	div_usuario = $('#div_usuario')
	usuario = $('#usuario')
	lbUsuario=$('#lbUsuario_invalid')
	
	div_password = $('#div_password')
	password=$('#password')
	lbPassword=$('#lbPassword_invalid')
	makeInputDefault(usuario,div_usuario)

	if(type_errors.includes(111)){ //Campos no llenados
		if (usuario.val()=="")
			makeInputValid(usuario,div_usuario,lbUsuario,false,"Introduzca su usuario")

		if (password.val()=="")
			makeInputValid(password,div_password,lbPassword,false,"Introduzca su contraseña")
			//Deletes past alerts
			$(".alert").each(function(index) {
					this.remove()
			});
			//Adds server alerts
			$("#form_container").append('\
			<div class="alert alert-danger text-center" role="alert">\
			Por favor llene todos los campos\
			</div>')
					 
	}
}