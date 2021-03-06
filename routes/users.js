//User urls
const express = require('express');
const router = express.Router();
const config_role = require('./../config/role.js');
const Fechadb = require("../models/Fechadb.js")
var config_form = require("../config/form_data.js")

config_form.actualizar()

//validates day format
function isValidDate(dateString) {
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	if(!dateString.match(regEx)) return false;  // Invalid format
	var d = new Date(dateString);
	var dNum = d.getTime();
	if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
	return d.toISOString().slice(0,10) === dateString;
}

//send conceptos and predios
router.get('/conceptos_predios',(req,res)=>{
	data={conceptos:config_form.getConceptos(),predios:config_form.getPredios()}
	res.send(data)
});

router.get('/:p_date',(req,res)=>{
	//validate day
	if(isValidDate(req.params.p_date)){
		if(req.isAuthenticated()){ //Validate role 
			let user=req.user;
			// user={
			// 	role:'User',
			// 	nombre:'Trabajador 1',
			// 	usuario:'tb1'
			// }
			if(user['role']==config_role.User){ 
				let date=req.params.p_date;
				datos_defualt={
					fecha:date,
					habilitado:true,
					saved:'Sin guardar',
					nombre: user.nombre,
					datos:[]
				};
				//Look for day on database 
				Fechadb.findOne({usuario:user.usuario,fecha:(date.toString())}).exec((err,resDate)=>{
					if(resDate) {
						resDate['saved']='Guardado';
						res.render('usuario_panel',{data:resDate});
					}else{
						res.render('usuario_panel',{data:datos_defualt});
					} 
					})
				//enviar pagina
			}else{
				res.redirect('admin/');
			}
		}else{
			res.redirect('/login');
		}
	}else{
		res.render('errorPage');
	}
});

router.post('/infoweek',(req,res)=>{
	//validate day
	if(req.isAuthenticated()){ //Validate role 
		user=req.user;
		if(user['role']==config_role.User){ 
			const {week} = req.body; 

			let user=req.user;
			let weekResponse=[];
			week.forEach(element => {
				Fechadb.findOne({usuario:user.usuario,fecha:(element.toString())}).exec((err,resDate)=>{
					weekResponse.push('--');
					if(resDate) {
						let cantidad=0;
						resDate.datos.forEach(element => {
							cantidad+=element.cantidad;
						});
						weekResponse[week.indexOf(element)]=cantidad;
						if(weekResponse.length==7){
							res.send(weekResponse);
						}
					}else{
						if(weekResponse.length==7){
							res.send(weekResponse);
						}
					} 
					})
			});
		}
	}
});


//Posts

router.post('/delete/:p_date',(req,res)=>{
	//validate day
	if(isValidDate(req.params.p_date)){ 
		if(req.isAuthenticated()){ //validate autentification 
			if(req.user['role']==config_role.User){ //Validate role  
				const {index} = req.body; 
				let date=req.params.p_date;
				let respuesta=[]
				//Finding an existing date
				Fechadb.findOne({usuario:req.user.usuario,fecha:(date.toString())}).exec((err,resDate)=>{
					if(resDate) {
						newDay=resDate;
						newDay.datos.splice(index,1)
					}
					else {//bug
						res.send({msgtype:271,msg:'Registro no encontrada'})
					}
					//save date
					if(newDay.datos.length==0){
						Fechadb.deleteOne({ usuario:req.user.usuario,fecha:(date.toString()) }, function (err) {
							respuesta.push({msgtype:100,msg:'Guardado correctamente'})
							res.send(respuesta)
							if (err) {
								console.log(value)
								respuesta.push({msgtype:270,msg:'Error en la base de datos'})
								res.send(respuesta)
								return handleError(err);
							}
						  });
					}else{
						newDay.save()
						.then((value)=>{
							respuesta.push({msgtype:100,msg:'Guardado correctamente'})
							res.send(respuesta)
						})
						.catch(value=> { //Error on saving on database
							console.log(value)
							respuesta.push({msgtype:270,msg:'Error en la base de datos'})
							res.send(respuesta)
						});
					}
				});
				//---------------------------------------
			}else{
				res.send({msgtype:250,msg:'No autentificado como usuario'})
			}
		}else{
			res.send({msgtype:250,msg:'No autentificado como usuario'});
		}
	}else{
		res.send({msgtype:202,msg:"Fecha invalida"});
	}
});

