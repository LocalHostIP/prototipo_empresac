//User urls
const express = require('express');
const router = express.Router();
const config_role = require('./../config/role.js');
const Fechadb = require("../models/Fechadb.js")

//validates day format
function isValidDate(dateString) {
	var regEx = /^\d{4}-\d{2}-\d{2}$/;
	if(!dateString.match(regEx)) return false;  // Invalid format
	var d = new Date(dateString);
	var dNum = d.getTime();
	if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
	return d.toISOString().slice(0,10) === dateString;
}

router.get('/:p_date',(req,res)=>{
	//validate day
	if(isValidDate(req.params.p_date)){
		//validate autentification req.isAuthenticated()
		if(true){ //Validate role req.user['role']==config_role.User
			if(true){ 
				let date=req.params.p_date;
				
				datos_defualt={
					fecha:date,
					habilitado:true,
					datos:{
						nombre:'Nombre Prueba',
						concepto:'Concepto 1',
						cantidad:12,
						id_concepto:'id_concepto_prueba',
						predio:'Predio 1',
						id_elemento:'id elemento prueba',
					}

				};
				//Look for day on database 
				Fechadb.findOne({usuario:'tb1',fecha:(date.toString())}).exec((err,resDate)=>{
					if(resDate) {
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

router.post('/:p_date',(req,res)=>{
	//validate day
	if(isValidDate(req.params.p_date)){
		//validate autentification req.isAuthenticated()
		if(true){ //Validate role req.user['role']==config_role.User
			if(true){ 
				//Convert day to format dd/mm/yyyy
				let varAuxDay=req.params.p_date.split('-') 
				let date=varAuxDay[2]+'/'+varAuxDay[1]+'/'+varAuxDay[0]

				//Look for day on database 
				Fechadb.findOne({fecha : date,usuario:'tb1'}).exec((err,resDate)=>{
					if(resDate) {
						console.log('dia encontrado')
					} 
					else {
					  const newDay = new Fechadb({
						  fecha : date,
						  usuario : 'tb1',
						  habilitado:false,
						  datos:{
							  nombre:'Nombre Prueba',
							  concepto:'Concepto 1',
							  cantidad:12,
							  id_concepto:'id_concepto_prueba',
							  predio:'Predio 1',
							  id_elemento:'id elemento prueba',
						  }
					  });
						//save user
						newDay.save()
						.then((value)=>{
							console.log('creado')
						})
						.catch(value=> console.log(value));
					  } //ELSE statement ends here
					})
				//enviar pagina
				res.render('usuario_panel')
			}else{
				res.redirect('admin/');
			}
		}else{
			res.redirect('/login');
		}
	}else{
		res.render('errorPage')
	}
});

module.exports  = router;