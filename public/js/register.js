//Post de registro de nuevo usario
$( "#formRegister" ).submit(function( event ) {
	$.ajax({
			type:"POST", 
			url:"/admin/register", //url guarda la ruta hacia donde se hace la peticion
			data:{
				nombre : $('#nombre').val(),
				usuario : $('#usuario').val(),
				empleo:$('#empleo').val(),
				password:$('#password').val(),
				password2:$('#password2').val()
			}, // data recive un objeto con la informacion que se enviara al servidor
			success:function(datos){ //success es una funcion que se utiliza si el servidor retorna informacion
				//Deletes past alerts
					$(".alert").each(function(index) {
							this.remove()
					});
					let type_errors=[]
					//check server messages
					for (i=0;i<datos.length;i+=1){
						//Adds server alerts
						$("#formRegister").append('\
						<div class="alert alert-'+datos[i].type+' text-center" role="alert" text%;">\
						'+datos[i].msg+'\
						</div>')
						
						type_errors.push(datos[i].msgtype)
					}     
					refreshInputs(type_errors)
			},
			dataType: 'json' 
	})

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

function refreshInputs(type_errors){ //Change inputs desing depending on errorType
	div_nombre = $('#div_nombre')
	nombre = $('#nombre')
	lbNombre=$('#lbNombre_invalid')

	div_usuario = $('#div_usuario')
	usuario = $('#usuario')
	lbUsuario=$('#lbUsuario_invalid')

	div_empleo = $('#div_empleo')
	empleo=$('#empleo')
	lbEmpleo=$('#lbEmpleo_invalid')

	div_password = $('#div_password')
	password=$('#password')
	lbPassword=$('#lbPassword_invalid')

	div_password2 = $('#div_password2')
	password2=$('#password2')
	lbPassword2=$('#lbPassword2_invalid')
	makeInputValid(nombre,div_nombre,lbNombre,true,"") 
	makeInputValid(usuario,div_usuario,lbUsuario,true,"")
	makeInputValid(empleo,div_empleo,lbEmpleo,true,"")
	makeInputValid(password,div_password,lbPassword,true,"")
	makeInputValid(password2,div_password2,lbPassword2,true,"")
	
	if(type_errors.includes(111)){ //Campos no llenados
		if (nombre.val()=="")
			makeInputValid(nombre,div_nombre,lbNombre,false,"Agregue el nombre")

		if (usuario.val()=="")
			makeInputValid(usuario,div_usuario,lbUsuario,false,"Agrege el usuario")
		
		if (empleo.val()=="")
			makeInputValid(empleo,div_empleo,lbEmpleo,false,"Agrege el empleo")

		if (password.val()=="")
			makeInputValid(password,div_password,lbPassword,false,"Agrege una contraseña")
		
		if (password2.val()=="")
			makeInputValid(password2,div_password2,lbPassword2,false,"Repita la contraseña")
	}
	if(type_errors.includes(112)){ //Password don't match
			makeInputValid(password2,div_password2,lbPassword2,false,"Las contraseñas no coinciden")
			password2.focus()
	}
	if(type_errors.includes(113)){ //Password too short 
		makeInputValid(password2,div_password2,lbPassword2,false,"Contraseña mayor a 4 caracteres")
		makeInputValid(password,div_password,lbPassword,false,"Contraseña mayor a 4 caracteres")
		password.focus()
	}  
	if(type_errors.includes(114)){ //User repeated
		makeInputValid(usuario,div_usuario,lbUsuario,false,"Ya existe ese usuario")
		usuario.focus()
	}
}