router.post('/edit/:p_date',(req,res)=>{
	//validate day
	if(isValidDate(req.params.p_date)){ 
		if(req.isAuthenticated()){ //validate autentification 
			if(req.user['role']==config_role.User){ //Validate role  
				//Look for day on database 
				let newDay = {};
				let respuesta=[]
				//validate data
				const {concepto,cantidad,predio,index} = req.body; 
				let date=req.params.p_date;
				//Concepto
				if(concepto=='')
					respuesta.push({msgtype:201,msg:'Concepto vacio'});
				else if (!config_form.getConceptos().includes(concepto))
					respuesta.push({msgtype:202,msg:'Concepto invalido'});
				
				//Predio
				if(predio=='')
					respuesta.push({msgtype:201,msg:'Predio vacio'});
				else if (!config_form.getPredios().includes(predio))
					respuesta.push({msgtype:202,msg:"Predio invalido"});

				//Cantidad
				if(cantidad=='')
					respuesta.push({msgtype:201,msg:'Cantidad vacio'});
				else if (Number.isInteger(cantidad))
					respuesta.push({msgtype:202,msg:"Cantidad invalida"});

				if (respuesta.length>0){ //got errors
					res.send(respuesta);
				}else{ //Validation passed
				//Finding an existing date


					Fechadb.findOne({usuario:req.user.usuario,fecha:(date.toString())}).exec((err,resDate)=>{
						if(resDate) {
							newDay=resDate;
							if(index<newDay.datos.length){
								newDay.datos[index]={
									concepto:concepto,
									cantidad:parseInt(cantidad),
									id_concepto:config_form.findConceptoID(concepto),
									id_elemento:config_form.findPredioID(predio),
									predio:predio
								}
							}				
						}
						else { //bug
							res.send({msgtype:271,msg:'Registro no encontrada'})
						}
						//save date
						Fechadb.replaceOne({usuario:req.user.usuario,fecha:(date.toString())},newDay)
						.then((value)=>{
							respuesta.push({msgtype:100,msg:'Guardado correctamente'})
							res.send(respuesta)
						})
						.catch(value=> { //Error on saving on database
							respuesta.push({msgtype:270,msg:'Error en la base de datos'})
							res.send(respuesta)
						});
					});
				}
				//---------------------------------------
			}else{
				res.send({msgtype:250,msg:'No autentificado como usuario'})
			}
		}else{
			res.send({msgtype:250,msg:'No autentificado como usuario'});
		}
	}else{
		res.send({msgtype:202,msg:"Fecha invalida"});
	}
});

router.post('/:p_date',(req,res)=>{
	//validate day
	if(isValidDate(req.params.p_date)){ 
		if(req.isAuthenticated()){ //validate autentification req.isAuthenticated()
			if(req.user['role']==config_role.User){ //Validate role  req.user['role']==config_role.User
				//Look for day on database 
				let newDay = {};
				let respuesta=[]

				//validate data
				const {concepto,cantidad,predio} = req.body; 
				let date=req.params.p_date;
				
				//Concepto
				if(concepto=='')
					respuesta.push({msgtype:201,msg:'Concepto vacio'});
				else if (!config_form.getConceptos().includes(concepto))
					respuesta.push({msgtype:202,msg:'Concepto invalido'});
				
				//Predio
				if(predio=='')
					respuesta.push({msgtype:201,msg:'Predio vacio'});
				else if (!config_form.getPredios().includes(predio))
					respuesta.push({msgtype:202,msg:"Predio invalido"});

				//Cantidad
				if(cantidad=='')
					respuesta.push({msgtype:201,msg:'Cantidad vacio'});
				else if (Number.isInteger(cantidad))
					respuesta.push({msgtype:202,msg:"Cantidad invalida"});

				if (respuesta.length>0){ //got errors
					res.send(respuesta);
				}else{ //Validation passed
				//Finding an existing date
					Fechadb.findOne({usuario:req.user.usuario,fecha:(date.toString())}).exec((err,resDate)=>{
						if(resDate) {
							newDay=resDate;
							newDay.datos.push({
								concepto:concepto,
								cantidad: parseInt(cantidad),
								id_concepto:config_form.findConceptoID(concepto),
								id_elemento:config_form.findPredioID(predio),
								predio:predio
							})
						}
						else {
							newDay = new Fechadb({
								fecha : date,
								usuario : req.user.usuario,
								nombre:req.user.nombre,
								habilitado:true,
								datos:[{
									concepto:concepto,
									cantidad: parseInt(cantidad),
									id_concepto:config_form.findConceptoID(concepto),
									id_elemento:config_form.findPredioID(predio),
									predio:predio
								}]
							});
						}
						//save date
						newDay.save()
						.then((value)=>{
							respuesta.push({msgtype:100,msg:'Guardado correctamente'})
							res.send(respuesta)
						})
						.catch(value=> { //Error on saving on database
							console.log(value)
							respuesta.push({msgtype:270,msg:'Error en la base de datos'})
							res.send(respuesta)
						});
					});
				}
				//---------------------------------------
			}else{
				res.send({msgtype:250,msg:'No autentificado como usuario'})
			}
		}else{
			res.send({msgtype:250,msg:'No autentificado como usuario'});
		}
	}else{
		res.send({msgtype:202,msg:"Fecha invalida"});
	}
});

module.exports  = router;