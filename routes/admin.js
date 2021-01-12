//admin user url's
const express = require('express');
const router = express.Router();
const passport = require('passport');
const config_role = require('./../config/role.js')
const User = require("./../models/User.js")
const bcrypt = require('bcrypt');

var config_form = require("../config/form_data.js")

router.get('/register',(req,res,next)=>{
    if(req.isAuthenticated()){ //If user is not authenticated and is admin
		if(req.user['role']==config_role.Admin){ 
			res.render('register',null);
		}else{
			res.redirect('/');
		}
	}else{
		res.redirect('/login');
	}
})

router.post('/register',(req,res)=>{
	//Get fields
	const {nombre,empleo,usuario, password, password2} = req.body; 
	console.log(req.body)
  
	let mensajes = []; //Messages to return to client
  
	console.log(' Name ' + usuario+ ' pass:' + password);
	if(!nombre || !password || !usuario || !empleo || !password2) {
		mensajes.push({type:'danger', msg:"Por favor llene todos los campos", msgtype:111})
	}
  
	//check if match
	if(password !== password2) {
	  mensajes.push({type:'danger',msg:"Las contraseñas no coinciden",msgtype:112});
	}
	
	//check if password is more than 5 characters
	if(password.length < 4 ) {
	  mensajes.push({type:'danger',msg:'Por lo menos 4 caracteres en la contraseña',msgtype:113})
	}
  
	if(mensajes.length > 0 ) { //If there are any errors return
	  res.send(mensajes)
	} 
	else 
	{
	  //validation passed
	  User.findOne({usuario : usuario}).exec((err,user)=>{
		if(user) {
			console.log(user); 
			mensajes.push({type:'danger',msg: 'Usuario ya registrado',msgtype:114});
			res.send(mensajes)
		  } 
		else {
		  const newUser = new User({
			  nombre : nombre,
			  usuario : usuario,
			  empleo:empleo,
			  password:password,
			  role:config_role.User
		  });
		  //hash password
		  bcrypt.genSalt(10,(err,salt)=> 
		  bcrypt.hash(newUser.password,salt,
			(err,hash)=> {
			  if(err) throw err;
				  //save pass to hash
				  newUser.password = hash;
			  //save user
			  newUser.save()
			  .then((value)=>{
				  mensajes.push({type:'success',msg:'Usuario creado con exito',msgtype:120})
				  res.send(mensajes)
			  })
			  .catch(value=> console.log(value));
			}));
		  } //ELSE statement ends here
		})
	}
  });
  
module.exports  = router;